import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function DestinationCard({ destination }) {
  const { name, country, image, description, price } = destination;

  // Format price in Indian Rupee format
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-gray-100">
      {/* Image Wrapper */}
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
        <img
          src={image}
          alt={`${name}, ${country}`}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm shadow-sm">
          <MapPin className="h-3 w-3 text-indigo-500" />
          <span>{country}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {name}
        </h3>
        
        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Pricing & Call to Action */}
        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Starting from</span>
            <span className="text-base font-extrabold text-indigo-600">{formattedPrice}</span>
          </div>
          <Link
            href={`/contact?destination=${encodeURIComponent(name)}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white"
          >
            Enquire
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
