/**
 * Performance Metrics Component
 * Comprehensive trading performance analytics and KPI display
 */

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Target, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { dailyPnLData, monthlyPerformance, performanceMetrics, riskMetrics } from "@/data/mock-data"



const MetricCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <div
              className={`flex items-center gap-1 text-sm ${
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : trend === "down" ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : null}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${
            trend === "up"
              ? "bg-green-100 text-green-600"
              : trend === "down"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
          }`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card>
)

export function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Performance Analytics
          </CardTitle>
          <CardDescription>Comprehensive trading performance metrics and analysis</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
       <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 h-auto p-1 bg-slate-100/80 rounded-lg border border-slate-200/50">
  <TabsTrigger 
    value="overview"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Overview</span>
  </TabsTrigger>
  <TabsTrigger 
    value="pnl"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">P&L Analysis</span>
  </TabsTrigger>
  <TabsTrigger 
    value="risk"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Risk Metrics</span>
  </TabsTrigger>
  <TabsTrigger 
    value="comparison"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Comparison</span>
  </TabsTrigger>
</TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Profit"
              value={`$${performanceMetrics.totalProfit.toLocaleString()}`}
              change="+12.4% this month"
              icon={DollarSign}
              trend="up"
            />
            <MetricCard
              title="Win Rate"
              value={`${performanceMetrics.winRate}%`}
              change="+2.1% vs last month"
              icon={Target}
              trend="up"
            />
            <MetricCard
              title="Total Trades"
              value={performanceMetrics.totalTrades}
              change="+15 this month"
              icon={BarChart3}
              trend="up"
            />
            <MetricCard
              title="Profit Factor"
              value={performanceMetrics.profitFactor}
              change="+0.12 improvement"
              icon={TrendingUp}
              trend="up"
            />
          </div>

          {/* Detailed Metrics */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trading Statistics</CardTitle>
                <CardDescription>Detailed performance breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Win</span>
                    <Badge variant="secondary" className="text-green-600">
                      ${performanceMetrics.avgWin}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Loss</span>
                    <Badge variant="secondary" className="text-red-600">
                      ${performanceMetrics.avgLoss}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sharpe Ratio</span>
                    <Badge variant="secondary">{performanceMetrics.sharpeRatio}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Max Drawdown</span>
                    <Badge variant="secondary" className="text-red-600">
                      {performanceMetrics.maxDrawdown}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg Hold Time</span>
                    <Badge variant="secondary">{performanceMetrics.avgHoldTime}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Highlights</CardTitle>
                <CardDescription>Best and worst trading records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Best Trade</span>
                    <Badge className="bg-green-100 text-green-800">+${performanceMetrics.bestTrade}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Worst Trade</span>
                    <Badge className="bg-red-100 text-red-800">${performanceMetrics.worstTrade}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Consecutive Wins</span>
                    <Badge variant="secondary">{performanceMetrics.consecutiveWins}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Consecutive Losses</span>
                    <Badge variant="secondary">{performanceMetrics.consecutiveLosses}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Return</span>
                    <Badge className="bg-blue-100 text-blue-800">{performanceMetrics.monthlyReturn}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* P&L Analysis Tab */}
        <TabsContent value="pnl" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily P&L Trend</CardTitle>
                <CardDescription>Daily profit and loss with cumulative performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyPnLData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "pnl" ? `$${value}` : `$${value}`,
                        name === "pnl" ? "Daily P&L" : "Cumulative",
                      ]}
                      labelStyle={{ color: "#000" }}
                    />
                    <Area type="monotone" dataKey="cumulative" stroke="#0ea5e9" fill="url(#pnlGradient)" />
                    <defs>
                      <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Monthly profit and trade statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "profit") return [`$${value}`, "Profit"]
                        if (name === "trades") return [value, "Trades"]
                        if (name === "winRate") return [`${value}%`, "Win Rate"]
                        return [value, name]
                      }}
                      labelStyle={{ color: "#000" }}
                    />
                    <Bar dataKey="profit" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Metrics Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>Comprehensive risk analysis and metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <Badge
                        variant={
                          metric.status === "excellent"
                            ? "default"
                            : metric.status === "good"
                              ? "secondary"
                              : metric.status === "warning"
                                ? "destructive"
                                : "outline"
                        }
                        className={
                          metric.status === "excellent"
                            ? "bg-green-100 text-green-800"
                            : metric.status === "good"
                              ? "bg-blue-100 text-blue-800"
                              : metric.status === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : ""
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Benchmark Comparison</CardTitle>
              <CardDescription>Compare your performance against market benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Your Performance</p>
                    <p className="text-2xl font-bold text-green-600">+156.8%</p>
                    <p className="text-xs text-muted-foreground">Annual Return</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">S&P 500</p>
                    <p className="text-2xl font-bold">+12.4%</p>
                    <p className="text-xs text-muted-foreground">Annual Return</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Outperformance</p>
                    <p className="text-2xl font-bold text-primary">+144.4%</p>
                    <p className="text-xs text-muted-foreground">vs Benchmark</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button variant="outline">View Detailed Comparison</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
