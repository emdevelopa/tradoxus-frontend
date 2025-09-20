/**
 * Milestone Tracker Component
 * Tracks and displays trading milestones and learning achievements
 */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Star, Trophy, Target, Calendar, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { milestones } from "@/data/mock-data"

const categoryColors = {
  trading: "bg-green-100 text-green-800 border-green-200",
  learning: "bg-blue-100 text-blue-800 border-blue-200",
  risk: "bg-orange-100 text-orange-800 border-orange-200",
  psychology: "bg-purple-100 text-purple-800 border-purple-200",
}

const categoryIcons = {
  trading: TrendingUp,
  learning: Star,
  risk: Target,
  psychology: Trophy,
}

export function MilestoneTracker() {
  const completedMilestones = milestones.filter((m) => m.completed).length
  const totalMilestones = milestones.length
  const overallProgress = (completedMilestones / totalMilestones) * 100

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                Milestone Progress
              </CardTitle>
              <CardDescription>Track your trading development milestones</CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {completedMilestones}/{totalMilestones}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{overallProgress.toFixed(0)}% Complete</span>
              <span>{totalMilestones - completedMilestones} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone) => {
          const Icon = categoryIcons[milestone.category]
          const progressPercentage = (milestone.progress / milestone.target) * 100

          return (
            <Card
              key={milestone.id}
              className={cn(
                "transition-all duration-200",
                milestone.completed ? "bg-green-50 border-green-200" : "hover:shadow-md",
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className="mt-1">
                    {milestone.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={cn("font-semibold text-lg", milestone.completed && "text-green-800")}>
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">{milestone.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={categoryColors[milestone.category]}>
                          <Icon className="h-3 w-3 mr-1" />
                          {milestone.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress */}
                    {!milestone.completed && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Progress: {milestone.progress}/{milestone.target}
                          </span>
                          <span>{progressPercentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                    )}

                    {/* Reward and Due Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>{milestone.reward}</span>
                      </div>

                      {milestone.dueDate && !milestone.completed && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {milestone.dueDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {!milestone.completed && (
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
