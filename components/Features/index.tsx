"use client";

import { motion } from "framer-motion";
import { Sparkles, Library, PenTool, Archive } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "AI-Powered Research",
      description:
        "Instantly access relevant scriptures, commentaries, and theological insights with advanced AI algorithms.",
      icon: <Sparkles className="w-5 h-5 text-white" />,
    },
    {
      title: "Sermon Organization",
      description:
        "Keep your sermons, notes, and research beautifully organized in one intelligent workspace.",
      icon: <Library className="w-5 h-5 text-white" />,
    },
    {
      title: "Smart Outlining",
      description:
        "Generate comprehensive sermon outlines with AI assistance while preserving your authentic voice.",
      icon: <PenTool className="w-5 h-5 text-white" />,
    },
    {
      title: "Resource Library",
      description:
        "Access an ever-growing library of sermon illustrations, quotes, and theological references.",
      icon: <Archive className="w-5 h-5 text-white" />,
    },
  ];

  const positions = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
  ];

  return (
    <section
      id="features"
      className="relative flex justify-center items-center py-32 text-gray-800 overflow-hidden"
    >
      {/* === Unified dark background matching Hero Banner === */}
      <div className="absolute inset-0 bg-[#0d0d0f]" />

      {/* === Central radial glow (aligned color tone with Hero Banner) === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,#0d0d0f_55%,black_100%)] pointer-events-none" />

      {/* === Top fade overlay to ensure no visible line between sections === */}
      <div className="absolute top-0 w-full h-48 bg-linear-to-b from-[#0d0d0f] via-transparent to-transparent pointer-events-none" />

      {/* === Subtle texture for realism === */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* Desktop Layout: Simplified with static circles */}
      <div className="hidden lg:flex h-[750px] w-full max-w-[1400px] px-[5%] items-center justify-center relative">
        {/* === Static Circles - removed animations === */}
        <div className="absolute flex items-center justify-center">
          <div className="absolute h-[600px] w-[600px] rounded-full border border-white/10" />
          <div className="absolute h-[500px] w-[500px] rounded-full border border-white/20" />
          <div className="absolute h-[400px] w-[400px] rounded-full border border-white/30 bg-linear-to-b from-white/10 to-transparent backdrop-blur-sm" />
        </div>

        {/* === Center Text === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-20 max-w-[360px] text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Redefining Sermon Preparation
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed font-light">
            Experience the future of ministry with AI-powered tools designed to
            amplify your calling.
          </p>
        </motion.div>

        {/* === Feature Cards - simplified === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div className="w-[900px] h-[500px] relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className={`absolute w-[300px] h-[170px] backdrop-blur-3xl bg-[rgba(20,20,25,0.6)] border border-white/10 rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:border-blue-400/30 transition-all duration-300 p-6 ${positions[index]}`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>

                    {/* Copilot-style gradient icon border */}
                    <div className="relative flex items-center justify-center h-[38px] w-[38px] rounded-full">
                      <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 blur-[3px] animate-pulse" />
                      <div className="relative bg-[rgba(15,15,20,0.9)] backdrop-blur-xl rounded-full h-full w-full flex items-center justify-center border border-white/10 shadow-inner">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mt-2">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout: Stacked Cards (below 1000px) */}
      <div className="lg:hidden w-full px-6 flex flex-col gap-6 relative z-20">
        {/* === Mobile: Title on Top === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Redefining Sermon Preparation
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed font-light">
            Experience the future of ministry with AI-powered tools designed to
            amplify your calling.
          </p>
        </motion.div>

        {/* Cards */}
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="w-full backdrop-blur-3xl bg-[rgba(20,20,25,0.6)] border border-white/10 rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Copilot-style gradient icon border */}
                <div className="relative flex items-center justify-center h-[38px] w-[38px] rounded-full flex-shrink-0">
                  <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 blur-[3px] animate-pulse" />
                  <div className="relative bg-[rgba(15,15,20,0.9)] backdrop-blur-xl rounded-full h-full w-full flex items-center justify-center border border-white/10 shadow-inner">
                    {feature.icon}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
