# Module Preview Cards Implementation Guide

## Overview

This implementation provides a comprehensive learning module preview card system for the Tradoxus frontend. It includes interactive preview cards, filtering/sorting capabilities, and onboarding features designed to help users quickly understand module content and select appropriate learning paths.

## Features

### 1. **Module Preview Cards** (`ModulePreviewCard.tsx`)

Expandable cards that display essential module information at a glance with detailed information on demand.

**Key Features:**

- Module thumbnail with progress indicator
- Quick metadata (difficulty, duration, lesson count)
- Instructor avatars with hover information
- User ratings and enrollment metrics
- Learning objectives preview
- Prerequisites tracking
- Expandable detail view
- Bookmark and share functionality

**Usage:**

```tsx
import { ModulePreviewCard } from "@/components/education";
import { mockModulePreviewData } from "@/lib/mockdata/module-preview-mock-data";

export function MyComponent() {
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  return (
    <ModulePreviewCard
      module={mockModulePreviewData[0]}
      onBookmark={(moduleId) => {
        const newBookmarked = new Set(bookmarked);
        newBookmarked.add(moduleId);
        setBookmarked(newBookmarked);
      }}
      onShare={(moduleId) => console.log("Share:", moduleId)}
      isBookmarked={bookmarked.has(mockModulePreviewData[0].id)}
      expandable={true}
      showProgress={true}
    />
  );
}
```

### 2. **Expanded Preview Modal** (`ExpandedPreview.tsx`)

Full-screen modal view with comprehensive module details.

**Displays:**

- Hero image with video preview
- Complete learning objectives
- Prerequisites with completion status
- Instructor profiles
- Key topics covered
- First lesson preview
- Community stats (enrollment, ratings, completion rate)
- Quick action buttons

**Usage:**

```tsx
import { ExpandedPreview } from "@/components/education";

export function MyComponent() {
  const [selectedModule, setSelectedModule] =
    useState<ModulePreviewData | null>(null);

  return (
    <>
      <ExpandedPreview
        module={selectedModule}
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        onBookmark={(id) => console.log("Bookmarked:", id)}
      />
    </>
  );
}
```

### 3. **Module Grid with Filtering** (`ModuleGrid.tsx`)

Complete grid view with advanced filtering and sorting capabilities.

**Features:**

- Real-time search across title, description, topics, tags
- Multi-select filtering by:
  - Difficulty level (Beginner, Intermediate, Advanced)
  - Time commitment (< 2h, 2-5h, > 5h)
  - User status (Not Started, In Progress, Completed)
  - Topics/Tags
- Multiple sort options:
  - Popularity
  - Difficulty (ascending/descending)
  - Newest first
- Results statistics (count, total time, average duration)
- Responsive grid layout

**Usage:**

```tsx
import { ModuleGrid } from "@/components/education";
import { mockModulePreviewData } from "@/lib/mockdata/module-preview-mock-data";

export default function ModulesPage() {
  return (
    <ModuleGrid
      modules={mockModulePreviewData}
      loading={false}
      error={null}
      onModuleClick={(moduleId) => console.log("Clicked:", moduleId)}
    />
  );
}
```

### 4. **Beginner Onboarding** (`BeginnerOnboarding.tsx`)

Interactive onboarding experience for new users with goal-based recommendations.

**Three-step flow:**

1. **Welcome** - Features highlight and value proposition
2. **Goal Selection** - Choose learning path with quick-start options
3. **Module Preview** - View recommended modules

**Quick Start Options:**

- Trading Fundamentals
- Crypto Trading
- Risk Management
- Advanced Strategies

**Usage:**

```tsx
import { BeginnerOnboarding } from "@/components/education";
import {
  mockModulePreviewData,
  mockBeginnersPath,
  mockQuickStartOptions,
} from "@/lib/mockdata/module-preview-mock-data";

export function OnboardingPage() {
  const beginnerModules = mockModulePreviewData.filter(
    (m) => m.difficulty === "Beginner",
  );

  return (
    <BeginnerOnboarding
      beginnerModules={beginnerModules}
      quickStartOptions={mockQuickStartOptions}
      recommendedPath={mockBeginnersPath}
      onSkip={() => console.log("Skipped onboarding")}
      userLevel="new"
    />
  );
}
```

## Types and Interfaces

### `ModulePreviewData`

Complete type definition for module preview information:

```typescript
interface ModulePreviewData {
  // Basic Information
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";

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
  learningPath?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isPopular?: boolean;
  isTrending?: boolean;

  // Preview
  firstLessonPreview?: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    duration: string;
  };

  tags: string[];
  category?: string;
}
```

## Filtering and Sorting Service

The `module-filter.service.ts` provides utility functions for module management:

### Available Functions

**Filtering:**

```typescript
filterModules(modules, filters): ModulePreviewData[]
filterAndSortModules(modules, filters, sortState): ModulePreviewData[]
searchModules(modules, query): ModulePreviewData[]
getRelatedModules(module, allModules, limit): ModulePreviewData[]
```

**Categorization:**

```typescript
getBeginnerFriendlyModules(modules): ModulePreviewData[]
getInProgressModules(modules): ModulePreviewData[]
getCompletedModules(modules): ModulePreviewData[]
getAvailableModules(modules): ModulePreviewData[]
getTrendingModules(modules, limit): ModulePreviewData[]
groupModulesByDifficulty(modules): Record<Difficulty, ModulePreviewData[]>
getUniqueTopics(modules): string[]
```

**Utilities:**

```typescript
formatDuration(minutes: number): string
getTimeStatistics(modules): { totalMinutes, averageMinutes, ... }
```

### Example Usage

