/**
 * Achievement Service
 * Handles achievement tracking, unlocking, and gamification features
 */

export interface Achievement {
  id: string
  title: string
  description: string
  category: "trading" | "learning" | "consistency" | "risk" | "milestone"
  tier: "bronze" | "silver" | "gold" | "platinum"
  points: number
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: string
  icon: string
  requirement: string
  prerequisites?: string[]
}

export interface UserLevel {
  level: number
  currentXP: number
  xpToNextLevel: number
  totalXP: number
  levelProgress: number
}

export interface AchievementStats {
  totalAchievements: number
  unlockedAchievements: number
  lockedAchievements: number
  completionRate: number
  totalPoints: number
  levelInfo: UserLevel
  categoryProgress: Record<string, { unlocked: number; total: number }>
  tierProgress: Record<string, { unlocked: number; total: number }>
}

class AchievementService {
  private static instance: AchievementService
  private achievements: Achievement[]

  private constructor() {
    // Initialize with comprehensive achievement data
    this.achievements = [
      {
        id: "1",
        title: "First Profit",
        description: "Make your first profitable trade",
        category: "trading",
        tier: "bronze",
        points: 100,
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        unlockedAt: "2024-01-15",
        icon: "trophy",
        requirement: "Complete 1 profitable trade",
      },
      {
        id: "2",
        title: "Profit Streak",
        description: "Achieve 10 consecutive profitable trades",
        category: "trading",
        tier: "silver",
        points: 250,
        progress: 7,
        maxProgress: 10,
        unlocked: false,
        icon: "trending-up",
        requirement: "10 consecutive profitable trades",
        prerequisites: ["1"],
      },
      {
        id: "3",
        title: "Risk Master",
        description: "Maintain proper risk management for 50 trades",
        category: "risk",
        tier: "gold",
        points: 500,
        progress: 42,
        maxProgress: 50,
        unlocked: false,
        icon: "shield",
        requirement: "50 trades with proper position sizing",
      },
      {
        id: "4",
        title: "Learning Champion",
        description: "Complete 5 trading courses",
        category: "learning",
        tier: "silver",
        points: 300,
        progress: 3,
        maxProgress: 5,
        unlocked: false,
        icon: "star",
        requirement: "Complete 5 educational courses",
      },
      {
        id: "5",
        title: "Consistency King",
        description: "Trade every day for 30 consecutive days",
        category: "consistency",
        tier: "gold",
        points: 400,
        progress: 30,
        maxProgress: 30,
        unlocked: true,
        unlockedAt: "2024-09-30",
        icon: "calendar",
        requirement: "30 consecutive trading days",
      },
      {
        id: "6",
        title: "Psychology Master",
        description: "Complete emotional control assessment",
        category: "learning",
        tier: "platinum",
        points: 750,
        progress: 8,
        maxProgress: 10,
        unlocked: false,
        icon: "brain",
        requirement: "Master trading psychology modules",
        prerequisites: ["4"],
      },
      {
        id: "7",
        title: "Profit Milestone",
        description: "Reach $10,000 in total profits",
        category: "milestone",
        tier: "gold",
        points: 600,
        progress: 8750,
        maxProgress: 10000,
        unlocked: false,
        icon: "crown",
        requirement: "$10,000 total profit",
      },
      {
        id: "8",
        title: "Win Rate Expert",
        description: "Maintain 80%+ win rate for 100 trades",
        category: "trading",
        tier: "platinum",
        points: 800,
        progress: 65,
        maxProgress: 100,
        unlocked: false,
        icon: "target",
        requirement: "80%+ win rate over 100 trades",
        prerequisites: ["2"],
      },
      {
        id: "9",
        title: "Diversification Pro",
        description: "Trade in 4 different asset classes",
        category: "trading",
        tier: "silver",
        points: 350,
        progress: 3,
        maxProgress: 4,
        unlocked: false,
        icon: "trending-up",
        requirement: "Trade stocks, crypto, forex, and commodities",
      },
      {
        id: "10",
        title: "Risk Control Expert",
        description: "Keep drawdown under 5% for 6 months",
        category: "risk",
        tier: "platinum",
        points: 900,
        progress: 4,
        maxProgress: 6,
        unlocked: false,
        icon: "shield",
        requirement: "6 months with <5% drawdown",
        prerequisites: ["3"],
      },
    ]
  }

  public static getInstance(): AchievementService {
    if (!AchievementService.instance) {
      AchievementService.instance = new AchievementService()
    }
    return AchievementService.instance
  }

