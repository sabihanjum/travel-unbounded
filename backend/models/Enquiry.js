const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    countryCode: {
      type: String,
      required: [true, "Country code is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[0-9]{7,15}$/, "Please enter a valid phone number (7 to 15 digits)"],
    },
    preferredDestination: {
      type: String,
      required: [true, "Preferred destination is required"],
    },
    dateOfTravel: {
      type: Date,
      required: [true, "Travel date is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value > today;
        },
        message: "Travel date must be in the future",
      },
    },
    numberOfPeople: {
      type: Number,
      required: [true, "Number of people is required"],
      min: [1, "Number of people must be at least 1"],
    },
    hotelCategory: {
      type: String,
      required: [true, "Hotel category is required"],
      enum: {
        values: ["Standard", "Deluxe", "Luxury"],
        message: "Hotel category must be Standard, Deluxe, or Luxury",
      },
    },
    numberOfChildren: {
      type: Number,
      default: 0,
      min: [0, "Children count cannot be negative"],
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false },
  }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);

module.exports = Enquiry;
