"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHangoutCreator } from "./AdminHangoutCreator"
import { AdminOpenHangoutCreator } from "./AdminOpenHangoutCreator"
import { AdminHangoutList } from "./AdminHangoutList"
import { AdminStateManager } from "./AdminStateManager"

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
