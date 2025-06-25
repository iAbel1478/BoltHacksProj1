import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 justify-center",
  {
    variants: {
      variant: {
        default:
          "bg-gray-200 text-gray-900",
        dark:
          "bg-blue-600 text-white",
        secondary:
          "bg-gray-100 text-gray-900",
        destructive:
          "bg-red-600 text-white",
        outline: "text-gray-900 border border-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  inverted?: boolean;
}

function Badge({ className, variant, inverted, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant: inverted ? 'dark' : variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
