import { ProgressOverview } from "@/components/progress-dashboard/progress-overview";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Your comprehensive trading progress at a glance</p>
      </div>
      <ProgressOverview />
    </div>
  )
}
