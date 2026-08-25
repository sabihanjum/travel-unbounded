"use strict";
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Plan Your Trip", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-100 transition-transform group-hover:scale-105">
                <Compass className="h-6 w-6 animate-pulse-slow" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-wider text-gray-900 uppercase">
                  Travel <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">Unbounded</span>
                </span>
                <span className="text-[10px] tracking-widest text-gray-500 uppercase font-semibold -mt-1">
                  Experiential Travel Experts
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-indigo-600" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95"
            >
              Enquire Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-700"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
