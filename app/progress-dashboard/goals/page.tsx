import { GoalTracker } from "@/components/progress-dashboard/goal-tracker";

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Goals</h2>
        <p className="text-muted-foreground">Track and manage your trading objectives</p>
      </div>
      <GoalTracker />
    </div>
  )
}
