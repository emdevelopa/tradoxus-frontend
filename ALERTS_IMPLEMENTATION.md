# Phase 4: Frontend Components - Implementation Guide

## ✅ What's Been Created

### 1. **Custom Hooks** (`hooks/alerts/`)

#### `useAlerts.ts`

- `createAlert()` - Create new alert
- `updateAlert()` - Modify existing alert
- `deleteAlert()` - Remove alert
- `toggleAlert()` - Enable/disable alert
- Auto-fetches alerts on mount

**Usage:**

```typescript
const { alerts, loading, createAlert } = useAlerts();

await createAlert({
  symbol: "BTCUSDT",
  assetName: "Bitcoin",
  alertType: "PRICE_ABOVE",
  targetPrice: 50000,
  deliveryMethods: ["IN_APP", "EMAIL"],
});
```

#### `useNotifications.ts`

- `markAsRead()` - Mark single notification as read
- `markAllAsRead()` - Mark all as read
- `deleteNotification()` - Remove notification
- Auto-fetches & polls every 30s

**Usage:**

```typescript
const { notifications, unreadCount, markAsRead } = useNotifications();

await markAsRead(notificationId);
```

---

### 2. **UI Components** (`components/alerts/`)

#### `AlertCreationForm.tsx`

**Features:**

- ✅ Dialog-based form (non-intrusive)
- ✅ Top 20 assets dropdown
- ✅ 4 alert types: Price Above/Below, % Change, Volume Spike
- ✅ Multiple delivery methods (In-App, Email, Push)
- ✅ Form validation
- ✅ Loading states & toast notifications

**Props:**

```typescript
<AlertCreationForm onAlertCreated={() => refetch()} />
```

#### `AlertsDashboard.tsx`

**Features:**

- ✅ Tabbed interface (Active/Inactive alerts)
- ✅ Empty state with call-to-action
- ✅ Loading skeletons
- ✅ Error display
- ✅ Real-time alert count

**Usage:**

```typescript
<AlertsDashboard />
```

#### `AlertCard.tsx`

**Features:**

- ✅ Alert details display
- ✅ Toggle enable/disable
- ✅ Copy to clipboard
- ✅ Delete with confirmation
- ✅ Last triggered timestamp
- ✅ Delivery method badges

**Props:**

```typescript
<AlertCard alert={alert} onUpdate={() => {}} onDelete={() => {}} />
```

#### `NotificationCenter.tsx`

**Features:**

- ✅ Dropdown notification bell
- ✅ Unread count badge
- ✅ Scrollable notification list
- ✅ Mark as read actions
- ✅ Delete notifications
- ✅ Auto-polling (30s interval)
- ✅ Relative timestamps

**Usage:**

```typescript
<NotificationCenter />
```

---

### 3. **Alert Page** (`app/alerts/page.tsx`)

Complete page showcasing all components:

```typescript
<AlertsPage />
```

---

## 🚀 Integration Steps

### Step 1: Install Missing Dependencies

```bash
pnpm add @radix-ui/react-scroll-area date-fns
```

### Step 2: Add NotificationCenter to Header

In your main layout or header component:

```typescript
import { NotificationCenter } from "@/components/alerts";

export function Header() {
  return (
    <header>
      {/* Other header content */}
      <NotificationCenter />
    </header>
  );
}
```

### Step 3: Update Authentication Header

The hooks use `x-user-id` header. Update the `getUserId()` function to use your actual auth:

**In `hooks/alerts/useAlerts.ts` and `hooks/alerts/useNotifications.ts`:**

```typescript
// Replace this:
const getUserId = useCallback(() => {
  return localStorage.getItem("userId") || "user-1";
}, []);

// With your actual auth (example with NextAuth):
const { data: session } = useSession();
const getUserId = useCallback(() => {
  return session?.user?.id || "unknown";
}, [session]);
```

### Step 4: Create Alerts Page Route

The page is already created at `/app/alerts/page.tsx`.
Access it at: `http://localhost:3000/alerts`

---

## 📋 Key Files Structure

```
components/
└── alerts/
    ├── AlertCreationForm.tsx
    ├── AlertsDashboard.tsx
    ├── AlertCard.tsx
    ├── NotificationCenter.tsx
    └── index.ts

hooks/
└── alerts/
    ├── useAlerts.ts
    ├── useNotifications.ts
    └── index.ts

app/
└── alerts/
    └── page.tsx
```

---

## 🔧 Customization Options

### Change Default Assets

Edit `TOP_ASSETS` in `AlertCreationForm.tsx`:

```typescript
const TOP_ASSETS = [
  { symbol: "BTCUSDT", name: "Bitcoin" },
  // Add more...
];
```

### Adjust Notification Polling

In `useNotifications.ts`, change polling interval:

```typescript
// Default: 30000ms (30 seconds)
const interval = setInterval(() => {
  fetchNotifications();
}, 30000); // Change this value
```

### Customize Colors & Styling

Components use Tailwind CSS classes - modify them directly in component files.

---

## 🧪 Testing the Components

### Test 1: Create Alert

1. Navigate to `/alerts`
2. Click "Create Alert"
3. Fill in form details
4. Click "Create Alert"
5. Verify alert appears in dashboard

### Test 2: View Notifications

1. Click bell icon in NotificationCenter
2. Should show list of notifications
3. Try "Mark as read"
4. Check unread count updates

### Test 3: Toggle Alert

1. On AlertCard, click toggle switch
2. Alert should move between Active/Inactive tabs
3. Check `isActive` updates in DB

### Test 4: Delete Alert

1. Click "Delete" on AlertCard
2. Confirm deletion
3. Alert should disappear from list

---

## 📱 Responsive Design

All components are fully responsive:

- ✅ Mobile-first design
- ✅ Touch-friendly buttons
- ✅ Adaptive layouts
- ✅ Scrollable lists on small screens

---

## ⚠️ Known Limitations & TODO

1. **User ID Handling**
   - Currently uses localStorage fallback
   - Replace with actual session/auth

2. **Email Integration**
   - Configured in `NotificationService` but not implemented
   - Add SendGrid/Mailgun integration in Phase 5

3. **Push Notifications**
   - Configured in `NotificationService` but not implemented
   - Add Firebase Cloud Messaging in Phase 5

4. **WebSocket Integration**
   - Real-time price updates need to be connected
   - See `PriceMonitoringService` documentation

---

## 🔗 Next Steps (Phase 5)

1. **WebSocket Integration**
   - Connect Binance WebSocket to price monitoring
   - Real-time price updates trigger alerts

2. **Email Service Setup**
   - Configure SendGrid/Mailgun
   - Create email templates

3. **Push Notifications**
   - Setup Firebase Cloud Messaging
   - Register service workers

4. **Dashboard Widget**
   - Add mini alerts widget to main dashboard

---

## 💡 Tips

- All forms have proper error handling
- Loading states prevent double-submission
- Toast notifications provide user feedback
- Components use composition for reusability
- TypeScript interfaces ensure type safety

---

## 📞 Support

For issues or questions:

1. Check console for error messages
2. Verify API endpoints are accessible
3. Check user ID is properly set
4. Ensure database migrations are run
