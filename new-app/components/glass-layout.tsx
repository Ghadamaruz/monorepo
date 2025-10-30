"use client"

import type React from "react"
import Link from "next/link"
import { Home, MessageCircle, LayoutGrid, Folder, Film, Bell, Settings, Pencil } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { usePreferences } from "@/contexts/preferences-context"
import { useEffect, useState } from "react"

export function GlassLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const { dockTemplate } = usePreferences()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLiquidGlass = theme === "liquid-glass"

  if (!mounted) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-1">
        <div className="relative w-full h-full min-h-[calc(100vh-8px)] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-blue-500/50 to-cyan-300/40">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-400/30" />
          </div>
          <div
            className="absolute inset-0 backdrop-blur-[20px] bg-white/10"
            style={{
              backdropFilter: "blur(20px) contrast(110%)",
              WebkitBackdropFilter: "blur(20px) contrast(110%)",
            }}
          >
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
          </div>
          <div className="relative h-full flex flex-col">
            <div className="flex-1 overflow-auto p-12 pb-32">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center p-1 ${
        isLiquidGlass ? "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" : "bg-background"
      }`}
    >
      {/* Main Glass Container */}
      <div
        className={`relative w-full h-full min-h-[calc(100vh-8px)] overflow-hidden shadow-2xl ${
          isLiquidGlass ? "rounded-[2.5rem]" : "rounded-3xl"
        }`}
      >
        {isLiquidGlass && (
          <>
            {/* Liquid Glass Background with Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-blue-500/50 to-cyan-300/40">
              {/* Layered gradient effects for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-cyan-400/30" />
              <div
                className="absolute top-0 left-0 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: "4s" }}
              />
              <div
                className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/40 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: "5s", animationDelay: "1s" }}
              />

              {/* Light reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
            </div>

            {/* Glassmorphism Layer */}
            <div
              className="absolute inset-0 backdrop-blur-[20px] bg-white/10"
              style={{
                backdropFilter: "blur(20px) contrast(110%)",
                WebkitBackdropFilter: "blur(20px) contrast(110%)",
              }}
            >
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
            </div>
          </>
        )}

        {!isLiquidGlass && (
          <div className="absolute inset-0 bg-background">
            <div
              className={`absolute inset-0 rounded-3xl border ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="relative h-full flex flex-col">
          <div className="flex-1 overflow-auto p-12 pb-32">{children}</div>

          {/* Floating Dock */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-auto z-50">
            <div
              className={`relative px-6 py-4 rounded-[2rem] border shadow-lg ${
                isLiquidGlass
                  ? "backdrop-blur-[20px] bg-white/15 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                  : theme === "dark"
                    ? "bg-gray-900/90 border-white/10"
                    : "bg-white/90 border-black/10"
              }`}
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
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Icons Container */}
              <div className="relative flex items-center gap-6">
                {getDockIcons(dockTemplate).map((item, index) => (
                  <DockIcon key={index} icon={item.icon} label={item.label} href={item.href} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DockIcon({ icon: Icon, label, href }: { icon: React.ElementType; label: string; href: string }) {
  const { theme } = useTheme()
  const isLiquidGlass = theme === "liquid-glass"

  return (
    <Link
      href={href}
      className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl border shadow-lg hover:scale-110 transition-all duration-300 ${
        isLiquidGlass
          ? "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
          : theme === "dark"
            ? "bg-gray-800 border-white/10 hover:bg-gray-700"
            : "bg-gray-100 border-black/10 hover:bg-gray-200"
      }`}
      aria-label={label}
      style={
        isLiquidGlass
          ? {
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }
          : {}
      }
    >
      {isLiquidGlass && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <Icon
        className={`relative w-6 h-6 drop-shadow-lg ${isLiquidGlass ? "text-white" : "text-foreground"}`}
        strokeWidth={1.5}
      />

      {/* Tooltip */}
      <span
        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-sm ${
          theme === "dark" ? "bg-gray-900/90 text-white" : "bg-gray-800/90 text-white"
        }`}
      >
        {label}
      </span>
    </Link>
  )
}

const getDockIcons = (dockTemplate: string) => {
  switch (dockTemplate) {
    case "minimal":
      return [
        { icon: Home, label: "Home", href: "/dashboard" },
        { icon: MessageCircle, label: "Chat", href: "/chat" },
        { icon: Folder, label: "Folder", href: "/folder" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ]
    case "productivity":
      return [
        { icon: Home, label: "Home", href: "/dashboard" },
        { icon: LayoutGrid, label: "Taskboard", href: "/taskboard" },
        { icon: Folder, label: "Folder", href: "/folder" },
        { icon: Film, label: "Video Editor", href: "/add" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ]
    case "creative":
      return [
        { icon: Home, label: "Home", href: "/dashboard" },
        { icon: Folder, label: "Folder", href: "/folder" },
        { icon: Film, label: "Video Editor", href: "/add" },
        { icon: LayoutGrid, label: "Taskboard", href: "/taskboard" },
        { icon: Settings, label: "Settings", href: "/settings" },
      ]
    default:
      return [
        { icon: Home, label: "Home", href: "/dashboard" },
        { icon: MessageCircle, label: "Chat", href: "/chat" },
        { icon: LayoutGrid, label: "Taskboard", href: "/taskboard" },
        { icon: Folder, label: "Folder", href: "/folder" },
        { icon: Film, label: "Video Editor", href: "/add" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: Pencil, label: "Canvas", href: "/canvas" },
      ]
  }
}
