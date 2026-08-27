import { ShieldCheck, UserCheck, Settings, HeartHandshake, MapPin } from "lucide-react";

export const metadata = {
  title: "About Us | Travel Unbounded",
  description: "Learn about Travel Unbounded, India's most trusted experiential travel team. Discover our philosophy, story, and global offices.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Personally-Vetted Experiences",
      description: "We sleep in the beds, eat the food, and ride the trails ourselves before recommending them.",
      icon: ShieldCheck,
    },
    {
      title: "Verified Local Guides",
      description: "Unlock deep local insights, language support, and safety with verified on-ground specialists.",
      icon: UserCheck,
    },
    {
      title: "Tailor-Made Itineraries",
      description: "100% custom-planned journeys built from scratch around your speed, budget, and preferences.",
      icon: Settings,
    },
    {
      title: "24x7 Ground Support",
      description: "Active assistance from our global operations desk during your trip for complete peace of mind.",
      icon: HeartHandshake,
    },
  ];

  const offices = [
    {
      name: "Bengaluru HQ",
      role: "Headquarters",
      address: "541, 7th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru - 560008, India",
    },
    {
      name: "Kochi Office",
      role: "Kerala Operations",
      address: "LR Towers, S Janatha Road, Palavivatton, Kochi - 682025, India",
    },
    {
      name: "Nairobi Office",
      role: "East Africa Operations",
      address: "Westpark Towers, Muthithi Road, Nairobi, P.O. Box 6950, Postal Code 00100, Kenya",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Banner */}
      <section className="bg-slate-900 py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
            alt="Kerala backwaters houseboat"
            className="w-full h-full object-cover opacity-25 object-center"
          />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Our Story</h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            India's most trusted experiential travel planners, building journeys around people.
          </p>
        </div>
      </section>

      {/* Company Philosophy */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Who We Are</span>
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl mt-1">India's Most Trusted Experiential Travel Experts</h2>
          </div>
          
          <div className="mt-10 space-y-6 text-base text-gray-600 leading-relaxed">
            <p>
              Travel Unbounded was born from a simple belief — that the best journeys aren't sold from a catalogue. They're built around the people taking them.
            </p>
            <p>
              Headquartered in Bangalore with offices in Kerala and Nairobi, we design trips that blend comfort, culture, and raw nature. Every destination, resort, and activity we recommend has been personally experienced and verified by our own team.
            </p>
            <p>
              From spotting the Big Five at dawn in the Masai Mara to cruising Ha Long Bay at sunset — we go where real stories are written, and we bring you along.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-t border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Our Value Proposition</span>
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl mt-1">Why Travel Unbounded?</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              We focus on delivering high-quality experiential vacations with unparalleled local support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{val.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Presence & Office Locations */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Where to Find Us</span>
            <h2 className="text-2xl font-black text-gray-900 sm:text-3xl mt-1">Our Global Offices</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Our regional operations hubs help us coordinate bookings and support you on the ground.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {offices.map((office) => (
              <div key={office.name} className="relative flex flex-col rounded-2xl border border-gray-100 bg-slate-50/50 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{office.name}</h3>
                    <p className="text-xs text-gray-400 font-medium">{office.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-gray-500 flex-grow">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
