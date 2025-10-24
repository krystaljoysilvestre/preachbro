"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Sun,
  Moon,
  User,
  MessageSquarePlus,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  onNewChat?: () => void;
}

export default function DashboardHeader({
  onToggleSidebar,
  onNewChat,
}: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    } else {
      // Dispatch custom event for pages to listen to
      window.dispatchEvent(new CustomEvent("newChat"));
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="relative z-30 w-full max-w-6xl mx-auto flex justify-between items-center py-4 px-6 my-6 backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-white/10 rounded-full shadow-lg">
      {/* Left side - Menu and Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 group relative"
          aria-label="Toggle sidebar"
          title="Menu"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>

        <button
          onClick={handleNewChat}
          className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 group relative"
          aria-label="New chat"
          title="New Chat"
        >
          <MessageSquarePlus className="w-5 h-5" />
        </button>
      </div>

      {/* Right side - Theme toggle and Profile */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 group relative"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Light Mode" : "Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-500" />
          )}
        </button>

        {/* Profile Avatar with Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group relative"
            aria-label="Profile"
            title="Profile"
          >
            <User className="w-5 h-5 text-white" />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border overflow-hidden ${
                  theme === "dark"
                    ? "bg-[rgba(20,20,25,0.95)] border-white/10 backdrop-blur-xl"
                    : "bg-white/95 border-gray-200/60 backdrop-blur-xl"
                }`}
              >
                {/* Menu Items */}
                <div className="py-2">
                  <MenuItem
                    icon={<Settings className="w-4 h-4" />}
                    label="Settings"
                    disabled
                    theme={theme}
                  />
                  <MenuItem
                    icon={<CreditCard className="w-4 h-4" />}
                    label="Subscription"
                    disabled
                    theme={theme}
                  />
                  <div
                    className={`my-2 h-px ${
                      theme === "dark" ? "bg-white/10" : "bg-gray-200"
                    }`}
                  />
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    <MenuItem
                      icon={<LogOut className="w-4 h-4" />}
                      label="Log Out"
                      disabled={false}
                      theme={theme}
                    />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

// --------------------------------------
// 📋 MenuItem Component
// --------------------------------------
function MenuItem({
  icon,
  label,
  disabled = false,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  theme: "light" | "dark";
}) {
  return (
    <button
      disabled={disabled}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : theme === "dark"
            ? "hover:bg-white/5 text-gray-200"
            : "hover:bg-gray-100 text-gray-800"
        }
      `}
    >
      <span className={disabled ? "" : ""}>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
