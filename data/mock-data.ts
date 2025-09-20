/**
 * Centralized Mock Data
 * Contains all mock data that would typically come from backend APIs
 * This data represents realistic trading dashboard information
 */

// Achievement System Data
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
}

export const mockAchievements: Achievement[] = [
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
  },
]

// Goal Tracker Data
export interface Goal {
  id: string
  title: string
  description: string
  category: "profit" | "winrate" | "consistency" | "learning" | "risk"
  targetValue: number
  currentValue: number
  unit: string
  deadline: string
  priority: "low" | "medium" | "high"
  status: "active" | "completed" | "paused"
  createdAt: string
  reward: string
}

export const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Achieve 80% Win Rate",
    description: "Maintain a consistent win rate of 80% over the next 100 trades",
    category: "winrate",
    targetValue: 80,
    currentValue: 78.5,
    unit: "%",
    deadline: "2024-12-31",
    priority: "high",
    status: "active",
    createdAt: "2024-01-01",
    reward: "Advanced Strategy Course Access",
  },
  {
    id: "2",
    title: "Monthly Profit Target",
    description: "Generate $5,000 in trading profit this month",
    category: "profit",
    targetValue: 5000,
    currentValue: 3750,
    unit: "$",
    deadline: "2024-10-31",
    priority: "high",
    status: "active",
    createdAt: "2024-10-01",
    reward: "Performance Bonus",
  },
  {
    id: "3",
    title: "Complete Risk Management Course",
    description: "Finish all 12 modules of the advanced risk management course",
    category: "learning",
    targetValue: 12,
    currentValue: 8,
    unit: "modules",
    deadline: "2024-11-15",
    priority: "medium",
    status: "active",
    createdAt: "2024-09-15",
    reward: "Risk Management Certificate",
  },
  {
    id: "4",
    title: "Reduce Max Drawdown",
    description: "Keep maximum drawdown below 5% for 3 consecutive months",
    category: "risk",
    targetValue: 3,
    currentValue: 2,
    unit: "months",
    deadline: "2024-12-31",
    priority: "medium",
    status: "active",
    createdAt: "2024-08-01",
    reward: "Risk Control Badge",
  },
  {
    id: "5",
    title: "Daily Trading Consistency",
    description: "Trade every weekday for 30 consecutive days",
    category: "consistency",
    targetValue: 30,
    currentValue: 30,
    unit: "days",
    deadline: "2024-09-30",
    priority: "low",
    status: "completed",
    createdAt: "2024-09-01",
    reward: "Consistency Champion Badge",
  },
]

// Performance Metrics Data
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

