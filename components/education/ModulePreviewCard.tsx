"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  CheckCircle,
  Play,
  Target,
  Badge,
  Bookmark,
  Share2,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ModulePreviewData, Difficulty } from "@/lib/types/module.types";

interface ModulePreviewCardProps {
  module: ModulePreviewData;
  onBookmark?: (moduleId: string) => void;
  onShare?: (moduleId: string) => void;
  isBookmarked?: boolean;
  expandable?: boolean;
  showProgress?: boolean;
}

export function ModulePreviewCard({
  module,
  onBookmark,
  onShare,
  isBookmarked = false,
  expandable = true,
  showProgress = true,
}: ModulePreviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors: Record<Difficulty, string> = {
    Beginner: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Advanced: "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  const difficultyBorderColors: Record<Difficulty, string> = {
    Beginner: "border-blue-200 dark:border-blue-800",
    Intermediate: "border-amber-200 dark:border-amber-800",
    Advanced: "border-red-200 dark:border-red-800",
  };

  const progressPercentage = module.userProgress?.progressPercentage ?? 0;
  const isStarted = module.userProgress?.started ?? false;

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const expandVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "bg-white dark:bg-gray-900 border transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-blue-900/20 overflow-hidden",
          difficultyBorderColors[module.difficulty],
          isExpanded && "ring-2 ring-blue-400 dark:ring-blue-500"
        )}
      >
        {/* Card Header with Thumbnail */}
        <div className="relative h-40 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          <Image
            src={module.thumbnail}
            alt={module.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badge Overlay */}
          {(module.isNew || module.isBestseller || module.isTrending) && (
            <div className="absolute top-3 right-3 flex gap-2">
              {module.isNew && (
                <Badge className="bg-green-500 text-white">New</Badge>
              )}
              {module.isBestseller && (
                <Badge className="bg-purple-500 text-white">Bestseller</Badge>
              )}
              {module.isTrending && (
                <Badge className="bg-red-500 text-white flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Trending
                </Badge>
              )}
            </div>
          )}

          {/* Progress Indicator */}
          {showProgress && isStarted && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-2">
              <div className="flex items-center justify-between text-xs text-white">
                <span>Progress</span>
                <span className="font-semibold">{progressPercentage}%</span>
              </div>
              <div className="h-1 bg-white/20 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <CardHeader className="pb-3">
          {/* Difficulty and Quick Info */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-2.5 py-1 text-xs font-semibold rounded-full",
                    difficultyColors[module.difficulty]
                  )}
                >
                  {module.difficulty}
                </span>
                {isStarted && (
                  <div className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    Started
                  </div>
                )}
              </div>

              {/* Title and Quick Meta */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                  {module.title}
                </h3>
              </div>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 pt-1">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>{module.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span>{module.lessonCount} lessons</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onBookmark?.(module.id);
                }}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isBookmarked
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
                title="Bookmark"
              >
                <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onShare?.(module.id);
                }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
            {module.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Instructors and Ratings */}
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {module.instructors.slice(0, 3).map((instructor, idx) => (
                  <div
                    key={`${instructor.id}-${idx}`}
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold text-white ring-2 ring-white dark:ring-gray-900",
                      instructor.color
                    )}
                    title={instructor.name}
                  >
                    {instructor.initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs">
                  {module.enrolledCount > 1000
                    ? `${(module.enrolledCount / 1000).toFixed(1)}K`
                    : module.enrolledCount}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400">
              <Award className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {module.averageRating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({module.reviewCount})
              </span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          {expandable && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <span>
                {isExpanded ? "Hide Details" : "View Details"}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>
          )}
        </CardContent>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 space-y-4">
                {/* Learning Objectives */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1">
                    {module.learningObjectives.slice(0, 3).map((obj) => (
                      <li
                        key={obj.id}
                        className="text-xs text-gray-700 dark:text-gray-300 flex gap-2"
                      >
                        <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
                        <span>{obj.title}</span>
                      </li>
                    ))}
                    {module.learningObjectives.length > 3 && (
                      <li className="text-xs text-gray-500 dark:text-gray-400 italic pt-1">
                        +{module.learningObjectives.length - 3} more objectives
                      </li>
                    )}
                  </ul>
                </div>

                {/* Key Topics */}
                {module.keyTopics.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                      Key Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {module.keyTopics.slice(0, 5).map((topic, idx) => (
                        <Badge
                          key={idx}
                        //   variant="secondary"
                          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {module.keyTopics.length > 5 && (
                        <Badge
                        //   variant="secondary"
                          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        >
                          +{module.keyTopics.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                {module.prerequisites.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                      Prerequisites
                    </h4>
                    <ul className="space-y-1">
                      {module.prerequisites.map((prereq) => (
                        <li
                          key={prereq.id}
                          className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2"
                        >
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                              prereq.completed
                                ? "bg-green-500 border-green-500"
                                : "border-gray-400 dark:border-gray-500"
                            )}
                          >
                            {prereq.completed && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span>{prereq.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* First Lesson Preview */}
                {module.firstLessonPreview && (
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      First Lesson Preview
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {module.firstLessonPreview.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{module.firstLessonPreview.duration}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/modules/${module.slug}`} className="flex-1">
                    <button className="w-full py-2 px-3 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                      {isStarted ? "Continue" : "Start Module"}
                    </button>
                  </Link>
                  <button className="flex-1 py-2 px-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
