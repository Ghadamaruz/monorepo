"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Layers, Zap, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 animate-gradient-shift relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
        <div className="backdrop-blur-[20px] bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white drop-shadow-lg font-serif">GlassUI</span>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-[20px] bg-white/15 border border-white/30 text-white shadow-lg mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Introducing the future of UI design</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl font-serif">
            The liquid glass
            <br />
            <span className="text-white/90">interface framework</span>
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Build stunning applications with our glassmorphism design system. Seamlessly blend aesthetics with
            functionality using customizable templates and themes.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-white/90 text-slate-900 hover:bg-white text-lg px-8 py-6 rounded-2xl font-semibold shadow-2xl backdrop-blur-sm border border-white/50"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-2xl backdrop-blur-[20px] bg-white/5 shadow-lg"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg font-serif">
              Why choose GlassUI?
            </h2>
            <p className="text-lg text-white/80 drop-shadow-md">Everything you need to build beautiful interfaces</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-white mb-6 shadow-lg">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-serif">Multiple Templates</h3>
              <p className="text-white/80 leading-relaxed">
                Choose from a variety of pre-designed dock layouts and customize them to match your workflow.
              </p>
            </GlassCard>

            <GlassCard className="p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-white mb-6 shadow-lg">
                <Palette className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-serif">Theme System</h3>
              <p className="text-white/80 leading-relaxed">
                Switch between Liquid Glass, Dark, and Light themes with a single click. Your preference is saved
                automatically.
              </p>
            </GlassCard>

            <GlassCard className="p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center text-white mb-6 shadow-lg">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 font-serif">Fast & Responsive</h3>
              <p className="text-white/80 leading-relaxed">
                Built with performance in mind. Smooth animations and responsive design across all devices.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg font-serif">Ready to get started?</h2>
            <p className="text-lg text-white/80 mb-8 drop-shadow-md">
              Join thousands of users creating beautiful interfaces with GlassUI
            </p>
            <Link href="/onboarding">
              <Button
                size="lg"
                className="bg-white/90 text-slate-900 hover:bg-white text-lg px-8 py-6 rounded-2xl font-semibold shadow-2xl backdrop-blur-sm border border-white/50"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="backdrop-blur-[20px] bg-white/5 border border-white/20 rounded-2xl px-6 py-4 inline-block">
            <p className="text-white/60 text-sm">© 2025 GlassUI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
