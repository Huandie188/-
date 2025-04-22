"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gradientButtonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:brightness-105 active:scale-[0.98]",
        subtle: "bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 hover:brightness-105 active:scale-[0.98]",
        outline: "border border-primary-200 bg-transparent text-primary-700 hover:bg-primary-50 active:scale-[0.98]",
        ghost: "bg-transparent text-primary-700 hover:bg-primary-50 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        pill: "h-10 rounded-full px-6",
        "pill-lg": "h-11 rounded-full px-8 text-base",
      },
      glow: {
        true: "after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity hover:after:opacity-100 after:shadow-[0_0_20px_10px_rgba(0,91,211,0.15)]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: false,
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, glow, children, ...props }, ref) => {
    return (
      <button
        className={cn(gradientButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GradientButton.displayName = "GradientButton"

export { GradientButton, gradientButtonVariants } 