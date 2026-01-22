/**
 * Module Filtering and Sorting Utilities
 * Handles filtering, sorting, and searching of module preview cards
 */

import {
  ModulePreviewData,
  ModuleFilterState,
  ModuleSortState,
  SortOption,
  Difficulty,
} from "@/lib/types/module.types";

/**
 * Filter modules based on the current filter state
 */
export function filterModules(
  modules: ModulePreviewData[],
  filters: ModuleFilterState,
): ModulePreviewData[] {
  return modules.filter((module) => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.keyTopics.some((topic) => topic.toLowerCase().includes(query)) ||
        module.tags.some((tag) => tag.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // Difficulty filter
    if (filters.difficulty !== "all" && Array.isArray(filters.difficulty)) {
      if (!filters.difficulty.includes(module.difficulty)) return false;
    }

    // Topic/Tag filter
    if (filters.topics !== "all" && Array.isArray(filters.topics)) {
      const hasMatchingTopic = filters.topics.some(
        (topic) =>
          module.tags.includes(topic) || module.keyTopics.includes(topic),
      );
      if (!hasMatchingTopic) return false;
    }

    // Time commitment filter
    if (
      filters.timeCommitment !== "all" &&
      Array.isArray(filters.timeCommitment)
    ) {
      const minutes = module.estimatedMinutes;
      const timeInRange = filters.timeCommitment.some((commitment) => {
        if (commitment === "short") return minutes <= 120; // <= 2 hours
        if (commitment === "medium") return minutes > 120 && minutes <= 300; // 2-5 hours
        if (commitment === "long") return minutes > 300; // > 5 hours
        return true;
      });
      if (!timeInRange) return false;
    }

    // Status filter (started/in-progress/completed)
    if (filters.status !== "all" && Array.isArray(filters.status)) {
      const statusMatches = filters.status.some((status) => {
        if (status === "not-started") return !module.userProgress?.started;
        if (status === "in-progress")
          return (
            module.userProgress?.started &&
            module.userProgress.progressPercentage < 100
          );
        if (status === "completed")
          return module.userProgress?.progressPercentage === 100;
        return true;
      });
      if (!statusMatches) return false;
    }

    return true;
  });
}

/**
 * Sort modules based on the current sort state
 */
export function sortModules(
  modules: ModulePreviewData[],
  sortState: ModuleSortState,
): ModulePreviewData[] {
  const sorted = [...modules];

  const compareAsc = (a: number, b: number) => a - b;
  const compareDesc = (a: number, b: number) => b - a;
  const compare = sortState.ascending ? compareAsc : compareDesc;

  switch (sortState.sortBy) {
    case "popularity":
      sorted.sort((a, b) => compare(b.enrolledCount, a.enrolledCount));
      break;

    case "difficulty":
      const difficultyOrder: Record<Difficulty, number> = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
      };
      sorted.sort((a, b) =>
        compare(difficultyOrder[a.difficulty], difficultyOrder[b.difficulty]),
      );
      break;

    case "newest":
      sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return compare(dateB, dateA);
      });
      break;

    case "difficulty-asc":
      const diffOrder: Record<Difficulty, number> = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
      };
      sorted.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
      break;

    default:
      // Default sort by rating
      sorted.sort((a, b) => compare(b.averageRating, a.averageRating));
  }

  return sorted;
}

/**
 * Apply both filtering and sorting to modules
 */
export function filterAndSortModules(
  modules: ModulePreviewData[],
  filters: ModuleFilterState,
  sortState: ModuleSortState,
): ModulePreviewData[] {
  const filtered = filterModules(modules, filters);
  return sortModules(filtered, sortState);
}

/**
 * Get unique topics from all modules
 */
export function getUniqueTopics(modules: ModulePreviewData[]): string[] {
  const topicsSet = new Set<string>();
  modules.forEach((module) => {
    module.keyTopics.forEach((topic) => topicsSet.add(topic));
    module.tags.forEach((tag) => topicsSet.add(tag));
  });
  return Array.from(topicsSet).sort();
}

/**
 * Get modules that are trending (popular + recent + highly rated)
 */
export function getTrendingModules(
  modules: ModulePreviewData[],
  limit = 3,
): ModulePreviewData[] {
  return [...modules]
    .sort((a, b) => {
      // Prioritize: recent (25%), popularity (50%), rating (25%)
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      const dateScore = (bDate - aDate) / 1000000000; // normalize to 0-1 range

      const enrollmentScore =
        (b.enrolledCount - a.enrolledCount) /
        Math.max(b.enrolledCount, a.enrolledCount, 1);
      const ratingScore = b.averageRating - a.averageRating;

      return dateScore * 0.25 + enrollmentScore * 0.5 + ratingScore * 0.25;
    })
    .slice(0, limit);
}

