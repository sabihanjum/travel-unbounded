import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

// POST /api/enquiry
export async function POST(request) {
  try {
    const body = await request.json();

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
    } = body;

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

    // Return 400 Bad Request if validation fails
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Server-side validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    // Connect to database
    try {
      await dbConnect();
    } catch (dbErr) {
      console.error("Database connection error in API route:", dbErr.message);
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed. Please ensure MONGODB_URI is correctly configured in your server environment.",
        },
        { status: 500 }
      );
    }

    // Save database record
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

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        data: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Internal Server Error in API /api/enquiry:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

// GET /api/enquiry (Bonus admin tool)
export async function GET() {
  try {
    try {
      await dbConnect();
    } catch (dbErr) {
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed.",
        },
        { status: 500 }
      );
    }

    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: enquiries.length,
        data: enquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch enquiries.",
      },
      { status: 500 }
    );
  }
}
