"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Home, MessageCircle, LayoutGrid, Folder, Plus, Bell, Settings, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { usePreferences } from "@/contexts/preferences-context"
import { GlassCard } from "@/components/glass-card"

type DockTemplate = "default" | "minimal" | "productivity" | "creative"

interface Template {
  id: DockTemplate
  name: string
  description: string
  tooltipDescription: string
  icons: React.ElementType[]
}

const templates: Template[] = [
  {
    id: "default",
    name: "Default",
    description: "Complete set of tools for everyday use",
    tooltipDescription:
      "Includes all essential features: Home, Chat, Taskboard, Folders, Quick Actions, Notifications, Settings, and Canvas. Perfect for users who want access to everything.",
    icons: [Home, MessageCircle, LayoutGrid, Folder, Plus, Bell, Settings, Trash2],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Essential tools only, clean and simple",
    tooltipDescription:
      "Streamlined interface with only Home, Chat, Folders, and Settings. Ideal for users who prefer a distraction-free, focused workspace with minimal clutter.",
    icons: [Home, MessageCircle, Folder, Settings],
  },
  {
    id: "productivity",
    name: "Productivity",
    description: "Optimized for getting work done",
    tooltipDescription:
      "Designed for maximum efficiency with Home, Taskboard, Folders, Quick Actions, Notifications, and Settings. Best for professionals managing multiple projects and tasks.",
    icons: [Home, LayoutGrid, Folder, Plus, Bell, Settings],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Perfect for designers and creators",
    tooltipDescription:
      "Tailored for creative workflows with Home, Folders, Quick Actions, Taskboard, and Settings. Optimized for designers, artists, and content creators.",
    icons: [Home, Folder, Plus, LayoutGrid, Settings],
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setDockTemplate } = usePreferences()
  const [selectedTemplate, setSelectedTemplate] = useState<DockTemplate>("default")

  const handleContinue = () => {
    setDockTemplate(selectedTemplate)
    router.push("/dashboard")
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 animate-gradient-shift relative overflow-hidden flex items-center justify-center p-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="max-w-6xl w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl font-serif">
              Choose Your Template
            </h1>
            <p className="text-xl text-white/80 drop-shadow-lg">Select a dock layout that matches your workflow</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {templates.map((template) => (
              <Tooltip key={template.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative group text-left transition-all duration-300 ${
                      selectedTemplate === template.id ? "scale-105" : "hover:scale-[1.02]"
                    }`}
                  >
                    <GlassCard
                      className={`p-8 transition-all duration-300 ${
                        selectedTemplate === template.id ? "ring-2 ring-white/50 shadow-2xl" : "hover:shadow-xl"
                      }`}
                    >
                      {/* Selected Indicator */}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <Check className="w-6 h-6 text-cyan-500" strokeWidth={3} />
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg font-serif">{template.name}</h3>
                      <p className="text-white/80 mb-6 drop-shadow-md">{template.description}</p>

                      {/* Icon Preview */}
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                        {template.icons.map((Icon, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                          >
                            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs bg-white/95 backdrop-blur-md text-slate-900 border border-white/50 shadow-2xl"
                  sideOffset={8}
                >
                  <p className="text-sm leading-relaxed">{template.tooltipDescription}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-white/90 text-slate-900 hover:bg-white text-lg px-12 py-6 rounded-2xl font-semibold shadow-2xl backdrop-blur-sm border border-white/50"
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
