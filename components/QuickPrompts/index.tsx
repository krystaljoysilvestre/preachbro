"use client";

import { useTheme } from "@/components/ThemeProvider";

interface QuickPromptsProps {
  onPromptClick: (mode: string, message: string) => void;
  loading?: boolean;
}

export default function QuickPrompts({
  onPromptClick,
  loading = false,
}: QuickPromptsProps) {
  const { theme } = useTheme();

  const prompts = [
    {
      id: "outline",
      icon: "✨",
      title: "Build My Sermon Outline",
      description: "Let's organize your thoughts together",
      enabled: true,
      message:
        "I'd love to help you build a sermon outline! What scripture or topic is on your heart?",
      color: theme === "dark" ? "text-cyan-300" : "text-blue-600",
    },
    {
      id: "illustration",
      icon: "💡",
      title: "Find a Great Story",
      description: "Discover illustrations that connect",
      enabled: false,
      message: "",
      color: theme === "dark" ? "text-violet-300" : "text-violet-600",
    },
    {
      id: "application",
      icon: "🎯",
      title: "Make It Practical",
      description: "Help people live out the message",
      enabled: false,
      message: "",
      color: theme === "dark" ? "text-pink-300" : "text-pink-600",
    },
    {
      id: "introduction",
      icon: "📝",
      title: "Craft an Opening Hook",
      description: "Start strong and grab attention",
      enabled: false,
      message: "",
      color: theme === "dark" ? "text-orange-300" : "text-orange-600",
    },
  ];

  return (
    <div className="mt-6">
      <div className="max-w-3xl mx-auto">
        <h3
          className={`text-sm font-medium mb-3 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          How can I help you today?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() =>
                prompt.enabled && onPromptClick(prompt.id, prompt.message)
              }
              disabled={!prompt.enabled || loading}
              className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-xl text-left transition-all ${
                prompt.enabled && !loading
                  ? theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:scale-[1.02]"
                    : "bg-white/90 border-blue-200/60 hover:bg-white hover:border-blue-400 hover:shadow-md hover:scale-[1.02]"
                  : "opacity-50 cursor-not-allowed " +
                    (theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-white/90 border-gray-200/60")
              }`}
            >
              <span className="text-2xl">{prompt.icon}</span>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${prompt.color}`}>
                  {prompt.title}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {prompt.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
