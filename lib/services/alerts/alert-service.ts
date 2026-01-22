import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient() as any;
import { PriceData, AlertTriggerPayload, DeliveryMethod } from "./types";
import {
  checkAlertCondition,
  shouldTriggerAlert,
  generateAlertMessage,
} from "./alert-checker";
import { NotificationService } from "./notification-service";


export class AlertService {
  /**
   * Process price update and check all active alerts for a symbol
   */
  static async processPriceUpdate(priceData: PriceData): Promise<void> {
    try {
      // Find all active alerts for this symbol
      const alerts = await prisma.priceAlert.findMany({
        where: {
          symbol: priceData.symbol,
          isActive: true,
        },
        include: {
          deliveryMethods: {
            where: { enabled: true },
          },
        },
      });

      if (alerts.length === 0) {
        return;
      }

      // Check each alert
      for (const alert of alerts) {
        await this.evaluateAlert(alert as any, priceData);
      }
    } catch (error) {
      console.error(
        `Error processing price update for ${priceData.symbol}:`,
        error,
      );
    }
  }

  /**
   * Evaluate a single alert against price data
   */
  private static async evaluateAlert(
    alert: any,
    priceData: PriceData,
  ): Promise<void> {
    try {
      // Check if alert condition is met
      const checkResult = checkAlertCondition(alert, priceData);

      if (!checkResult.triggered) {
        return;
      }

      // Check debouncing (prevent alert spamming)
      if (!shouldTriggerAlert(alert, 60000)) {
        return;
      }

      // Generate trigger payload
      const triggerPayload = this.createTriggerPayload(
        alert,
        priceData,
        checkResult.message,
      );

      // Send notifications
      await NotificationService.sendAlert(triggerPayload);

      // Update last triggered timestamp
      await prisma.priceAlert.update({
        where: { id: alert.id },
        data: { lastTriggered: new Date() },
      });

      console.log(`Alert triggered: ${alert.id} for ${alert.symbol}`);
    } catch (error) {
      console.error(`Error evaluating alert ${alert.id}:`, error);
    }
  }

  /**
   * Create trigger payload from alert and price data
   */
  private static createTriggerPayload(
    alert: any,
    priceData: PriceData,
    message: string,
  ): AlertTriggerPayload {
    return {
      alertId: alert.id,
      userId: alert.userId,
      symbol: alert.symbol,
      assetName: alert.assetName,
      alertType: alert.alertType,
      currentPrice: priceData.price,
      targetPrice: alert.targetPrice || undefined,
      percentChange: alert.percentChange || undefined,
      message,
      timestamp: new Date(),
      deliveryMethods: alert.deliveryMethods.map(
        (dm: any) => dm.method as DeliveryMethod,
      ),
    };
  }

  /**
   * Get all active alerts for a user
   */
  static async getUserAlerts(userId: string) {
    return prisma.priceAlert.findMany({
      where: { userId },
      include: {
        deliveryMethods: true,
        notifications: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Create a new alert for a user
   */
  static async createAlert(
    userId: string,
    data: {
      symbol: string;
      assetName: string;
      alertType: string;
      targetPrice?: number;
      percentChange?: number;
      deliveryMethods: DeliveryMethod[];
    },
  ) {
    return prisma.priceAlert.create({
      data: {
        userId,
        symbol: data.symbol.toUpperCase(),
        assetName: data.assetName,
        alertType: data.alertType,
        targetPrice: data.targetPrice || null,
        percentChange: data.percentChange || null,
        deliveryMethods: {
          create: data.deliveryMethods.map((method) => ({
            method,
            enabled: true,
          })),
        },
        isActive: true,
      },
      include: {
        deliveryMethods: true,
      },
    });
  }

  /**
   * Update an alert
   */
  static async updateAlert(
    alertId: string,
    userId: string,
    data: Partial<{
      alertType: string;
      targetPrice: number;
      percentChange: number;
      isActive: boolean;
      deliveryMethods: DeliveryMethod[];
    }>,
  ) {
    // Verify ownership
    const alert = await prisma.priceAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert || alert.userId !== userId) {
      throw new Error("Alert not found or unauthorized");
    }

    // Separate delivery methods from other data
    const { deliveryMethods, ...updateData } = data;

    // Update alert
    const updatedAlert = await prisma.priceAlert.update({
      where: { id: alertId },
      data: updateData as any,
      include: {
        deliveryMethods: true,
      },
    });

    // Update delivery methods if provided
    if (deliveryMethods && deliveryMethods.length > 0) {
      // Delete old delivery methods
      await prisma.alertDeliveryMethod.deleteMany({
        where: { alertId },
      });

      // Create new delivery methods
      await prisma.alertDeliveryMethod.createMany({
        data: deliveryMethods.map((method) => ({
          alertId,
          method,
          enabled: true,
        })),
      });

      // Re-fetch to get updated delivery methods
      return prisma.priceAlert.findUnique({
        where: { id: alertId },
        include: {
          deliveryMethods: true,
        },
      });
    }

    return updatedAlert;
  }

  /**
   * Delete an alert
   */
  static async deleteAlert(alertId: string, userId: string) {
    // Verify ownership
    const alert = await prisma.priceAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert || alert.userId !== userId) {
      throw new Error("Alert not found or unauthorized");
    }

    return prisma.priceAlert.delete({
      where: { id: alertId },
    });
  }

  /**
   * Toggle alert active status
   */
  static async toggleAlert(alertId: string, userId: string) {
    // Verify ownership
    const alert = await prisma.priceAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert || alert.userId !== userId) {
      throw new Error("Alert not found or unauthorized");
    }

    return prisma.priceAlert.update({
      where: { id: alertId },
      data: { isActive: !alert.isActive },
      include: {
        deliveryMethods: true,
      },
    });
  }
}
