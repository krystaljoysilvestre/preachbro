"use client";

import { ParsedMessageBubble } from "@/components/ParsedMessageBubble";

interface MessageBubbleProps {
  msg: {
    role: string;
    content: string;
  };
  theme: "light" | "dark";
}

export default function MessageBubble({ msg, theme }: MessageBubbleProps) {
  const introText = msg.content.includes("-----")
    ? msg.content.split("-----")[0]?.trim()
    : msg.content;
  const generatedOutput = msg.content.includes("-----")
    ? msg.content.split("-----")[1]?.trim()
    : "";

  // User bubble
  if (msg.role === "user") {
    return (
      <div className="max-w-[80%] px-5 py-3.5 rounded-2xl text-sm shadow-lg bg-blue-500 text-white">
        <div className="whitespace-pre-wrap leading-relaxed font-medium">
          {msg.content}
        </div>
      </div>
    );
  }

  // Assistant bubble(s)
  return (
    <div className="flex flex-col gap-3 max-w-[85%]">
      {/* Assistant intro */}
      {introText && (
        <div
          className={`px-5 py-3.5 rounded-2xl text-sm shadow-md backdrop-blur-xl border whitespace-pre-wrap leading-relaxed ${
            theme === "dark"
              ? "bg-[rgba(20,20,25,0.8)] border-white/10 text-gray-200"
              : "bg-white/95 border-gray-200/60 text-gray-800"
          }`}
        >
          {introText}
        </div>
      )}

      {/* Render outline if present */}
      {generatedOutput && <ParsedMessageBubble content={generatedOutput} />}
    </div>
  );
}
