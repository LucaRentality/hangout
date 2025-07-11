// This file was previously at app/components/RegistrationFlowTest.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast" // Import path is already correct
import { registerUser } from "@/app/lib/api"

export function RegistrationFlowTest() {
  const [testData, setTestData] = useState({
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "testpassword123",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setTestData((prev) => ({ ...prev, [field]: value }))
  }

  const testRegistration = async () => {
    setIsLoading(true)
    setResult("")

    try {
      const response = await registerUser(testData)
      setResult(`✅ Registration successful: ${JSON.stringify(response, null, 2)}`)
      toast({
        title: "Test Successful",
        description: "Registration API is working correctly",
      })
    } catch (error) {
      setResult(`❌ Registration failed: ${error}`)
      toast({
        title: "Test Failed",
        description: error instanceof Error ? error.message : "Registration test failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateNewTestData = () => {
    setTestData({
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "testpassword123",
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Registration API Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="test-name">Name</Label>
          <Input id="test-name" value={testData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="test-email">Email</Label>
          <Input
            id="test-email"
            type="email"
            value={testData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="test-password">Password</Label>
          <Input
            id="test-password"
            type="password"
            value={testData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <Button onClick={testRegistration} disabled={isLoading}>
            {isLoading ? "Testing..." : "Test Registration"}
          </Button>
          <Button onClick={generateNewTestData} variant="outline">
            New Test Data
          </Button>
        </div>
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <pre className="text-xs whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
