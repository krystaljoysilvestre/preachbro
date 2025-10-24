"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative flex flex-col min-h-screen items-center bg-[#0d0d0f] text-white">
      {/* === Background Layers === */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1a1a1f_0%,#0d0d0f_60%,black_100%)]"></div>

        {/* Glowing blob - static */}
        <div className="absolute top-[-20%] left-[50%] w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full" />
      </div>

      {/* === Navigation === */}
      <div className="z-20 w-full max-w-6xl px-4 md:px-0 mt-4 md:mt-6">
        <nav className="flex justify-between items-center py-3 px-4 md:py-6 md:px-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full shadow-lg">
          <h1 className="text-base md:text-lg font-bold tracking-tight bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
            PreachBro
          </h1>
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#preview" className="hover:text-white transition">
              Discover
            </a>
            <a href="#pricing" className="hover:text-white transition">
              Pricing
            </a>
          </div>
          <Link href="/signin">
            <Button
              variant="outline"
              className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white text-xs md:text-sm py-2 px-3 md:py-2 md:px-4"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </div>

      {/* === Hero Content === */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-6 mt-16 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl"
        >
          Your AI-Powered <br />
          <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
            Sermon Assistant
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-gray-300 text-lg max-w-xl leading-relaxed"
        >
          Craft, organize, and deliver sermons effortlessly with the power of
          AI. Focus on your message — we’ll handle the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex justify-center gap-4 mt-10"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 rounded-full"
            >
              Get Started
            </Button>
          </Link>
          <Button
            size="lg"
            variant="ghost"
            className="px-6 py-6 text-base text-gray-200 hover:text-white hover:bg-white/10 rounded-full"
          >
            <PlayCircle className="mr-2 w-5 h-5" /> Watch Demo
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator - simplified */}
      <div className="absolute bottom-10 flex flex-col items-center text-gray-400">
        <span className="text-xs mb-1">Scroll</span>
        <div className="w-0.5 h-6 bg-gray-500 rounded-full animate-pulse" />
      </div>
    </section>
  );
}
