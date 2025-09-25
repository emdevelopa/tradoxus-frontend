import { ProgressHistory } from "@/components/progress-dashboard/progress-history";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Progress History</h2>
        <p className="text-muted-foreground">Historical view of your trading progress and development</p>
      </div>
      <ProgressHistory/>
    </div>
  )
}
