"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "liquid-glass" | "dark" | "light"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("liquid-glass")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("app-theme") as Theme
    if (savedTheme && ["liquid-glass", "dark", "light"].includes(savedTheme)) {
      setThemeState(savedTheme)
      document.documentElement.classList.remove("liquid-glass", "dark", "light")
      document.documentElement.classList.add(savedTheme)
    } else {
      document.documentElement.classList.add("liquid-glass")
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Remove all theme classes first
      document.documentElement.classList.remove("liquid-glass", "dark", "light")
      // Add current theme class
      document.documentElement.classList.add(theme)
    }
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("app-theme", newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    console.warn("[v0] useTheme called outside ThemeProvider, using default theme")
    return { theme: "liquid-glass" as Theme, setTheme: () => {} }
  }
  return context
}
