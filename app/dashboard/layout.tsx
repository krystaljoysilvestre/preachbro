"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/components/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#0d0d0f] text-white"
          : "bg-linear-to-b from-[#e8ebef] via-[#dde1e6] to-[#d4d8dd] text-gray-800"
      }`}
    >
      {/* === Background Layers === */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-[radial-gradient(circle_at_top_right,rgba(26,26,31,0.6)_0%,#0d0d0f_50%,black_100%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(180,200,230,0.25)_0%,transparent_70%)]"
          }`}
        ></div>

        {/* Glowing blob */}
        <motion.div
          className={`absolute top-[-10%] right-[10%] w-[500px] h-[500px] blur-[140px] rounded-full ${
            theme === "dark" ? "bg-blue-500/10" : "bg-blue-400/15"
          }`}
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <DashboardHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 pt-24">{children}</div>
    </div>
  );
}
