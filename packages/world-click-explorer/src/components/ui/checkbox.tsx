import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer w-6 h-6 rounded-lg border-2 border-gray-300 shadow-sm bg-white flex items-center justify-center transition-all duration-200 focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gradient-to-br from-blue-400 to-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("text-white w-4 h-4 transition-transform duration-200")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
