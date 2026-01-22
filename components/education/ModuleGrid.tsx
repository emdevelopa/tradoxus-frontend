"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, X, Loader } from "lucide-react";
import { ModulePreviewCard } from "@/components/education/ModulePreviewCard";
import { ExpandedPreview } from "@/components/education/ExpandedPreview";
import {
  ModulePreviewData,
  ModuleFilterState,
  ModuleSortState,
  Difficulty,
} from "@/lib/types/module.types";
import {
  filterAndSortModules,
  getUniqueTopics,
  formatDuration,
  getTimeStatistics,
} from "@/lib/services/module-filter.service";
import { cn } from "@/lib/utils";

interface ModuleGridProps {
  modules: ModulePreviewData[];
  loading?: boolean;
  error?: string | null;
  onModuleClick?: (moduleId: string) => void;
}

const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

export function ModuleGrid({
  modules,
  loading = false,
  error = null,
  onModuleClick,
}: ModuleGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedModule, setSelectedModule] =
    useState<ModulePreviewData | null>(null);
  const [expandedModule, setExpandedModule] =
    useState<ModulePreviewData | null>(null);
  const [bookmarkedModules, setBookmarkedModules] = useState<Set<string>>(
    new Set(),
  );

  const [filters, setFilters] = useState<ModuleFilterState>({
    difficulty: "all",
    topics: "all",
    timeCommitment: "all",
    status: "all",
    searchQuery: "",
  });

  const [sortState, setSortState] = useState<ModuleSortState>({
    sortBy: "popularity",
    ascending: false,
  });

  // Get available topics
  const availableTopics = useMemo(() => {
    return getUniqueTopics(modules);
  }, [modules]);

  // Filter and sort modules
  const filteredModules = useMemo(() => {
    const filterState: ModuleFilterState = {
      ...filters,
      searchQuery: searchQuery || filters.searchQuery,
    };
    return filterAndSortModules(modules, filterState, sortState);
  }, [modules, filters, sortState, searchQuery]);

  // Time statistics
  const timeStats = useMemo(() => {
    return getTimeStatistics(filteredModules);
  }, [filteredModules]);

  const handleBookmark = (moduleId: string) => {
    const newBookmarked = new Set(bookmarkedModules);
    if (newBookmarked.has(moduleId)) {
      newBookmarked.delete(moduleId);
    } else {
      newBookmarked.add(moduleId);
    }
    setBookmarkedModules(newBookmarked);
  };

  const handleShare = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (module && navigator.share) {
      navigator.share({
        title: module.title,
        text: module.description,
        url: `/modules/${module.slug}`,
      });
    }
  };

  const handleFilterChange = (key: keyof ModuleFilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      difficulty: "all",
      topics: "all",
      timeCommitment: "all",
      status: "all",
      searchQuery: "",
    });
    setSearchQuery("");
  };

  const hasActiveFilters =
    searchQuery ||
    filters.difficulty !== "all" ||
    filters.topics !== "all" ||
    filters.timeCommitment !== "all" ||
    filters.status !== "all";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <Loader className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Loading modules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
          Error Loading Modules
        </h3>
        <p className="text-red-800 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 dark:text-gray-600" />
          <input
            type="text"
            placeholder="Search modules by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
              showFilters
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
            )}
          >
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-bold">
                {searchQuery
                  ? 1
                  : 0 +
                    (filters.difficulty !== "all" ? 1 : 0) +
                    (filters.topics !== "all" ? 1 : 0) +
                    (filters.timeCommitment !== "all" ? 1 : 0) +
                    (filters.status !== "all" ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="font-medium">
                Sort by{" "}
                {sortState.sortBy === "popularity"
                  ? "Popularity"
                  : sortState.sortBy === "difficulty"
                    ? "Difficulty"
                    : sortState.sortBy === "newest"
                      ? "Newest"
                      : "Rating"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-0 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              {[
                { value: "popularity", label: "Popularity" },
                { value: "difficulty", label: "Difficulty (High to Low)" },
                { value: "difficulty-asc", label: "Difficulty (Low to High)" },
                { value: "newest", label: "Newest First" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortState({
                      ...sortState,
                      sortBy: option.value as any,
                    });
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg",
                    sortState.sortBy === option.value
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Clear all filters
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Difficulty Level
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      checked={filters.difficulty === "all"}
                      onChange={() => handleFilterChange("difficulty", "all")}
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      All Levels
                    </span>
                  </label>
                  {DIFFICULTIES.map((diff) => (
                    <label
                      key={diff}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(filters.difficulty) &&
                          filters.difficulty.includes(diff)
                        }
                        onChange={(e) => {
                          if (!Array.isArray(filters.difficulty)) {
                            handleFilterChange("difficulty", [diff]);
                          } else if (e.target.checked) {
                            handleFilterChange("difficulty", [
                              ...filters.difficulty,
                              diff,
                            ]);
                          } else {
                            handleFilterChange(
                              "difficulty",
                              filters.difficulty.filter((d) => d !== diff),
                            );
                          }
                        }}
                        className="cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {diff}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Commitment Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Time Commitment
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="time"
                      checked={filters.timeCommitment === "all"}
                      onChange={() =>
                        handleFilterChange("timeCommitment", "all")
                      }
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Any
                    </span>
                  </label>
                  {[
                    { value: "short", label: "Short (< 2 hours)" },
                    { value: "medium", label: "Medium (2-5 hours)" },
                    { value: "long", label: "Long (> 5 hours)" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(filters.timeCommitment) &&
                          filters.timeCommitment.includes(option.value as any)
                        }
                        onChange={(e) => {
                          if (!Array.isArray(filters.timeCommitment)) {
                            handleFilterChange("timeCommitment", [
                              option.value,
                            ]);
                          } else if (e.target.checked) {
                            handleFilterChange("timeCommitment", [
                              ...filters.timeCommitment,
                              option.value,
                            ]);
                          } else {
                            handleFilterChange(
                              "timeCommitment",
                              filters.timeCommitment.filter(
                                (t) => t !== option.value,
                              ),
                            );
                          }
                        }}
                        className="cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  My Status
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.status === "all"}
                      onChange={() => handleFilterChange("status", "all")}
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      All
                    </span>
                  </label>
                  {[
                    { value: "not-started", label: "Not Started" },
                    { value: "in-progress", label: "In Progress" },
                    { value: "completed", label: "Completed" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(filters.status) &&
                          filters.status.includes(option.value as any)
                        }
                        onChange={(e) => {
                          if (!Array.isArray(filters.status)) {
                            handleFilterChange("status", [option.value]);
                          } else if (e.target.checked) {
                            handleFilterChange("status", [
                              ...filters.status,
                              option.value,
                            ]);
                          } else {
                            handleFilterChange(
                              "status",
                              filters.status.filter((s) => s !== option.value),
                            );
                          }
                        }}
                        className="cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Topics Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Topics
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="topics"
                      checked={filters.topics === "all"}
                      onChange={() => handleFilterChange("topics", "all")}
                      className="cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      All
                    </span>
                  </label>
                  {availableTopics.slice(0, 8).map((topic) => (
                    <label
                      key={topic}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(filters.topics) &&
                          filters.topics.includes(topic)
                        }
                        onChange={(e) => {
                          if (!Array.isArray(filters.topics)) {
                            handleFilterChange("topics", [topic]);
                          } else if (e.target.checked) {
                            handleFilterChange("topics", [
                              ...filters.topics,
                              topic,
                            ]);
                          } else {
                            handleFilterChange(
                              "topics",
                              filters.topics.filter((t) => t !== topic),
                            );
                          }
                        }}
                        className="cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {topic}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Stats */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {filteredModules.length} modules found
            </span>
            {filteredModules.length > 0 && (
              <>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  •
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ~{formatDuration(timeStats.totalMinutes)} total
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  •
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Avg {formatDuration(timeStats.averageMinutes)} per module
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      {filteredModules.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No modules found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setExpandedModule(module)}
                className="cursor-pointer"
              >
                <ModulePreviewCard
                  module={module}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  isBookmarked={bookmarkedModules.has(module.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Expanded Preview Modal */}
      {expandedModule && (
        <ExpandedPreview
          module={expandedModule}
          isOpen={!!expandedModule}
          onClose={() => setExpandedModule(null)}
          onBookmark={handleBookmark}
          isBookmarked={bookmarkedModules.has(expandedModule.id)}
        />
      )}
    </div>
  );
}
