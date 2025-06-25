import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 px-5 py-3 text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
