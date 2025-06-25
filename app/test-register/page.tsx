import { RegistrationFlowTest } from "@/app/components/RegistrationFlowTest"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestRegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Test Registration Flow</CardTitle>
          <CardDescription>This page is for testing the registration flow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the content of the card.</p>
          <div className="mt-6">
            <RegistrationFlowTest />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
