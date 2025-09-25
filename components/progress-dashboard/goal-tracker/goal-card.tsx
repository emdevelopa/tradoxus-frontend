/**
 * Goal Card Component
 * Individual goal display with progress and details
 */

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Target, Calendar, Trophy, TrendingUp, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Goal } from "@/data/mock-data"

const categoryIcons = {
  profit: DollarSign,
  winrate: Target,
  consistency: Calendar,
  learning: Trophy,
  risk: TrendingUp,
}

export const categoryColors = {
  trading: "bg-green-100 text-green-800",
  learning: "bg-blue-100 text-blue-800",
  consistency: "bg-purple-100 text-purple-800",
  risk: "bg-orange-100 text-orange-800",
  milestone: "bg-pink-100 text-pink-800",
  profit: "bg-green-100 text-green-800 border-green-200",
  winrate: "bg-blue-100 text-blue-800 border-blue-200",
}


export const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}


interface GoalCardProps {
  goal: Goal
}

export function GoalCard({ goal }: GoalCardProps) {
  const Icon = categoryIcons[goal.category]
  const progressPercentage = Math.min((goal.currentValue / goal.targetValue) * 100, 100)
  const isCompleted = goal.status === "completed"

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining(goal.deadline)

  if (isCompleted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-green-800">{goal.title}</h3>
                  <p className="text-sm text-green-600">{goal.description}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Trophy className="h-4 w-4" />
                <span>Reward: {goal.reward}</span>
              </div>
              <span className="text-sm text-green-600">Completed: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Goal Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className={cn("p-2 rounded-lg", categoryColors[goal.category])}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{goal.title}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={priorityColors[goal.priority]}>{goal.priority}</Badge>
              <Badge className={categoryColors[goal.category]}>{goal.category}</Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Progress: {goal.currentValue}
                {goal.unit} / {goal.targetValue}
                {goal.unit}
              </span>
              <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {daysRemaining > 0 ? `${daysRemaining} days left` : `${Math.abs(daysRemaining)} days overdue`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span>{goal.reward}</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update Progress
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
