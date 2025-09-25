import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/progress-dashboard/dashboard-header"
import { DashboardSkeleton } from "@/components/progress-dashboard/dashboard-skeleton"
import { Sidebar } from "@/components/progress-dashboard/dashboard-sidebar"

export const metadata: Metadata = {
  title: "Tradoxus - Trading Progress Dashboard",
  description: "Track your trading journey and achievements with comprehensive analytics",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <Sidebar />
        <Header />
        <main className="lg:pl-72">
          <Suspense
            fallback={
              <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <DashboardSkeleton />
              </div>
            }
          >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>
          </Suspense>
        </main>
      </div>
    </>
  )
}