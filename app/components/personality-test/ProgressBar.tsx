import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground text-center mt-2">
        Question {current} of {total}
      </p>
    </div>
  )
}
