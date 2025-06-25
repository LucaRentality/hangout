"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Report {
  id: string
  reportedUser: string
  reportingUser: string
  reason: string
  status: string
}

export function AdminReportManager() {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    // Fetch reports from API
    // This is a mock implementation
    setReports([
      { id: "1", reportedUser: "user1", reportingUser: "user2", reason: "Inappropriate behavior", status: "pending" },
      { id: "2", reportedUser: "user3", reportingUser: "user4", reason: "Spam", status: "resolved" },
    ])
  }, [])

  const handleStatusChange = (reportId: string, newStatus: string) => {
    // Update report status in API
    // This is a mock implementation
    setReports(reports.map((report) => (report.id === reportId ? { ...report, status: newStatus } : report)))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reported User</TableHead>
          <TableHead>Reporting User</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.reportedUser}</TableCell>
            <TableCell>{report.reportingUser}</TableCell>
            <TableCell>{report.reason}</TableCell>
            <TableCell>{report.status}</TableCell>
            <TableCell>
              <Select value={report.status} onValueChange={(value) => handleStatusChange(report.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
