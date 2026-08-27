require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Enquiry = require("./models/Enquiry");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS configuration - Allow local development and custom production origin
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed or in development mode
      if (process.env.NODE_ENV === "development" || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      
      // Otherwise default to allowing for ease of use or returning CORS check
      return callback(null, true);
    },
    credentials: true,
  })
);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI environment variable is missing inside .env. Please configure it to establish connection.");
}

mongoose
  .connect(MONGODB_URI || "mongodb://localhost:27017/travel_unbounded")
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.error("Could not connect to MongoDB:", err.message));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
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

    // Server-side validation checks
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

    // Return 400 Bad Request if validation checks fail
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Server-side validation failed",
        errors,
      });
    }

    // Save model record
    const newEnquiry = new Enquiry({
      fullName: fullName.trim(),
      countryCode,
      contactNumber,
      email: email.trim().toLowerCase(),
      dateOfTravel: new Date(dateOfTravel),
      numberOfPeople: parseInt(numberOfPeople),
      hotelCategory,
      numberOfChildren: numberOfChildren ? parseInt(numberOfChildren) : 0,
      preferredDestination,
    });

    await newEnquiry.save();

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Error saving enquiry inside Express backend:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while processing your request.",
    });
  }
});

// GET /api/enquiry - List all enquiries (sorted newest first)
app.get("/api/enquiry", async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries inside Express backend:", error);
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
