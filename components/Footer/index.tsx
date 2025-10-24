"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0d0d0f] via-[#0b0b0d] to-[#09090b] text-gray-300 overflow-hidden border-t border-white/10 backdrop-blur-xl">
      {/* === Ambient gradient glow === */}
      <motion.div
        initial={{ opacity: 0.3, scale: 0.9 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-radial from-blue-500/20 via-cyan-400/10 to-transparent blur-[240px] rounded-full pointer-events-none"
      />

      {/* === Content Wrapper === */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* === Brand Column === */}
        <div className="flex flex-col items-start">
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            PreachBro
          </h3>
          <p className="mt-3 text-gray-400 max-w-[280px] leading-relaxed">
            Empowering pastors and communicators with AI-driven sermon tools
            that amplify clarity, creativity, and connection.
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { Icon: Facebook, color: "text-blue-500" },
              { Icon: Twitter, color: "text-blue-400" },
              { Icon: Linkedin, color: "text-blue-600" },
              { Icon: Mail, color: "text-blue-400" },
            ].map(({ Icon, color }, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition"
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </a>
            ))}
          </div>
        </div>

        {/* === Navigation Column === */}
        <div className="flex flex-col md:items-center">
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {[
              { label: "Features", href: "#features" },
              { label: "Demo", href: "#preview" },
              { label: "Pricing", href: "#pricing" },
              { label: "Sign In", href: "/login" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* === Newsletter Column === */}
        <div className="flex flex-col md:items-end">
          <h4 className="text-lg font-semibold text-white mb-3">
            Stay Updated
          </h4>
          <p className="text-gray-400 text-sm mb-4 max-w-[260px] text-right md:text-right">
            Get sermon writing insights and updates — no spam, just inspiration.
          </p>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email"
              className="w-full md:w-[220px] px-4 py-3 text-sm bg-white/5 backdrop-blur-md border border-white/20 rounded-l-xl placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-r-xl transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* === Divider === */}
      <div className="border-t border-white/10" />

      {/* === Footer Bottom === */}
      <div className="relative z-10 text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} PreachBro. All rights reserved.
      </div>
    </footer>
  );
}
