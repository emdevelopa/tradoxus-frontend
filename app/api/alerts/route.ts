import { NextRequest, NextResponse } from "next/server";
import { AlertService } from "@/lib/services/alerts";

// GET: List all alerts for the current user
export async function GET(req: NextRequest) {
  try {
    // Get user from session/auth (you may need to implement auth check)
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alerts = await AlertService.getUserAlerts(userId);

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 },
    );
  }
}

// POST: Create a new alert
export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      symbol,
      assetName,
      alertType,
      targetPrice,
      percentChange,
      deliveryMethods,
    } = body;

    // Validate required fields
    if (!symbol || !assetName || !alertType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create the alert using service
    const alert = await AlertService.createAlert(userId, {
      symbol,
      assetName,
      alertType,
      targetPrice,
      percentChange,
      deliveryMethods: deliveryMethods || ["IN_APP"],
    });

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error("Error creating alert:", error);
    return NextResponse.json(
      { error: "Failed to create alert" },
      { status: 500 },
    );
  }
}

// PUT: Update an alert
export async function PUT(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { alertId, ...updateData } = body;

    if (!alertId) {
      return NextResponse.json(
        { error: "Alert ID is required" },
        { status: 400 },
      );
    }

    const updatedAlert = await AlertService.updateAlert(
      alertId,
      userId,
      updateData,
    );

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