export const mockPerformanceMetrics: PerformanceMetrics = {
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

export interface DailyPnLData {
  date: string
  pnl: number
  cumulative: number
}

export const mockDailyPnLData: DailyPnLData[] = [
  { date: "2024-01-01", pnl: 120, cumulative: 120 },
  { date: "2024-01-02", pnl: -45, cumulative: 75 },
  { date: "2024-01-03", pnl: 230, cumulative: 305 },
  { date: "2024-01-04", pnl: 180, cumulative: 485 },
  { date: "2024-01-05", pnl: -90, cumulative: 395 },
  { date: "2024-01-06", pnl: 340, cumulative: 735 },
  { date: "2024-01-07", pnl: 150, cumulative: 885 },
]

export interface MonthlyPerformance {
  month: string
  profit: number
  trades: number
  winRate: number
  drawdown: number
}

export const mockMonthlyPerformance: MonthlyPerformance[] = [
  { month: "Jan", profit: 2400, trades: 45, winRate: 68, drawdown: -3.2 },
  { month: "Feb", profit: 1398, trades: 52, winRate: 72, drawdown: -2.1 },
  { month: "Mar", profit: 3800, trades: 38, winRate: 65, drawdown: -4.5 },
  { month: "Apr", profit: 3908, trades: 61, winRate: 78, drawdown: -1.8 },
  { month: "May", profit: 4800, trades: 44, winRate: 82, drawdown: -2.9 },
  { month: "Jun", profit: 3800, trades: 55, winRate: 75, drawdown: -3.7 },
]

export interface RiskMetric {
  metric: string
  value: string
  status: "excellent" | "good" | "warning" | "poor"
}

export const mockRiskMetrics: RiskMetric[] = [
  { metric: "Value at Risk (95%)", value: "$1,250", status: "good" },
  { metric: "Expected Shortfall", value: "$1,890", status: "warning" },
  { metric: "Beta", value: "0.85", status: "good" },
  { metric: "Alpha", value: "0.12", status: "excellent" },
  { metric: "Volatility", value: "18.5%", status: "good" },
  { metric: "Correlation", value: "0.23", status: "good" },
]

// Progress History Data
export interface HistoryEvent {
  id: string
  date: string
  type: "achievement" | "milestone" | "trade" | "learning" | "goal" | "risk"
  title: string
  description: string
  value?: number
  change?: number
  impact: "positive" | "negative" | "neutral"
  category: string
  metadata?: Record<string, any>
}

export const mockHistoryEvents: HistoryEvent[] = [
  {
    id: "1",
    date: "2024-10-15",
    type: "achievement",
    title: "Risk Master Achievement Unlocked",
    description: "Successfully maintained proper risk management for 50 consecutive trades",
    impact: "positive",
    category: "Risk Management",
    metadata: { points: 500, tier: "gold" },
  },
  {
    id: "2",
    date: "2024-10-14",
    type: "trade",
    title: "Best Trade of the Month",
    description: "AAPL swing trade resulted in exceptional 12.5% return",
    value: 1250,
    change: 12.5,
    impact: "positive",
    category: "Trading Performance",
  },
  {
    id: "3",
    date: "2024-10-12",
    type: "milestone",
    title: "80% Win Rate Milestone",
    description: "Achieved and maintained 80% win rate over 100 trades",
    value: 80,
    impact: "positive",
    category: "Performance",
  },
  {
    id: "4",
    date: "2024-10-10",
    type: "goal",
    title: "Monthly Profit Goal Progress",
    description: "Reached 75% of monthly profit target ($3,750 of $5,000)",
    value: 3750,
    change: 25,
    impact: "positive",
    category: "Goals",
  },
  {
    id: "5",
    date: "2024-10-08",
    type: "learning",
    title: "Advanced Options Course Completed",
    description: "Successfully completed the Advanced Options Trading Strategies course",
    impact: "positive",
    category: "Education",
    metadata: { courseId: "options-advanced", duration: "40 hours" },
  },
  {
    id: "6",
    date: "2024-10-05",
    type: "risk",
    title: "Drawdown Alert Triggered",
    description: "Portfolio drawdown reached 6.2%, approaching risk limit",
    value: -6.2,
    impact: "negative",
    category: "Risk Management",
  },
  {
    id: "7",
    date: "2024-10-03",
    type: "trade",
    title: "Largest Loss of the Quarter",
    description: "TSLA position stopped out due to earnings disappointment",
    value: -890,
    change: -8.9,
    impact: "negative",
    category: "Trading Performance",
  },
  {
    id: "8",
    date: "2024-10-01",
    type: "milestone",
    title: "New Month Started",
    description: "October trading month commenced with updated goals and strategies",
    impact: "neutral",
    category: "Planning",
  },
  {
    id: "9",
    date: "2024-09-30",
    type: "achievement",
    title: "Consistency Champion Unlocked",
    description: "Traded every weekday for 30 consecutive days",
    impact: "positive",
    category: "Consistency",
    metadata: { points: 400, tier: "gold" },
  },
  {
    id: "10",
    date: "2024-09-28",
    type: "goal",
    title: "Q3 Profit Goal Achieved",
    description: "Exceeded quarterly profit target by 15% ($11,500 vs $10,000)",
    value: 11500,
    change: 15,
    impact: "positive",
    category: "Goals",
  },
]


// Milestone Tracker Data

interface Milestone {
  id: string
  title: string
  description: string
  category: "trading" | "learning" | "risk" | "psychology"
  progress: number
  target: number
  completed: boolean
  reward: string
  dueDate?: string
}

export const milestones: Milestone[] = [
  {
    id: "1",
    title: "Achieve 80% Win Rate",
    description: "Maintain a consistent win rate of 80% over 50 trades",
    category: "trading",
    progress: 42,
    target: 50,
    completed: false,
    reward: "500 XP + Advanced Strategy Badge",
    dueDate: "2024-12-31",
  },
  {
    id: "2",
    title: "Complete Risk Management Course",
    description: "Finish all modules in the advanced risk management curriculum",
    category: "learning",
    progress: 8,
    target: 10,
    completed: false,
    reward: "Risk Master Certificate",
    dueDate: "2024-11-15",
  },
  {
    id: "3",
    title: "Master Position Sizing",
    description: "Demonstrate proper position sizing in 100 consecutive trades",
    category: "risk",
    progress: 100,
    target: 100,
    completed: true,
    reward: "Position Sizing Expert Badge",
  },
  {
    id: "4",
    title: "Emotional Control Mastery",
    description: "Complete 30 days of trading journal with emotion tracking",
    category: "psychology",
    progress: 23,
    target: 30,
    completed: false,
    reward: "Psychology Master Badge",
    dueDate: "2024-10-30",
  },
  {
    id: "5",
    title: "Profitable Month Streak",
    description: "Achieve 6 consecutive profitable months",
    category: "trading",
    progress: 4,
    target: 6,
    completed: false,
    reward: "1000 XP + Consistency Champion",
    dueDate: "2025-02-28",
  },
]


// Mock performance data
export const performanceMetrics = {
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

// Daily P&L data for charts
export const dailyPnLData = [
  { date: "2024-01-01", pnl: 120, cumulative: 120 },
  { date: "2024-01-02", pnl: -45, cumulative: 75 },
  { date: "2024-01-03", pnl: 230, cumulative: 305 },
  { date: "2024-01-04", pnl: 180, cumulative: 485 },
  { date: "2024-01-05", pnl: -90, cumulative: 395 },
  { date: "2024-01-06", pnl: 340, cumulative: 735 },
  { date: "2024-01-07", pnl: 150, cumulative: 885 },
]

// Monthly performance data
export const monthlyPerformance = [
  { month: "Jan", profit: 2400, trades: 45, winRate: 68, drawdown: -3.2 },
  { month: "Feb", profit: 1398, trades: 52, winRate: 72, drawdown: -2.1 },
  { month: "Mar", profit: 3800, trades: 38, winRate: 65, drawdown: -4.5 },
  { month: "Apr", profit: 3908, trades: 61, winRate: 78, drawdown: -1.8 },
  { month: "May", profit: 4800, trades: 44, winRate: 82, drawdown: -2.9 },
  { month: "Jun", profit: 3800, trades: 55, winRate: 75, drawdown: -3.7 },
]

// Risk metrics data
export const riskMetrics = [
  { metric: "Value at Risk (95%)", value: "$1,250", status: "good" },
  { metric: "Expected Shortfall", value: "$1,890", status: "warning" },
  { metric: "Beta", value: "0.85", status: "good" },
  { metric: "Alpha", value: "0.12", status: "excellent" },
  { metric: "Volatility", value: "18.5%", status: "good" },
  { metric: "Correlation", value: "0.23", status: "good" },
]



export interface Trade {
  id: string
  symbol: string
  type: "buy" | "sell"
  quantity: number
  entryPrice: number
  exitPrice?: number
  entryDate: string
  exitDate?: string
  pnl?: number
  status: "open" | "closed"
  strategy: string
  notes: string
  emotion: "confident" | "fearful" | "greedy" | "neutral"
}

export const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "AAPL",
    type: "buy",
    quantity: 100,
    entryPrice: 150.25,
    exitPrice: 158.75,
    entryDate: "2024-01-15",
    exitDate: "2024-01-20",
    pnl: 850,
    status: "closed",
    strategy: "Momentum",
    notes: "Strong earnings report, broke resistance",
    emotion: "confident",
  },
  {
    id: "2",
    symbol: "TSLA",
    type: "buy",
    quantity: 50,
    entryPrice: 245.8,
    entryDate: "2024-01-22",
    status: "open",
    strategy: "Swing Trading",
    notes: "Oversold bounce play",
    emotion: "neutral",
  },
  {
    id: "3",
    symbol: "MSFT",
    type: "buy",
    quantity: 75,
    entryPrice: 380.5,
    exitPrice: 375.2,
    entryDate: "2024-01-18",
    exitDate: "2024-01-25",
    pnl: -397.5,
    status: "closed",
    strategy: "Value",
    notes: "Stopped out, market weakness",
    emotion: "fearful",
  },
]