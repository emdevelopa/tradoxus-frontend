import { useState, useCallback, useEffect } from "react";
import { DeliveryMethod } from "@/lib/services/alerts";

export interface Notification {
  id: string;
  userId: string;
  alertId: string;
  message: string;
  read: boolean;
  deliveryMethod: DeliveryMethod;
  deliveredAt: string | null;
  createdAt: string;
  alert?: {
    id: string;
    symbol: string;
    assetName: string;
  };
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  fetchNotifications: (
    limit?: number,
    skip?: number,
    unreadOnly?: boolean,
  ) => Promise<void>;
  refetch: () => Promise<void>;
}

const API_BASE = "/api/notifications";

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user ID
  const getUserId = useCallback(() => {
    return localStorage.getItem("userId") || "user-1";
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Fetch notifications
  const fetchNotifications = useCallback(
    async (limit = 20, skip = 0, unreadOnly = false) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
          unreadOnly: unreadOnly.toString(),
        });

        const response = await fetch(`${API_BASE}?${params}`, {
          headers: {
            "x-user-id": getUserId(),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data.notifications);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [getUserId],
  );

  // Mark as read
  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        setError(null);

        const response = await fetch(`${API_BASE}/${notificationId}/read`, {
          method: "POST",
          headers: {
            "x-user-id": getUserId(),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to mark notification as read");
        }

        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      }
    },
    [getUserId],
  );

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(`${API_BASE}/mark-all-read`, {
        method: "POST",
        headers: {
          "x-user-id": getUserId(),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark all as read");
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    }
  }, [getUserId]);

  // Delete notification
  const deleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        setError(null);

        const response = await fetch(`${API_BASE}/${notificationId}`, {
          method: "DELETE",
          headers: {
            "x-user-id": getUserId(),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete notification");
        }

        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      }
    },
    [getUserId],
  );

  // Fetch on mount
  useEffect(() => {
    fetchNotifications();

    // Optionally set up polling for real-time updates
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
    refetch: () => fetchNotifications(),
  };
}
