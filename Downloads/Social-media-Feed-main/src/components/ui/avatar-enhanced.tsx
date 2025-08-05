import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AvatarEnhancedProps {
  src: string
  alt: string
  fallback: string
  verified?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10", 
  lg: "h-12 w-12"
}

const verifiedSizes = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5"
}

export function AvatarEnhanced({ 
  src, 
  alt, 
  fallback, 
  verified = false, 
  size = "md",
  className 
}: AvatarEnhancedProps) {
  return (
    <div className="relative inline-block">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
          {fallback}
        </AvatarFallback>
      </Avatar>
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5">
          <CheckCircle 
            className={cn(
              verifiedSizes[size], 
              "text-social-verified bg-background rounded-full"
            )} 
          />
        </div>
      )}
    </div>
  )
}