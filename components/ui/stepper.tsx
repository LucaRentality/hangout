import { cn } from "@/lib/utils"

const Stepper = ({ children, className, ...props }: any) => {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}

const Step = ({ children, className, ...props }: any) => {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}

const StepLabel = ({ children, className, ...props }: any) => {
  return (
    <div className={cn("font-medium", className)} {...props}>
      {children}
    </div>
  )
}

const StepContent = ({ children, className, ...props }: any) => {
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  )
}

export { Stepper, Step, StepLabel, StepContent }
