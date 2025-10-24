"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for individuals exploring AI sermon creation.",
      features: [
        "3 AI-assisted sermons per month",
        "Basic scripture insights",
        "Outline generator access",
        "Email support",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "$15/mo",
      desc: "For pastors and ministry leaders who preach regularly.",
      features: [
        "Unlimited AI sermon generations",
        "Advanced research & context tools",
        "Custom templates & tone control",
        "Priority email support",
      ],
      highlight: true,
    },
    {
      name: "Team",
      price: "$35/mo",
      desc: "Ideal for churches and collaborative sermon planning.",
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Shared libraries & sermon notes",
        "Dedicated account manager",
      ],
      highlight: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative flex flex-col items-center justify-center py-36 bg-gradient-to-b from-[#f9fafb] via-[#f3f4f6] to-[#eef0f2] text-gray-800 overflow-hidden"
    >
      {/* === Background effects - simplified === */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(210,230,255,0.6)_0%,_transparent_70%)] pointer-events-none" />

      {/* === Header === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
          Pricing Made Simple
        </h2>
        <p className="text-lg text-gray-600 max-w-[600px] mx-auto leading-relaxed">
          Start free. Upgrade when you’re ready to supercharge your sermon
          preparation.
        </p>
      </motion.div>

      {/* === Pricing Cards - simplified animations === */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1200px] w-full px-10">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-4xl backdrop-blur-2xl bg-[rgba(255,255,255,0.65)] border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden p-10 flex flex-col justify-between hover:shadow-[0_10px_50px_rgba(59,130,246,0.15)] transition-shadow duration-300 ${
              plan.highlight
                ? "border-blue-400/50 shadow-[0_8px_60px_rgba(59,130,246,0.15)]"
                : ""
            }`}
          >
            {/* Highlight glow for featured plan */}
            {plan.highlight && (
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100/40 via-transparent to-transparent pointer-events-none" />
            )}

            {/* Header */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-2 text-gray-500 text-sm">{plan.desc}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.price !== "Free" && (
                  <span className="text-gray-500 text-sm"> /month</span>
                )}
              </div>
            </div>

            {/* Features */}
            <ul className="mt-8 space-y-3">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-[2px]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Button
                className={`w-full py-6 text-base font-medium rounded-2xl transition ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    : "bg-white/70 hover:bg-white text-gray-800 border border-white/60"
                }`}
              >
                {plan.highlight ? "Get Started" : "Choose Plan"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
