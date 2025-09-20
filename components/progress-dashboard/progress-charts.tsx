/**
 * Progress Charts Component
 * Advanced visualization components for trading progress analytics
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Calendar, Target } from "lucide-react"

// Mock data for various chart types
const performanceData = [
  { month: "Jan", profit: 2400, trades: 45, winRate: 68 },
  { month: "Feb", profit: 1398, trades: 52, winRate: 72 },
  { month: "Mar", profit: 9800, trades: 38, winRate: 65 },
  { month: "Apr", profit: 3908, trades: 61, winRate: 78 },
  { month: "May", profit: 4800, trades: 44, winRate: 82 },
  { month: "Jun", profit: 3800, trades: 55, winRate: 75 },
]

const skillRadarData = [
  { skill: "Technical Analysis", current: 85, target: 90 },
  { skill: "Risk Management", current: 88, target: 95 },
  { skill: "Psychology", current: 69, target: 85 },
  { skill: "Strategy", current: 75, target: 88 },
  { skill: "Market Knowledge", current: 82, target: 90 },
  { skill: "Execution", current: 78, target: 85 },
]

const portfolioData = [
  { name: "Stocks", value: 45, color: "#0ea5e9" },
  { name: "Crypto", value: 30, color: "#06b6d4" },
  { name: "Forex", value: 15, color: "#8b5cf6" },
  { name: "Commodities", value: 10, color: "#10b981" },
]

const consistencyData = [
  { week: "W1", trades: 12, profit: 450, consistency: 85 },
  { week: "W2", trades: 15, profit: 320, consistency: 78 },
  { week: "W3", trades: 18, profit: 680, consistency: 92 },
  { week: "W4", trades: 14, profit: 290, consistency: 71 },
  { week: "W5", trades: 16, profit: 520, consistency: 88 },
  { week: "W6", trades: 13, profit: 410, consistency: 83 },
]

export function ProgressCharts() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 h-auto p-1 bg-slate-100/80 rounded-lg border border-slate-200/50">
  <TabsTrigger 
    value="performance"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Performance</span>
  </TabsTrigger>
  <TabsTrigger 
    value="skills"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Skills</span>
  </TabsTrigger>
  <TabsTrigger 
    value="portfolio"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Portfolio</span>
  </TabsTrigger>
  <TabsTrigger 
    value="consistency"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Consistency</span>
  </TabsTrigger>
</TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Monthly Profit Trend
                </CardTitle>
                <CardDescription>Your trading profit over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Profit"]} labelStyle={{ color: "#000" }} />
                    <Area type="monotone" dataKey="profit" stroke="#0ea5e9" fill="url(#profitGradient)" />
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
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
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Win Rate Analysis
                </CardTitle>
                <CardDescription>Trading success rate by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 85]} />
                    <Tooltip formatter={(value) => [`${value}%`, "Win Rate"]} labelStyle={{ color: "#000" }} />
                    <Line
                      type="monotone"
                      dataKey="winRate"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skill Development Radar</CardTitle>
              <CardDescription>Current skill levels vs target goals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current" dataKey="current" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="target" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your trading portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Breakdown</CardTitle>
                <CardDescription>Detailed asset allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <Badge variant="secondary">{item.value}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Consistency Tab */}
        <TabsContent value="consistency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                Trading Consistency Score
              </CardTitle>
              <CardDescription>Weekly consistency metrics and trade frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={consistencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "consistency") return [`${value}%`, "Consistency Score"]
                      if (name === "trades") return [value, "Number of Trades"]
                      return [`$${value}`, "Profit"]
                    }}
                    labelStyle={{ color: "#000" }}
                  />
                  <Bar dataKey="consistency" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
