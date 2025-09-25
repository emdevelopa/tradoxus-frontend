"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"
import { exportProgressData, downloadBlob } from "@/app/services/export-service"

export function Header() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: "csv" | "pdf") => {
    setIsExporting(true)
    try {
      const exportData = {
        overallProgress: 78,
        tradingPerformance: 85,
        learningCompletion: 72,
        skillDevelopment: 80,
        riskManagement: 88,
        strategyImplementation: 75,
        tradingConsistency: 82,
        portfolioGrowth: 91,
        tradingPsychology: 69,
        performanceMetrics: {
          totalProfit: 24750,
          totalTrades: 342,
          winRate: 78.5,
          profitFactor: 2.34,
          sharpeRatio: 1.67,
          maxDrawdown: -8.2,
        },
        goals: [
          { title: "Achieve 80% Win Rate", progress: 84, status: "In Progress", dueDate: "2024-12-31" },
          { title: "Complete Risk Management Course", progress: 80, status: "In Progress", dueDate: "2024-11-15" },
          { title: "Master Position Sizing", progress: 100, status: "Completed", dueDate: null },
        ],
        achievements: [
          { title: "Risk Master", category: "Risk Management", dateEarned: "2024-10-15", points: 500, tier: "Gold" },
          { title: "Consistency Champion", category: "Trading", dateEarned: "2024-09-30", points: 400, tier: "Gold" },
        ],
      }

      const blob = await exportProgressData(format, exportData)
      const filename = `tradoxus-progress-${new Date().toISOString().split("T")[0]}.${format}`
      downloadBlob(blob, filename)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="lg:pl-72">
        <div className="mx-auto px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent truncate">
                  Progress Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Track your trading journey</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Card className="px-2 sm:px-3 py-1.5 sm:py-2 bg-green-50 border-green-200">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-green-700">Live</span>
                </div>
              </Card>

              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("csv")}
                  disabled={isExporting}
                  className="border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("pdf")}
                  disabled={isExporting}
                  className="border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                  <span className="hidden sm:inline">PDF</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}