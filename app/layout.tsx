import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from "@/components/MainNav"
import { DebugInfo } from "@/components/DebugInfo"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hangout - No More Waste on Small Talking",
  description: "Connect meaningfully with like-minded people through real activities",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNav />
        <main className="container mx-auto p-4">{children}</main>
        <Toaster />
        <DebugInfo />
      </body>
    </html>
  )
}
