// Audit Log types and utilities

export type AuditAction = 
  | "LOGIN" 
  | "LOGOUT" 
  | "CREATE" 
  | "UPDATE" 
  | "DELETE" 
  | "VIEW" 
  | "EXPORT"
  | "SETTINGS_CHANGE"
  | "USER_MANAGEMENT"
  | "CONTENT_MANAGEMENT"
  | "SUPPORT_ACTION"

export interface AuditLog {
  id: string
  userId: string
  userEmail: string
  userRole: string
  action: AuditAction
  resource: string
  resourceId?: string
  details?: Record<string, any>
  timestamp: Date
  ipAddress?: string
  userAgent?: string
  status: "SUCCESS" | "FAILURE"
  errorMessage?: string
}

// In-memory storage for audit logs (in production, use database)
let auditLogs: AuditLog[] = []

export const logAuditAction = (log: Omit<AuditLog, "id" | "timestamp">): AuditLog => {
  const newLog: AuditLog = {
    ...log,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
  }
  
  auditLogs.push(newLog)
  
  // Keep only last 1000 logs in memory
  if (auditLogs.length > 1000) {
    auditLogs = auditLogs.slice(-1000)
  }
  
  return newLog
}

export const getAuditLogs = (): AuditLog[] => {
  return [...auditLogs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export const getAuditLogsByUser = (userId: string): AuditLog[] => {
  return auditLogs
    .filter(log => log.userId === userId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export const getAuditLogsByAction = (action: AuditAction): AuditLog[] => {
  return auditLogs
    .filter(log => log.action === action)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export const getAuditLogsByDateRange = (startDate: Date, endDate: Date): AuditLog[] => {
  return auditLogs
    .filter(log => log.timestamp >= startDate && log.timestamp <= endDate)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export const clearAuditLogs = (): void => {
  auditLogs = []
}

export const exportAuditLogs = (format: "json" | "csv" = "json"): string => {
  if (format === "json") {
    return JSON.stringify(auditLogs, null, 2)
  } else {
    // CSV format
    const headers = ["ID", "User ID", "Email", "Role", "Action", "Resource", "Timestamp", "Status"]
    const rows = auditLogs.map(log => [
      log.id,
      log.userId,
      log.userEmail,
      log.userRole,
      log.action,
      log.resource,
      log.timestamp.toISOString(),
      log.status,
    ])
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n")
    
    return csvContent
  }
}
