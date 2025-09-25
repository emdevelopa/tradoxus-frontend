/**
 * Progress Service
 * Handles all progress tracking and analytics data operations
 */

export interface ProgressData {
  overallProgress: number
  tradingPerformance: number
  learningCompletion: number
  skillDevelopment: number
  riskManagement: number
  strategyImplementation: number
  tradingConsistency: number
  portfolioGrowth: number
  tradingPsychology: number
}

export interface PerformanceMetrics {
  totalProfit: number
  totalTrades: number
  winRate: number
  avgWin: number
  avgLoss: number
  profitFactor: number
  sharpeRatio: number
  maxDrawdown: number
  avgHoldTime: string
  bestTrade: number
  worstTrade: number
  consecutiveWins: number
  consecutiveLosses: number
  monthlyReturn: number
  yearlyReturn: number
}

export interface ChartData {
  performanceData: Array<{
    month: string
    profit: number
    trades: number
    winRate: number
  }>
  skillRadarData: Array<{
    skill: string
    current: number
    target: number
  }>
  portfolioData: Array<{
    name: string
    value: number
    color: string
  }>
  consistencyData: Array<{
    week: string
    trades: number
    profit: number
    consistency: number
  }>
  dailyPnLData: Array<{
    date: string
    pnl: number
    cumulative: number
  }>
}

class ProgressService {
  private static instance: ProgressService
  private progressData: ProgressData
  private performanceMetrics: PerformanceMetrics
  private chartData: ChartData

  private constructor() {
    // Initialize with mock data
    this.progressData = {
      overallProgress: 78,
      tradingPerformance: 85,
      learningCompletion: 72,
      skillDevelopment: 80,
      riskManagement: 88,
      strategyImplementation: 75,
      tradingConsistency: 82,
      portfolioGrowth: 91,
      tradingPsychology: 69,
    }

    this.performanceMetrics = {
      totalProfit: 24750,
      totalTrades: 342,
      winRate: 78.5,
      avgWin: 145,
      avgLoss: -89,
      profitFactor: 2.34,
      sharpeRatio: 1.67,
      maxDrawdown: -8.2,
      avgHoldTime: "2.3 days",
      bestTrade: 890,
      worstTrade: -245,
      consecutiveWins: 12,
      consecutiveLosses: 4,
      monthlyReturn: 12.4,
      yearlyReturn: 156.8,
    }

    this.chartData = {
      performanceData: [
        { month: "Jan", profit: 2400, trades: 45, winRate: 68 },
        { month: "Feb", profit: 1398, trades: 52, winRate: 72 },
        { month: "Mar", profit: 9800, trades: 38, winRate: 65 },
        { month: "Apr", profit: 3908, trades: 61, winRate: 78 },
        { month: "May", profit: 4800, trades: 44, winRate: 82 },
        { month: "Jun", profit: 3800, trades: 55, winRate: 75 },
      ],
      skillRadarData: [
        { skill: "Technical Analysis", current: 85, target: 90 },
        { skill: "Risk Management", current: 88, target: 95 },
        { skill: "Psychology", current: 69, target: 85 },
        { skill: "Strategy", current: 75, target: 88 },
        { skill: "Market Knowledge", current: 82, target: 90 },
        { skill: "Execution", current: 78, target: 85 },
      ],
      portfolioData: [
        { name: "Stocks", value: 45, color: "#0ea5e9" },
        { name: "Crypto", value: 30, color: "#06b6d4" },
        { name: "Forex", value: 15, color: "#8b5cf6" },
        { name: "Commodities", value: 10, color: "#10b981" },
      ],
      consistencyData: [
        { week: "W1", trades: 12, profit: 450, consistency: 85 },
        { week: "W2", trades: 15, profit: 320, consistency: 78 },
        { week: "W3", trades: 18, profit: 680, consistency: 92 },
        { week: "W4", trades: 14, profit: 290, consistency: 71 },
        { week: "W5", trades: 16, profit: 520, consistency: 88 },
        { week: "W6", trades: 13, profit: 410, consistency: 83 },
      ],
      dailyPnLData: [
        { date: "2024-01-01", pnl: 120, cumulative: 120 },
        { date: "2024-01-02", pnl: -45, cumulative: 75 },
        { date: "2024-01-03", pnl: 230, cumulative: 305 },
        { date: "2024-01-04", pnl: 180, cumulative: 485 },
        { date: "2024-01-05", pnl: -90, cumulative: 395 },
        { date: "2024-01-06", pnl: 340, cumulative: 735 },
        { date: "2024-01-07", pnl: 150, cumulative: 885 },
      ],
    }
  }

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService()
    }
    return ProgressService.instance
  }

  // Progress Data Methods
  async getProgressData(): Promise<ProgressData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.progressData
  }

  async updateProgressData(updates: Partial<ProgressData>): Promise<ProgressData> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    this.progressData = { ...this.progressData, ...updates }
    return this.progressData
  }

  // Performance Metrics Methods
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    return this.performanceMetrics
  }

  async updatePerformanceMetrics(updates: Partial<PerformanceMetrics>): Promise<PerformanceMetrics> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    this.performanceMetrics = { ...this.performanceMetrics, ...updates }
    return this.performanceMetrics
  }

  // Chart Data Methods
  async getChartData(): Promise<ChartData> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.chartData
  }

  // Analytics Methods
  async getProgressAnalytics(timeframe: "week" | "month" | "year" = "month") {
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Generate analytics based on timeframe
    const analytics = {
      progressTrend: timeframe === "week" ? 2.3 : timeframe === "month" ? 8.7 : 45.2,
      improvementAreas: ["Trading Psychology", "Strategy Implementation"],
      strongAreas: ["Risk Management", "Portfolio Growth"],
      recommendations: [
        "Focus on emotional control during high volatility periods",
        "Practice more advanced technical analysis patterns",
        "Consider diversifying into new asset classes",
      ],
    }

    return analytics
  }

  // Real-time Updates Simulation
  subscribeToProgressUpdates(callback: (data: ProgressData) => void) {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Randomly update some progress values
      const updates: Partial<ProgressData> = {}

      if (Math.random() > 0.7) {
        updates.tradingPerformance = Math.min(100, this.progressData.tradingPerformance + Math.random() * 2)
      }

      if (Math.random() > 0.8) {
        updates.learningCompletion = Math.min(100, this.progressData.learningCompletion + Math.random() * 1.5)
      }

      if (Object.keys(updates).length > 0) {
        this.progressData = { ...this.progressData, ...updates }
        callback(this.progressData)
      }
    }, 30000)

    // Return cleanup function
    return () => clearInterval(interval)
  }
}

export const progressService = ProgressService.getInstance()
