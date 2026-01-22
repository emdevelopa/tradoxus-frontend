"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, BookOpen, CheckCircle, Users, Award, Play, Target } from "lucide-react";
import { ModulePreviewData } from "@/lib/types/module.types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ExpandedPreviewProps {
  module: ModulePreviewData;
  isOpen: boolean;
  onClose: () => void;
  onStart?: (moduleId: string) => void;
  onBookmark?: (moduleId: string) => void;
  isBookmarked?: boolean;
}

export function ExpandedPreview({
  module,
  isOpen,
  onClose,
  onStart,
  onBookmark,
  isBookmarked = false,
}: ExpandedPreviewProps) {
  const progressPercentage = module.userProgress?.progressPercentage ?? 0;
  const isStarted = module.userProgress?.started ?? false;

  const difficultyColors: Record<string, string> = {
    Beginner: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    Advanced: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-12 lg:inset-20 bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 overflow-auto flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Module Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <div className="max-w-4xl mx-auto space-y-8 p-6">
                {/* Hero Section */}
                <div className="space-y-4">
                  <div className="relative h-64 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                    <Image
                      src={module.thumbnail}
                      alt={module.title}
                      fill
                      className="object-cover"
                    />
                    {module.firstLessonPreview?.videoUrl && (
                      <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
                        <div className="p-4 bg-white/90 group-hover:bg-white rounded-full transition-colors">
                          <Play className="h-8 w-8 text-blue-600" fill="currentColor" />
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-3 py-1 text-sm font-semibold rounded-full border",
                          difficultyColors[module.difficulty]
                        )}
                      >
                        {module.difficulty}
                      </span>
                      {isStarted && (
                        <div className="flex items-center gap-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
                          <CheckCircle className="h-4 w-4" />
                          In Progress
                        </div>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {module.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {module.description}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {module.estimatedTime}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {module.lessonCount}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Lessons</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-amber-500">
                          {module.averageRating.toFixed(1)}
                        </span>
                        <Award className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {module.reviewCount} reviews
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {module.completionRate.toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Completion Rate
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {isStarted && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Your Progress
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="h-3 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-600 dark:bg-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {module.userProgress?.completedLessons || 0} of{" "}
                      {module.userProgress?.totalLessons || module.lessonCount} lessons completed
                    </div>
                  </div>
                )}

                {/* Learning Objectives */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    What You'll Learn
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {module.learningObjectives.map((obj) => (
                      <div
                        key={obj.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {obj.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {obj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                {module.prerequisites.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Prerequisites
                    </h2>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                      <ul className="space-y-2">
                        {module.prerequisites.map((prereq) => (
                          <li
                            key={prereq.id}
                            className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                          >
                            <div
                              className={cn(
                                "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0",
                                prereq.completed
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                              )}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </div>
                            <span className={prereq.completed ? "line-through opacity-60" : ""}>
                              {prereq.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Instructors */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Instructors
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {module.instructors.map((instructor) => (
                      <div
                        key={instructor.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4"
                      >
                        <div
                          className={cn(
                            "h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg",
                            instructor.color
                          )}
                        >
                          {instructor.initials}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {instructor.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Topics */}
                {module.keyTopics.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Key Topics Covered
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {module.keyTopics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm font-medium"
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* First Lesson Preview */}
                {module.firstLessonPreview && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        First Lesson Preview
                      </h3>
                    </div>
                    <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
                      {module.firstLessonPreview.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {module.firstLessonPreview.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{module.firstLessonPreview.duration}</span>
                    </div>
                  </div>
                )}

                {/* Engagement Stats */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Community
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {module.enrolledCount > 1000
                          ? `${(module.enrolledCount / 1000).toFixed(1)}K`
                          : module.enrolledCount}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enrolled Students</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-500">
                        {module.averageRating.toFixed(1)}/5
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {module.completionRate.toFixed(0)}%
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-6 flex gap-3">
              <Link href={`/modules/${module.slug}`} className="flex-1">
                <button className="w-full py-3 px-6 bg-blue-600 dark:bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  {isStarted ? "Continue Learning" : "Start Module"}
                </button>
              </Link>
              <button
                onClick={() => onBookmark?.(module.id)}
                className={cn(
                  "py-3 px-6 rounded-lg font-semibold transition-colors",
                  isBookmarked
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                )}
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
