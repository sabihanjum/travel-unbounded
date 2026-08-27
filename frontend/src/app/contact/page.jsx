import { Suspense } from "react";
import { Loader2, Mail, Phone, CalendarRange, Sparkles, MapPin } from "lucide-react";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Plan Your Trip | Travel Unbounded",
  description: "Fill out our booking enquiry form to start planning your personalized experiential vacation with Travel Unbounded.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        
        {/* Left Side: Copy and details */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Start Planning</span>
            <h1 className="text-3xl font-black text-gray-900 sm:text-4xl mt-1">Plan Your Trip</h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Submit your enquiry, and our experiential designers will build a customized travel itinerary tailored exactly to your pace, preferences, and interests.
            </p>
          </div>

          {/* Key Selling Points / Features */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <div className="flex gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CalendarRange className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Custom Itineraries</h3>
                <p className="mt-1 text-xs text-gray-500">Tailored hotels, travel dates, routes, and experiences</p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Experiential Travel</h3>
                <p className="mt-1 text-xs text-gray-500">Focus on local cultures, cuisines, nature, and wild trails</p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Global Operational Support</h3>
                <p className="mt-1 text-xs text-gray-500">Offices in Bengaluru, Kerala, and Nairobi coordination</p>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 mt-4 text-xs text-gray-500 leading-relaxed">
            <h4 className="font-bold text-gray-900 mb-2">Need Immediate Help?</h4>
            <p className="mb-3">For group enquiries, corporate trips, or immediate assistance, contact us directly:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-indigo-600" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-indigo-600" /> support@travelunbounded.com</div>
            </div>
          </div>
        </div>

        {/* Right Side: The Booking Form */}
        <div className="lg:col-span-7">
          <Suspense
            fallback={
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                  <p className="text-sm text-gray-400 font-medium">Loading form...</p>
                </div>
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
