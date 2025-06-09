import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border-2 border-purple-100 bg-white/80 backdrop-blur-sm px-4 py-3 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:border-purple-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-purple-200 shadow-sm hover:shadow-md resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }