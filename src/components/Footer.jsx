import Link from "next/link";
import { Compass, MapPin, Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
  const offices = [
    {
      city: "Bengaluru",
      role: "Headquarters",
      address: "541, 7th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru - 560008, India",
    },
    {
      city: "Kochi",
      role: "Kerala Office",
      address: "LR Towers, S Janatha Road, Palavivatton, Kochi - 682025, India",
    },
    {
      city: "Nairobi",
      role: "Kenya Office",
      address: "Westpark Towers, Muthithi Road, Nairobi, P.O. Box 6950, Postal Code 00100, Kenya",
    },
  ];

  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand & Mission */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-lg font-black tracking-wider text-gray-900 uppercase">
                Travel <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">Unbounded</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500">
              India's most trusted experiential travel experts. We design tailor-made journeys around people, cultures, and unforgettable wild moments.
            </p>
            <div className="flex flex-col gap-2 mt-2 text-sm">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-indigo-600" /> +91 98765 43210</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-indigo-600" /> info@travelunbounded.com</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-indigo-600" /> Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
          </div>

          {/* Office Locations */}
          {offices.map((office) => (
            <div key={office.city} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                {office.city} <span className="text-xs font-normal text-gray-400">({office.role})</span>
              </h3>
              <div className="flex gap-2 text-sm leading-relaxed text-gray-500">
                <MapPin className="h-5 w-5 shrink-0 text-indigo-500 mt-0.5" />
                <p>{office.address}</p>
              </div>
            </div>
          ))}

        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Travel Unbounded. All rights reserved. Built for Phase 1 Full Stack evaluation.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/about" className="hover:text-indigo-600">About Us</Link>
            <Link href="/contact" className="hover:text-indigo-600">Plan a Journey</Link>
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
