"use client";

import { useState } from "react";
import { useAlerts } from "@/hooks/alerts";
import { AlertCreationForm } from "./AlertCreationForm";
import { AlertCard } from "./AlertCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Bell } from "lucide-react";

export function AlertsDashboard() {
  const { alerts, loading, error, refetch } = useAlerts();
  const [refreshing, setRefreshing] = useState(false);

  const activeAlerts = alerts.filter((a) => a.isActive);
  const inactiveAlerts = alerts.filter((a) => !a.isActive);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm text-red-800">{error}</span>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Price Alerts
            </CardTitle>
            <CardDescription>
              Monitor {activeAlerts.length} active alert
              {activeAlerts.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <AlertCreationForm onAlertCreated={handleRefresh} />
        </CardHeader>
      </Card>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-600">No alerts yet</p>
            <p className="text-sm text-gray-500 mb-4">
              Create your first alert to monitor asset prices
            </p>
            <AlertCreationForm onAlertCreated={handleRefresh} />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">
              Active ({activeAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({inactiveAlerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3">
            {activeAlerts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="text-sm text-gray-500">No active alerts</p>
                </CardContent>
              </Card>
            ) : (
              activeAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onUpdate={handleRefresh}
                  onDelete={handleRefresh}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="inactive" className="space-y-3">
            {inactiveAlerts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="text-sm text-gray-500">No inactive alerts</p>
                </CardContent>
              </Card>
            ) : (
              inactiveAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onUpdate={handleRefresh}
                  onDelete={handleRefresh}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
