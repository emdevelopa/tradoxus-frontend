/**
 * Achievement Card Component
 * Individual achievement display with progress and status
 */

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Shield, Brain, TrendingUp, Calendar, Crown, Lock, CheckCircle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { type Achievement } from "@/data/mock-data"

const iconMap = {
  trophy: Trophy,
  star: Star,
  target: Target,
  shield: Shield,
  brain: Brain,
  "trending-up": TrendingUp,
  calendar: Calendar,
  crown: Crown,
}

export const tierColors = {
  bronze: "bg-amber-100 text-amber-800 border-amber-200",
  silver: "bg-gray-100 text-gray-800 border-gray-200",
  gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
  platinum: "bg-purple-100 text-purple-800 border-purple-200",
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


interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        achievement.unlocked
          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md"
          : "opacity-75 hover:opacity-100",
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Achievement Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-3 rounded-lg",
                  achievement.unlocked ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400",
                )}
              >
                {achievement.unlocked ? <IconComponent className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <h3 className={cn("font-semibold", achievement.unlocked ? "text-yellow-800" : "text-gray-600")}>
                  {achievement.title}
                </h3>
                <p className={cn("text-sm", achievement.unlocked ? "text-yellow-600" : "text-gray-500")}>
                  {achievement.description}
                </p>
              </div>
            </div>
            {achievement.unlocked && <CheckCircle className="h-5 w-5 text-green-600" />}
          </div>

          {/* Progress */}
          {!achievement.unlocked && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className={tierColors[achievement.tier]}>{achievement.tier}</Badge>
              <Badge className={categoryColors[achievement.category]}>{achievement.category}</Badge>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Zap className="h-4 w-4 text-yellow-600" />
              <span>{achievement.points} XP</span>
            </div>
          </div>

          {achievement.unlocked && achievement.unlockedAt && (
            <div className="text-xs text-muted-foreground">
              Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
