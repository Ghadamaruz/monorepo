"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type DockTemplate = "default" | "minimal" | "productivity" | "creative"

interface PreferencesContextType {
  dockTemplate: DockTemplate
  setDockTemplate: (template: DockTemplate) => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [dockTemplate, setDockTemplateState] = useState<DockTemplate>("default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const savedTemplate = localStorage.getItem("dock-template") as DockTemplate
    if (savedTemplate && ["default", "minimal", "productivity", "creative"].includes(savedTemplate)) {
      setDockTemplateState(savedTemplate)
    }
    setMounted(true)
  }, [])

  const setDockTemplate = (template: DockTemplate) => {
    setDockTemplateState(template)
    localStorage.setItem("dock-template", template)
  }

  if (!mounted) {
    return null
  }

  return <PreferencesContext.Provider value={{ dockTemplate, setDockTemplate }}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    console.warn("[v0] usePreferences called outside PreferencesProvider, using default")
    return { dockTemplate: "default" as DockTemplate, setDockTemplate: () => {} }
  }
  return context
}
