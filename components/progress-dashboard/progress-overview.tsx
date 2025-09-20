"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgressCharts } from "./progress-charts"
import { MilestoneTracker } from "./milestone-tracker"
import { ProgressSummary } from "./progress-overview/progress-summary"
import { ProgressGrid } from "./progress-overview/progress-grid"

export function ProgressOverview() {
  return (
    <div className="space-y-6">
      <ProgressSummary overallProgress={78} />
      <ProgressGrid />
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto p-1 bg-slate-100/80 rounded-lg border border-slate-200/50">
          <TabsTrigger 
            value="charts" 
            className="flex items-center justify-center h-10 sm:h-9 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
          >
            <span className="truncate">Analytics Charts</span>
          </TabsTrigger>
          <TabsTrigger 
            value="milestones"
            className="flex items-center justify-center h-10 sm:h-9 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
          >
            <span className="truncate">Milestones</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="mt-6 focus:outline-none">
          <ProgressCharts />
        </TabsContent>
        
        <TabsContent value="milestones" className="mt-6 focus:outline-none">
          <MilestoneTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}