import Link from "next/link";
import { ArrowRight, Globe, Compass, Star, ShieldCheck } from "lucide-react";
import { indiaDestinations, internationalDestinations } from "@/data/destinations";
import DestinationCard from "@/components/DestinationCard";

export const metadata = {
  title: "Travel Unbounded | Experiential Travel Experts",
  description: "Discover custom journeys built around people, culture, and unforgettable experiences. Plan your next adventure with India's most trusted travel team.",
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80"
            alt="Scenic mountain lake travel background"
            className="w-full h-full object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-white w-full">
          <div className="max-w-3xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-300 border border-indigo-500/20 backdrop-blur-sm shadow-sm mb-6">
              <Compass className="h-4 w-4 animate-spin-slow" />
              <span>India's Most Trusted Experiential Travel Experts</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-white">
              Journeys Built Around{" "}
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                People, Culture
              </span>{" "}
              & Wild Experiences
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Every resort, safari, and hidden trail we recommend has been personally experienced and vetted by our destination design team. Explore the world, unbounded.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95"
              >
                Plan Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">100% Custom Travel</h3>
              <p className="text-xs text-gray-500 mt-1">Tailored itineraries designed specifically around your preferences</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Personally Vetted</h3>
              <p className="text-xs text-gray-500 mt-1">We sleep in the beds, eat the food, and ride the trails ourselves</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Local Guides & Experts</h3>
              <p className="text-xs text-gray-500 mt-1">Immersive culture and safety with verified local specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* India Destinations Section */}
      <section className="py-16 sm:py-24 bg-slate-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Discover India</span>
              <h2 className="text-2xl font-black text-gray-900 sm:text-3xl mt-1">Indian Escapes</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xl">
                From backwaters to high-altitude cold deserts, experience the incredible variety of the Indian subcontinent.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {indiaDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* International Destinations Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Beyond Borders</span>
              <h2 className="text-2xl font-black text-gray-900 sm:text-3xl mt-1">International Odysseys</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-xl">
                Embark on unique experiences worldwide—from African safaris to Icelandic waterfalls.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {internationalDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-slate-900 py-16 sm:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
            alt="African Serengeti landscape"
            className="w-full h-full object-cover opacity-15 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-white">Let's Design Your Custom Experience</h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our destination designers specialize in tailoring custom itineraries based on your budget, travel dates, and exact interest areas. Get a free proposal today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 active:scale-95"
            >
              Start Custom Design
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
