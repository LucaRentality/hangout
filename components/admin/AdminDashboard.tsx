// This file was previously at app/components/admin/AdminDashboard.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHangoutCreator } from "@/components/admin/AdminHangoutCreator" // Updated import path
import { AdminOpenHangoutCreator } from "@/components/admin/AdminOpenHangoutCreator" // Updated import path
import { AdminHangoutList } from "@/components/admin/AdminHangoutList" // Updated import path
import { AdminStateManager } from "@/components/admin/AdminStateManager" // Updated import path

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("vendor")

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vendor">Vendor Hangouts</TabsTrigger>
            <TabsTrigger value="open">Open Hangouts</TabsTrigger>
            <TabsTrigger value="list">All Hangouts</TabsTrigger>
            <TabsTrigger value="state">Manage States</TabsTrigger>
          </TabsList>
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
  )
}
