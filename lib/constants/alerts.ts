/**
 * Alert Configuration Constants
 * Used across the alerts system for consistency
 */

import { AlertType, DeliveryMethod } from "@/lib/services/alerts";

export const ALERT_TYPES: Record<
  AlertType,
  { label: string; description: string }
> = {
  PRICE_ABOVE: {
    label: "Price Above Target",
    description: "Alert when price rises above your target",
  },
  PRICE_BELOW: {
    label: "Price Below Target",
    description: "Alert when price falls below your target",
  },
  PERCENT_CHANGE: {
    label: "Percent Change",
    description: "Alert when price changes by a certain percentage",
  },
  VOLUME_SPIKE: {
    label: "Volume Spike",
    description: "Alert when trading volume spikes",
  },
};

export const DELIVERY_METHODS: Record<
  DeliveryMethod,
  { label: string; description: string; icon: string }
> = {
  IN_APP: {
    label: "In-App Notification",
    description: "Get notified in your dashboard",
    icon: "🔔",
  },
  EMAIL: {
    label: "Email",
    description: "Receive notifications via email",
    icon: "📧",
  },
  PUSH: {
    label: "Push Notification",
    description: "Get browser/mobile push notifications",
    icon: "📱",
  },
};

export const TOP_CRYPTO_ASSETS = [
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

export const ALERT_DEBOUNCE_INTERVAL = 60000; // 1 minute
export const NOTIFICATION_POLL_INTERVAL = 30000; // 30 seconds
export const NOTIFICATION_FETCH_LIMIT = 20;

/**
 * Alert status badges styling
 */
export const ALERT_STATUS_STYLES = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
};

/**
 * Delivery method badge colors
 */
export const DELIVERY_METHOD_STYLES: Record<DeliveryMethod, string> = {
  IN_APP: "bg-blue-100 text-blue-800",
  EMAIL: "bg-purple-100 text-purple-800",
  PUSH: "bg-green-100 text-green-800",
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  MISSING_ASSET: "Please select an asset",
  MISSING_DELIVERY_METHOD: "Please select at least one delivery method",
  MISSING_TARGET_PRICE: "Please enter a target price",
  MISSING_PERCENTAGE: "Please enter a percentage value",
  FETCH_FAILED: "Failed to fetch alerts",
  CREATE_FAILED: "Failed to create alert",
  UPDATE_FAILED: "Failed to update alert",
  DELETE_FAILED: "Failed to delete alert",
  TOGGLE_FAILED: "Failed to toggle alert",
  MARK_READ_FAILED: "Failed to mark as read",
  DELETE_NOTIFICATION_FAILED: "Failed to delete notification",
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  ALERT_CREATED: (assetName: string) => `Alert created for ${assetName}`,
  ALERT_UPDATED: "Alert updated successfully",
  ALERT_DELETED: "Alert deleted successfully",
  ALERT_TOGGLED: (enabled: boolean) =>
    `Alert ${enabled ? "enabled" : "disabled"}`,
  MARKED_AS_READ: "Marked as read",
  MARKED_ALL_READ: "All notifications marked as read",
  DELETED: "Deleted successfully",
  COPIED: "Copied to clipboard",
};
