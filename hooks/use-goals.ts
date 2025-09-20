/**
 * Custom React Hook for Goal Management
 * Provides goal CRUD operations with loading states
 */
"use client"

import { useState, useEffect } from "react"
import { goalService, type Goal, type GoalStats } from "@/lib/services/goal-service"

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [goalStats, setGoalStats] = useState<GoalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      setError(null)

      const [goalsData, statsData] = await Promise.all([goalService.getAllGoals(), goalService.getGoalStats()])

      setGoals(goalsData)
      setGoalStats(statsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load goals")
    } finally {
      setLoading(false)
    }
  }

  const createGoal = async (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newGoal = await goalService.createGoal(goalData)
      setGoals((prev) => [...prev, newGoal])

      // Refresh stats
      const updatedStats = await goalService.getGoalStats()
      setGoalStats(updatedStats)

      return newGoal
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create goal")
      throw err
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const updatedGoal = await goalService.updateGoal(id, updates)
      if (updatedGoal) {
        setGoals((prev) => prev.map((goal) => (goal.id === id ? updatedGoal : goal)))

        // Refresh stats
        const updatedStats = await goalService.getGoalStats()
        setGoalStats(updatedStats)
      }
      return updatedGoal
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update goal")
      throw err
    }
  }

  const updateGoalProgress = async (id: string, newValue: number) => {
    try {
      const updatedGoal = await goalService.updateGoalProgress(id, newValue)
      if (updatedGoal) {
        setGoals((prev) => prev.map((goal) => (goal.id === id ? updatedGoal : goal)))

        // Refresh stats
        const updatedStats = await goalService.getGoalStats()
        setGoalStats(updatedStats)
      }
      return updatedGoal
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update goal progress")
      throw err
    }
  }

  const deleteGoal = async (id: string) => {
    try {
      const success = await goalService.deleteGoal(id)
      if (success) {
        setGoals((prev) => prev.filter((goal) => goal.id !== id))

        // Refresh stats
        const updatedStats = await goalService.getGoalStats()
        setGoalStats(updatedStats)
      }
      return success
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete goal")
      throw err
    }
  }

  const getGoalsByStatus = (status: Goal["status"]) => {
    return goals.filter((goal) => goal.status === status)
  }

  const getGoalsByCategory = (category: Goal["category"]) => {
    return goals.filter((goal) => goal.category === category)
  }

  const getGoalsByPriority = (priority: Goal["priority"]) => {
    return goals.filter((goal) => goal.priority === priority)
  }

  return {
    goals,
    goalStats,
    loading,
    error,
    createGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
    refreshGoals: loadGoals,
    getGoalsByStatus,
    getGoalsByCategory,
    getGoalsByPriority,
  }
}
