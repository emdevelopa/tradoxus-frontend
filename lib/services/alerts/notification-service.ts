import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient() as any; // Temporary fix for missing 'notification' property
import { AlertTriggerPayload, DeliveryMethod } from "./types";

export class NotificationService {
  /**
   * Send alert through configured delivery methods
   */
  static async sendAlert(payload: AlertTriggerPayload): Promise<void> {
    try {
      // Create notification record in database
      const notification = await this.createNotification(payload);

      // Send through each delivery method
      for (const method of payload.deliveryMethods) {
        await this.sendByMethod(method, payload, notification.id);
      }
    } catch (error) {
      console.error("Error sending alert:", error);
      throw error;
    }
  }

  /**
   * Create notification record in database
   */
  private static async createNotification(payload: AlertTriggerPayload) {
    return prisma.notification.create({
      data: {
        userId: payload.userId,
        alertId: payload.alertId,
        message: payload.message,
        deliveryMethod: payload.deliveryMethods[0] || "IN_APP",
        read: false,
      },
    });
  }

  /**
   * Send notification by delivery method
   */
  private static async sendByMethod(
    method: DeliveryMethod,
    payload: AlertTriggerPayload,
    notificationId: string,
  ): Promise<void> {
    switch (method) {
      case "IN_APP":
        await this.sendInAppNotification(payload, notificationId);
        break;
      case "EMAIL":
        await this.sendEmailNotification(payload, notificationId);
        break;
      case "PUSH":
        await this.sendPushNotification(payload, notificationId);
        break;
      default:
        console.warn(`Unknown delivery method: ${method}`);
    }
  }

  /**
   * Send in-app notification (already in DB)
   */
  private static async sendInAppNotification(
    payload: AlertTriggerPayload,
    notificationId: string,
  ): Promise<void> {
    try {
      // Mark as delivered
      await prisma.notification.update({
        where: { id: notificationId },
        data: { deliveredAt: new Date() },
      });

      console.log(
        `In-app notification sent to user ${payload.userId}: ${payload.message}`,
      );

      // In a real app, you would also broadcast this via WebSocket
      // to immediately notify connected clients
    } catch (error) {
      console.error("Error sending in-app notification:", error);
    }
  }

  /**
   * Send email notification
   */
  private static async sendEmailNotification(
    payload: AlertTriggerPayload,
    notificationId: string,
  ): Promise<void> {
    try {
      // Get user email
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { email: true, name: true },
      });

      if (!user || !user.email) {
        console.warn(`User ${payload.userId} has no email`);
        return;
      }

      // TODO: Integrate with email service (SendGrid, Mailgun, etc.)
      const emailContent = this.generateEmailContent(
        payload,
        user.name || "User",
      );

      console.log(`[EMAIL] Sending to ${user.email}: ${payload.message}`);

      // Example integration with nodemailer or SendGrid:
      // await emailService.send({
      //   to: user.email,
      //   subject: `Price Alert: ${payload.assetName}`,
      //   html: emailContent,
      // });

      // Mark as delivered
      await prisma.notification.update({
        where: { id: notificationId },
        data: { deliveredAt: new Date() },
      });
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  }

  /**
   * Send push notification
   */
  private static async sendPushNotification(
    payload: AlertTriggerPayload,
    notificationId: string,
  ): Promise<void> {
    try {
      // TODO: Integrate with Firebase Cloud Messaging or similar
      // For now, just log
      console.log(
        `[PUSH] Sending to user ${payload.userId}: ${payload.message}`,
      );

      // Example Firebase integration:
      // const message = {
      //   notification: {
      //     title: `Price Alert: ${payload.assetName}`,
      //     body: payload.message,
      //   },
      //   data: {
      //     alertId: payload.alertId,
      //     symbol: payload.symbol,
      //     price: payload.currentPrice.toString(),
      //   },
      //   topic: `user-${payload.userId}`,
      // };
      // await admin.messaging().send(message);

      // Mark as delivered
      await prisma.notification.update({
        where: { id: notificationId },
        data: { deliveredAt: new Date() },
      });
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }

  /**
   * Get notifications for a user
   */
  static async getUserNotifications(
    userId: string,
    limit: number = 20,
    skip: number = 0,
    unreadOnly: boolean = false,
  ) {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        ...(unreadOnly && { read: false }),
      },
      include: {
        alert: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    });

    const total = await prisma.notification.count({
      where: {
        userId,
        ...(unreadOnly && { read: false }),
      },
    });

    return { notifications, total };
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new Error("Notification not found or unauthorized");
    }

    return prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
      },
    });
  }

  /**
   * Delete notification
   */
  static async deleteNotification(notificationId: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new Error("Notification not found or unauthorized");
    }

    return prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  /**
   * Generate email HTML content
   */
  private static generateEmailContent(
    payload: AlertTriggerPayload,
    userName: string,
  ): string {
    return `
      <h2>Price Alert Notification</h2>
      <p>Hi ${userName},</p>
      <p>${payload.message}</p>
      <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
        <p><strong>${payload.assetName} (${payload.symbol})</strong></p>
        <p>Current Price: $${payload.currentPrice.toFixed(2)}</p>
        <p>Alert Type: ${payload.alertType}</p>
        <p>Time: ${payload.timestamp.toLocaleString()}</p>
      </div>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">View in Dashboard</a></p>
    `;
  }
}
