"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface Report {
  id: string
  reportedUserId: string
  reportedUserName: string
  reason: string
  details: string
  status: "pending" | "resolved"
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/admin/reports")
      if (!response.ok) {
        throw new Error("Failed to fetch reports")
      }
      const data = await response.json()
      setReports(data)
    } catch (error) {
      console.error("Error fetching reports:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load reports. Please try again.",
      })
    }
  }

  const handleAction = async (reportId: string, action: "suspend" | "block" | "dismiss") => {
    try {
      const response = await fetch(`/api/admin/reports/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`)
      }

      toast({
        title: "Action Taken",
        description: `User has been ${action}ed successfully.`,
      })

      // Refresh the list of reports
      fetchReports()
    } catch (error) {
      console.error(`Error ${action}ing user:`, error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} user. Please try again.`,
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Reports</CardTitle>
          <CardDescription>Review and take action on user reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reported User</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.reportedUserName}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{report.details}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    {report.status === "pending" && (
                      <>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction(report.id, "suspend")}
                          className="mr-2"
                        >
                          Suspend
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleAction(report.id, "block")}
                          className="mr-2"
                        >
                          Block
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleAction(report.id, "dismiss")}>
                          Dismiss
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
