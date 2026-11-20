"use client"

import { useState, type ComponentProps } from "react"
import { Eye, EyeOff, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AuthFieldProps = ComponentProps<typeof Input> & {
  label: string
  icon: LucideIcon
  hint?: string
}

// A labelled input with a leading icon. Password fields get a show/hide button.
export default function AuthField({
  label,
  icon: Icon,
  hint,
  id,
  type = "text",
  ...props
}: AuthFieldProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === "password"

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-zinc-300">
        {label}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          id={id}
          type={isPassword && visible ? "text" : type}
          className="h-11 rounded-xl border-zinc-700 bg-zinc-800/60 pr-10 pl-10 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-amber-500 focus-visible:ring-amber-500/30"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500 transition hover:text-amber-500"
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
    </div>
  )
}
