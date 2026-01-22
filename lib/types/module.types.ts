/**
 * Module Preview Types
 * Extended types for learning module preview cards and enhanced features
 */

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type SortOption = "popularity" | "difficulty" | "newest" | "difficulty-asc";
export type FilterType = "difficulty" | "topic" | "timeCommitment" | "status";

export interface LearningObjective {
  id: string;
  title: string;
  description: string;
}

export interface PrerequisiteModule {
  id: string;
  title: string;
  completed: boolean;
}

export interface ModuleReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface RelatedModule {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  difficulty: Difficulty;
}

export interface ModulePreviewData {
  // Basic Information
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: Difficulty;
  
  // Time and Scope
  estimatedTime: string; // e.g., "2.5 hours"
  estimatedMinutes: number;
  lessonCount: number;
  chapterCount?: number;
  
  // Content
  learningObjectives: LearningObjective[];
  prerequisites: PrerequisiteModule[];
  keyTopics: string[];
  
  // Instructor Information
  instructors: {
    id: string;
    name: string;
    initials: string;
    avatar?: string;
    color: string;
  }[];
  
  // Engagement Metrics
  enrolledCount: number;
  completionRate: number; // percentage
  averageRating: number; // 1-5
  reviewCount: number;
  
  // User Progress
  userProgress?: {
    started: boolean;
    completedLessons: number;
    totalLessons: number;
    progressPercentage: number;
    lastAccessedAt?: string;
  };
  
  // Related Content
  relatedModules?: RelatedModule[];
  learningPath?: string; // e.g., "Trading Fundamentals Path"
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
  
  // For preview
  firstLessonPreview?: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    duration: string;
  };
  
  // Tags and categorization
  tags: string[];
  category?: string;
}

export interface ModuleFilterState {
  difficulty: Difficulty[] | "all";
  topics: string[] | "all";
  timeCommitment: ("short" | "medium" | "long") | "all";
  status: ("not-started" | "in-progress" | "completed") | "all";
  searchQuery?: string;
}

export interface ModuleSortState {
  sortBy: SortOption;
  ascending: boolean;
}

export interface BeginnersPath {
  id: string;
  title: string;
  description: string;
  recommendedOrder: string[]; // module slugs
  estimatedTotalTime: string;
  targetAudience: string;
}

export interface UserSkillAssessment {
  userId: string;
  tradingKnowledge: number; // 1-10
  technicalSkills: number; // 1-10
  riskToleranceLevel: "low" | "medium" | "high";
  learningGoals: string[];
  recommendedPath?: string;
}

export interface QuickStartOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  recommendedModules: string[]; // module IDs
  estimatedDuration: string;
  targetGoal: string;
}
