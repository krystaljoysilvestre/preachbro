"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, BookOpen, PenLine, Sparkles } from "lucide-react";
import MessageBubble from "@/components/MessageBubble";
import ChatInput from "@/components/ChatInput";
import QuickPrompts from "@/components/QuickPrompts";
import { useTheme } from "@/components/ThemeProvider";

export default function DashboardPage() {
  const { theme } = useTheme();
  const [pendingMode, setPendingMode] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // Dynamic placeholders based on mode
  const getPlaceholder = () => {
    switch (pendingMode) {
      case "outline":
        return "Share your scripture or topic... (e.g., 'Romans 8:28-39 about God's love')";
      case "illustration":
        return "What point would you like to illustrate? (e.g., 'Finding hope in difficult times')";
      case "application":
        return "What truth do you want people to apply? (e.g., 'Trusting God in uncertainty')";
      case "introduction":
        return "What's your sermon about? (e.g., 'The power of forgiveness in relationships')";
      default:
        return "Tell me about your message... (e.g., 'I'm preaching on faith from Hebrews 11')";
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for new chat event from header
  useEffect(() => {
    const handleNewChat = () => {
      setMessages([]);
      setQuery("");
      setPendingMode(null);
      setLoading(false);
    };

    window.addEventListener("newChat", handleNewChat);
    return () => window.removeEventListener("newChat", handleNewChat);
  }, []);

  const sendAssistantRequest = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setQuery("");
    setLoading(true);

    // show typing placeholder
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "typing-placeholder" },
    ]);

    try {
      const cleanedHistory = [...messages, { role: "user", content: trimmed }]
        .filter((m) => m.content !== "typing-placeholder")
        .slice(-6);

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: cleanedHistory,
          mode: pendingMode || "general",
        }),
      });

      const data = await res.json();
      const reply =
        data.reply ||
        "Hmm, I’m not quite sure I understood that. Could you tell me a bit more?";

      // remove typing bubble and insert actual reply
      setMessages((prev) => {
        const updated = [...prev];
        const i = updated.findIndex((m) => m.content === "typing-placeholder");
        if (i !== -1) updated.splice(i, 1);
        return [...updated, { role: "assistant", content: reply }];
      });

      setPendingMode(null);
    } catch (err) {
      console.error("Assistant request failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Looks like our connection dropped for a moment — could you try again?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div
        className={`relative max-w-3xl mx-auto px-6 md:px-0 flex flex-col gap-8 ${
          messages.length > 0 ? "pb-32" : ""
        }`}
      >
        {/* Greetings - Hidden when there are messages */}
        {messages.length === 0 && (
          <div className="text-center pt-[5%]">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Hi Pastor,
            </h1>
            <p className="mt-2 text-xl md:text-2xl opacity-80">
              What message are you preparing?
            </p>
          </div>
        )}

        {/* Chat area */}
        {messages.length > 0 && (
          <main className="relative z-10 flex-1 pt-24 pb-32 overflow-y-auto">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.content === "typing-placeholder" ? (
                    // animated typing with gradient icons
                    <div
                      className={`px-5 py-3.5 rounded-2xl shadow-lg text-sm flex items-center gap-3 backdrop-blur-xl ${
                        theme === "dark"
                          ? "bg-[rgba(20,20,25,0.8)] border-white/10"
                          : "bg-white/95 border-gray-200/60"
                      } border`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Reading Icon */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent"
                        >
                          <BookOpen
                            className="w-4 h-4 stroke-current"
                            style={{
                              stroke: "url(#gradient1)",
                            }}
                          />
                        </motion.div>

                        {/* Writing Icon */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                          className="bg-gradient-to-br from-purple-500 to-pink-400 bg-clip-text text-transparent"
                        >
                          <PenLine
                            className="w-4 h-4 stroke-current"
                            style={{
                              stroke: "url(#gradient2)",
                            }}
                          />
                        </motion.div>

                        {/* Sparkles Icon */}
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6,
                          }}
                          className="bg-gradient-to-br from-amber-500 to-orange-400 bg-clip-text text-transparent"
                        >
                          <Sparkles
                            className="w-4 h-4 stroke-current"
                            style={{
                              stroke: "url(#gradient3)",
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* SVG Gradients Definition */}
                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <linearGradient
                            id="gradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#22d3ee" />
                          </linearGradient>
                          <linearGradient
                            id="gradient2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#f472b6" />
                          </linearGradient>
                          <linearGradient
                            id="gradient3"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#fb923c" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <span
                        className={`text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Crafting your sermon...
                      </span>
                    </div>
                  ) : (
                    <MessageBubble msg={msg} theme={theme} />
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>
          </main>
        )}

        {/* Chat input - Fixed at bottom when there are messages */}
        {messages.length === 0 && (
          <div className="mt-8">
            <ChatInput
              value={query}
              onChange={setQuery}
              onSubmit={(value) => {
                sendAssistantRequest(value);
              }}
              loading={loading}
              placeholder={getPlaceholder()}
            />
          </div>
        )}

        {/* Quick Prompts - Hidden when there are messages or input has value */}
        {messages.length === 0 && !query.trim() && (
          <QuickPrompts
            onPromptClick={(mode, message) => {
              setPendingMode(mode);
              setMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content: message,
                },
              ]);
            }}
            loading={loading}
          />
        )}
      </div>

      {/* Fixed Chat Input - Shown when there are messages */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <div
            className={`backdrop-blur-2xl border-t ${
              theme === "dark"
                ? "bg-[rgba(20,20,25,0.85)] border-white/10"
                : "bg-white/90 border-gray-200/60"
            }`}
          >
            <div className="max-w-3xl mx-auto px-6 py-4">
              <ChatInput
                value={query}
                onChange={setQuery}
                onSubmit={(value) => {
                  sendAssistantRequest(value);
                }}
                loading={loading}
                placeholder={getPlaceholder()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
