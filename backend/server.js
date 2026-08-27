require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Enquiry = require("./models/Enquiry");

const app = express();
const PORT = process.env.PORT || 5000;

// Path to save local file database
const ENQUIRIES_FILE = path.join(__dirname, "enquiries.json");

// Helper function to read from local file database
function readLocalFileDb() {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const fileData = fs.readFileSync(ENQUIRIES_FILE, "utf8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading local enquiries.json:", err.message);
  }
  return [];
}

// Helper function to write to local file database
function writeLocalFileDb(data) {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to local enquiries.json:", err.message);
  }
}

// Initialize temporary database fallback
let mockDatabase = readLocalFileDb();

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV === "development" || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Database connection with safe mock fallback
const MONGODB_URI = process.env.MONGODB_URI;
let isUsingMockDb = false;

if (!MONGODB_URI) {
  isUsingMockDb = true;
  console.log("------------------------------------------------------------------");
  console.log("WARNING: MONGODB_URI is not set. Running with local enquiries.json file database.");
  console.log(`Submissions will be recorded to: ${ENQUIRIES_FILE}`);
  console.log("------------------------------------------------------------------");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas successfully."))
    .catch((err) => {
      isUsingMockDb = true;
      console.error("MongoDB Connection Error. Falling back to local file database.");
      console.error("Error Detail:", err.message);
    });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    database: isUsingMockDb ? "Local enquiries.json File" : "MongoDB Atlas",
    timestamp: new Date() 
  });
});

// POST /api/enquiry - Create enquiry
app.post("/api/enquiry", async (req, res) => {
  try {
    const {
      fullName,
      countryCode,
      contactNumber,
      email,
      dateOfTravel,
      numberOfPeople,
      hotelCategory,
      numberOfChildren,
      preferredDestination,
    } = req.body;

    // Server-side validation
    const errors = {};

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 3) {
      errors.fullName = "Full name is required and must be at least 3 characters long.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "A valid email address is required.";
    }

    if (!countryCode) {
      errors.countryCode = "Country code is required.";
    }

    const phoneRegex = /^[0-9]{7,15}$/;
    if (!contactNumber || !phoneRegex.test(contactNumber)) {
      errors.contactNumber = "A valid phone number (7 to 15 digits, numeric only) is required.";
    }

    if (!preferredDestination) {
      errors.preferredDestination = "Preferred destination selection is required.";
    }

    if (!dateOfTravel) {
      errors.dateOfTravel = "Travel date is required.";
    } else {
      const travelDate = new Date(dateOfTravel);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(travelDate.getTime())) {
        errors.dateOfTravel = "Invalid travel date format.";
      } else if (travelDate <= today) {
        errors.dateOfTravel = "Date of travel must be in the future.";
      }
    }

    if (numberOfPeople === undefined || numberOfPeople === null || isNaN(numberOfPeople) || parseInt(numberOfPeople) < 1) {
      errors.numberOfPeople = "Number of adults must be at least 1.";
    }

    if (numberOfChildren !== undefined && numberOfChildren !== null && (isNaN(numberOfChildren) || parseInt(numberOfChildren) < 0)) {
      errors.numberOfChildren = "Number of children cannot be negative.";
    }

    const allowedHotels = ["Standard", "Deluxe", "Luxury"];
    if (!hotelCategory || !allowedHotels.includes(hotelCategory)) {
      errors.hotelCategory = "Hotel category must be Standard, Deluxe, or Luxury.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Server-side validation failed",
        errors,
      });
    }

    const enquiryData = {
      fullName: fullName.trim(),
      countryCode,
      contactNumber,
      email: email.trim().toLowerCase(),
      dateOfTravel: new Date(dateOfTravel),
      numberOfPeople: parseInt(numberOfPeople),
      hotelCategory,
      numberOfChildren: numberOfChildren ? parseInt(numberOfChildren) : 0,
      preferredDestination,
    };

    let savedData;

    if (isUsingMockDb) {
      // Re-read file to avoid out-of-sync overwrites
      mockDatabase = readLocalFileDb();
      
      savedData = {
        _id: new mongoose.Types.ObjectId().toString(),
        ...enquiryData,
        createdAt: new Date()
      };
      
      mockDatabase.push(savedData);
      writeLocalFileDb(mockDatabase);
    } else {
      // Store in MongoDB
      const newEnquiry = new Enquiry(enquiryData);
      savedData = await newEnquiry.save();
    }

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully and recorded",
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing your request.",
    });
  }
});

// GET /api/enquiry - List all enquiries (sorted newest first)
app.get("/api/enquiry", async (req, res) => {
  try {
    let enquiries;
    if (isUsingMockDb) {
      mockDatabase = readLocalFileDb();
      enquiries = [...mockDatabase].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    }
    
    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries list.",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
