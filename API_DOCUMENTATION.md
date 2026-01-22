# Price Alerts API Documentation

## Authentication

All endpoints require the `x-user-id` header:

```
x-user-id: user-123
```

## Base URL

```
http://localhost:3000/api
```

---

## Alerts Endpoints

### GET /alerts

List all alerts for the current user.

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
[
  {
    "id": "alert-123",
    "userId": "user-123",
    "symbol": "BTCUSDT",
    "assetName": "Bitcoin",
    "alertType": "PRICE_ABOVE",
    "targetPrice": 50000,
    "percentChange": null,
    "isActive": true,
    "lastTriggered": "2024-01-20T15:30:00Z",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-20T15:30:00Z",
    "deliveryMethods": [
      {
        "id": "dm-123",
        "method": "IN_APP",
        "enabled": true
      },
      {
        "id": "dm-124",
        "method": "EMAIL",
        "enabled": true
      }
    ],
    "notifications": [
      {
        "id": "notif-123",
        "message": "Bitcoin price reached $50,000",
        "read": false,
        "createdAt": "2024-01-20T15:30:00Z"
      }
    ]
  }
]
```

**Status Codes:**

- `200 OK` - Success
- `401 Unauthorized` - Missing user ID

---

### POST /alerts

Create a new alert.

**Headers:**

```
x-user-id: user-123
Content-Type: application/json
```

**Request Body:**

```json
{
  "symbol": "BTCUSDT",
  "assetName": "Bitcoin",
  "alertType": "PRICE_ABOVE",
  "targetPrice": 50000,
  "percentChange": null,
  "deliveryMethods": ["IN_APP", "EMAIL"]
}
```

**Alert Types:**

- `PRICE_ABOVE` - Trigger when price ≥ targetPrice (requires `targetPrice`)
- `PRICE_BELOW` - Trigger when price ≤ targetPrice (requires `targetPrice`)
- `PERCENT_CHANGE` - Trigger on % movement (requires `percentChange`)
- `VOLUME_SPIKE` - Trigger on volume spike (requires `percentChange`)

**Delivery Methods:**

- `IN_APP` - In-app notification
- `EMAIL` - Email notification
- `PUSH` - Push notification

**Response:**

```json
{
  "id": "alert-123",
  "userId": "user-123",
  "symbol": "BTCUSDT",
  "assetName": "Bitcoin",
  "alertType": "PRICE_ABOVE",
  "targetPrice": 50000,
  "percentChange": null,
  "isActive": true,
  "lastTriggered": null,
  "createdAt": "2024-01-22T10:00:00Z",
  "updatedAt": "2024-01-22T10:00:00Z",
  "deliveryMethods": [
    {
      "id": "dm-123",
      "method": "IN_APP",
      "enabled": true
    },
    {
      "id": "dm-124",
      "method": "EMAIL",
      "enabled": true
    }
  ]
}
```

**Status Codes:**

- `201 Created` - Alert created
- `400 Bad Request` - Missing required fields
- `401 Unauthorized` - Missing user ID
- `500 Server Error` - Internal error

---

### GET /alerts/[id]

Get a specific alert.

**URL Parameters:**

- `id` - Alert ID

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
{
  "id": "alert-123",
  "userId": "user-123",
  "symbol": "BTCUSDT",
  "assetName": "Bitcoin",
  "alertType": "PRICE_ABOVE",
  "targetPrice": 50000,
  "percentChange": null,
  "isActive": true,
  "lastTriggered": "2024-01-20T15:30:00Z",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-20T15:30:00Z",
  "deliveryMethods": [...],
  "notifications": [...]
}
```

**Status Codes:**

- `200 OK` - Success
- `401 Unauthorized` - Missing user ID
- `404 Not Found` - Alert not found or unauthorized

---

### PUT /alerts

Update an alert.

**Headers:**

```
x-user-id: user-123
Content-Type: application/json
```

**Request Body:**

```json
{
  "alertId": "alert-123",
  "alertType": "PRICE_BELOW",
  "targetPrice": 45000,
  "isActive": true,
  "deliveryMethods": ["IN_APP"]
}
```

**Response:**

```json
{
  "id": "alert-123",
  "userId": "user-123",
  "symbol": "BTCUSDT",
  "assetName": "Bitcoin",
  "alertType": "PRICE_BELOW",
  "targetPrice": 45000,
  "percentChange": null,
  "isActive": true,
  "lastTriggered": "2024-01-20T15:30:00Z",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-22T10:30:00Z",
  "deliveryMethods": [...]
}
```

**Status Codes:**

- `200 OK` - Updated
- `400 Bad Request` - Missing alert ID
- `401 Unauthorized` - Missing user ID
- `404 Not Found` - Alert not found or unauthorized
- `500 Server Error` - Internal error

---

### DELETE /alerts/[id]

Delete an alert.

**URL Parameters:**

