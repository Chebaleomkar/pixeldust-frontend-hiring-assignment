import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent",
        "before:animate-[shimmer_2s_infinite]",
        className
      )}
      style={{
        backgroundSize: '200% 100%',
      }}
      {...props}
    />
  )
}

export { Skeleton }
