/**
 * Achievement Overview Component
 * Displays level progress and achievement statistics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"
import type { Achievement } from "@/data/mock-data"

interface AchievementOverviewProps {
  achievements: Achievement[]
}

export function AchievementOverview({ achievements }: AchievementOverviewProps) {
  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0)
  const completionRate = (unlockedAchievements.length / achievements.length) * 100

  // Calculate level based on points
  const level = Math.floor(totalPoints / 1000) + 1
  const pointsToNextLevel = level * 1000 - totalPoints
  const levelProgress = ((totalPoints % 1000) / 1000) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Achievement System
            </CardTitle>
            <CardDescription>Track your trading milestones and earn rewards</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">Level {level}</div>
            <div className="text-sm text-muted-foreground">{totalPoints} XP</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Level Progress</span>
            <span className="text-sm text-muted-foreground">{pointsToNextLevel} XP to next level</span>
          </div>
          <Progress value={levelProgress} className="h-3" />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{unlockedAchievements.length}</div>
              <div className="text-sm text-muted-foreground">Unlocked</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {achievements.length - unlockedAchievements.length}
              </div>
              <div className="text-sm text-muted-foreground">Locked</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{completionRate.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
