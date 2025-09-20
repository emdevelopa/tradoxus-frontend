/**
 * Custom React Hook for Progress Data
 * Provides easy access to progress tracking data with loading states
 */
"use client"

import { useState, useEffect } from "react"
import {
  progressService,
  type ProgressData,
  type PerformanceMetrics,
  type ChartData,
} from "@/lib/services/progress-service"

export function useProgressData() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null)
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [progress, performance, charts] = await Promise.all([
          progressService.getProgressData(),
          progressService.getPerformanceMetrics(),
          progressService.getChartData(),
        ])

        setProgressData(progress)
        setPerformanceMetrics(performance)
        setChartData(charts)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load progress data")
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Subscribe to real-time updates
    const unsubscribe = progressService.subscribeToProgressUpdates((updatedData) => {
      setProgressData(updatedData)
    })

    return unsubscribe
  }, [])

  const updateProgress = async (updates: Partial<ProgressData>) => {
    try {
      const updatedData = await progressService.updateProgressData(updates)
      setProgressData(updatedData)
      return updatedData
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update progress")
      throw err
    }
  }

  const refreshData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [progress, performance, charts] = await Promise.all([
        progressService.getProgressData(),
        progressService.getPerformanceMetrics(),
        progressService.getChartData(),
      ])

      setProgressData(progress)
      setPerformanceMetrics(performance)
      setChartData(charts)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh data")
    } finally {
      setLoading(false)
    }
  }

  return {
    progressData,
    performanceMetrics,
    chartData,
    loading,
    error,
    updateProgress,
    refreshData,
  }
}
