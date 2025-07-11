// This file was previously at app/components/admin/AdminStateManager.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type AppState, type AppConfig, updateAppConfig } from "@/app/config"
import { useToast } from "@/components/ui/use-toast" // Import path is already correct

export function AdminStateManager() {
  const [websiteState, setWebsiteState] = useState<AppState>("coming-soon")
  const [appState, setAppState] = useState<AppState>("coming-soon")
  const { toast } = useToast()

  const handleStateChange = async () => {
    const newConfig: AppConfig = {
      websiteState,
      appState,
    }

    try {
      const response = await fetch("/api/admin/update-state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConfig),
      })

      if (!response.ok) {
        throw new Error("Failed to update state")
      }

      updateAppConfig(newConfig)

      toast({
        title: "State Updated",
        description: "The website and app states have been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update state. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage App States</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">Website State</label>
          <Select value={websiteState} onValueChange={(value: AppState) => setWebsiteState(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select website state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coming-soon">Coming Soon</SelectItem>
              <SelectItem value="open">Open</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">App State</label>
          <Select value={appState} onValueChange={(value: AppState) => setAppState(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select app state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coming-soon">Coming Soon</SelectItem>
              <SelectItem value="open">Open</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleStateChange}>Update States</Button>
      </CardContent>
    </Card>
  )
}
