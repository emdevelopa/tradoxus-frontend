import { NextRequest, NextResponse } from "next/server";
import { AlertService } from "@/lib/services/alerts";

// GET: Get a specific alert
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alerts = await AlertService.getUserAlerts(userId);
    const alert = alerts.find((a: any) => a.id === params.id);

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    return NextResponse.json(alert);
  } catch (error) {
    console.error("Error fetching alert:", error);
    return NextResponse.json(
      { error: "Failed to fetch alert" },
      { status: 500 },
    );
  }
}

// DELETE: Delete an alert
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await AlertService.deleteAlert(params.id, userId);

    return NextResponse.json({ message: "Alert deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting alert:", error);
    if (error.message.includes("unauthorized")) {
      return NextResponse.json(
        { error: "Alert not found or unauthorized" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Failed to delete alert" },
      { status: 500 },
    );
  }
}

// PATCH: Toggle alert active status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedAlert = await AlertService.toggleAlert(params.id, userId);

    return NextResponse.json(updatedAlert);
  } catch (error: any) {
    console.error("Error updating alert:", error);
    if (error.message.includes("unauthorized")) {
      return NextResponse.json(
        { error: "Alert not found or unauthorized" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update alert" },
      { status: 500 },
    );
  }
}
