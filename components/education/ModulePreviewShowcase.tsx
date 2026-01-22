/**
 * Module Preview Cards - Component Showcase
 *
 * This file demonstrates all the module preview card components in action.
 * Use this as a reference or starting point for integrating into your pages.
 *
 * To use: Import specific components and adapt to your needs.
 */

"use client";

import React, { useState } from "react";
import {
  ModulePreviewCard,
  ExpandedPreview,
  ModuleGrid,
  BeginnerOnboarding,
} from "@/components/education";
import {
  mockModulePreviewData,
  mockQuickStartOptions,
  mockBeginnersPath,
} from "@/lib/mockdata/module-preview-mock-data";
import { ModulePreviewData } from "@/lib/types/module.types";

/**
 * Example 1: Single Module Preview Card
 * Shows how to use the basic card component
 */
export function ModuleCardExample() {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const handleBookmark = (moduleId: string) => {
    const newSet = new Set(bookmarked);
    if (newSet.has(moduleId)) {
      newSet.delete(moduleId);
    } else {
      newSet.add(moduleId);
    }
    setBookmarked(newSet);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Single Module Card Example
      </h2>
      <div className="max-w-sm">
        <ModulePreviewCard
          module={mockModulePreviewData[0]}
          onBookmark={handleBookmark}
          onShare={(id) => alert(`Share module: ${id}`)}
          isBookmarked={bookmarked.has(mockModulePreviewData[0].id)}
          expandable={true}
          showProgress={true}
        />
      </div>
    </div>
  );
}

/**
 * Example 2: Multiple Cards in a Grid
 * Shows how to display multiple module cards
 */
export function MultipleCardsExample() {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [selectedModule, setSelectedModule] =
    useState<ModulePreviewData | null>(null);

  const handleBookmark = (moduleId: string) => {
    const newSet = new Set(bookmarked);
    if (newSet.has(moduleId)) {
      newSet.delete(moduleId);
    } else {
      newSet.add(moduleId);
    }
    setBookmarked(newSet);
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Multiple Modules Grid
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockModulePreviewData.map((module) => (
          <ModulePreviewCard
            key={module.id}
            module={module}
            onBookmark={handleBookmark}
            onShare={(id) => alert(`Share module: ${id}`)}
            isBookmarked={bookmarked.has(module.id)}
            expandable={true}
            showProgress={true}
          />
        ))}
      </div>

      {/* Expanded Preview Modal */}
      {selectedModule && (
        <ExpandedPreview
          module={selectedModule}
          isOpen={!!selectedModule}
          onClose={() => setSelectedModule(null)}
          onBookmark={handleBookmark}
          isBookmarked={bookmarked.has(selectedModule.id)}
        />
      )}
    </div>
  );
}

/**
 * Example 3: Full Module Grid with Filtering
 * Shows the complete grid with search, filters, and sorting
 */
export function ModuleGridExample() {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Learning Modules
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Browse, filter, and discover learning modules
        </p>

        <ModuleGrid
          modules={mockModulePreviewData}
          loading={false}
          error={null}
          onModuleClick={(moduleId) => console.log("Module clicked:", moduleId)}
        />
      </div>
    </div>
  );
}

/**
 * Example 4: Beginner Onboarding Flow
 * Shows the interactive onboarding experience
 */
export function BeginnerOnboardingExample() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const beginnerModules = mockModulePreviewData.filter(
    (m) => m.difficulty === "Beginner",
  );

  if (showOnboarding) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <BeginnerOnboarding
            beginnerModules={beginnerModules}
            quickStartOptions={mockQuickStartOptions}
            recommendedPath={mockBeginnersPath}
            onSkip={() => setShowOnboarding(false)}
            userLevel="new"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-center">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Onboarding Completed! 🎉
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        You've completed the onboarding flow
      </p>
      <button
        onClick={() => setShowOnboarding(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Restart Onboarding
      </button>
    </div>
  );
}

/**
 * Example 5: Complete Page Implementation
 * Shows how to build a complete modules page
 */
export function CompleteModulesPage() {
  const [view, setView] = useState<"grid" | "featured" | "onboarding">("grid");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Learning Modules
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Master trading with our comprehensive education platform
              </p>
            </div>
            <div className="flex gap-2">
              {["grid", "featured", "onboarding"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    view === v
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {v === "grid" && "Browse"}
                  {v === "featured" && "Featured"}
                  {v === "onboarding" && "Onboard"}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {mockModulePreviewData.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Modules
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {mockModulePreviewData.reduce(
                  (sum, m) => sum + m.lessonCount,
                  0,
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Lessons
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {mockModulePreviewData
                  .reduce((sum, m) => sum + m.enrolledCount, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Student Enrollments
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {view === "grid" && (
          <>
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Explore All Modules
            </h2>
            <ModuleGrid modules={mockModulePreviewData} />
          </>
        )}

        {view === "featured" && (
          <>
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Featured Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockModulePreviewData.map((module) => (
                <ModulePreviewCard key={module.id} module={module} />
              ))}
            </div>
          </>
        )}

        {view === "onboarding" && <BeginnerOnboardingExample />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Tradoxus. All rights reserved. | Start learning today →</p>
        </div>
      </footer>
    </div>
  );
}

/**
 * Showcase Component - Renders all examples
 * Visit this page to see all components in action
 */
export default function ModulePreviewShowcase() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📚 Module Preview Cards Component Showcase - Scroll to explore
          </p>
        </div>
      </nav>

      {/* Section 1: Single Card */}
      <section className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <ModuleCardExample />
      </section>

      {/* Section 2: Multiple Cards */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <MultipleCardsExample />
      </section>

      {/* Section 3: Full Grid */}
      <section className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <ModuleGridExample />
      </section>

      {/* Section 4: Complete Page */}
      <section className="bg-white dark:bg-gray-900">
        <CompleteModulesPage />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>Module Preview Cards Implementation © 2025</p>
          <p className="text-sm mt-2">
            See MODULE_PREVIEW_CARDS_README.md for complete documentation
          </p>
        </div>
      </footer>
    </div>
  );
}
