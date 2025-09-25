/**
 * Goal Tracker Component
 * Comprehensive goal setting and tracking system for trading objectives
 */
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalOverview } from "./goal-tracker/goal-overview"
import { GoalCard } from "./goal-tracker/goal-card"
import { NewGoalDialog } from "./goal-tracker/new-goal-dialog"
import { mockGoals } from "@/data/mock-data"

export function GoalTracker() {
  const [goals] = useState(mockGoals)
  const [isAddingGoal, setIsAddingGoal] = useState(false)

  const activeGoals = goals.filter((goal) => goal.status === "active")
  const completedGoals = goals.filter((goal) => goal.status === "completed")

  return (
    <div className="space-y-6">
      <GoalOverview goals={goals} />

      {/* Goals Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex items-center justify-between mb-4">
         <TabsList className="grid w-full max-w-md grid-cols-1 sm:grid-cols-3 gap-1 h-auto p-1 bg-slate-100/80 rounded-lg border border-slate-200/50">
  <TabsTrigger 
    value="active"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Active ({activeGoals.length})</span>
  </TabsTrigger>
  <TabsTrigger 
    value="completed"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">Completed ({completedGoals.length})</span>
  </TabsTrigger>
  <TabsTrigger 
    value="all"
    className="flex items-center justify-center h-10 sm:h-9 px-2 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white/50"
  >
    <span className="truncate">All ({goals.length})</span>
  </TabsTrigger>
</TabsList>
          <NewGoalDialog isOpen={isAddingGoal} onOpenChange={setIsAddingGoal} />
        </div>

        <TabsContent value="active" className="space-y-4">
          {activeGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
