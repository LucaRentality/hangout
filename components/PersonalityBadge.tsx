// This file was previously at app/components/PersonalityBadge.tsx
// No changes needed to its content as it was already correct.
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PersonalityType =
  | "ISTJ"
  | "ISFJ"
  | "INFJ"
  | "INTJ"
  | "ISTP"
  | "ISFP"
  | "INFP"
  | "INTP"
  | "ESTP"
  | "ESFP"
  | "ENFP"
  | "ENTP"
  | "ESTJ"
  | "ESFJ"
  | "ENFJ"
  | "ENTJ"

interface PersonalityBadgeProps {
  type: PersonalityType
  size?: "sm" | "md" | "lg"
}

const badgeDescriptions: Record<PersonalityType, string> = {
  ISTJ: "The Logistician: Practical and fact-minded individuals, whose reliability cannot be doubted.",
  ISFJ: "The Defender: Very dedicated and warm protectors, always ready to defend their loved ones.",
  INFJ: "The Advocate: Quiet and mystical, yet very inspiring and tireless idealists.",
  INTJ: "The Architect: Imaginative and strategic thinkers, with a plan for everything.",
  ISTP: "The Virtuoso: Bold and practical experimenters, masters of all kinds of tools.",
  ISFP: "The Adventurer: Flexible and charming artists, always ready to explore and experience something new.",
  INFP: "The Mediator: Poetic, kind and altruistic people, always eager to help a good cause.",
  INTP: "The Logician: Innovative inventors with an unquenchable thirst for knowledge.",
  ESTP: "The Entrepreneur: Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
  ESFP: "The Entertainer: Spontaneous, energetic and enthusiastic people – life is never boring around them.",
  ENFP: "The Campaigner: Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
  ENTP: "The Debater: Smart and curious thinkers who cannot resist an intellectual challenge.",
  ESTJ: "The Executive: Excellent administrators, unsurpassed at managing things – or people.",
  ESFJ: "The Consul: Extraordinarily caring, social and popular people, always eager to help.",
  ENFJ: "The Protagonist: Charismatic and inspiring leaders, able to mesmerize their listeners.",
  ENTJ: "The Commander: Bold, imaginative and strong-willed leaders, always finding a way – or making one.",
}

export function PersonalityBadge({ type, size = "md" }: PersonalityBadgeProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-12 h-12 text-base",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`relative ${sizeClasses[size]} inline-flex items-center justify-center`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="2" />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={size === "sm" ? "20" : size === "md" ? "24" : "32"}
                fontWeight="bold"
                fill="black"
              >
                {type}
              </text>
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{type}</p>
          <p className="text-sm">{badgeDescriptions[type]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
