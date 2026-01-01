import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-500/25 [a&]:hover:from-emerald-600 [a&]:hover:to-teal-600",
        secondary:
          "border-transparent bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 [a&]:hover:bg-slate-200 dark:[a&]:hover:bg-slate-700",
        destructive:
          "border-transparent bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm shadow-rose-500/25 [a&]:hover:from-rose-600 [a&]:hover:to-pink-600 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-slate-200 dark:border-slate-700 text-foreground bg-white/50 dark:bg-slate-800/50 [a&]:hover:bg-slate-100 dark:[a&]:hover:bg-slate-700",
        success:
          "border-transparent bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50",
        warning:
          "border-transparent bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50",
        info:
          "border-transparent bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
