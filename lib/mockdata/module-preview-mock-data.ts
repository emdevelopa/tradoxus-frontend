/**
 * Mock Data for Module Preview Cards
 * Provides realistic sample data for testing and development
 */

import {
  ModulePreviewData,
  BeginnersPath,
  QuickStartOption,
} from "@/lib/types/module.types";

export const mockModulePreviewData: ModulePreviewData[] = [
  {
    id: "tech-analysis-fundamentals",
    slug: "technical-analysis-fundamentals",
    title: "Technical Analysis Fundamentals",
    description:
      "Learn how to read charts, identify patterns, and make data-driven trading decisions using technical analysis.",
    thumbnail: "/api/placeholder/320/180",
    difficulty: "Beginner",
    estimatedTime: "2.5 hours",
    estimatedMinutes: 150,
    lessonCount: 8,
    chapterCount: 3,
    learningObjectives: [
      {
        id: "obj-1",
        title: "Chart Reading Mastery",
        description: "Understand different chart types and timeframes",
      },
      {
        id: "obj-2",
        title: "Pattern Recognition",
        description: "Identify key price patterns like heads and shoulders",
      },
      {
        id: "obj-3",
        title: "Indicator Application",
        description: "Use technical indicators effectively in trading",
      },
    ],
    prerequisites: [
      {
        id: "prereq-1",
        title: "Trading Basics",
        completed: true,
      },
    ],
    keyTopics: [
      "Candlesticks",
      "Support & Resistance",
      "Moving Averages",
      "MACD",
      "RSI",
      "Bollinger Bands",
    ],
    instructors: [
      {
        id: "instr-1",
        name: "John Davis",
        initials: "JD",
        color: "bg-blue-600",
      },
      {
        id: "instr-2",
        name: "Amy Kumar",
        initials: "AK",
        color: "bg-purple-600",
      },
    ],
    enrolledCount: 2345,
    completionRate: 72,
    averageRating: 4.8,
    reviewCount: 487,
    userProgress: {
      started: true,
      completedLessons: 4,
      totalLessons: 8,
      progressPercentage: 50,
      lastAccessedAt: new Date().toISOString(),
    },
    relatedModules: [
      {
        id: "adv-tech-analysis",
        title: "Advanced Technical Analysis",
        slug: "advanced-technical-analysis",
        thumbnail: "/api/placeholder/320/180",
        difficulty: "Advanced",
      },
      {
        id: "candlestick-patterns",
        title: "Advanced Candlestick Patterns",
        slug: "advanced-candlestick-patterns",
        thumbnail: "/api/placeholder/320/180",
        difficulty: "Intermediate",
      },
    ],
    learningPath: "Trading Fundamentals Path",
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-20T00:00:00Z",
    isNew: false,
    isBestseller: true,
    isPopular: true,
    isTrending: true,
    firstLessonPreview: {
      id: "lesson-1",
      title: "Introduction to Candlestick Charts",
      description:
        "Learn the basics of reading and interpreting candlestick charts",
      duration: "15 min",
    },
    tags: [
      "Technical Analysis",
      "Trading",
      "Charts",
      "Beginners",
      "Fundamentals",
    ],
    category: "Trading Basics",
  },
  {
    id: "defi-yield-strategies",
    slug: "defi-yield-strategies",
    title: "DeFi Yield Strategies",
    description:
      "Explore different yield farming strategies and learn how to maximize returns while managing risks in decentralized finance.",
    thumbnail: "/api/placeholder/320/180",
    difficulty: "Intermediate",
    estimatedTime: "3 hours",
    estimatedMinutes: 180,
    lessonCount: 10,
    chapterCount: 4,
    learningObjectives: [
      {
        id: "obj-1",
        title: "Yield Farming Fundamentals",
        description: "Understand how yield farming works in DeFi protocols",
      },
      {
        id: "obj-2",
        title: "Risk Assessment",
        description: "Evaluate risks in different yield strategies",
      },
      {
        id: "obj-3",
        title: "Protocol Analysis",
        description: "Compare different DeFi protocols and their returns",
      },
    ],
    prerequisites: [
      {
        id: "prereq-1",
        title: "DeFi Basics",
        completed: false,
      },
      {
        id: "prereq-2",
        title: "Blockchain Fundamentals",
        completed: true,
      },
    ],
    keyTopics: [
      "Liquidity Pools",
      "Impermanent Loss",
      "Yield Farming",
      "Smart Contracts",
      "Gas Optimization",
      "Risk Management",
    ],
    instructors: [
      {
        id: "instr-1",
        name: "Alice Lee",
        initials: "AL",
        color: "bg-green-600",
      },
      {
        id: "instr-2",
        name: "Michael Ross",
        initials: "MR",
        color: "bg-red-600",
      },
    ],
    enrolledCount: 1872,
    completionRate: 65,
    averageRating: 4.7,
    reviewCount: 342,
    userProgress: {
      started: false,
      completedLessons: 0,
      totalLessons: 10,
      progressPercentage: 0,
    },
    learningPath: "DeFi Trading Path",
    createdAt: "2025-02-20T00:00:00Z",
    updatedAt: "2025-02-22T00:00:00Z",
    isNew: true,
    isBestseller: false,
    isPopular: true,
    isTrending: false,
    firstLessonPreview: {
      id: "lesson-1",
      title: "What is Yield Farming?",
      description: "Get introduced to yield farming and its mechanisms",
      duration: "12 min",
    },
    tags: ["DeFi", "Yield Farming", "Crypto", "Intermediate", "Advanced"],
    category: "DeFi Trading",
  },
  {
    id: "risk-management-traders",
    slug: "risk-management-for-traders",
    title: "Risk Management for Traders",
    description:
      "Master essential risk management techniques to protect your capital and improve trading outcomes in volatile markets.",
    thumbnail: "/api/placeholder/320/180",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
    estimatedMinutes: 120,
    lessonCount: 7,
    chapterCount: 3,
    learningObjectives: [
      {
        id: "obj-1",
        title: "Position Sizing",
        description: "Calculate optimal position sizes for your risk tolerance",
      },
      {
        id: "obj-2",
        title: "Stop Loss Strategies",
        description: "Implement effective stop loss and take profit strategies",
      },
      {
        id: "obj-3",
        title: "Portfolio Management",
        description: "Manage risk across your entire trading portfolio",
      },
    ],
    prerequisites: [],
    keyTopics: [
      "Position Sizing",
      "Stop Loss",
      "Take Profit",
      "Risk Ratios",
      "Portfolio Diversification",
    ],
    instructors: [
      {
        id: "instr-1",
        name: "Kevin Lee",
        initials: "KL",
        color: "bg-amber-600",
      },
      {
        id: "instr-2",
        name: "Bruno Nelson",
        initials: "BN",
        color: "bg-blue-600",
      },
    ],
    enrolledCount: 3120,
    completionRate: 84,
    averageRating: 4.9,
    reviewCount: 612,
    userProgress: {
      started: true,
      completedLessons: 7,
      totalLessons: 7,
      progressPercentage: 100,
      lastAccessedAt: "2025-01-10T00:00:00Z",
    },
    learningPath: "Trading Fundamentals Path",
    createdAt: "2025-03-25T00:00:00Z",
    updatedAt: "2025-03-28T00:00:00Z",
    isNew: false,
    isBestseller: true,
    isPopular: true,
    isTrending: true,
    firstLessonPreview: {
      id: "lesson-1",
      title: "The 2% Rule",
      description: "Learn the foundational 2% risk management rule",
      duration: "10 min",
    },
    tags: [
      "Risk Management",
      "Trading",
      "Position Sizing",
      "Beginners",
      "Essential",
    ],
    category: "Risk Management",
  },
];

export const mockBeginnersPath: BeginnersPath = {
  id: "beginner-trading-path",
  title: "Complete Beginner Trading Path",
  description:
    "A structured journey from zero to confident trader. Start with fundamentals and progress through practical strategies.",
  recommendedOrder: [
    "technical-analysis-fundamentals",
    "risk-management-for-traders",
    "advanced-technical-analysis",
  ],
  estimatedTotalTime: "10-12 hours",
  targetAudience: "Complete beginners with no trading experience",
};

export const mockQuickStartOptions: QuickStartOption[] = [
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
      "advanced-technical-analysis",
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
      "advanced-technical-analysis",
      "defi-yield-strategies",
    ],
    estimatedDuration: "10-12 hours",
    targetGoal: "Create your trading edge",
  },
];
