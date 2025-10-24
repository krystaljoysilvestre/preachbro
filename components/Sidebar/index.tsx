"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  BookOpen,
  Upload,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface FancySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: FancySidebarProps) {
  const { theme } = useTheme();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`
              fixed top-24 left-6 bottom-6 z-50 
              w-[280px] rounded-3xl 
              ${theme === "dark" ? "bg-[rgba(14,13,15,0.95)]" : "bg-white/95"}
              border ${
                theme === "dark" ? "border-white/10" : "border-gray-200/60"
              }
              shadow-[0_20px_80px_rgba(0,0,0,0.4)]
              backdrop-blur-3xl 
              overflow-hidden 
              flex flex-col justify-between
            `}
          >
            {/* === Top Section === */}
            <div className="p-6">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold tracking-tight bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full ${
                    theme === "dark"
                      ? "hover:bg-white/10"
                      : "hover:bg-gray-200/60"
                  } transition-all duration-300`}
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <SidebarItem
                  icon={<MessageSquare className="w-5 h-5" />}
                  label="AI Assistant"
                  active
                  theme={theme}
                  disabled={false}
                />
                <SidebarItem
                  icon={<BookOpen className="w-5 h-5" />}
                  label="Library"
                  theme={theme}
                  disabled={true}
                />
                <SidebarItem
                  icon={<Upload className="w-5 h-5" />}
                  label="Upload Notes"
                  theme={theme}
                  disabled={true}
                />
                <SidebarItem
                  icon={<HelpCircle className="w-5 h-5" />}
                  label="Help & FAQ"
                  theme={theme}
                  disabled={true}
                />
              </nav>

              {/* Chat History */}
              <div className="mt-8">
                <h3
                  className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    theme === "dark" ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Recent Chats
                </h3>
                <div className="space-y-2">
                  <ChatHistoryItem
                    title="Sermon on Faith"
                    time="2 hours ago"
                    theme={theme}
                  />
                  <ChatHistoryItem
                    title="Love & Forgiveness"
                    time="Yesterday"
                    theme={theme}
                  />
                  <ChatHistoryItem
                    title="Hope in Hard Times"
                    time="3 days ago"
                    theme={theme}
                  />
                </div>
              </div>
            </div>

            {/* === Bottom Section === */}
            <div
              className={`p-6 border-t ${
                theme === "dark" ? "border-white/10" : "border-gray-200/60"
              }`}
            >
              <Link
                href="/"
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition-all duration-300`}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

// --------------------------------------
// 🎨 SidebarItem Component
// --------------------------------------
function SidebarItem({
  icon,
  label,
  active = false,
  theme,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  theme: "light" | "dark";
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
        transition-all duration-300
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : active
            ? theme === "dark"
              ? "bg-linear-to-r from-blue-500/20 to-cyan-400/20 text-white border border-white/10 shadow-inner"
              : "bg-linear-to-r from-blue-500/15 to-cyan-400/15 text-gray-900 border border-blue-200 shadow-inner"
            : theme === "dark"
            ? "hover:bg-white/10 text-gray-300 border border-transparent"
            : "hover:bg-gray-200/60 text-gray-700 border border-transparent"
        }
      `}
    >
      <span className={active && !disabled ? "text-cyan-400" : ""}>{icon}</span>
      <span className="tracking-wide">{label}</span>
    </motion.button>
  );
}

// --------------------------------------
// 💬 ChatHistoryItem Component
// --------------------------------------
function ChatHistoryItem({
  title,
  time,
  theme,
}: {
  title: string;
  time: string;
  theme: "light" | "dark";
}) {
  return (
    <button
      className={`
        w-full text-left px-3 py-2 rounded-lg text-xs
        transition-all duration-300
        ${
          theme === "dark"
            ? "hover:bg-white/5 text-gray-400 hover:text-gray-200"
            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
        }
      `}
    >
      <div className="font-medium truncate">{title}</div>
      <div
        className={`text-[10px] mt-0.5 ${
          theme === "dark" ? "text-gray-600" : "text-gray-500"
        }`}
      >
        {time}
      </div>
    </button>
  );
}
