/**
 * Custom React Hook for Achievement System
 * Provides achievement tracking and gamification features
 */
"use client"

import { useState, useEffect } from "react"
import { achievementService, type Achievement, type AchievementStats } from "@/lib/services/achievement-service"

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [achievementStats, setAchievementStats] = useState<AchievementStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    try {
      setLoading(true)
      setError(null)

      const [achievementsData, statsData] = await Promise.all([
        achievementService.getAllAchievements(),
        achievementService.getAchievementStats(),
      ])

      setAchievements(achievementsData)
      setAchievementStats(statsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load achievements")
    } finally {
      setLoading(false)
    }
  }

  const updateAchievementProgress = async (id: string, progress: number) => {
    try {
      const updatedAchievement = await achievementService.updateAchievementProgress(id, progress)
      if (updatedAchievement) {
        setAchievements((prev) => prev.map((achievement) => (achievement.id === id ? updatedAchievement : achievement)))

        // Refresh stats
        const updatedStats = await achievementService.getAchievementStats()
        setAchievementStats(updatedStats)

        // Return whether achievement was newly unlocked
        const wasNewlyUnlocked =
          updatedAchievement.unlocked && achievements.find((a) => a.id === id)?.unlocked === false

        return { achievement: updatedAchievement, newlyUnlocked: wasNewlyUnlocked }
      }
      return null
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update achievement progress")
      throw err
    }
  }

  const getUnlockedAchievements = () => {
    return achievements.filter((achievement) => achievement.unlocked)
  }

  const getLockedAchievements = () => {
    return achievements.filter((achievement) => !achievement.unlocked)
  }

  const getAchievementsByCategory = (category: Achievement["category"]) => {
    return achievements.filter((achievement) => achievement.category === category)
  }

  const getAchievementsByTier = (tier: Achievement["tier"]) => {
    return achievements.filter((achievement) => achievement.tier === tier)
  }

  const getRecentUnlocks = async (days = 7) => {
    try {
      return await achievementService.getRecentUnlocks(days)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get recent unlocks")
      return []
    }
  }

  const getRecommendedAchievements = async () => {
    try {
      return await achievementService.getRecommendedAchievements()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get recommendations")
      return []
    }
  }

  return {
    achievements,
    achievementStats,
    loading,
    error,
    updateAchievementProgress,
    refreshAchievements: loadAchievements,
    getUnlockedAchievements,
    getLockedAchievements,
    getAchievementsByCategory,
    getAchievementsByTier,
    getRecentUnlocks,
    getRecommendedAchievements,
  }
}
