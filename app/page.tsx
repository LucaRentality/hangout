"use client"

import { ComingSoon } from "./components/ComingSoon"
import Dashboard from "./dashboard/page"
import { useState, useEffect } from "react"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }
    checkLoginStatus()
  }, [])

  return isLoggedIn ? <Dashboard /> : <ComingSoon />
}
