import { TradingJournal } from "@/components/progress-dashboard/trading-journal";

export default function JournalPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Trading Journal</h2>
        <p className="text-muted-foreground">Document your trades, strategies, and learning insights</p>
      </div>
      <TradingJournal />
    </div>
  )
}
