import { AlertService } from "./alert-service";
import { PriceData } from "./types";

/**
 * Price Monitoring Service
 * Integrates with Binance WebSocket to monitor price changes
 * and trigger alerts when conditions are met
 */
export class PriceMonitoringService {
  private static instance: PriceMonitoringService;
  private activeSymbols: Set<string> = new Set();
  private priceCache: Map<string, PriceData> = new Map();

  private constructor() {}

  static getInstance(): PriceMonitoringService {
    if (!PriceMonitoringService.instance) {
      PriceMonitoringService.instance = new PriceMonitoringService();
    }
    return PriceMonitoringService.instance;
  }

  /**
   * Initialize price monitoring for an alert
   */
  async initializeAlert(symbol: string): Promise<void> {
    if (this.activeSymbols.has(symbol)) {
      return;
    }

    this.activeSymbols.add(symbol);
    console.log(`Monitoring activated for ${symbol}`);
  }

  /**
   * Stop monitoring for a symbol if no active alerts exist
   */
  async stopMonitoringIfInactive(symbol: string): Promise<void> {
    // In a real implementation, check if any alerts exist for this symbol
    // For now, we'll keep it simple
    console.log(`Monitoring check for ${symbol}`);
  }

  /**
   * Get symbols that need to be monitored
   */
  getMonitoredSymbols(): string[] {
    return Array.from(this.activeSymbols);
  }

  /**
   * Handle incoming price data from WebSocket
   * This should be called from your Binance WebSocket stream handler
   */
  async handlePriceUpdate(priceData: PriceData): Promise<void> {
    try {
      // Cache the latest price
      this.priceCache.set(priceData.symbol, priceData);

      // Process alert checks
      await AlertService.processPriceUpdate(priceData);
    } catch (error) {
      console.error(
        `Error handling price update for ${priceData.symbol}:`,
        error,
      );
    }
  }

  /**
   * Get cached price data for a symbol
   */
  getCachedPrice(symbol: string): PriceData | undefined {
    return this.priceCache.get(symbol);
  }

  /**
   * Clear all cached data (for testing or cleanup)
   */
  clearCache(): void {
    this.priceCache.clear();
    this.activeSymbols.clear();
  }

  /**
   * Get monitoring statistics
   */
  getStats() {
    return {
      activeSymbols: this.activeSymbols.size,
      cachedPrices: this.priceCache.size,
      monitoredSymbols: Array.from(this.activeSymbols),
    };
  }
}

/**
 * Example integration with Binance WebSocket
 * Add this to your binance-price-ws-server.js
 *
 * const monitoringService = PriceMonitoringService.getInstance();
 *
 * ws.on('message', (data) => {
 *   const message = JSON.parse(data);
 *
 *   const priceData: PriceData = {
 *     symbol: message.s,
 *     price: parseFloat(message.c),
 *     volume: parseFloat(message.v),
 *     priceChange: parseFloat(message.p),
 *     priceChangePercent: parseFloat(message.P),
 *     timestamp: new Date(message.E),
 *   };
 *
 *   monitoringService.handlePriceUpdate(priceData);
 * });
 */
