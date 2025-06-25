import { Shield } from "lucide-react"

interface VerifiedBadgeProps {
  isVerified: boolean
}

export function VerifiedBadge({ isVerified }: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
        isVerified ? "bg-green-500" : "bg-gray-300"
      }`}
      title={isVerified ? "Verified Profile" : "Unverified Profile"}
    >
      <Shield className={`w-3 h-3 ${isVerified ? "text-white" : "text-gray-500"}`} />
    </span>
  )
}
