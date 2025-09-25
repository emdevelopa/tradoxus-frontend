"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { BarChart3, Menu, Activity, TrendingUp, Target, Award, BookOpen, History, Settings, User } from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/progress-dashboard",
    icon: Activity,
    description: "Dashboard overview and key metrics",
  },
  {
    name: "Performance",
    href: "/progress-dashboard/performance",
    icon: TrendingUp,
    description: "Trading performance analytics",
  },
  {
    name: "Goals",
    href: "/progress-dashboard/goals",
    icon: Target,
    description: "Track your trading goals",
  },
  {
    name: "Achievements",
    href: "/progress-dashboard/achievements",
    icon: Award,
    description: "Earned badges and milestones",
  },
  {
    name: "Journal",
    href: "/progress-dashboard/journal",
    icon: BookOpen,
    description: "Trading journal and notes",
  },
  {
    name: "History",
    href: "/progress-dashboard/history",
    icon: History,
    description: "Progress history and analytics",
  },
]


interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col bg-gradient-to-b from-slate-50 to-white border-r border-slate-200">
      {/* Logo/Brand Section - Hide on mobile since we have SheetTitle */}
      {!isMobile && (
        <div className="flex h-16 items-center px-4 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 flex items-center justify-center shadow-md">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Tradoxus
              </h2>
              <p className="text-xs text-slate-500 font-medium">Trading Dashboard</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Section */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 border border-cyan-200/50 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
                    isActive ? "text-cyan-600" : "text-slate-400 group-hover:text-slate-600",
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-slate-500 group-hover:text-slate-600 truncate mt-0.5">
                    {item.description}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40", 
        className
      )}>
        <div className="flex flex-col flex-grow shadow-xl">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-slate-100 mr-2 transition-colors duration-200"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-72 p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left duration-300"
          >
            <SheetHeader className="px-4 py-4 border-b border-slate-200/60 bg-white/80">
              <SheetTitle className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    Tradoxus
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Trading Dashboard</div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <SidebarContent isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}