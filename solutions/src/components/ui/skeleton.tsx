import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-slate-200 dark:bg-slate-700",
        "animate-pulse",
        className
      )}
      aria-hidden="true"
      role="presentation"
      {...props}
    />
  )
}

export { Skeleton }
