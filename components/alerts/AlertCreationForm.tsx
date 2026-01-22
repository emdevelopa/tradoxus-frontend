"use client";

import { useState } from "react";
import { AlertType, DeliveryMethod } from "@/lib/services/alerts";
import { useAlerts, type CreateAlertData } from "@/hooks/alerts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";

const TOP_ASSETS = [
  { symbol: "BTCUSDT", name: "Bitcoin" },
  { symbol: "ETHUSDT", name: "Ethereum" },
  { symbol: "BNBUSDT", name: "Binance Coin" },
  { symbol: "XRPUSDT", name: "Ripple" },
  { symbol: "ADAUSDT", name: "Cardano" },
  { symbol: "SOLSDT", name: "Solana" },
  { symbol: "DOGEUSDT", name: "Dogecoin" },
  { symbol: "MATICUSDT", name: "Polygon" },
  { symbol: "AVAXUSDT", name: "Avalanche" },
  { symbol: "LINKUSDT", name: "Chainlink" },
  { symbol: "LTCUSDT", name: "Litecoin" },
  { symbol: "UNIUSDT", name: "Uniswap" },
  { symbol: "BCHUSDT", name: "Bitcoin Cash" },
  { symbol: "XLMUSDT", name: "Stellar" },
  { symbol: "VETUSDT", name: "VeChain" },
  { symbol: "FILUSDT", name: "Filecoin" },
  { symbol: "ICPUSDT", name: "Internet Computer" },
  { symbol: "ATOMUSDT", name: "Cosmos" },
  { symbol: "NEARUSDT", name: "NEAR" },
  { symbol: "FTTUSDT", name: "FTT" },
];

interface AlertCreationFormProps {
  onAlertCreated?: () => void;
}

export function AlertCreationForm({ onAlertCreated }: AlertCreationFormProps) {
  const { createAlert } = useAlerts();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateAlertData>({
    symbol: "",
    assetName: "",
    alertType: "PRICE_ABOVE",
    deliveryMethods: ["IN_APP"],
  });

  const selectedAsset = TOP_ASSETS.find((a) => a.symbol === formData.symbol);

  const handleAssetChange = (symbol: string) => {
    const asset = TOP_ASSETS.find((a) => a.symbol === symbol);
    setFormData((prev) => ({
      ...prev,
      symbol,
      assetName: asset?.name || "",
    }));
  };

  const handleAlertTypeChange = (type: AlertType) => {
    setFormData((prev) => ({
      ...prev,
      alertType: type,
      targetPrice: undefined,
      percentChange: undefined,
    }));
  };

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.includes(method)
        ? prev.deliveryMethods.filter((m) => m !== method)
        : [...prev.deliveryMethods, method],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.symbol) {
      toast({
        title: "Error",
        description: "Please select an asset",
        variant: "destructive",
      });
      return;
    }

    if (formData.deliveryMethods.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one delivery method",
        variant: "destructive",
      });
      return;
    }

    if (
      (formData.alertType === "PRICE_ABOVE" ||
        formData.alertType === "PRICE_BELOW") &&
      !formData.targetPrice
    ) {
      toast({
        title: "Error",
        description: "Please enter a target price",
        variant: "destructive",
      });
      return;
    }

    if (
      (formData.alertType === "PERCENT_CHANGE" ||
        formData.alertType === "VOLUME_SPIKE") &&
      !formData.percentChange
    ) {
      toast({
        title: "Error",
        description: "Please enter a percentage value",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await createAlert(formData);

      toast({
        title: "Success",
        description: `Alert created for ${formData.assetName}`,
      });

      setFormData({
        symbol: "",
        assetName: "",
        alertType: "PRICE_ABOVE",
        deliveryMethods: ["IN_APP"],
      });

      setOpen(false);
      onAlertCreated?.();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create alert",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Alert
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Price Alert</DialogTitle>
          <DialogDescription>
            Set up a custom alert for your favorite assets
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asset Selection */}
          <div className="space-y-2">
            <Label htmlFor="asset">Select Asset</Label>
            <Select value={formData.symbol} onValueChange={handleAssetChange}>
              <SelectTrigger id="asset">
                <SelectValue placeholder="Choose an asset..." />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {TOP_ASSETS.map((asset) => (
                  <SelectItem key={asset.symbol} value={asset.symbol}>
                    {asset.name} ({asset.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Alert Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="type">Alert Type</Label>
            <Select
              value={formData.alertType}
              onValueChange={(value) =>
                handleAlertTypeChange(value as AlertType)
              }
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRICE_ABOVE">Price Above Target</SelectItem>
                <SelectItem value="PRICE_BELOW">Price Below Target</SelectItem>
                <SelectItem value="PERCENT_CHANGE">Percent Change</SelectItem>
                <SelectItem value="VOLUME_SPIKE">Volume Spike</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Condition Value */}
          {(formData.alertType === "PRICE_ABOVE" ||
            formData.alertType === "PRICE_BELOW") && (
            <div className="space-y-2">
              <Label htmlFor="price">
                Target Price (USD)
                {selectedAsset && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({selectedAsset.name})
                  </span>
                )}
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="e.g., 50000"
                value={formData.targetPrice || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    targetPrice: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  }))
                }
              />
            </div>
          )}

          {(formData.alertType === "PERCENT_CHANGE" ||
            formData.alertType === "VOLUME_SPIKE") && (
            <div className="space-y-2">
              <Label htmlFor="percent">
                {formData.alertType === "PERCENT_CHANGE"
                  ? "Percent Change (%)"
                  : "Volume Spike (%)"}
              </Label>
              <Input
                id="percent"
                type="number"
                step="0.1"
                placeholder="e.g., 5"
                value={formData.percentChange || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    percentChange: e.target.value
                      ? parseFloat(e.target.value)
                      : undefined,
                  }))
                }
              />
            </div>
          )}

          {/* Delivery Methods */}
          <div className="space-y-3">
            <Label>Notify Me Via</Label>
            <div className="space-y-2">
              {["IN_APP", "EMAIL", "PUSH"].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    id={method}
                    checked={formData.deliveryMethods.includes(
                      method as DeliveryMethod,
                    )}
                    onCheckedChange={() =>
                      handleDeliveryMethodChange(method as DeliveryMethod)
                    }
                  />
                  <Label
                    htmlFor={method}
                    className="font-normal cursor-pointer flex-1"
                  >
                    {method === "IN_APP"
                      ? "In-App Notification"
                      : method === "EMAIL"
                        ? "Email"
                        : "Push Notification"}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Alert
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
