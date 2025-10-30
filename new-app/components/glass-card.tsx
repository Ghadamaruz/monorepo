"use client"

import type React from "react"
import { useTheme } from "@/contexts/theme-context"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  const { theme } = useTheme()
  const isLiquidGlass = theme === "liquid-glass"

  return (
    <div
      className={`relative rounded-3xl border shadow-lg overflow-hidden ${
        isLiquidGlass
          ? "backdrop-blur-[20px] bg-white/10 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]"
          : theme === "dark"
            ? "bg-gray-800/50 border-white/10"
            : "bg-white border-border"
      } ${className}`}
      style={
        isLiquidGlass
          ? {
              backdropFilter: "blur(20px) contrast(110%)",
              WebkitBackdropFilter: "blur(20px) contrast(110%)",
            }
          : {}
      }
    >
      {isLiquidGlass && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
