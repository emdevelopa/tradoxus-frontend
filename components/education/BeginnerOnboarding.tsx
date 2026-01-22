"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  Lightbulb,
  Target,
  Code,
  Shield,
  BookOpen,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ModulePreviewData,
  BeginnersPath,
  QuickStartOption,
} from "@/lib/types/module.types";

interface OnboardingProps {
  beginnerModules: ModulePreviewData[];
  quickStartOptions?: QuickStartOption[];
  recommendedPath?: BeginnersPath;
  onSkip?: () => void;
  userLevel?: "new" | "beginner" | "intermediate";
}

const DEFAULT_QUICK_START_OPTIONS: QuickStartOption[] = [
  {
    id: "trading-fundamentals",
    title: "Trading Fundamentals",
    description: "Start with the absolute basics of trading",
    icon: "📊",
    recommendedModules: [
      "technical-analysis-fundamentals",
      "risk-management-for-traders",
    ],
    estimatedDuration: "4-6 hours",
    targetGoal: "Understand core trading concepts",
  },
  {
    id: "crypto-trading",
    title: "Crypto Trading",
    description: "Learn to trade cryptocurrencies with confidence",
    icon: "⚡",
    recommendedModules: [
      "defi-yield-strategies",
      "advanced-technical-analysis-crypto",
    ],
    estimatedDuration: "8-10 hours",
    targetGoal: "Master crypto trading strategies",
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "Protect your capital with proper risk strategies",
    icon: "🛡️",
    recommendedModules: ["risk-management-for-traders"],
    estimatedDuration: "2-3 hours",
    targetGoal: "Learn risk management techniques",
  },
  {
    id: "advanced-strategy",
    title: "Advanced Strategies",
    description: "Develop sophisticated trading strategies",
    icon: "🎯",
    recommendedModules: [
      "advanced-technical-analysis-crypto",
      "defi-yield-strategies",
    ],
    estimatedDuration: "10-12 hours",
    targetGoal: "Create your trading edge",
  },
];

export function BeginnerOnboarding({
  beginnerModules,
  quickStartOptions = DEFAULT_QUICK_START_OPTIONS,
  recommendedPath,
  onSkip,
  userLevel = "new",
}: OnboardingProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [step, setStep] = useState<
    "welcome" | "goal-selection" | "module-preview"
  >("welcome");

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedPath(pathId);
    setStep("module-preview");
  };

  return (
    <div className="space-y-8 py-8">
      {/* Welcome Step */}
      {step === "welcome" && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6"
        >
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to Tradoxus Learning 🚀
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let's find the perfect learning path for you. Answer a few quick
              questions to get personalized recommendations.
            </p>
          </div>

          {/* Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: BookOpen,
                title: "Structured Learning",
                description: "Organized modules with clear learning objectives",
              },
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from experienced trading professionals",
              },
              {
                icon: Target,
                title: "Goal-Oriented",
                description: "Paths designed for your specific trading goals",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
                >
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <button
              onClick={() => setStep("goal-selection")}
              className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              Start Learning Path
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={onSkip}
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Skip for Now
            </button>
          </div>
        </motion.div>
      )}

      {/* Goal Selection Step */}
      {step === "goal-selection" && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What's Your Trading Goal?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a path that matches your objectives
            </p>
          </div>

          {/* Quick Start Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickStartOptions.map((option, idx) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSelectPath(option.id)}
                className={cn(
                  "p-6 rounded-lg border-2 transition-all text-left hover:shadow-lg active:scale-95",
                  selectedPath === option.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700",
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{option.icon}</span>
                  {selectedPath === option.id && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {option.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{option.estimatedDuration}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 justify-center pt-6">
            <button
              onClick={() => setStep("module-preview")}
              disabled={!selectedPath}
              className={cn(
                "px-8 py-3 font-semibold rounded-lg transition-colors flex items-center gap-2",
                selectedPath
                  ? "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed",
              )}
            >
              Continue
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setStep("welcome")}
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          </div>
        </motion.div>
      )}

      {/* Module Preview Step */}
      {step === "module-preview" && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Recommended Modules
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start with these modules tailored to your goals
            </p>
          </div>

          {/* Module Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {beginnerModules.slice(0, 2).map((module, idx) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900" />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      {module.difficulty}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {module.estimatedTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-800">
                    <Users className="h-3.5 w-3.5" />
                    <span>
                      {module.enrolledCount > 1000
                        ? `${(module.enrolledCount / 1000).toFixed(1)}K`
                        : module.enrolledCount}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 justify-center pt-6">
            <Link href="/modules" className="flex-1">
              <button className="w-full px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                Explore All Modules
                <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
            <button
              onClick={() => setStep("goal-selection")}
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Change Goal
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Helper component for Clock icon
function Clock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