  // Achievement Retrieval
  async getAllAchievements(): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.achievements]
  }

  async getUnlockedAchievements(): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.achievements.filter((achievement) => achievement.unlocked)
  }

  async getLockedAchievements(): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.achievements.filter((achievement) => !achievement.unlocked)
  }

  async getAchievementsByCategory(category: Achievement["category"]): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.achievements.filter((achievement) => achievement.category === category)
  }

  async getAchievementsByTier(tier: Achievement["tier"]): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.achievements.filter((achievement) => achievement.tier === tier)
  }

  // Achievement Progress
  async updateAchievementProgress(id: string, newProgress: number): Promise<Achievement | null> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const achievementIndex = this.achievements.findIndex((achievement) => achievement.id === id)
    if (achievementIndex === -1) return null

    const achievement = this.achievements[achievementIndex]
    const wasUnlocked = achievement.unlocked

    // Update progress
    achievement.progress = Math.min(newProgress, achievement.maxProgress)

    // Check if achievement should be unlocked
    if (!wasUnlocked && achievement.progress >= achievement.maxProgress) {
      // Check prerequisites
      const prerequisitesMet =
        !achievement.prerequisites ||
        achievement.prerequisites.every((prereqId) => this.achievements.find((a) => a.id === prereqId)?.unlocked)

      if (prerequisitesMet) {
        achievement.unlocked = true
        achievement.unlockedAt = new Date().toISOString()
      }
    }

    return achievement
  }

  // User Level Calculation
  async getUserLevel(): Promise<UserLevel> {
    await new Promise((resolve) => setTimeout(resolve, 50))

    const totalXP = this.achievements
      .filter((achievement) => achievement.unlocked)
      .reduce((sum, achievement) => sum + achievement.points, 0)

    const level = Math.floor(totalXP / 1000) + 1
    const currentXP = totalXP % 1000
    const xpToNextLevel = 1000 - currentXP
    const levelProgress = (currentXP / 1000) * 100

    return {
      level,
      currentXP,
      xpToNextLevel,
      totalXP,
      levelProgress,
    }
  }

  // Achievement Statistics
  async getAchievementStats(): Promise<AchievementStats> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const totalAchievements = this.achievements.length
    const unlockedAchievements = this.achievements.filter((a) => a.unlocked).length
    const lockedAchievements = totalAchievements - unlockedAchievements
    const completionRate = (unlockedAchievements / totalAchievements) * 100
    const totalPoints = this.achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0)

    const levelInfo = await this.getUserLevel()

    // Category progress
    const categoryProgress = this.achievements.reduce(
      (acc, achievement) => {
        if (!acc[achievement.category]) {
          acc[achievement.category] = { unlocked: 0, total: 0 }
        }
        acc[achievement.category].total++
        if (achievement.unlocked) {
          acc[achievement.category].unlocked++
        }
        return acc
      },
      {} as Record<string, { unlocked: number; total: number }>,
    )

    // Tier progress
    const tierProgress = this.achievements.reduce(
      (acc, achievement) => {
        if (!acc[achievement.tier]) {
          acc[achievement.tier] = { unlocked: 0, total: 0 }
        }
        acc[achievement.tier].total++
        if (achievement.unlocked) {
          acc[achievement.tier].unlocked++
        }
        return acc
      },
      {} as Record<string, { unlocked: number; total: number }>,
    )

    return {
      totalAchievements,
      unlockedAchievements,
      lockedAchievements,
      completionRate,
      totalPoints,
      levelInfo,
      categoryProgress,
      tierProgress,
    }
  }

  // Achievement Recommendations
  async getRecommendedAchievements(): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Get achievements that are close to completion (>50% progress) and not unlocked
    const closeToCompletion = this.achievements.filter(
      (achievement) => !achievement.unlocked && achievement.progress / achievement.maxProgress > 0.5,
    )

    // Sort by progress percentage (descending)
    return closeToCompletion.sort((a, b) => b.progress / b.maxProgress - a.progress / a.maxProgress)
  }

  // Bulk Progress Updates (for automated tracking)
  async updateMultipleAchievements(updates: Array<{ id: string; progress: number }>): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const updatedAchievements: Achievement[] = []

    for (const update of updates) {
      const achievement = await this.updateAchievementProgress(update.id, update.progress)
      if (achievement) {
        updatedAchievements.push(achievement)
      }
    }

    return updatedAchievements
  }

  // Achievement Notifications
  async getRecentUnlocks(days = 7): Promise<Achievement[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return this.achievements.filter(
      (achievement) => achievement.unlocked && achievement.unlockedAt && new Date(achievement.unlockedAt) >= cutoffDate,
    )
  }
}

export const achievementService = AchievementService.getInstance()