```typescript
import {
  filterModules,
  sortModules,
  searchModules,
  getTrendingModules,
  getBeginnerFriendlyModules,
} from "@/lib/services/module-filter.service";

// Search for modules
const results = searchModules(allModules, "trading");

// Apply filters
const filtered = filterModules(allModules, {
  difficulty: ["Beginner", "Intermediate"],
  topics: ["Trading", "Risk"],
  timeCommitment: "short",
  status: "not-started",
});

// Get trending modules
const trending = getTrendingModules(allModules, 5);

// Get beginner path
const beginners = getBeginnerFriendlyModules(allModules);
```

## Data Structure

### Mock Data Location

Sample module data is available in:

```
lib/mockdata/module-preview-mock-data.ts
```

Includes:

- `mockModulePreviewData` - 3 sample modules with full details
- `mockBeginnersPath` - Recommended learning path for beginners
- `mockQuickStartOptions` - 4 goal-based learning options

### Data Schema

Modules should follow the `ModulePreviewData` interface defined in:

```
lib/types/module.types.ts
```

## Integration Steps

### 1. Update Your Modules Page

```tsx
// app/modules/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ModuleGrid } from "@/components/education";
import { ModulePreviewData } from "@/lib/types/module.types";
import { mockModulePreviewData } from "@/lib/mockdata/module-preview-mock-data";

export default function ModulesPage() {
  const [modules, setModules] = useState<ModulePreviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    setModules(mockModulePreviewData);
    setLoading(false);
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <ModuleGrid modules={modules} loading={loading} error={null} />
    </div>
  );
}
```

### 2. Add Onboarding to Dashboard

```tsx
// app/dashboard/page.tsx or app/page.tsx
"use client";

import { BeginnerOnboarding } from "@/components/education";
import {
  mockModulePreviewData,
  mockQuickStartOptions,
  mockBeginnersPath,
} from "@/lib/mockdata/module-preview-mock-data";

export default function DashboardPage() {
  const beginnerModules = mockModulePreviewData.filter(
    (m) => m.difficulty === "Beginner",
  );
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return (
      <BeginnerOnboarding
        beginnerModules={beginnerModules}
        quickStartOptions={mockQuickStartOptions}
        recommendedPath={mockBeginnersPath}
        onSkip={() => setShowOnboarding(false)}
        userLevel="new"
      />
    );
  }

  return <YourDashboardContent />;
}
```

### 3. API Integration (Future)

When ready to integrate with backend:

```typescript
// lib/services/module.service.ts
export const ModuleService = {
  getAllModules: async (): Promise<ModulePreviewData[]> => {
    const response = await fetch("/api/modules");
    return response.json();
  },

  getModuleById: async (id: string): Promise<ModulePreviewData> => {
    const response = await fetch(`/api/modules/${id}`);
    return response.json();
  },

  searchModules: async (query: string): Promise<ModulePreviewData[]> => {
    const response = await fetch(`/api/modules/search?q=${query}`);
    return response.json();
  },

  getRecommendedModules: async (
    userId: string,
  ): Promise<ModulePreviewData[]> => {
    const response = await fetch(`/api/modules/recommended?userId=${userId}`);
    return response.json();
  },
};
```

## Styling and Theming

All components support dark mode with `dark:` Tailwind classes:

- Light theme: Default gray/blue colors
- Dark theme: dark-400/dark-800 variants
- Accent colors:
  - Beginner: Blue
  - Intermediate: Amber
  - Advanced: Red

Customize colors in `tailwind.config.ts` if needed.

## Responsive Design

Components are fully responsive:

- **Mobile**: Single column, optimized touch targets
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid

## Accessibility

- Semantic HTML structure
- ARIA labels where applicable
- Keyboard navigation support
- Color contrast compliant (WCAG AA)
- Touch-friendly button sizes (min 44x44px)

## Performance Considerations

- Lazy loading with Framer Motion
- Memoized filtering and sorting calculations
- Efficient search algorithm with scoring
- Optimized image loading with Next.js Image
- Pagination ready (implement with data slicing)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Future Enhancements

1. **User Ratings and Reviews** - Full review system with helpful voting
2. **Completion Certificates** - Preview and download certificates
3. **Social Learning** - Study group creation and collaboration
4. **Personalized Recommendations** - ML-based module suggestions
5. **Progress Analytics** - Detailed learning analytics dashboard
6. **Video Integration** - Embedded video lessons and preview
7. **Quiz and Assessments** - Interactive module assessments
8. **Gamification** - Badges, streaks, leaderboards
9. **Skill Assessment** - Pre-course skill testing
10. **Advanced Search** - Faceted search, saved filters

## Files Structure

```
components/education/
├── index.ts (barrel export)
├── ModulePreviewCard.tsx
├── ExpandedPreview.tsx
├── ModuleGrid.tsx
├── BeginnerOnboarding.tsx
├── LearningPathCard.tsx (existing)
├── FeaturedModuleCard.tsx (existing)
└── GetStartedAction.tsx (existing)

lib/
├── types/
│   └── module.types.ts (new)
├── services/
│   └── module-filter.service.ts (new)
└── mockdata/
    └── module-preview-mock-data.ts (new)
```

## Troubleshooting

### Cards not displaying

- Ensure `ModulePreviewData` matches the interface
- Check thumbnail URLs are accessible
- Verify difficulty values are correct

### Filtering not working

- Check `filters` object has correct structure
- Verify topic/tags match module data
- Ensure `searchQuery` is properly trimmed

### Performance issues

- Implement pagination for large module lists
- Use React.memo for component optimization
- Consider virtual scrolling for 100+ modules

## Contributing

When adding new features:

1. Update types in `lib/types/module.types.ts`
2. Add filter logic to `module-filter.service.ts`
3. Update component documentation
4. Add mock data for testing
5. Test in both light and dark modes

## License

Part of Tradoxus frontend project
