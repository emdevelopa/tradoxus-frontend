# Module Preview Cards - Quick Integration Guide

## What Was Built

A complete learning module preview card system with:

- ✅ Interactive expandable preview cards
- ✅ Full-screen preview modal
- ✅ Advanced filtering and sorting
- ✅ Beginner onboarding experience
- ✅ Mock data for testing
- ✅ Complete TypeScript types
- ✅ Dark mode support
- ✅ Responsive design

## Quick Start (5 minutes)

### Option 1: Using Mock Data (Development)

```tsx
// app/modules/page.tsx
"use client";
import { ModuleGrid } from "@/components/education";
import { mockModulePreviewData } from "@/lib/mockdata/module-preview-mock-data";

export default function ModulesPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Learning Modules</h1>
      <ModuleGrid modules={mockModulePreviewData} />
    </div>
  );
}
```

### Option 2: Integrate with Existing Modules Page

Add this to your current `/app/modules/page.tsx`:

```tsx
import { ModuleGrid } from "@/components/education";
import { mockModulePreviewData } from "@/lib/mockdata/module-preview-mock-data";

// Inside your component:
<ModuleGrid modules={mockModulePreviewData} loading={loading} error={error} />;
```

### Option 3: Add Onboarding to Dashboard

```tsx
// app/dashboard/page.tsx
import { BeginnerOnboarding } from "@/components/education";
import {
  mockModulePreviewData,
  mockQuickStartOptions,
} from "@/lib/mockdata/module-preview-mock-data";

export function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return (
      <BeginnerOnboarding
        beginnerModules={mockModulePreviewData}
        quickStartOptions={mockQuickStartOptions}
        onSkip={() => setShowOnboarding(false)}
      />
    );
  }

  return <YourDashboardContent />;
}
```

## File Structure Overview

```
Created 7 new files:

1. lib/types/module.types.ts
   - All TypeScript interfaces and types
   - ModulePreviewData, ModuleFilterState, BeginnersPath, etc.

2. components/education/ModulePreviewCard.tsx
   - Expandable card with module overview
   - Bookmark and share functionality
   - Progress indicator for started modules

3. components/education/ExpandedPreview.tsx
   - Full-screen modal view
   - Complete module details
   - Learning objectives, prerequisites, instructors
   - First lesson preview and action buttons

4. components/education/ModuleGrid.tsx
   - Grid view with search and filtering
   - Multi-select filters by difficulty, time, status, topics
   - Sort options (popularity, difficulty, newest)
   - Results statistics

5. components/education/BeginnerOnboarding.tsx
   - 3-step onboarding flow
   - Goal selection with quick-start options
   - Module preview and recommendations

6. lib/services/module-filter.service.ts
   - 20+ utility functions for filtering/sorting
   - Search with relevance scoring
   - Grouping and categorization helpers
   - Time calculation utilities

7. lib/mockdata/module-preview-mock-data.ts
   - 3 complete sample modules
   - Beginner learning path
   - Quick start options

Plus:
- components/education/index.ts (barrel export)
- MODULE_PREVIEW_CARDS_README.md (comprehensive docs)
```

## Key Components

### ModulePreviewCard

```tsx
<ModulePreviewCard
  module={moduleData}
  onBookmark={(id) => console.log(id)}
  onShare={(id) => console.log(id)}
  isBookmarked={false}
  expandable={true}
  showProgress={true}
/>
```

### ModuleGrid

```tsx
<ModuleGrid
  modules={modules}
  loading={false}
  error={null}
  onModuleClick={(id) => console.log(id)}
/>
```

### ExpandedPreview

```tsx
<ExpandedPreview
  module={selectedModule}
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onBookmark={(id) => handleBookmark(id)}
  isBookmarked={false}
/>
```

### BeginnerOnboarding

```tsx
<BeginnerOnboarding
  beginnerModules={modules}
  quickStartOptions={options}
  recommendedPath={path}
  onSkip={() => {}}
  userLevel="new"
/>
```

## Features Summary

### 1. Module Preview Cards ⭐

- Thumbnail with progress bar
- Difficulty badge
- Duration and lesson count
- Instructor avatars
- Rating and enrollment count
- Expandable details section
- Bookmark and share buttons
- Status badge (New, Bestseller, Trending)

### 2. Expanded Preview Modal 🎬

- Full-screen modal view
- Hero image with video preview
- Learning objectives overview
- Prerequisites tracking
- Instructor profiles
- Key topics covered
- First lesson preview
- Community statistics
- Start/Continue button
- Bookmark button

### 3. Module Grid 🔍

- Search by title, description, topics, tags
- Filter by:
  - Difficulty level
  - Time commitment
  - User status (not started, in progress, completed)
  - Topics/Tags
- Sort by:
  - Popularity
  - Difficulty
  - Newest
- Results statistics
- Active filter display
- Responsive grid layout

### 4. Beginner Onboarding 🚀

- Welcome screen with features
- Goal selection (4 quick-start paths)
- Module preview recommendations
- Multi-step flow with navigation
- Smooth transitions

### 5. Filtering Service 🛠️

- 20+ utility functions
- Advanced search with relevance scoring
- Module categorization helpers
- Related module suggestions
- Time statistics calculation
- Format utilities

## Customization

### Update Mock Data

Edit `lib/mockdata/module-preview-mock-data.ts`:

