"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

interface VerificationRequest {
  id: string
  userId: string
  fullName: string
  idNumber: string
  submissionDate: string
  status: "pending" | "approved" | "rejected"
}

export default function VerificationRequests() {
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchVerificationRequests()
  }, [])

  const fetchVerificationRequests = async () => {
    try {
      const response = await fetch("/api/admin/verification-requests")
      if (!response.ok) {
        throw new Error("Failed to fetch verification requests")
      }
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error("Error fetching verification requests:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load verification requests. Please try again.",
      })
    }
  }

  const handleVerificationAction = async (requestId: string, action: "approve" | "reject") => {
    try {
      const response = await fetch(`/api/admin/verification-requests/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} verification request`)
      }

      toast({
        title: "Success",
        description: `Verification request ${action}d successfully.`,
      })

      // Refresh the list of requests
      fetchVerificationRequests()
    } catch (error) {
      console.error(`Error ${action}ing verification request:`, error)
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action} verification request. Please try again.`,
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Verification Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>ID Number</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.userId}</TableCell>
                  <TableCell>{request.fullName}</TableCell>
                  <TableCell>{request.idNumber}</TableCell>
                  <TableCell>{new Date(request.submissionDate).toLocaleString()}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleVerificationAction(request.id, "approve")}
                          className="mr-2"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleVerificationAction(request.id, "reject")}
                        >
                          Reject
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
