"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider">
          SPACEY
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="#integrations"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Integrations
          </Link>
          <Link
            href="#security"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Security
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
        </div>

        {/* CTA Button */}
        <button className="px-6 py-2.5 border border-cyan-400/50 text-cyan-400 rounded-md text-sm font-medium hover:bg-cyan-400/10 transition-all duration-200">
          Book Demo
        </button>
      </div>
    </motion.nav>
  );
}
