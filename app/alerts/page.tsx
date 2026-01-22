"use client";

import { AlertsDashboard, NotificationCenter } from "@/components/alerts";

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Price Alerts</h1>
              <p className="text-gray-600 mt-2">
                Create and manage custom price alerts for your favorite assets
              </p>
            </div>
            <NotificationCenter />
          </div>
        </div>

        {/* Main Dashboard */}
        <AlertsDashboard />
      </div>
    </div>
  );
}
