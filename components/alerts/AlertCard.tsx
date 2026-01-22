"use client";

import { useState } from "react";
import { Alert } from "@/hooks/alerts";
import { useAlerts } from "@/hooks/alerts";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Copy, Trash2, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AlertCardProps {
  alert: Alert;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const ALERT_TYPE_LABELS: Record<string, string> = {
  PRICE_ABOVE: "Price Above",
  PRICE_BELOW: "Price Below",
  PERCENT_CHANGE: "Percent Change",
  VOLUME_SPIKE: "Volume Spike",
};

const DELIVERY_METHOD_COLORS: Record<string, string> = {
  IN_APP: "bg-blue-100 text-blue-800",
  EMAIL: "bg-purple-100 text-purple-800",
  PUSH: "bg-green-100 text-green-800",
};

export function AlertCard({ alert, onUpdate, onDelete }: AlertCardProps) {
  const { toggleAlert, deleteAlert } = useAlerts();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    try {
      setLoading(true);
      await toggleAlert(alert.id);
      toast({
        title: "Success",
        description: `Alert ${checked ? "enabled" : "disabled"}`,
      });
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update alert",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAlert(alert.id);
      toast({
        title: "Success",
        description: "Alert deleted",
      });
      onDelete?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete alert",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getConditionText = () => {
    switch (alert.alertType) {
      case "PRICE_ABOVE":
        return `Price above $${alert.targetPrice?.toFixed(2)}`;
      case "PRICE_BELOW":
        return `Price below $${alert.targetPrice?.toFixed(2)}`;
      case "PERCENT_CHANGE":
        return `${alert.percentChange}% change`;
      case "VOLUME_SPIKE":
        return `Volume spike ${alert.percentChange}%`;
      default:
        return "Unknown condition";
    }
  };

  return (
    <Card className={!alert.isActive ? "opacity-60" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">{alert.assetName}</span>
              <Badge variant={alert.isActive ? "default" : "secondary"}>
                {alert.isActive ? "Active" : "Inactive"}
              </Badge>
            </CardTitle>
            <CardDescription>{alert.symbol}</CardDescription>
          </div>
          <Switch
            checked={alert.isActive}
            onCheckedChange={handleToggle}
            disabled={loading}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Alert Type and Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Alert Type</p>
            <p className="text-sm font-semibold">
              {ALERT_TYPE_LABELS[alert.alertType]}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Condition</p>
            <p className="text-sm font-semibold">{getConditionText()}</p>
          </div>
        </div>

        {/* Delivery Methods */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">
            Notification Methods
          </p>
          <div className="flex flex-wrap gap-2">
            {alert.deliveryMethods.map((method) => (
              <Badge
                key={method.id}
                className={DELIVERY_METHOD_COLORS[method.method]}
                variant="secondary"
              >
                {method.method === "IN_APP"
                  ? "In-App"
                  : method.method === "EMAIL"
                    ? "Email"
                    : "Push"}
              </Badge>
            ))}
          </div>
        </div>

        {/* Last Triggered */}
        {alert.lastTriggered && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              Last triggered{" "}
              {formatDistanceToNow(new Date(alert.lastTriggered), {
                addSuffix: true,
              })}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => {
              navigator.clipboard.writeText(
                `${alert.assetName} (${alert.symbol}): ${getConditionText()}`,
              );
              toast({
                title: "Copied",
                description: "Alert details copied to clipboard",
              });
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="destructive"
                disabled={loading}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Alert</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this alert for{" "}
                  {alert.assetName}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-2">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
