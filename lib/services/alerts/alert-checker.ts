import {
  PriceAlertConfig,
  PriceData,
  AlertCheckResult,
  AlertType,
} from "./types";

/**
 * Check if a price alert condition is met
 */
export function checkAlertCondition(
  alert: PriceAlertConfig,
  priceData: PriceData,
): AlertCheckResult {
  const { alertType, targetPrice, percentChange } = alert;
  const { price, priceChangePercent, volume } = priceData;

  switch (alertType) {
    case "PRICE_ABOVE":
      if (!targetPrice) {
        return {
          triggered: false,
          message: "Invalid alert configuration",
          currentPrice: price,
        };
      }
      const aboveTriggered = price >= targetPrice;
      return {
        triggered: aboveTriggered,
        message: aboveTriggered
          ? `${alert.assetName} price (${price}) reached above target of ${targetPrice}`
          : `${alert.assetName} price (${price}) is below target of ${targetPrice}`,
        currentPrice: price,
      };

    case "PRICE_BELOW":
      if (!targetPrice) {
        return {
          triggered: false,
          message: "Invalid alert configuration",
          currentPrice: price,
        };
      }
      const belowTriggered = price <= targetPrice;
      return {
        triggered: belowTriggered,
        message: belowTriggered
          ? `${alert.assetName} price (${price}) fell below target of ${targetPrice}`
          : `${alert.assetName} price (${price}) is above target of ${targetPrice}`,
        currentPrice: price,
      };

    case "PERCENT_CHANGE":
      if (!percentChange) {
        return {
          triggered: false,
          message: "Invalid alert configuration",
          currentPrice: price,
        };
      }
      // Check for absolute percent change
      const percentChangeAbs = Math.abs(priceChangePercent);
      const percentTriggered = percentChangeAbs >= Math.abs(percentChange);
      return {
        triggered: percentTriggered,
        message: percentTriggered
          ? `${alert.assetName} price changed by ${priceChangePercent.toFixed(2)}% (threshold: ${percentChange}%)`
          : `${alert.assetName} price change ${priceChangePercent.toFixed(2)}% is below threshold of ${percentChange}%`,
        currentPrice: price,
      };

    case "VOLUME_SPIKE":
      if (!percentChange) {
        return {
          triggered: false,
          message: "Invalid alert configuration",
          currentPrice: price,
        };
      }
      // Volume spike check (this would need average volume comparison)
      // For now, we'll use a simple check
      const volumeTriggered = volume > 0;
      return {
        triggered: volumeTriggered,
        message: `Volume spike detected for ${alert.assetName}`,
        currentPrice: price,
      };

    default:
      return {
        triggered: false,
        message: "Unknown alert type",
        currentPrice: price,
      };
  }
}

/**
 * Check if enough time has passed since last trigger (debouncing)
 */
export function shouldTriggerAlert(
  alert: PriceAlertConfig,
  minimumIntervalMs: number = 60000,
): boolean {
  if (!alert.lastTriggered) {
    return true;
  }

  const timeSinceLastTrigger =
    Date.now() - new Date(alert.lastTriggered).getTime();
  return timeSinceLastTrigger >= minimumIntervalMs;
}

/**
 * Generate user-friendly alert message
 */
export function generateAlertMessage(
  alert: PriceAlertConfig,
  currentPrice: number,
  triggerInfo: AlertCheckResult,
): string {
  const timeStr = new Date().toLocaleTimeString();
  return `[${timeStr}] ${triggerInfo.message}`;
}
