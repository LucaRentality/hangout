"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHangoutCreator } from "../../components/admin/AdminHangoutCreator"
import { AdminOpenHangoutCreator } from "../../components/admin/AdminOpenHangoutCreator"
import { AdminHangoutList } from "../../components/admin/AdminHangoutList"
import { AdminStateManager } from "../../components/admin/AdminStateManager"
import { AdminUserManager } from "../../components/admin/AdminUserManager"
import { AdminReportManager } from "../../components/admin/AdminReportManager"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="vendor">Vendor Hangouts</TabsTrigger>
              <TabsTrigger value="open">Open Hangouts</TabsTrigger>
              <TabsTrigger value="list">All Hangouts</TabsTrigger>
              <TabsTrigger value="state">Manage States</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <AdminUserManager />
            </TabsContent>
            <TabsContent value="reports">
              <AdminReportManager />
            </TabsContent>
            <TabsContent value="vendor">
              <AdminHangoutCreator />
            </TabsContent>
            <TabsContent value="open">
              <AdminOpenHangoutCreator />
            </TabsContent>
            <TabsContent value="list">
              <AdminHangoutList />
            </TabsContent>
            <TabsContent value="state">
              <AdminStateManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
