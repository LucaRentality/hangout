"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function ComingSoon() {
  const router = useRouter()

  const handleRegister = () => {
    router.push("/register")
  }

  const handleSkipToDemo = () => {
    // Set up mock user data
    const mockUserProfile = {
      name: "Demo User",
      age: 28,
      personalityType: "ENFP",
      bio: "Hey there! 👋 I'm Demo User, a 28-year-old ENFP living in San Francisco. I love hiking, photography, and trying new restaurants. Looking for fun adventures and meaningful connections!",
      photos: ["/placeholder.svg?height=300&width=300"],
      interests: ["Hiking", "Photography", "Travel", "Cooking", "Music"],
      favoriteActivities: ["Mountain climbing", "City exploration", "Food tasting", "Concert going"],
      genderType: "Other",
      lookingFor: ["Fun", "Friends"],
      location: "San Francisco, CA",
      email: "demo@hangout.app",
      dateOfBirth: "1995-06-15",
    }

    // Store mock data in localStorage
    localStorage.setItem("userProfile", JSON.stringify(mockUserProfile))
    localStorage.setItem("personalityType", "ENFP")
    localStorage.setItem("lastTestDate", new Date().toISOString())
    localStorage.setItem("isLoggedIn", "true")

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl mb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202023-04-18%20at%2008.50.15-YtNIIgvWqe1MLVTffd42EnUgiaC0bt.jpeg"
          alt="Hangout Logo"
          width={800}
          height={200}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="flex justify-center gap-4 mb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4135.JPG-bMptKqZKusVjzFCQtaasWnx5t9DEyn.jpeg"
          alt="Decorative Heart"
          width={200}
          height={200}
          className="w-auto h-32"
        />
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4136.PNG-zVzz7JW8KDy2Wcc1M9GjZLwpm9pgfg.png"
          alt="Decorative Arrow"
          width={200}
          height={200}
          className="w-auto h-32"
        />
      </div>
      <div className="max-w-2xl text-center mb-12">
        <p className="text-xl mb-4">
          Tired of endless swiping, dead-end chats, and awkward small talk? Hangout is the first dating and socializing
          app designed to skip the boring text exchanges and jump straight into real-life experiences.
        </p>
      </div>
      <div className="max-w-2xl text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside text-left space-y-2">
          <li>Sign up and create your profile</li>
          <li>Browse nearby matches based on shared interests</li>
          <li>Send hangout invitations for activities you enjoy</li>
          <li>Meet up and have a great time!</li>
        </ol>
      </div>
      <div className="w-full max-w-lg mb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202023-04-18%20at%2008.50.16%20(1)-nsnkx2x6nRlR5R4OH2KqpVQ4HyJ2aY.jpeg"
          alt="Hangout Door Logo"
          width={600}
          height={600}
          className="w-full h-auto"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleRegister()
        }}
        className="flex flex-col items-center space-y-4"
      >
        <Button type="button" onClick={handleRegister} className="bg-primary text-white hover:bg-primary/90">
          Register Now
        </Button>
        <Button
          type="button"
          onClick={handleSkipToDemo}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
        >
          Skip to Demo
        </Button>
      </form>
    </div>
  )
}
