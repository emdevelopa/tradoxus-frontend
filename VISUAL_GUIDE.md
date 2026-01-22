# 📚 Price Alerts System - Visual Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     TRADOXUS FRONTEND                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐              ┌──────────────────┐    │
│  │   UI Layer       │              │  Notification    │    │
│  │  (React)         │◄─────────────┤  Center (Bell)   │    │
│  └────────┬─────────┘              └──────────────────┘    │
│           │                                                  │
│  ┌────────▼────────────────────────────────────────┐       │
│  │       Components                                │       │
│  ├────────────────────────────────────────────────┤       │
│  │ • AlertCreationForm  - Create alerts          │       │
│  │ • AlertsDashboard    - Manage alerts          │       │
│  │ • AlertCard          - Display alerts         │       │
│  │ • NotificationCenter - Notification bell      │       │
│  └────────┬────────────────────────────────────────┘       │
│           │                                                  │
│  ┌────────▼─────────────────────────────────────┐          │
│  │       Custom Hooks                           │          │
│  ├──────────────────────────────────────────────┤          │
│  │ • useAlerts()        - Alert management      │          │
│  │ • useNotifications() - Notification handling │          │
│  └────────┬──────────────────────────────────────┘          │
│           │                                                  │
│           └──────────────┬───────────────────────┐          │
│                          │                       │          │
│              ┌───────────▼──┐          ┌────────▼────┐      │
│              │   API Layer  │          │  Local      │      │
│              │   (REST)     │          │  Storage    │      │
│              └───────┬──────┘          └─────────────┘      │
│                      │                                      │
└──────────────────────┼──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼────┐  ┌─────▼──────┐  ┌────▼────────┐
│   Alerts   │  │ Notifications
 │ WebSocket  │
│   API      │  │   API      │  │   (Real-   │
└───────┬────┘  └─────┬──────┘  │   time)    │
        │             │         └────────────┘
        └─────────────┼─────────────────────────┐
                      │                         │
              ┌───────▼───────────────┐         │
              │   Services Layer      │         │
              ├──────────────────────┤         │
              │ • AlertService       │         │
              │ • NotificationSvc    │         │
              │ • PriceMonitoringSvc │         │
              └───────┬──────────────┘         │
                      │                       │
                      └───────┬───────────────┘
                              │
              ┌───────────────▼──────────────┐
              │   Database (Prisma)          │
              ├──────────────────────────────┤
              │ • PriceAlert                 │
              │ • AlertDeliveryMethod        │
              │ • Notification               │
              └──────────────────────────────┘
```

---

## 🔄 Alert Flow

```
User Creates Alert
        ↓
AlertCreationForm.tsx (UI)
        ↓
useAlerts() hook
        ↓
POST /api/alerts
        ↓
AlertService.createAlert()
        ↓
Prisma saves to DB
        ↓
Return to UI ✅
        ↓
PriceMonitoringService monitors symbol
        ↓
Real-time price update arrives
        ↓
AlertService.processPriceUpdate()
        ↓
Check condition with alert-checker
        ↓
Condition met? ✅
        ↓
NotificationService.sendAlert()
        ↓
Send via all delivery methods:
├── IN_APP: Save to DB
├── EMAIL: Send email
└── PUSH: Send push notification
        ↓
