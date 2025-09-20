import { PerformanceMetrics } from "@/components/progress-dashboard/performance-metrics";

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Performance</h2>
        <p className="text-muted-foreground">Detailed trading performance analytics and metrics</p>
      </div>
      <PerformanceMetrics />
    </div>
  )
}
