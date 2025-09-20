/**
 * Goal Overview Component
 * Displays overall goal progress and statistics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target } from "lucide-react"
import type { Goal } from "@/data/mock-data"

interface GoalOverviewProps {
  goals: Goal[]
}

export function GoalOverview({ goals }: GoalOverviewProps) {
  const activeGoals = goals.filter((goal) => goal.status === "active")
  const completedGoals = goals.filter((goal) => goal.status === "completed")
  const overallProgress = goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Goal Tracker
            </CardTitle>
            <CardDescription>Set and track your trading objectives</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Goal Progress</span>
            <Badge variant="secondary">{overallProgress.toFixed(0)}%</Badge>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedGoals.length} completed</span>
            <span>{activeGoals.length} active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