Notification appears ✨
```

---

## 📊 Data Models

### PriceAlert
```
┌─────────────────────────────┐
│      PriceAlert             │
├─────────────────────────────┤
│ id (UUID)                   │
│ userId (FK → User)          │
│ symbol (String)             │
│ assetName (String)          │
│ alertType (Enum)            │
├─────────────────────────────┤
│ PRICE_ABOVE → targetPrice   │
│ PRICE_BELOW → targetPrice   │
│ PERCENT_CHANGE → percent    │
│ VOLUME_SPIKE → percent      │
├─────────────────────────────┤
│ isActive (Boolean)          │
│ lastTriggered (DateTime?)   │
│ createdAt, updatedAt        │
├─────────────────────────────┤
│ Relations                   │
│ • deliveryMethods (1-M)     │
│ • notifications (1-M)       │
└─────────────────────────────┘
```

### AlertDeliveryMethod
```
┌─────────────────────────────┐
│  AlertDeliveryMethod        │
├─────────────────────────────┤
│ id (UUID)                   │
│ alertId (FK → PriceAlert)   │
│ method (Enum)               │
│ • IN_APP                    │
│ • EMAIL                     │
│ • PUSH                      │
│ enabled (Boolean)           │
└─────────────────────────────┘
```

### Notification
```
┌─────────────────────────────┐
│     Notification            │
├─────────────────────────────┤
│ id (UUID)                   │
│ userId (FK → User)          │
│ alertId (FK → PriceAlert)   │
│ message (String)            │
│ read (Boolean)              │
│ deliveryMethod (Enum)       │
│ deliveredAt (DateTime?)     │
│ createdAt (DateTime)        │
└─────────────────────────────┘
```

---

## 🎨 UI Component Tree

```
AlertsPage
├── Header
│   └── NotificationCenter 🔔
│       ├── Bell Icon
│       ├── Unread Badge
│       └── Dropdown Menu
│           ├── Notification List
│           │   └── Notification Item (Repeating)
│           │       ├── Message
│           │       ├── Timestamp
│           │       └── Actions (Mark read, Delete)
│           └── Mark All Read Button
│
└── Main Content
    ├── Title & Description
    │
    └── AlertsDashboard
        ├── Header with Create Button
        │   └── AlertCreationForm 📝
        │       ├── Asset Select Dropdown
        │       ├── Alert Type Select
        │       ├── Value Input
        │       ├── Delivery Methods (Checkboxes)
        │       └── Create Button
        │
        └── Tabs
            ├── Active Tab
            │   └── Alert Grid
            │       └── AlertCard (Repeating)
            │           ├── Asset Info
            │           ├── Alert Details
            │           ├── Delivery Badges
            │           ├── Last Triggered
            │           └── Actions (Copy, Delete, Toggle)
            │
            └── Inactive Tab
                └── Alert Grid (Same structure)
```

---

## 🔌 API Endpoints

```
Alerts Management
├── GET  /api/alerts              ← List user alerts
├── POST /api/alerts              ← Create new alert
├── PUT  /api/alerts              ← Update alert
├── GET  /api/alerts/[id]         ← Get single alert
├── DELETE /api/alerts/[id]       ← Delete alert
└── PATCH /api/alerts/[id]        ← Toggle alert

Notification Management
├── GET  /api/notifications              ← List notifications
├── POST /api/notifications/[id]/read    ← Mark as read
├── DELETE /api/notifications/[id]       ← Delete notification
└── POST /api/notifications/mark-all-read ← Mark all read
```

---

## 🧠 Service Layer Methods

### AlertService
```
✓ processPriceUpdate(priceData)
✓ evaluateAlert(alert, priceData)
✓ createTriggerPayload(alert, priceData)
✓ getUserAlerts(userId)
✓ createAlert(userId, data)
✓ updateAlert(alertId, userId, data)
✓ deleteAlert(alertId, userId)
✓ toggleAlert(alertId, userId)
```

### NotificationService
```
✓ sendAlert(payload)
✓ createNotification(payload)
✓ sendByMethod(method, payload)
✓ sendInAppNotification(payload)
✓ sendEmailNotification(payload)
✓ sendPushNotification(payload)
✓ getUserNotifications(userId, limit, skip, unreadOnly)
✓ markAsRead(notificationId, userId)
✓ markAllAsRead(userId)
✓ deleteNotification(notificationId, userId)
✓ generateEmailContent(payload, userName)
```

### PriceMonitoringService
```
✓ getInstance()
✓ initializeAlert(symbol)
✓ stopMonitoringIfInactive(symbol)
✓ getMonitoredSymbols()
✓ handlePriceUpdate(priceData)
✓ getCachedPrice(symbol)
✓ clearCache()
✓ getStats()
```

---

## 📈 Data Flow Diagram

```
User Input
    ↓
┌───────────────────────┐
│ React Component       │
│ (AlertCreationForm)   │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│ Custom Hook           │
│ (useAlerts)           │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│ API Call              │
│ POST /api/alerts      │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│ Service Layer         │
│ AlertService.create() │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│ Database              │
│ Prisma.priceAlert     │
│ .create()             │
└──────────┬────────────┘
           ↓
    Return Response
           ↓
    Update UI State
           ↓
    User Sees Alert ✨