- `id` - Alert ID

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
{
  "message": "Alert deleted successfully"
}
```

**Status Codes:**

- `200 OK` - Deleted
- `401 Unauthorized` - Missing user ID
- `404 Not Found` - Alert not found or unauthorized
- `500 Server Error` - Internal error

---

### PATCH /alerts/[id]

Toggle alert active status.

**URL Parameters:**

- `id` - Alert ID

**Headers:**

```
x-user-id: user-123
Content-Type: application/json
```

**Request Body:**

```json
{}
```

**Response:**

```json
{
  "id": "alert-123",
  "userId": "user-123",
  "symbol": "BTCUSDT",
  "assetName": "Bitcoin",
  "alertType": "PRICE_ABOVE",
  "targetPrice": 50000,
  "percentChange": null,
  "isActive": false,
  "lastTriggered": "2024-01-20T15:30:00Z",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-22T10:35:00Z",
  "deliveryMethods": [...]
}
```

**Status Codes:**

- `200 OK` - Toggled
- `401 Unauthorized` - Missing user ID
- `404 Not Found` - Alert not found or unauthorized
- `500 Server Error` - Internal error

---

## Notifications Endpoints

### GET /notifications

List notifications for the current user.

**Query Parameters:**

- `limit` (optional, default: 20) - Number of notifications to return
- `skip` (optional, default: 0) - Number of notifications to skip (pagination)
- `unreadOnly` (optional, default: false) - Only return unread notifications

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
{
  "notifications": [
    {
      "id": "notif-123",
      "userId": "user-123",
      "alertId": "alert-123",
      "message": "Bitcoin price reached $50,000",
      "read": false,
      "deliveryMethod": "IN_APP",
      "deliveredAt": null,
      "createdAt": "2024-01-20T15:30:00Z",
      "alert": {
        "id": "alert-123",
        "symbol": "BTCUSDT",
        "assetName": "Bitcoin"
      }
    }
  ],
  "total": 15,
  "limit": 20,
  "skip": 0
}
```

**Status Codes:**

- `200 OK` - Success
- `401 Unauthorized` - Missing user ID
- `500 Server Error` - Internal error

---

### POST /notifications/[id]/read

Mark a notification as read.

**URL Parameters:**

- `id` - Notification ID

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
{
  "id": "notif-123",
  "userId": "user-123",
  "alertId": "alert-123",
  "message": "Bitcoin price reached $50,000",
  "read": true,
  "deliveryMethod": "IN_APP",
  "deliveredAt": null,
  "createdAt": "2024-01-20T15:30:00Z"
}
```

**Status Codes:**

- `200 OK` - Marked as read
- `401 Unauthorized` - Missing user ID
- `404 Not Found` - Notification not found or unauthorized
- `500 Server Error` - Internal error

---

### DELETE /notifications/[id]

Delete a notification.

**URL Parameters:**

- `id` - Notification ID

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
{
  "message": "Notification deleted successfully"
}
```

**Status Codes:**

- `200 OK` - Deleted
- `401 Unauthorized` - Missing user ID
- `404 Not Found` - Notification not found or unauthorized
- `500 Server Error` - Internal error

---

### POST /notifications/mark-all-read

Mark all notifications as read for the current user.

**Headers:**

```
x-user-id: user-123
```

**Response:**

```json
{
  "message": "All notifications marked as read",
  "count": 5
}
```

**Status Codes:**

- `200 OK` - All marked as read
- `401 Unauthorized` - Missing user ID
- `500 Server Error` - Internal error

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes

| Code | Meaning                            |
| ---- | ---------------------------------- |
| 200  | Success                            |
| 201  | Created                            |
| 400  | Bad Request (invalid input)        |
| 401  | Unauthorized (missing user ID)     |
| 404  | Not Found (resource doesn't exist) |
| 500  | Server Error (internal error)      |

---

## Examples

### Create a Price Above Alert

```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "x-user-id: user-123" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "ETHUSDT",
    "assetName": "Ethereum",
    "alertType": "PRICE_ABOVE",
    "targetPrice": 3000,
    "deliveryMethods": ["IN_APP", "EMAIL"]
  }'
```

### Create a Percent Change Alert

```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "x-user-id: user-123" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BNBUSDT",
    "assetName": "Binance Coin",
    "alertType": "PERCENT_CHANGE",
    "percentChange": 5,
    "deliveryMethods": ["PUSH"]
  }'
```

### Get Unread Notifications

```bash
curl "http://localhost:3000/api/notifications?unreadOnly=true&limit=10" \
  -H "x-user-id: user-123"
```

### Update an Alert

```bash
curl -X PUT http://localhost:3000/api/alerts \
  -H "x-user-id: user-123" \
  -H "Content-Type: application/json" \
  -d '{
    "alertId": "alert-123",
    "targetPrice": 55000,
    "deliveryMethods": ["EMAIL"]
  }'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding:

- 100 requests per minute per user
- Alerts creation: 10 per minute per user
- Notification checks: 60 per minute per user

---

## Pagination

Use `limit` and `skip` parameters for pagination:

```bash
# First page (20 items)
curl "http://localhost:3000/api/notifications?limit=20&skip=0"

# Second page (next 20 items)
curl "http://localhost:3000/api/notifications?limit=20&skip=20"

# Third page (next 20 items)
curl "http://localhost:3000/api/notifications?limit=20&skip=40"
```

---

## Webhooks (Future)

Consider implementing webhooks for:

- Alert triggered
- Notification delivered
- User preferences changed

---

## Version History

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| 1.0     | 2024-01-22 | Initial release |

---

**Last Updated:** January 22, 2024
