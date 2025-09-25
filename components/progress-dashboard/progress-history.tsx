/**
 * Progress History Timeline Component
 * Displays chronological trading progress and milestone achievements
 */

"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { History, TrendingUp, Trophy, Target, BookOpen, Shield, Star, Clock, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { exportProgressData, downloadBlob } from "@/app/services/export-service"
import { mockHistoryEvents } from "@/data/mock-data"



const eventIcons = {
  achievement: Trophy,
  milestone: Target,
  trade: TrendingUp,
  learning: BookOpen,
  goal: Star,
  risk: Shield,
}

const impactColors = {
  positive: "text-green-600 bg-green-100 border-green-200",
  negative: "text-red-600 bg-red-100 border-red-200",
  neutral: "text-blue-600 bg-blue-100 border-blue-200",
}

const typeColors = {
  achievement: "text-yellow-600 bg-yellow-100",
  milestone: "text-purple-600 bg-purple-100",
  trade: "text-green-600 bg-green-100",
  learning: "text-blue-600 bg-blue-100",
  goal: "text-orange-600 bg-orange-100",
  risk: "text-red-600 bg-red-100",
}

export function ProgressHistory() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImpact, setSelectedImpact] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  // Filter events based on selections
  const filteredEvents = mockHistoryEvents.filter((event) => {
    const timeframeMatch =
      selectedTimeframe === "all" ||
      (selectedTimeframe === "week" && new Date(event.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (selectedTimeframe === "month" && new Date(event.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
      (selectedTimeframe === "quarter" && new Date(event.date) >= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))

    const categoryMatch = selectedCategory === "all" || event.category === selectedCategory
    const impactMatch = selectedImpact === "all" || event.impact === selectedImpact

    return timeframeMatch && categoryMatch && impactMatch
  })

  const getEventStats = () => {
    const total = filteredEvents.length
    const positive = filteredEvents.filter((e) => e.impact === "positive").length
    const negative = filteredEvents.filter((e) => e.impact === "negative").length
    const achievements = filteredEvents.filter((e) => e.type === "achievement").length

    return { total, positive, negative, achievements }
  }

  const stats = getEventStats()

  const handleExport = async (format: "csv" | "pdf") => {
    setIsExporting(true)
    try {
      const exportData = {
        historyEvents: filteredEvents,
        stats,
        timeframe: selectedTimeframe,
        category: selectedCategory,
        impact: selectedImpact,
      }

      const blob = await exportProgressData(format, exportData)
      const filename = `progress-history-${new Date().toISOString().split("T")[0]}.${format}`
      downloadBlob(blob, filename)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* History Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Progress History
              </CardTitle>
              <CardDescription>Your complete trading journey timeline</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="quarter">3 Months</SelectItem>
                  <SelectItem value="month">1 Month</SelectItem>
                  <SelectItem value="week">1 Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.positive}</div>
              <div className="text-sm text-muted-foreground">Positive</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.negative}</div>
              <div className="text-sm text-muted-foreground">Negative</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.achievements}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Category:</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Trading Performance">Trading Performance</SelectItem>
                  <SelectItem value="Risk Management">Risk Management</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Goals">Goals</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Consistency">Consistency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Impact:</label>
              <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Chronological view of your trading progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredEvents.map((event, index) => {
              const IconComponent = eventIcons[event.type] || Clock
              const isLast = index === filteredEvents.length - 1

              return (
                <div key={event.id} className="flex gap-4">
                  {/* Timeline Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2",
                        impactColors[event.impact],
                      )}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    {!isLast && <div className="w-px h-16 bg-border mt-2" />}
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={typeColors[event.type]}>{event.type}</Badge>
                        <Badge variant="outline">{new Date(event.date).toLocaleDateString()}</Badge>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Category: {event.category}</span>
                      {event.value && (
                        <span
                          className={cn("font-medium", event.impact === "positive" ? "text-green-600" : "text-red-600")}
                        >
                          {event.type === "trade" && event.value > 0 ? "+" : ""}
                          {event.type === "trade"
                            ? `$${Math.abs(event.value)}`
                            : `${event.value}${event.type === "milestone" ? "%" : ""}`}
                        </span>
                      )}
                      {event.change && (
                        <span className={cn("font-medium", event.change > 0 ? "text-green-600" : "text-red-600")}>
                          {event.change > 0 ? "+" : ""}
                          {event.change}%
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    {event.metadata && (
                      <div className="mt-2 flex items-center gap-2">
                        {event.metadata.points && (
                          <Badge variant="secondary" className="text-yellow-600">
                            +{event.metadata.points} XP
                          </Badge>
                        )}
                        {event.metadata.tier && (
                          <Badge variant="secondary" className="capitalize">
                            {event.metadata.tier} Tier
                          </Badge>
                        )}
                        {event.metadata.duration && <Badge variant="outline">{event.metadata.duration}</Badge>}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more events.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Share</CardTitle>
          <CardDescription>Export your progress history for analysis or sharing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => handleExport("pdf")} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              Export to PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport("csv")} disabled={isExporting}>
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
            <Button variant="outline">
              <Trophy className="h-4 w-4 mr-2" />
              Share Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
