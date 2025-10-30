"use client"

import { GlassLayout } from "@/components/glass-layout"
import { GlassCard } from "@/components/glass-card"
import {
  Film,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Scissors,
  Split,
  Sparkles,
  Download,
  Upload,
  ImageIcon,
  Music,
  Volume2,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  Layers,
} from "lucide-react"
import { useState } from "react"

export default function VideoEditorPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedTool, setSelectedTool] = useState<string>("select")
  const [zoom, setZoom] = useState(100)

  const mediaLibrary = [
    { id: 1, type: "video", name: "Clip 1.mp4", duration: "0:45", thumbnail: "/placeholder.svg?height=80&width=120" },
    { id: 2, type: "video", name: "Clip 2.mp4", duration: "1:20", thumbnail: "/placeholder.svg?height=80&width=120" },
    { id: 3, type: "image", name: "Image 1.jpg", duration: "—", thumbnail: "/placeholder.svg?height=80&width=120" },
    { id: 4, type: "audio", name: "Audio 1.mp3", duration: "2:15", thumbnail: "/placeholder.svg?height=80&width=120" },
  ]

  const timelineClips = [
    { id: 1, name: "Clip 1", start: 0, duration: 45, track: 1, color: "bg-blue-500/60" },
    { id: 2, name: "Clip 2", start: 50, duration: 80, track: 1, color: "bg-purple-500/60" },
    { id: 3, name: "Audio", start: 0, duration: 135, track: 2, color: "bg-green-500/60" },
  ]

  const effects = [
    { id: 1, name: "Fade In", icon: Sparkles },
    { id: 2, name: "Fade Out", icon: Sparkles },
    { id: 3, name: "Blur", icon: Sparkles },
    { id: 4, name: "Brightness", icon: Sparkles },
  ]

  const transitions = [
    { id: 1, name: "Cross Fade" },
    { id: 2, name: "Wipe" },
    { id: 3, name: "Slide" },
    { id: 4, name: "Zoom" },
  ]

  return (
    <GlassLayout>
      <div className="flex flex-col h-full gap-4 pb-24">
        {/* Header with Tools */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Film className="w-10 h-10 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Video Editor</h1>
              <p className="text-white/70 text-sm drop-shadow-md">Create and edit your videos</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20">
              <Undo className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20">
              <Redo className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-500/80 hover:bg-blue-500 text-white transition-all border border-white/20 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Main Editor Layout */}
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Left Panel - Media Library */}
          <GlassCard className="w-64 flex-shrink-0 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Media</h3>
              <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                <Upload className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {mediaLibrary.map((item) => (
                <div
                  key={item.id}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-white/10 group"
                >
                  <div className="aspect-video bg-white/5 rounded mb-2 overflow-hidden">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs truncate">{item.name}</p>
                      <p className="text-white/50 text-xs">{item.duration}</p>
                    </div>
                    {item.type === "video" && <Film className="w-3 h-3 text-white/50" />}
                    {item.type === "image" && <ImageIcon className="w-3 h-3 text-white/50" />}
                    {item.type === "audio" && <Music className="w-3 h-3 text-white/50" />}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Center Panel - Preview & Timeline */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Video Preview */}
            <GlassCard className="flex-1 p-6 flex flex-col">
              <div className="flex-1 bg-black/30 rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Film className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/50">Video Preview</p>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-xl bg-blue-500/80 hover:bg-blue-500 text-white transition-all"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                  <SkipForward className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 ml-4">
                  <Volume2 className="w-5 h-5 text-white/70" />
                  <input type="range" className="w-24" min="0" max="100" />
                </div>
              </div>
            </GlassCard>

            {/* Timeline */}
            <GlassCard className="h-64 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Timeline</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(Math.max(50, zoom - 25))}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-all"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-white/70 text-xs w-12 text-center">{zoom}%</span>
                  <button
                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-white transition-all"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Timeline Ruler */}
              <div className="relative h-6 bg-white/5 rounded-t-lg border-b border-white/10">
                <div className="absolute inset-0 flex items-center px-2">
                  {[0, 15, 30, 45, 60, 75, 90, 105, 120].map((time) => (
                    <div key={time} className="flex-1 text-center">
                      <span className="text-white/50 text-xs">
                        {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Tracks */}
              <div className="flex-1 bg-white/5 rounded-b-lg overflow-auto">
                <div className="relative h-full p-2 space-y-2">
                  {/* Track 1 - Video */}
                  <div className="relative h-16 bg-white/5 rounded-lg border border-white/10">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Film className="w-4 h-4 text-white/50" />
                      <span className="text-white/70 text-xs">Video</span>
                    </div>
                    <div className="absolute inset-0 pl-20">
                      {timelineClips
                        .filter((clip) => clip.track === 1)
                        .map((clip) => (
                          <div
                            key={clip.id}
                            className={`absolute top-2 bottom-2 ${clip.color} rounded border border-white/30 cursor-move hover:border-white/50 transition-all`}
                            style={{
                              left: `${(clip.start / 135) * 100}%`,
                              width: `${(clip.duration / 135) * 100}%`,
                            }}
                          >
                            <div className="px-2 py-1 text-white text-xs truncate">{clip.name}</div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Track 2 - Audio */}
                  <div className="relative h-16 bg-white/5 rounded-lg border border-white/10">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Music className="w-4 h-4 text-white/50" />
                      <span className="text-white/70 text-xs">Audio</span>
                    </div>
                    <div className="absolute inset-0 pl-20">
                      {timelineClips
                        .filter((clip) => clip.track === 2)
                        .map((clip) => (
                          <div
                            key={clip.id}
                            className={`absolute top-2 bottom-2 ${clip.color} rounded border border-white/30 cursor-move hover:border-white/50 transition-all`}
                            style={{
                              left: `${(clip.start / 135) * 100}%`,
                              width: `${(clip.duration / 135) * 100}%`,
                            }}
                          >
                            <div className="px-2 py-1 text-white text-xs truncate">{clip.name}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Tools */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedTool("trim")}
                  className={`p-2 rounded-lg text-white transition-all ${selectedTool === "trim" ? "bg-blue-500/80" : "bg-white/10 hover:bg-white/20"}`}
                >
                  <Scissors className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedTool("split")}
                  className={`p-2 rounded-lg text-white transition-all ${selectedTool === "split" ? "bg-blue-500/80" : "bg-white/10 hover:bg-white/20"}`}
                >
                  <Split className="w-4 h-4" />
                </button>
                <div className="h-6 w-px bg-white/20 mx-1" />
                <span className="text-white/70 text-xs">
                  {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")}
                </span>
              </div>
            </GlassCard>
          </div>

          {/* Right Panel - Effects & Transitions */}
          <GlassCard className="w-64 flex-shrink-0 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-white/70" />
              <h3 className="text-lg font-semibold text-white">Effects</h3>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1">
              {/* Effects Section */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-2">Video Effects</h4>
                <div className="grid grid-cols-2 gap-2">
                  {effects.map((effect) => (
                    <button
                      key={effect.id}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 text-xs flex flex-col items-center gap-1"
                    >
                      <effect.icon className="w-5 h-5" />
                      {effect.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transitions Section */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-2">Transitions</h4>
                <div className="space-y-1">
                  {transitions.map((transition) => (
                    <button
                      key={transition.id}
                      className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 text-xs text-left"
                    >
                      {transition.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Properties Section */}
              <div>
                <h4 className="text-sm font-medium text-white/80 mb-2">Properties</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-white/70 text-xs">Opacity</label>
                    <input type="range" className="w-full" min="0" max="100" defaultValue="100" />
                  </div>
                  <div>
                    <label className="text-white/70 text-xs">Speed</label>
                    <input type="range" className="w-full" min="25" max="200" defaultValue="100" />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </GlassLayout>
  )
}