```typescript
export const mockModulePreviewData: ModulePreviewData[] = [
  {
    id: "unique-id",
    slug: "url-slug",
    title: "Module Title",
    description: "Module description",
    difficulty: "Beginner",
    estimatedTime: "2.5 hours",
    estimatedMinutes: 150,
    lessonCount: 8,
    // ... rest of fields
  },
];
```

### Connect to API

Replace mock data with API calls:

```typescript
// lib/services/module.service.ts
export const ModuleService = {
  getAll: async (): Promise<ModulePreviewData[]> => {
    const res = await fetch("/api/modules");
    return res.json();
  },
};
```

Then in your page:

```tsx
const [modules, setModules] = useState<ModulePreviewData[]>([]);

useEffect(() => {
  ModuleService.getAll().then(setModules);
}, []);

return <ModuleGrid modules={modules} />;
```

### Styling

All components use Tailwind CSS with dark mode support. Customize in:

- `tailwind.config.ts` - for theme colors
- Component files - for specific overrides

Color scheme:

- Beginner: Blue (blue-600, blue-500/10)
- Intermediate: Amber (amber-600, amber-500/10)
- Advanced: Red (red-600, red-500/10)

## Next Steps

1. **Test with current modules page**
   - Import `ModuleGrid`
   - Pass your module data
   - Test filtering and sorting

2. **Add API integration**
   - Replace mock data with API calls
   - Update `ModulePreviewData` structure if needed
   - Test with real module data

3. **Implement user actions**
   - Connect bookmark functionality to backend
   - Implement share modal
   - Track module views/analytics

4. **Add to other pages**
   - Featured modules section
   - Recommended modules widget
   - Course page module preview
   - Dashboard module suggestions

5. **Customize appearance**
   - Update colors to match brand
   - Adjust spacing and sizing
   - Add your logo/branding
   - Customize onboarding flow

## Common Issues & Solutions

### Issue: Cards look empty

**Solution:** Ensure mock data is imported correctly

```tsx
import { mockModulePreviewData } from "@/lib/mockdata/module-preview-mock-data";
```

### Issue: Filtering not working

**Solution:** Check filter state has correct structure

```tsx
const filters: ModuleFilterState = {
  difficulty: "all", // or ["Beginner", "Intermediate"]
  topics: "all",
  timeCommitment: "all",
  status: "all",
};
```

### Issue: Dark mode not showing

**Solution:** Ensure parent has `dark:` class or dark mode is enabled

```tsx
<div className="dark">
  {" "}
  {/* or html className="dark" */}
  <ModuleGrid modules={modules} />
</div>
```

### Issue: Images not loading

**Solution:** Check thumbnail URLs are valid

```tsx
thumbnail: "/api/placeholder/320/180"; // or actual image URL
```

## API Contract (When Ready)

Expected API response structure:

```typescript
// GET /api/modules
{
  modules: ModulePreviewData[],
  total: number,
  page: number,
  pageSize: number
}

// GET /api/modules/:id
ModulePreviewData

// POST /api/modules/search
{
  query: string,
  filters: ModuleFilterState
}
// Returns: ModulePreviewData[]

// POST /api/modules/:id/bookmark
{ success: boolean, bookmarked: boolean }

// GET /api/user/bookmarks
ModulePreviewData[]
```

## Performance Tips

1. **Pagination** - Implement for 50+ modules

   ```tsx
   const itemsPerPage = 12;
   const paginatedModules = modules.slice(
     page * itemsPerPage,
     (page + 1) * itemsPerPage,
   );
   ```

2. **Memoization** - Use React.memo for module cards

   ```tsx
   const MemoCard = React.memo(ModulePreviewCard);
   ```

3. **Virtual Scrolling** - For 100+ modules
   - Use `react-window` or `react-virtual`

4. **Image Optimization** - Use Next.js Image
   - Already implemented in components
   - Ensure images are optimized

5. **Lazy Load Details** - Load preview on expand
   ```tsx
   onExpand={() => fetchFullDetails(moduleId)}
   ```

## Testing Checklist

- [ ] ModuleGrid displays all modules
- [ ] Search filters modules correctly
- [ ] Difficulty filter works
- [ ] Time commitment filter works
- [ ] Status filter works
- [ ] Topics filter works
- [ ] Sort options work
- [ ] Expandable cards expand/collapse
- [ ] Expanded preview modal opens/closes
- [ ] Bookmark functionality works
- [ ] Share button works
- [ ] Dark mode renders correctly
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Onboarding flow works
- [ ] All links navigate correctly

## Support & Docs

For detailed information, see:

- `MODULE_PREVIEW_CARDS_README.md` - Comprehensive guide
- Component files - Inline JSDoc comments
- Type definitions - `lib/types/module.types.ts`
- Mock data - `lib/mockdata/module-preview-mock-data.ts`

## What's Included

✅ 5 reusable components
✅ 20+ filter/sort utilities
✅ Complete TypeScript types
✅ 3 sample modules with full data
✅ Dark mode support
✅ Responsive design
✅ Accessibility features
✅ Mock data for development
✅ Comprehensive documentation
✅ Integration guide

## What's NOT Included (Future Work)

❌ User authentication
❌ Backend API (ready for integration)
❌ Database schema
❌ Real user progress tracking
❌ Payment/enrollment system
❌ Video hosting
❌ Certificate generation
❌ Notifications
❌ Analytics
❌ ML recommendations

Ready to go! Start with Option 1 or 2 above. 🚀
