"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("preachbro_user");
    if (!savedUser) {
      setStatus("error");
      setMessage("No account found. Please register first.");
      return;
    }

    const parsed = JSON.parse(savedUser);
    if (parsed.email === form.email && parsed.password === form.password) {
      router.push("/dashboard");
    } else {
      setStatus("error");
      setMessage("Invalid credentials. Try again.");
    }
  };

  const handleSocialSignIn = (provider: "google" | "facebook") => {
    const mockUser = {
      name: provider === "google" ? "Google User" : "Facebook User",
      email: provider === "google" ? "user@gmail.com" : "user@facebook.com",
      provider,
    };
    localStorage.setItem("preachbro_user", JSON.stringify(mockUser));
    router.push("/dashboard");
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d0d0f] via-[#0b0b0d] to-[#09090b] text-gray-100 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]"
      />
      <div className="absolute inset-0 opacity-[0.05] [background-image:url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[90%] max-w-[420px] p-10 rounded-[32px] backdrop-blur-2xl bg-[rgba(20,20,25,0.7)] border border-white/10 shadow-[0_8px_50px_rgba(0,0,0,0.4)]"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-400 text-sm">
            Continue your journey with{" "}
            <span className="text-blue-400 font-medium">PreachBro</span>.
          </p>
        </div>

        {/* Social buttons */}
        <div className="space-y-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialSignIn("google")}
            className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-white text-gray-800 font-medium text-sm shadow-md hover:shadow-blue-400/20 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialSignIn("facebook")}
            className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] text-white font-medium text-sm shadow-md hover:shadow-blue-500/30 transition"
          >
            <Facebook className="w-5 h-5" />
            Continue with Facebook
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 block">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm text-center">{message}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold text-sm shadow-lg hover:shadow-blue-500/20 transition"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </motion.button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Register
            </a>
          </p>
        </form>
      </motion.div>
    </section>
  );
}
