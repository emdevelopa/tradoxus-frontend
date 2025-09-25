
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ProgressSummaryProps {
  overallProgress: number
}

export function ProgressSummary({ overallProgress }: ProgressSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Overall Progress</CardTitle>
            <CardDescription>Your comprehensive trading development score</CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {overallProgress}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={overallProgress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span>Expert</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
