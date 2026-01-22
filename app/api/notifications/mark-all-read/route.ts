import { NextRequest, NextResponse } from "next/server";
import { NotificationService } from "@/lib/services/alerts";

// POST: Mark all notifications as read
export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await NotificationService.markAllAsRead(userId);

    return NextResponse.json({
      message: "All notifications marked as read",
      count: result.count,
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return NextResponse.json(
      { error: "Failed to mark notifications as read" },
      { status: 500 },
    );
  }
}
