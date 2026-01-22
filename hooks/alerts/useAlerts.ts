import { useState, useCallback, useEffect } from "react";
import { AlertType, DeliveryMethod } from "@/lib/services/alerts";

export interface Alert {
  id: string;
  userId: string;
  symbol: string;
  assetName: string;
  alertType: AlertType;
  targetPrice: number | null;
  percentChange: number | null;
  isActive: boolean;
  lastTriggered: string | null;
  createdAt: string;
  updatedAt: string;
  deliveryMethods: {
    id: string;
    method: DeliveryMethod;
    enabled: boolean;
  }[];
  notifications?: {
    id: string;
    message: string;
    read: boolean;
    createdAt: string;
  }[];
}

interface UseAlertsReturn {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  createAlert: (data: CreateAlertData) => Promise<Alert>;
  updateAlert: (alertId: string, data: UpdateAlertData) => Promise<Alert>;
  deleteAlert: (alertId: string) => Promise<void>;
  toggleAlert: (alertId: string) => Promise<Alert>;
  refetch: () => Promise<void>;
}

export interface CreateAlertData {
  symbol: string;
  assetName: string;
  alertType: AlertType;
  targetPrice?: number;
  percentChange?: number;
  deliveryMethods: DeliveryMethod[];
}

export interface UpdateAlertData {
  alertType?: AlertType;
  targetPrice?: number;
  percentChange?: number;
  isActive?: boolean;
  deliveryMethods?: DeliveryMethod[];
}

const API_BASE = "/api/alerts";

export function useAlerts(): UseAlertsReturn {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user ID (you'll need to implement this based on your auth setup)
  const getUserId = useCallback(() => {
    // TODO: Replace with actual user ID from session/auth
    return localStorage.getItem("userId") || "user-1";
  }, []);

  // Fetch all alerts
  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_BASE, {
        headers: {
          "x-user-id": getUserId(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch alerts");
      }

      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [getUserId]);

  // Create alert
  const createAlert = useCallback(
    async (data: CreateAlertData): Promise<Alert> => {
      try {
        setError(null);

        const response = await fetch(API_BASE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": getUserId(),
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create alert");
        }

        const newAlert = await response.json();
        setAlerts((prev) => [newAlert, ...prev]);
        return newAlert;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      }
    },
    [getUserId],
  );

  // Update alert
  const updateAlert = useCallback(
    async (alertId: string, data: UpdateAlertData): Promise<Alert> => {
      try {
        setError(null);

        const response = await fetch(API_BASE, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": getUserId(),
          },
          body: JSON.stringify({ alertId, ...data }),
        });

        if (!response.ok) {
          throw new Error("Failed to update alert");
        }

        const updatedAlert = await response.json();
        setAlerts((prev) =>
          prev.map((a) => (a.id === alertId ? updatedAlert : a)),
        );
        return updatedAlert;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      }
    },
    [getUserId],
  );

  // Delete alert
  const deleteAlert = useCallback(
    async (alertId: string): Promise<void> => {
      try {
        setError(null);

        const response = await fetch(`${API_BASE}/${alertId}`, {
          method: "DELETE",
          headers: {
            "x-user-id": getUserId(),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete alert");
        }

        setAlerts((prev) => prev.filter((a) => a.id !== alertId));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      }
    },
    [getUserId],
  );

  // Toggle alert active status
  const toggleAlert = useCallback(
    async (alertId: string): Promise<Alert> => {
      try {
        setError(null);

        const response = await fetch(`${API_BASE}/${alertId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": getUserId(),
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error("Failed to toggle alert");
        }

        const updatedAlert = await response.json();
        setAlerts((prev) =>
          prev.map((a) => (a.id === alertId ? updatedAlert : a)),
        );
        return updatedAlert;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      }
    },
    [getUserId],
  );

  // Fetch alerts on mount
  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    createAlert,
    updateAlert,
    deleteAlert,
    toggleAlert,
    refetch: fetchAlerts,
  };
}
