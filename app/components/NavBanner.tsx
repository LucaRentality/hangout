"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function NavBanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }
    checkLoginStatus()
  }, [])

  const handleNavigation = (path: string) => {
    if (isLoggedIn) {
      router.push(path)
    } else {
      router.push("/register")
    }
  }

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div onClick={() => handleNavigation("/profile")} className="flex items-center cursor-pointer">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202023-04-18%20at%2008.50.16-COFGwoWq4jV6PV5yFqUVxI7aFaQzAV.jpeg"
            alt="Hangout Logo"
            width={200}
            height={50}
            className="mr-2"
          />
        </div>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                className="text-white hover:text-gray-300 px-4 py-2 w-full sm:w-auto"
                onClick={() => handleNavigation("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-gray-300 px-4 py-2 w-full sm:w-auto"
                onClick={() => handleNavigation("/nearby-matches")}
              >
                Nearby Matches
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-gray-300 px-4 py-2 w-full sm:w-auto"
                onClick={() => handleNavigation("/profile")}
              >
                Profile
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="text-white hover:text-gray-300 px-4 py-2 w-full sm:w-auto"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
