// Alert types and interfaces
export type AlertType =
  | "PRICE_ABOVE"
  | "PRICE_BELOW"
  | "PERCENT_CHANGE"
  | "VOLUME_SPIKE";
export type DeliveryMethod = "IN_APP" | "EMAIL" | "PUSH";

export interface PriceAlertConfig {
  id: string;
  userId: string;
  symbol: string;
  assetName: string;
  alertType: AlertType;
  targetPrice: number | null;
  percentChange: number | null;
  isActive: boolean;
  lastTriggered: Date | null;
  deliveryMethods: {
    id: string;
    method: DeliveryMethod;
    enabled: boolean;
  }[];
}

export interface PriceData {
  symbol: string;
  price: number;
  volume: number;
  priceChange: number;
  priceChangePercent: number;
  timestamp: Date;
}

export interface AlertTriggerPayload {
  alertId: string;
  userId: string;
  symbol: string;
  assetName: string;
  alertType: AlertType;
  currentPrice: number;
  targetPrice?: number;
  percentChange?: number;
  message: string;
  timestamp: Date;
  deliveryMethods: DeliveryMethod[];
}

export interface AlertCheckResult {
  triggered: boolean;
  message: string;
  currentPrice: number;
}
