"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "My Profile" },
  { href: "/find-matches", label: "Find My Match" },
]

export function MainNav() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }
    checkLoginStatus()
  }, [])

  return (
    <nav className="bg-black text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202023-04-18%20at%2008.50.16-COFGwoWq4jV6PV5yFqUVxI7aFaQzAV.jpeg"
            alt="Hangout Logo"
            width={100}
            height={25}
            priority
          />
        </Link>
        {isLoggedIn && (
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-gray-300 transition-colors",
                    pathname === item.href && "text-primary font-bold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}
