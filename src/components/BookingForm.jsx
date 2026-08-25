"use strict";
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle, Calendar, Users, Home, Info } from "lucide-react";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+91",
    contactNumber: "",
    email: "",
    dateOfTravel: "",
    numberOfPeople: 1,
    hotelCategory: "Deluxe",
    numberOfChildren: 0,
    preferredDestination: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [serverMessage, setServerMessage] = useState("");

  // Populate destination from query parameter if available
  useEffect(() => {
    const dest = searchParams.get("destination");
    if (dest) {
      setFormData((prev) => ({ ...prev, preferredDestination: dest }));
    }
  }, [searchParams]);

  const countryCodes = [
    { code: "+91", label: "India (+91)" },
    { code: "+1", label: "USA/Canada (+1)" },
    { code: "+44", label: "UK (+44)" },
    { code: "+254", label: "Kenya (+254)" },
    { code: "+84", label: "Vietnam (+84)" },
    { code: "+255", label: "Tanzania (+255)" },
    { code: "+354", label: "Iceland (+354)" },
    { code: "+94", label: "Sri Lanka (+94)" },
    { code: "+61", label: "Australia (+61)" },
    { code: "+971", label: "UAE (+971)" },
  ];

  const destinations = [
    "Kerala",
    "Himachal Pradesh",
    "Ladakh",
    "Andaman",
    "Goa",
    "Kenya",
    "Vietnam",
    "Tanzania",
    "Iceland",
    "Sri Lanka",
    "Other / Custom Trip",
  ];

  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters long";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact Number
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid phone number (7 to 15 digits, numeric)";
    }

    // Date of Travel
    if (!formData.dateOfTravel) {
      newErrors.dateOfTravel = "Travel date is required";
    } else {
      const selectedDate = new Date(formData.dateOfTravel);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // clear time for comparison
      if (selectedDate <= today) {
        newErrors.dateOfTravel = "Travel date must be in the future";
      }
    }

    // Number of People
    if (formData.numberOfPeople === undefined || formData.numberOfPeople === "") {
      newErrors.numberOfPeople = "Number of people is required";
    } else if (parseInt(formData.numberOfPeople) < 1) {
      newErrors.numberOfPeople = "Must be at least 1 person";
    }

    // Number of Children
    if (formData.numberOfChildren !== "" && parseInt(formData.numberOfChildren) < 0) {
      newErrors.numberOfChildren = "Children count cannot be negative";
    }

    // Preferred Destination
    if (!formData.preferredDestination) {
      newErrors.preferredDestination = "Please select a destination";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when field is typed in
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setServerMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          countryCode: formData.countryCode,
          contactNumber: formData.contactNumber,
          email: formData.email.trim(),
          dateOfTravel: formData.dateOfTravel,
          numberOfPeople: parseInt(formData.numberOfPeople),
          hotelCategory: formData.hotelCategory,
          numberOfChildren: formData.numberOfChildren === "" ? 0 : parseInt(formData.numberOfChildren),
          preferredDestination: formData.preferredDestination,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          countryCode: "+91",
          contactNumber: "",
          email: "",
          dateOfTravel: "",
          numberOfPeople: 1,
          hotelCategory: "Deluxe",
          numberOfChildren: 0,
          preferredDestination: "",
        });
      } else {
        setSubmitStatus("error");
        setServerMessage(data.message || "Failed to submit enquiry. Please verify details.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setServerMessage("A network or server error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="rounded-2xl bg-emerald-50 p-8 text-center border border-emerald-100 shadow-sm animate-fade-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900">Enquiry Submitted Successfully!</h3>
        <p className="mt-3 text-sm leading-relaxed text-emerald-700 max-w-md mx-auto">
          Thank you for choosing Travel Unbounded. Your booking enquiry has been recorded in our system. One of our travel experts will get in touch with you within the next 24 hours to plan your perfect experiential getaway.
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-colors"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-50 md:p-8">
      <h2 className="text-xl font-extrabold text-gray-900 md:text-2xl">Plan Your Experiential Journey</h2>
      <p className="mt-2 text-sm text-gray-500">
        Share your travel details, and our local experts will craft a personalized itinerary for you.
      </p>

      {submitStatus === "error" && (
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-rose-50 p-4 border border-rose-100 text-rose-800 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
          <div>
            <span className="font-semibold">Submission failed:</span> {serverMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={isSubmitting}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              errors.fullName
                ? "border-rose-300 focus:border-rose-500"
                : "border-gray-200 focus:border-indigo-500"
            }`}
          />
          {errors.fullName && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.fullName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={isSubmitting}
            className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              errors.email
                ? "border-rose-300 focus:border-rose-500"
                : "border-gray-200 focus:border-indigo-500"
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contactNumber" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Contact Number <span className="text-rose-500">*</span>
          </label>
          <div className="mt-1.5 flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              disabled={isSubmitting}
              className="block rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="9876543210"
              disabled={isSubmitting}
              className={`block w-full flex-1 rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.contactNumber
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.contactNumber && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.contactNumber}</p>}
        </div>

        {/* Preferred Destination */}
        <div>
          <label htmlFor="preferredDestination" className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Preferred Destination <span className="text-rose-500">*</span>
          </label>
          <select
            id="preferredDestination"
            name="preferredDestination"
            value={formData.preferredDestination}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`mt-1.5 block w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
              errors.preferredDestination
                ? "border-rose-300 focus:border-rose-500"
                : "border-gray-200 focus:border-indigo-500"
            }`}
          >
            <option value="">-- Select a Destination --</option>
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.preferredDestination && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.preferredDestination}</p>
          )}
        </div>

        {/* Grid for Travel details */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Date of Travel */}
          <div>
            <label htmlFor="dateOfTravel" className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              Date of Travel <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfTravel"
              name="dateOfTravel"
              value={formData.dateOfTravel}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.dateOfTravel
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
            {errors.dateOfTravel && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.dateOfTravel}</p>}
          </div>

          {/* Hotel Category */}
          <div>
            <label htmlFor="hotelCategory" className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1">
              <Home className="h-3.5 w-3.5 text-gray-400" />
              Hotel Category <span className="text-rose-500">*</span>
            </label>
            <select
              id="hotelCategory"
              name="hotelCategory"
              value={formData.hotelCategory}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1.5 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Grid for People & Children */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Number of People */}
          <div>
            <label htmlFor="numberOfPeople" className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              Number of Adults <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              min="1"
              disabled={isSubmitting}
              className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.numberOfPeople
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
            {errors.numberOfPeople && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.numberOfPeople}</p>}
          </div>

          {/* Number of Children */}
          <div>
            <label htmlFor="numberOfChildren" className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              Children (optional)
            </label>
            <input
              type="number"
              id="numberOfChildren"
              name="numberOfChildren"
              value={formData.numberOfChildren}
              onChange={handleChange}
              min="0"
              disabled={isSubmitting}
              className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.numberOfChildren
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-gray-200 focus:border-indigo-500"
              }`}
            />
            {errors.numberOfChildren && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.numberOfChildren}</p>}
          </div>
        </div>

        {/* Info text */}
        <div className="flex gap-2 rounded-xl bg-blue-50/50 p-3.5 text-xs text-blue-800 leading-normal border border-blue-100/50">
          <Info className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
          <span>Our travel designers customize everything. Surcharge details and exact pricing will be calculated based on your custom itinerary.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending Enquiry...
            </>
          ) : (
            "Submit Enquiry"
          )}
        </button>
      </form>
    </div>
  );
}
