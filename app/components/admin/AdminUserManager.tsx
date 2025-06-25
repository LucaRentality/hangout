"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface User {
  id: string
  username: string
  role: string
  status: string
}

export function AdminUserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Fetch users from API
    // This is a mock implementation
    setUsers([
      { id: "1", username: "admin", role: "admin", status: "active" },
      { id: "2", username: "user1", role: "user", status: "active" },
      { id: "3", username: "user2", role: "user", status: "suspended" },
    ])
  }, [])

  const handleStatusChange = (userId: string, newStatus: string) => {
    // Update user status in API
    // This is a mock implementation
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                {user.status === "active" ? (
                  <Button onClick={() => handleStatusChange(user.id, "suspended")}>Suspend</Button>
                ) : (
                  <Button onClick={() => handleStatusChange(user.id, "active")}>Activate</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
