"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const info = {
      currentPath: window.location.pathname,
      isLoggedIn: localStorage.getItem("isLoggedIn"),
      userProfile: localStorage.getItem("userProfile"),
      personalityType: localStorage.getItem("personalityType"),
      lastTestDate: localStorage.getItem("lastTestDate"),
      timestamp: new Date().toISOString(),
    }
    setDebugInfo(info)
  }, [])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button size="sm" onClick={() => setIsVisible(true)}>
          Debug Info
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex justify-between items-center">
            Debug Information
            <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)}>
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
          <div className="mt-2 space-x-1">
            <Button size="sm" onClick={() => localStorage.clear()}>
              Clear Storage
            </Button>
            <Button size="sm" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