```

---

## 🎯 Alert Type Decision Tree

```
                User Creates Alert
                        ↓
                  Choose Asset
                        ↓
            Choose Alert Type
            ↙              ↘
    Price-based?        % / Volume?
       ↓                   ↓
    ┌──┴──┐           ┌────┴─────┐
    ↓     ↓           ↓          ↓
  Above  Below   Percent    Volume
    ↓     ↓       Change      Spike
    │     │         ↓          ↓
    │     │      Input %    Input %
    │     │      threshold  threshold
    │     │         ↓          ↓
    └─┬───┴────┬────┴──────┬───┘
      │        │           │
  Input Target Price or % → Condition Ready!
           ↓
    Choose Delivery Methods
      ↙    ↓      ↘
   In-App Email  Push
      ↓    ↓      ↓
   [✓]  [✓]    [✓]
      ↓    ↓      ↓
      └────┼──────┘
           ↓
      Alert Created! ✨
```

---

## 🔐 Security Layers

```
Request
  ↓
[1] Check x-user-id header
  ↓
[2] Validate input format
  ↓
[3] Check required fields
  ↓
[4] Query with userId filter
  ↓
[5] Verify resource ownership
  ↓
[6] Execute operation
  ↓
[7] Return safe response
  ↓
User Data (Protected! 🔒)
```

---

## 📦 Dependency Graph

```
React Components
├── useAlerts (hook)
│   └── /api/alerts (endpoint)
│       └── AlertService
│           ├── Prisma ORM
│           └── NotificationService
│
└── useNotifications (hook)
    └── /api/notifications (endpoint)
        └── NotificationService
            └── Prisma ORM
```

---

## 🎨 UI State Management

```
Component State
├── Loading States
│   ├── Initial Load
│   ├── Creating Alert
│   ├── Updating Alert
│   └── Deleting Alert
│
├── Data States
│   ├── No Alerts (Empty)
│   ├── Has Alerts (List)
│   └── Single Alert (Detail)
│
├── Error States
│   ├── Fetch Failed
│   ├── Create Failed
│   └── Delete Failed
│
└── UI States
    ├── Dialog Open/Closed
    ├── Tab Selected
    └── Notification Unread Count
```

---

## 📊 Performance Optimization

```
Caching
├── Price Cache (PriceMonitoringService)
├── Local Component State (React)
└── Browser Cache (API responses)

Debouncing
└── 60s cooldown between same alert trigger

Pagination
├── Notifications: 20 per page
└── Alerts: Load all (optimizable)

Real-time Updates
└── Polling (30s) → WebSocket (future)
```

---

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────┐
│     Production Environment             │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  CDN                             │ │
│  │  (Static assets)                 │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Next.js Server                  │ │
│  │  (API routes + Frontend)          │ │
│  └────────────┬─────────────────────┘ │
│               │                        │
│  ┌────────────▼─────────────────────┐ │
│  │  PostgreSQL Database             │ │
│  │  (Hosted)                        │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Email Service                   │ │
│  │  (SendGrid/Mailgun)              │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Firebase Cloud Messaging        │ │
│  │  (Push notifications)            │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │  Binance WebSocket               │ │
│  │  (Real-time prices)              │ │
│  └──────────────────────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Desktop (≥1024px)
├── Full sidebar
├── Multi-column layout
└── Detailed views

Tablet (768px - 1023px)
├── Collapsible sidebar
├── 2-column layout
└── Simplified views

Mobile (<768px)
├── Full-width layout
├── Stack components
├── Dropdown menus
└── Touch-friendly buttons
```

---

## ✨ Feature Matrix

| Feature | Status | Mobile | Web |
|---------|--------|--------|-----|
| Create Alerts | ✅ | ✅ | ✅ |
| View Alerts | ✅ | ✅ | ✅ |
| Edit Alerts | ✅ | ✅ | ✅ |
| Delete Alerts | ✅ | ✅ | ✅ |
| Toggle Alerts | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ✅ |
| Email | 🔄 | ✅ | ✅ |
| Push | 🔄 | ✅ | ✅ |
| Real-time | 🔄 | ✅ | ✅ |

---

**Legend:**
- ✅ Complete & Working
- 🔄 Ready but needs config
- ⏳ Coming Soon

---

This completes the **Price Alerts System**! 🎉

