"use client"

import { GlassLayout } from "@/components/glass-layout"
import { Settings, User, Bell, Lock, Palette, Globe, Droplets, Moon, Sun, Check } from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { useTheme } from "@/contexts/theme-context"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const settingsSections = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your account information",
      color: "from-blue-400/20 to-cyan-500/20",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure notification preferences",
      color: "from-purple-400/20 to-pink-500/20",
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Control your privacy settings",
      color: "from-green-400/20 to-emerald-500/20",
    },
    {
      icon: Globe,
      title: "Language & Region",
      description: "Set your language and location",
      color: "from-cyan-400/20 to-blue-500/20",
    },
  ]

  const themeOptions = [
    {
      id: "liquid-glass" as const,
      name: "Liquid Glass",
      description: "Beautiful glass morphism with flowing gradients",
      icon: Droplets,
      preview: "bg-gradient-to-br from-cyan-400/40 via-blue-500/50 to-cyan-300/40",
    },
    {
      id: "dark" as const,
      name: "Dark Mode",
      description: "Easy on the eyes with dark backgrounds",
      icon: Moon,
      preview: "bg-gray-900",
    },
    {
      id: "light" as const,
      name: "Light Mode",
      description: "Clean and bright interface",
      icon: Sun,
      preview: "bg-white",
    },
  ]

  return (
    <GlassLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Settings
            className={`w-12 h-12 drop-shadow-lg ${theme === "liquid-glass" ? "text-white/80" : "text-foreground"}`}
            strokeWidth={1.5}
          />
          <div>
            <h1
              className={`text-4xl font-bold drop-shadow-lg ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}
            >
              Settings
            </h1>
            <p className={`drop-shadow-md ${theme === "liquid-glass" ? "text-white/70" : "text-muted-foreground"}`}>
              Customize your experience
            </p>
          </div>
        </div>

        <GlassCard className="p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette
              className={`w-8 h-8 ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}
              strokeWidth={1.5}
            />
            <div>
              <h2 className={`text-2xl font-semibold ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}>
                Theme Settings
              </h2>
              <p className={theme === "liquid-glass" ? "text-white/70" : "text-muted-foreground"}>
                Choose your preferred visual style
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setTheme(option.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  theme === option.id
                    ? theme === "liquid-glass"
                      ? "border-white/60 bg-white/20"
                      : theme === "dark"
                        ? "border-white/40 bg-white/10"
                        : "border-primary bg-primary/5"
                    : theme === "liquid-glass"
                      ? "border-white/20 bg-white/5 hover:bg-white/10"
                      : "border-border bg-card hover:bg-accent"
                }`}
              >
                {/* Theme Preview */}
                <div
                  className={`w-full h-24 rounded-xl mb-4 ${option.preview} border ${
                    theme === "liquid-glass" ? "border-white/20" : "border-border"
                  }`}
                />

                {/* Theme Info */}
                <div className="flex items-start gap-3">
                  <option.icon
                    className={`w-6 h-6 mt-1 ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}
                    strokeWidth={1.5}
                  />
                  <div className="flex-1 text-left">
                    <h3
                      className={`text-lg font-semibold mb-1 ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}
                    >
                      {option.name}
                    </h3>
                    <p className={`text-sm ${theme === "liquid-glass" ? "text-white/70" : "text-muted-foreground"}`}>
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Selected Indicator */}
                {theme === option.id && (
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        theme === "liquid-glass" ? "bg-white/30" : theme === "dark" ? "bg-white/20" : "bg-primary"
                      }`}
                    >
                      <Check
                        className={`w-5 h-5 ${theme === "liquid-glass" || theme === "dark" ? "text-white" : "text-primary-foreground"}`}
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => (
            <GlassCard key={index} className="p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex items-start gap-4">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${section.color} backdrop-blur-sm border ${
                    theme === "liquid-glass" ? "border-white/20" : "border-border"
                  }`}
                >
                  <section.icon
                    className={`w-8 h-8 ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl font-semibold mb-2 ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}
                  >
                    {section.title}
                  </h3>
                  <p className={theme === "liquid-glass" ? "text-white/70" : "text-muted-foreground"}>
                    {section.description}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-8 p-6">
          <h3 className={`text-xl font-semibold mb-4 ${theme === "liquid-glass" ? "text-white" : "text-foreground"}`}>
            Account Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              className={`px-6 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                theme === "liquid-glass"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-secondary border-border text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Export Data
            </button>
            <button
              className={`px-6 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                theme === "liquid-glass"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-secondary border-border text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Reset Preferences
            </button>
            <button
              className={`px-6 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                theme === "liquid-glass"
                  ? "bg-red-500/20 border-red-400/30 text-white hover:bg-red-500/30"
                  : "bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20"
              }`}
            >
              Delete Account
            </button>
          </div>
        </GlassCard>
      </div>
    </GlassLayout>
  )
}
