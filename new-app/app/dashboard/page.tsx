"use client"

import { GlassLayout } from "@/components/glass-layout"

export default function DashboardPage() {
  return (
    <GlassLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg mb-4">Welcome</h1>
        <p className="text-xl text-white/80 drop-shadow-md">Select an option from the dock below</p>
      </div>
    </GlassLayout>
  )
}
