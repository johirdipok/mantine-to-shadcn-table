// components/TooltipWrapper.tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ReactNode } from "react"

interface TooltipWrapperProps {
  content: string
  children: ReactNode
  delayDuration?: number
  side?: "top" | "right" | "bottom" | "left"
}

export function ReusableToolTip({ content, children, delayDuration, side = 'top' }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