/**
 * Get beginner-friendly modules for new users
 */
export function getBeginnerFriendlyModules(
  modules: ModulePreviewData[],
): ModulePreviewData[] {
  return modules.filter((module) => module.difficulty === "Beginner");
}

/**
 * Get modules for a specific skill level
 */
export function getModulesByDifficulty(
  modules: ModulePreviewData[],
  difficulty: Difficulty,
): ModulePreviewData[] {
  return modules.filter((module) => module.difficulty === difficulty);
}

/**
 * Get in-progress modules
 */
export function getInProgressModules(
  modules: ModulePreviewData[],
): ModulePreviewData[] {
  return modules.filter((module) => {
    const progress = module.userProgress?.progressPercentage ?? 0;
    return module.userProgress?.started && progress < 100;
  });
}

/**
 * Get completed modules
 */
export function getCompletedModules(
  modules: ModulePreviewData[],
): ModulePreviewData[] {
  return modules.filter(
    (module) => module.userProgress?.progressPercentage === 100,
  );
}

/**
 * Get modules that are available (not started)
 */
export function getAvailableModules(
  modules: ModulePreviewData[],
): ModulePreviewData[] {
  return modules.filter((module) => !module.userProgress?.started);
}

/**
 * Group modules by difficulty
 */
export function groupModulesByDifficulty(
  modules: ModulePreviewData[],
): Record<Difficulty, ModulePreviewData[]> {
  return {
    Beginner: modules.filter((m) => m.difficulty === "Beginner"),
    Intermediate: modules.filter((m) => m.difficulty === "Intermediate"),
    Advanced: modules.filter((m) => m.difficulty === "Advanced"),
  };
}

/**
 * Search modules with advanced matching
 */
export function searchModules(
  modules: ModulePreviewData[],
  query: string,
): ModulePreviewData[] {
  if (!query.trim()) return modules;

  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/);

  return modules
    .map((module) => {
      let score = 0;

      // Title match (highest priority)
      if (module.title.toLowerCase().includes(lowerQuery)) {
        score += 10;
      } else {
        words.forEach((word) => {
          if (module.title.toLowerCase().includes(word)) score += 3;
        });
      }

      // Description match
      words.forEach((word) => {
        if (module.description.toLowerCase().includes(word)) score += 2;
      });

      // Topic match
      words.forEach((word) => {
        if (
          module.keyTopics.some((topic) => topic.toLowerCase().includes(word))
        ) {
          score += 2;
        }
      });

      // Tag match
      words.forEach((word) => {
        if (module.tags.some((tag) => tag.toLowerCase().includes(word))) {
          score += 1;
        }
      });

      return { module, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ module }) => module);
}

/**
 * Get related modules based on tags and topics
 */
export function getRelatedModules(
  module: ModulePreviewData,
  allModules: ModulePreviewData[],
  limit = 4,
): ModulePreviewData[] {
  const relatedModulesSet = new Map<string, number>();

  // Score based on shared topics and tags
  allModules.forEach((otherModule) => {
    if (otherModule.id === module.id) return;

    let score = 0;

    // Shared difficulty (lower priority)
    if (otherModule.difficulty === module.difficulty) score += 1;

    // Shared topics
    otherModule.keyTopics.forEach((topic) => {
      if (module.keyTopics.includes(topic)) score += 3;
    });

    // Shared tags
    otherModule.tags.forEach((tag) => {
      if (module.tags.includes(tag)) score += 2;
    });

    // Same learning path
    if (
      module.learningPath &&
      otherModule.learningPath === module.learningPath
    ) {
      score += 5;
    }

    if (score > 0) {
      relatedModulesSet.set(otherModule.id, score);
    }
  });

  // Sort by score and return top N
  return Array.from(relatedModulesSet.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => allModules.find((m) => m.id === id)!)
    .filter(Boolean);
}

/**
 * Calculate learning time statistics
 */
export function getTimeStatistics(modules: ModulePreviewData[]) {
  if (modules.length === 0) {
    return {
      totalMinutes: 0,
      averageMinutes: 0,
      shortestMinutes: 0,
      longestMinutes: 0,
    };
  }

  const minutes = modules.map((m) => m.estimatedMinutes);
  const totalMinutes = minutes.reduce((a, b) => a + b, 0);

  return {
    totalMinutes,
    averageMinutes: Math.round(totalMinutes / modules.length),
    shortestMinutes: Math.min(...minutes),
    longestMinutes: Math.max(...minutes),
  };
}

/**
 * Convert minutes to readable time string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}
