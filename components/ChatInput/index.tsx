"use client";

import { Send, Loader2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  loading = false,
  placeholder = "Ask anything... (e.g. 'Help me start my sermon on faith')",
}: ChatInputProps) {
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      {/* Input Container */}
      <div className="relative">
        {/* Glow gradient */}
        <div
          className={`absolute -inset-0.5 rounded-2xl blur-lg opacity-10 ${
            theme === "dark"
              ? "bg-linear-to-r from-blue-500 via-cyan-400 to-violet-500"
              : "bg-linear-to-r from-blue-400 via-cyan-300 to-violet-400"
          }`}
        />

        <div
          className={`relative flex gap-3 p-3 rounded-2xl backdrop-blur-3xl border shadow-2xl ${
            theme === "dark"
              ? "bg-[rgba(20,20,25,0.95)] border-white/10"
              : "bg-white/95 border-gray-200/60"
          }`}
        >
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={loading}
            autoFocus
            className={`flex-1 outline-none px-4 py-3 rounded-xl text-sm bg-transparent disabled:opacity-60 transition-all ${
              theme === "dark"
                ? "text-white placeholder:text-gray-400"
                : "text-gray-800 placeholder:text-gray-500"
            }`}
          />
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
