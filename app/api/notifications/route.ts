import { NextRequest, NextResponse } from "next/server";
import { NotificationService } from "@/lib/services/alerts";

// GET: List notifications for the current user
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const limit = req.nextUrl.searchParams.get("limit") || "20";
    const skip = req.nextUrl.searchParams.get("skip") || "0";
    const unreadOnly = req.nextUrl.searchParams.get("unreadOnly") === "true";

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await NotificationService.getUserNotifications(
      userId,
      parseInt(limit),
      parseInt(skip),
      unreadOnly,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 },
    );
  }
}
