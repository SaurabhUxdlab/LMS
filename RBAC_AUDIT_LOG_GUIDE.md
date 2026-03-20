# Role-Based Access Control & Audit Logging

This dashboard implements a comprehensive role-based access control (RBAC) system with 4 distinct roles and complete audit logging functionality.

## User Roles

### 1. **Super Admin**
- Complete system access
- User management capabilities
- Audit log viewing and export
- System settings access
- URL: `/dashboard`

**Navigation Menu:**
- Dashboard
- User Management
- Audit Logs
- Settings

---

### 2. **Content Manager**
- Content management capabilities
- Audit log viewing and export (read-only)
- URL: `/dashboard`

**Navigation Menu:**
- Dashboard
- Content Management
- Audit Logs

---

### 3. **Support Agent**
- Support ticket and inquiry management
- Cannot access audit logs
- URL: `/dashboard`

**Navigation Menu:**
- Dashboard
- Support Tickets
- User Inquiries

---

### 4. **Analytics Viewer**
- Analytics and reports access
- Read-only access
- URL: `/dashboard`

**Navigation Menu:**
- Dashboard
- Analytics
- Reports

---

## Audit Logging System

The audit logging system tracks all user actions in the dashboard with comprehensive details.

### Logged Actions

The following actions are automatically tracked:
- `LOGIN` - User login events
- `LOGOUT` - User logout events
- `CREATE` - Resource creation
- `UPDATE` - Resource updates
- `DELETE` - Resource deletion
- `VIEW` - Resource access
- `EXPORT` - Data exports
- `SETTINGS_CHANGE` - Settings modifications
- `USER_MANAGEMENT` - User management actions
- `CONTENT_MANAGEMENT` - Content operations
- `SUPPORT_ACTION` - Support actions

### Audit Log Details

Each audit log entry contains:
- **ID**: Unique log identifier
- **User ID**: ID of the user performing the action
- **Email**: User's email address
- **Role**: User's role at the time of action
- **Action**: Type of action performed
- **Resource**: Resource name/type affected
- **Resource ID**: Specific resource identifier (if applicable)
- **Timestamp**: Exact date and time of action
- **Status**: SUCCESS or FAILURE
- **Error Message**: Details if action failed
- **IP Address**: User's IP (when available)
- **User Agent**: Browser/client information (when available)

### Accessing Audit Logs

**Available to:** Super Admin, Content Manager

1. Navigate to `/audit-logs` in the dashboard
2. Use filters to search by:
   - Email/User ID/Resource name
   - Action type
   - Date range (if filtering is extended)
3. Export logs as:
   - JSON format (for data processing)
   - CSV format (for spreadsheets)

### Audit Log Statistics

The audit logs page displays summary statistics:
- Total number of logs
- Successful vs. failed actions
- Number of unique users

---

## Using the Audit Log API

### Import Required Functions

```typescript
import {
  logAuditAction,
  getAuditLogs,
  getAuditLogsByUser,
  getAuditLogsByAction,
  getAuditLogsByDateRange,
  clearAuditLogs,
  exportAuditLogs,
  type AuditLog,
  type AuditAction,
} from "@/lib/auditLog"
```

### Log an Action

```typescript
import { logAuditAction } from "@/lib/auditLog"

logAuditAction({
  userId: "user123",
  userEmail: "user@example.com",
  userRole: "super admin",
  action: "CREATE",
  resource: "User",
  resourceId: "newuser456",
  details: {
    userName: "John Doe",
    email: "john@example.com",
  },
  status: "SUCCESS",
})
```

### Retrieve Audit Logs

```typescript
// Get all logs (sorted by newest first)
const allLogs = getAuditLogs()

// Get logs for a specific user
const userLogs = getAuditLogsByUser("user123")

// Get logs for a specific action
const createLogs = getAuditLogsByAction("CREATE")

// Get logs within date range
const dateLogs = getAuditLogsByDateRange(
  new Date("2024-01-01"),
  new Date("2024-12-31")
)
```

### Export Audit Logs

```typescript
// Export as JSON
const jsonContent = exportAuditLogs("json")

// Export as CSV
const csvContent = exportAuditLogs("csv")
```

---

## Setting User Roles

To set a user's role in the authentication system, update the user's role in your auth provider (Firebase, etc.):

```typescript
import { useDispatch } from "react-redux"
import { setUser } from "@/store/userSlice"

const dispatch = useDispatch()

// After successful authentication
dispatch(setUser({
  uid: "user123",
  email: "user@example.com",
  role: "super admin", // or "content manager", "support agent", "analytics viewer"
}))
```

---

## Protected Routes

All protected routes validate user roles using the `ProtectedRoute` component:

```typescript
<ProtectedRoute allowedRoles={["super admin", "content manager"]}>
  <AuditLogsPage />
</ProtectedRoute>
```

If a user without appropriate role tries to access a protected route, they'll see a 404 error.

---

## Implementing New Features

When adding new features that should be tracked:

1. **Import audit logging**:
   ```typescript
   import { logAuditAction } from "@/lib/auditLog"
   ```

2. **Log actions at key points**:
   ```typescript
   try {
     // Your action code
     logAuditAction({
       userId: user.uid,
       userEmail: user.email,
       userRole: user.role,
       action: "CREATE",
       resource: "CustomResource",
       resourceId: newId,
       status: "SUCCESS",
     })
   } catch (error) {
     logAuditAction({
       userId: user.uid,
       userEmail: user.email,
       userRole: user.role,
       action: "CREATE",
       resource: "CustomResource",
       status: "FAILURE",
       errorMessage: error.message,
     })
   }
   ```

---

## Notes

- Audit logs are currently stored in memory and will be reset on browser refresh
- For production, integrate with a database (Firestore, MongoDB, SQL, etc.)
- Maximum of 1000 logs are kept in memory to prevent memory issues
- All timestamps are in UTC
- Role names are case-insensitive
