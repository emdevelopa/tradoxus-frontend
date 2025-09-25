import { AchievementSystem } from "@/components/progress-dashboard/achievement-system";

export default function AchievementsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Achievements</h2>
        <p className="text-muted-foreground">Your earned badges, milestones, and accomplishments</p>
      </div>
      <AchievementSystem />
    </div>
  )
}
