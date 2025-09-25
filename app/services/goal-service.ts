/**
 * Goal Service
 * Handles goal setting, tracking, and management operations
 */

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
  updatedAt: string
  reward: string
  milestones?: Array<{
    value: number
    description: string
    completed: boolean
    completedAt?: string
  }>
}

export interface GoalStats {
  totalGoals: number
  activeGoals: number
  completedGoals: number
  overallProgress: number
  categoryBreakdown: Record<string, number>
  priorityBreakdown: Record<string, number>
}

class GoalService {
  private static instance: GoalService
  private goals: Goal[]

  private constructor() {
    // Initialize with mock data
    this.goals = [
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
        updatedAt: "2024-10-15",
        reward: "Advanced Strategy Course Access",
        milestones: [
          { value: 75, description: "Reach 75% win rate", completed: true, completedAt: "2024-08-15" },
          { value: 78, description: "Reach 78% win rate", completed: true, completedAt: "2024-10-01" },
          { value: 80, description: "Reach 80% win rate", completed: false },
        ],
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
        updatedAt: "2024-10-15",
        reward: "Performance Bonus",
        milestones: [
          { value: 1000, description: "First $1,000", completed: true, completedAt: "2024-10-05" },
          { value: 2500, description: "Reach $2,500", completed: true, completedAt: "2024-10-10" },
          { value: 5000, description: "Reach $5,000", completed: false },
        ],
      },
      {
        id: "3",
        title: "Complete Risk Management Course",
        description: "Finish all 12 modules of the advanced risk management curriculum",
        category: "learning",
        targetValue: 12,
        currentValue: 8,
        unit: "modules",
        deadline: "2024-11-15",
        priority: "medium",
        status: "active",
        createdAt: "2024-09-15",
        updatedAt: "2024-10-10",
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
        updatedAt: "2024-10-01",
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
        updatedAt: "2024-09-30",
        reward: "Consistency Champion Badge",
      },
    ]
  }

  public static getInstance(): GoalService {
    if (!GoalService.instance) {
      GoalService.instance = new GoalService()
    }
    return GoalService.instance
  }

  // Goal CRUD Operations
  async getAllGoals(): Promise<Goal[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.goals]
  }

  async getGoalById(id: string): Promise<Goal | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.goals.find((goal) => goal.id === id) || null
  }

  async createGoal(goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">): Promise<Goal> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.goals.push(newGoal)
    return newGoal
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal | null> {
    await new Promise((resolve) => setTimeout(resolve, 150))

    const goalIndex = this.goals.findIndex((goal) => goal.id === id)
    if (goalIndex === -1) return null

    this.goals[goalIndex] = {
      ...this.goals[goalIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return this.goals[goalIndex]
  }

  async deleteGoal(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const goalIndex = this.goals.findIndex((goal) => goal.id === id)
    if (goalIndex === -1) return false

    this.goals.splice(goalIndex, 1)
    return true
  }

  // Goal Analytics
  async getGoalStats(): Promise<GoalStats> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const totalGoals = this.goals.length
    const activeGoals = this.goals.filter((goal) => goal.status === "active").length
    const completedGoals = this.goals.filter((goal) => goal.status === "completed").length
    const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

    const categoryBreakdown = this.goals.reduce(
      (acc, goal) => {
        acc[goal.category] = (acc[goal.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const priorityBreakdown = this.goals.reduce(
      (acc, goal) => {
        acc[goal.priority] = (acc[goal.priority] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      totalGoals,
      activeGoals,
      completedGoals,
      overallProgress,
      categoryBreakdown,
      priorityBreakdown,
    }
  }

  // Goal Progress Updates
  async updateGoalProgress(id: string, newValue: number): Promise<Goal | null> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const goal = await this.getGoalById(id)
    if (!goal) return null

    const updates: Partial<Goal> = {
      currentValue: newValue,
      updatedAt: new Date().toISOString(),
    }

    // Check if goal is completed
    if (newValue >= goal.targetValue && goal.status !== "completed") {
      updates.status = "completed"
    }

    // Update milestones if they exist
    if (goal.milestones) {
      updates.milestones = goal.milestones.map((milestone) => {
        if (newValue >= milestone.value && !milestone.completed) {
          return {
            ...milestone,
            completed: true,
            completedAt: new Date().toISOString(),
          }
        }
        return milestone
      })
    }

    return this.updateGoal(id, updates)
  }

  // Goal Filtering and Sorting
  async getGoalsByCategory(category: Goal["category"]): Promise<Goal[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.goals.filter((goal) => goal.category === category)
  }

  async getGoalsByStatus(status: Goal["status"]): Promise<Goal[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.goals.filter((goal) => goal.status === status)
  }

  async getGoalsByPriority(priority: Goal["priority"]): Promise<Goal[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.goals.filter((goal) => goal.priority === priority)
  }

  // Goal Recommendations
  async getGoalRecommendations(): Promise<Array<{ title: string; description: string; category: Goal["category"] }>> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const recommendations = [
      {
        title: "Improve Risk-Reward Ratio",
        description: "Aim for a minimum 2:1 risk-reward ratio on all trades",
        category: "risk" as const,
      },
      {
        title: "Master Chart Patterns",
        description: "Learn to identify and trade 10 key chart patterns",
        category: "learning" as const,
      },
      {
        title: "Increase Position Size Gradually",
        description: "Gradually increase position sizes as confidence grows",
        category: "risk" as const,
      },
      {
        title: "Develop Trading Routine",
        description: "Establish a consistent pre-market and post-market routine",
        category: "consistency" as const,
      },
    ]

    return recommendations
  }
}

export const goalService = GoalService.getInstance()
