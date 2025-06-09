import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105",
        secondary:
          "border-transparent bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 shadow-sm hover:shadow-md",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl",
        outline: "text-slate-700 border-purple-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-purple-300 shadow-sm hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }