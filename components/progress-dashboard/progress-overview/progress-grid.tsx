
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, BookOpen, Shield, Brain, BarChart3, Trophy, Calendar } from "lucide-react"

const progressItems = [
  {
    icon: TrendingUp,
    label: "Trading Performance",
    value: 85,
    description: "Win rate and profit consistency",
    color: "text-green-600",
  },
  {
    icon: BookOpen,
    label: "Learning Completion",
    value: 72,
    description: "Courses and educational content",
    color: "text-blue-600",
  },
  {
    icon: Target,
    label: "Skill Development",
    value: 80,
    description: "Technical and fundamental analysis",
    color: "text-purple-600",
  },
  {
    icon: Shield,
    label: "Risk Management",
    value: 88,
    description: "Position sizing and stop losses",
    color: "text-orange-600",
  },
  {
    icon: BarChart3,
    label: "Strategy Implementation",
    value: 75,
    description: "Trading plan execution",
    color: "text-cyan-600",
  },
  {
    icon: Calendar,
    label: "Trading Consistency",
    value: 82,
    description: "Regular trading activity",
    color: "text-teal-600",
  },
  {
    icon: Trophy,
    label: "Portfolio Growth",
    value: 91,
    description: "Account balance improvement",
    color: "text-yellow-600",
  },
  {
    icon: Brain,
    label: "Trading Psychology",
    value: 69,
    description: "Emotional control and discipline",
    color: "text-pink-600",
  },
]

export function ProgressGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {progressItems.map((item, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <Badge variant="outline">{item.value}%</Badge>
            </div>
            <CardTitle className="text-base">{item.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={item.value} className="h-2" />
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
