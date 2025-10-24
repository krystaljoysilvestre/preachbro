"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Layers, PlayCircle } from "lucide-react";

export default function PreviewSection() {
  const highlights = [
    {
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      text: "AI-driven scripture insights",
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      text: "Organized sermon structure",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      text: "Creative inspiration and refinement",
    },
  ];

  return (
    <section
      id="preview"
      className="relative flex flex-col items-center justify-center py-40 bg-gradient-to-b from-[#f8f9fb] via-[#f2f4f7] to-[#e9ecf1] text-gray-800 overflow-hidden"
    >
      {/* === Background effects - simplified === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,220,255,0.7)_0%,_transparent_75%)]" />

      {/* === Heading === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-24 max-w-[700px] px-6"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
          Experience It in Motion
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          A living workspace where your sermons take shape — powered by
          intelligent guidance and creativity.
        </p>
      </motion.div>

      {/* === Main Glass Preview - reduced animations === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-[90%] max-w-[1000px] aspect-video rounded-[36px] overflow-hidden backdrop-blur-2xl bg-[rgba(255,255,255,0.5)] border border-white/40 shadow-[0_12px_60px_rgba(0,0,0,0.1)]"
      >
        {/* inner lighting gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/50 to-white/20" />

        {/* content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 blur-xl bg-blue-300/30 rounded-full" />
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/50 shadow-lg">
              <PlayCircle className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Watch PreachBro in Action
          </h3>
          <p className="text-gray-600 text-sm max-w-[360px] leading-relaxed">
            Discover how AI and thoughtful design simplify sermon preparation
            from research to delivery.
          </p>
        </div>
      </motion.div>

      {/* === Feature Highlights (floating bottom) === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 flex flex-wrap justify-center gap-8 text-sm text-gray-700"
      >
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-5 py-3 rounded-full backdrop-blur-lg bg-white/50 border border-white/40 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {h.icon}
            <span>{h.text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
