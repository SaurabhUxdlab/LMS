// Audit action helpers for common operations
import { logAuditAction, type AuditAction } from "@/lib/auditLog"

export const auditActionHelpers = {
  // Authentication actions
  logLogin: (userId: string, userEmail: string, userRole: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "LOGIN",
      resource: "Authentication",
      status: "SUCCESS",
    })
  },

  logLogout: (userId: string, userEmail: string, userRole: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "LOGOUT",
      resource: "Authentication",
      status: "SUCCESS",
    })
  },

  // User management actions
  logUserCreated: (userId: string, userEmail: string, userRole: string, newUserId: string, newUserEmail: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "CREATE",
      resource: "User",
      resourceId: newUserId,
      details: { newUserEmail },
      status: "SUCCESS",
    })
  },

  logUserUpdated: (userId: string, userEmail: string, userRole: string, targetUserId: string, changes: Record<string, any>) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "UPDATE",
      resource: "User",
      resourceId: targetUserId,
      details: { changes },
      status: "SUCCESS",
    })
  },

  logUserDeleted: (userId: string, userEmail: string, userRole: string, deletedUserId: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "DELETE",
      resource: "User",
      resourceId: deletedUserId,
      status: "SUCCESS",
    })
  },

  // Content management actions
  logContentCreated: (userId: string, userEmail: string, userRole: string, contentId: string, contentTitle: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "CREATE",
      resource: "Content",
      resourceId: contentId,
      details: { title: contentTitle },
      status: "SUCCESS",
    })
  },

  logContentUpdated: (userId: string, userEmail: string, userRole: string, contentId: string, changes: Record<string, any>) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "UPDATE",
      resource: "Content",
      resourceId: contentId,
      details: { changes },
      status: "SUCCESS",
    })
  },

  logContentDeleted: (userId: string, userEmail: string, userRole: string, contentId: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "DELETE",
      resource: "Content",
      resourceId: contentId,
      status: "SUCCESS",
    })
  },

  // Support actions
  logTicketCreated: (userId: string, userEmail: string, userRole: string, ticketId: string, subject: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "CREATE",
      resource: "SupportTicket",
      resourceId: ticketId,
      details: { subject },
      status: "SUCCESS",
    })
  },

  logTicketUpdated: (userId: string, userEmail: string, userRole: string, ticketId: string, update: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "UPDATE",
      resource: "SupportTicket",
      resourceId: ticketId,
      details: { update },
      status: "SUCCESS",
    })
  },

  // Settings actions
  logSettingsChanged: (userId: string, userEmail: string, userRole: string, settingName: string, oldValue: any, newValue: any) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "SETTINGS_CHANGE",
      resource: "Settings",
      details: { settingName, oldValue, newValue },
      status: "SUCCESS",
    })
  },

  // Export actions
  logExport: (userId: string, userEmail: string, userRole: string, exportType: string, resourceType: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "EXPORT",
      resource: resourceType,
      details: { exportType },
      status: "SUCCESS",
    })
  },

  // View/Access actions
  logAccess: (userId: string, userEmail: string, userRole: string, resourceType: string, resourceId?: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action: "VIEW",
      resource: resourceType,
      resourceId,
      status: "SUCCESS",
    })
  },

  // Error logging
  logError: (userId: string, userEmail: string, userRole: string, action: AuditAction, resource: string, errorMessage: string) => {
    return logAuditAction({
      userId,
      userEmail,
      userRole,
      action,
      resource,
      status: "FAILURE",
      errorMessage,
    })
  },
}
