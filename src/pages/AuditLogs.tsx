import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter } from "lucide-react"
import { getAuditLogs, exportAuditLogs, type AuditLog } from "@/lib/auditLog"

const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export const AuditLogsPage = () => {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState<string>("")

  useEffect(() => {
    const allLogs = getAuditLogs()
    setLogs(allLogs)
    setFilteredLogs(allLogs)
  }, [])

  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        log =>
          log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterAction) {
      filtered = filtered.filter(log => log.action === filterAction)
    }

    setFilteredLogs(filtered)
  }, [searchTerm, filterAction, logs])

  const handleExport = (format: "json" | "csv") => {
    const content = exportAuditLogs(format)
    const element = document.createElement("a")
    const file = new Blob([content], {
      type: format === "json" ? "application/json" : "text/csv",
    })
    element.href = URL.createObjectURL(file)
    element.download = `audit-logs.${format}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const statusColorMap = {
    SUCCESS: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    FAILURE: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1600px] mx-auto animate-in fade-in duration-500 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Complete activity log of all system actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("json")}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border bg-white dark:bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by email, user ID, or resource..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <select
                value={filterAction}
                onChange={e => setFilterAction(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700"
              >
                <option value="">All Actions</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                <option value="CREATE">Create</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
                <option value="VIEW">View</option>
                <option value="EXPORT">Export</option>
                <option value="SETTINGS_CHANGE">Settings Change</option>
                <option value="USER_MANAGEMENT">User Management</option>
                <option value="CONTENT_MANAGEMENT">Content Management</option>
                <option value="SUPPORT_ACTION">Support Action</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterAction("")
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="border bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>
                {filteredLogs.length} log{filteredLogs.length !== 1 ? "s" : ""}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(log => (
                    <TableRow key={log.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                      <TableCell className="font-mono text-sm whitespace-nowrap">
                        {formatDate(log.timestamp)}
                      </TableCell>
                      <TableCell className="font-medium">{log.userEmail}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {log.userRole}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{log.action}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {log.resource}
                        {log.resourceId && ` (${log.resourceId})`}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColorMap[log.status]}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border bg-white dark:bg-zinc-900">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Logs</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border bg-white dark:bg-zinc-900">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Successful Actions</p>
              <p className="text-2xl font-bold text-green-600">
                {logs.filter(log => log.status === "SUCCESS").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border bg-white dark:bg-zinc-900">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Failed Actions</p>
              <p className="text-2xl font-bold text-red-600">
                {logs.filter(log => log.status === "FAILURE").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border bg-white dark:bg-zinc-900">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Unique Users</p>
              <p className="text-2xl font-bold">
                {new Set(logs.map(log => log.userId)).size}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
