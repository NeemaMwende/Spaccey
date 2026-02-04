"use client";

import { motion } from "framer-motion";
import { ChevronDown, Instagram } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* 3D Scene Container */}
      <div className="absolute right-0 top-0 w-full md:w-2/3 h-full">
        <Scene3D />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl pt-20 md:pt-0">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-sm md:text-base tracking-[0.3em] uppercase font-light">
              <span className="text-cyan-400">Discover the</span>{" "}
              <span className="gradient-text font-medium">Future</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            VIRTUAL ERA
          </motion.h1>

          {/* Subheadline on the right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            <div className="text-right">
              <p className="text-lg tracking-[0.2em] uppercase">
                <span className="text-gray-400">Artificial</span>{" "}
                <span className="gradient-text font-semibold">
                  Intelligence
                </span>
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-400 text-base md:text-lg max-w-xl mb-12 leading-relaxed"
          >
            Virtual is the new reality—where ideas come alive, experiences feel
            immersive, and digital worlds blend seamlessly with everyday life.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Link href="/login">
              <button className="group px-8 py-4 border border-white/20 rounded-md text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center gap-3">
                <span>Start Free Trial</span>
                <div className="w-5 h-5 border border-white/40 rounded-full flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                </div>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Left Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-6 md:left-12"
        >
          <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </motion.div>

        {/* Social Icons - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-8 right-6 md:right-12 flex gap-4"
        >
          <a
            href="#"
            className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
