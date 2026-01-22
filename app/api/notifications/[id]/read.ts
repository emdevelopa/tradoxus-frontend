import { NextRequest, NextResponse } from "next/server";
import { NotificationService } from "@/lib/services/alerts";

// POST: Mark notification as read
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedNotification = await NotificationService.markAsRead(
      params.id,
      userId,
    );

    return NextResponse.json(updatedNotification);
  } catch (error: any) {
    console.error("Error updating notification:", error);
    if (error.message.includes("unauthorized")) {
      return NextResponse.json(
        { error: "Notification not found or unauthorized" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 },
    );
  }
}

// DELETE: Delete notification
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await NotificationService.deleteNotification(params.id, userId);

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting notification:", error);
    if (error.message.includes("unauthorized")) {
      return NextResponse.json(
        { error: "Notification not found or unauthorized" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 },
    );
  }
}
