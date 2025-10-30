"use client"

import type React from "react"

import { GlassLayout } from "@/components/glass-layout"
import {
  Pencil,
  Square,
  Circle,
  Triangle,
  Type,
  Eraser,
  Undo2,
  Redo2,
  Download,
  Trash2,
  Move,
  MousePointer2,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Tool = "select" | "pencil" | "rectangle" | "circle" | "triangle" | "text" | "eraser" | "pan"
type DrawingElement = {
  type: "path" | "rectangle" | "circle" | "triangle" | "text"
  points?: { x: number; y: number }[]
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number
  text?: string
  color: string
  strokeWidth: number
}

export default function CanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>("pencil")
  const [isDrawing, setIsDrawing] = useState(false)
  const [elements, setElements] = useState<DrawingElement[]>([])
  const [history, setHistory] = useState<DrawingElement[][]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([])
  const [color, setColor] = useState("#ffffff")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      redrawCanvas()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  useEffect(() => {
    redrawCanvas()
  }, [elements])

  const redrawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    elements.forEach((element) => {
      ctx.strokeStyle = element.color
      ctx.lineWidth = element.strokeWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      if (element.type === "path" && element.points) {
        ctx.beginPath()
        element.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })
        ctx.stroke()
      } else if (element.type === "rectangle" && element.x && element.y && element.width && element.height) {
        ctx.strokeRect(element.x, element.y, element.width, element.height)
      } else if (element.type === "circle" && element.x && element.y && element.radius) {
        ctx.beginPath()
        ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2)
        ctx.stroke()
      } else if (element.type === "triangle" && element.points && element.points.length === 3) {
        ctx.beginPath()
        ctx.moveTo(element.points[0].x, element.points[0].y)
        ctx.lineTo(element.points[1].x, element.points[1].y)
        ctx.lineTo(element.points[2].x, element.points[2].y)
        ctx.closePath()
        ctx.stroke()
      } else if (element.type === "text" && element.x && element.y && element.text) {
        ctx.fillStyle = element.color
        ctx.font = `${element.strokeWidth * 8}px sans-serif`
        ctx.fillText(element.text, element.x, element.y)
      }
    })
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === "select" || tool === "pan") return

    setIsDrawing(true)
    const pos = getMousePos(e)
    setStartPos(pos)

    if (tool === "pencil") {
      setCurrentPath([pos])
    } else if (tool === "eraser") {
      // Find and remove elements at this position
      const newElements = elements.filter((element) => {
        if (element.type === "path" && element.points) {
          return !element.points.some((point) => Math.abs(point.x - pos.x) < 10 && Math.abs(point.y - pos.y) < 10)
        }
        return true
      })
      setElements(newElements)
      addToHistory(newElements)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return

    const pos = getMousePos(e)

    if (tool === "pencil") {
      setCurrentPath((prev) => [...prev, pos])

      // Draw current path in real-time
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx && currentPath.length > 0) {
        redrawCanvas()
        ctx.strokeStyle = color
        ctx.lineWidth = strokeWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.beginPath()
        currentPath.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
      }
    } else if (tool === "eraser") {
      const newElements = elements.filter((element) => {
        if (element.type === "path" && element.points) {
          return !element.points.some((point) => Math.abs(point.x - pos.x) < 10 && Math.abs(point.y - pos.y) < 10)
        }
        return true
      })
      setElements(newElements)
    } else {
      // Preview shape while drawing
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (ctx) {
        redrawCanvas()
        ctx.strokeStyle = color
        ctx.lineWidth = strokeWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        if (tool === "rectangle") {
          const width = pos.x - startPos.x
          const height = pos.y - startPos.y
          ctx.strokeRect(startPos.x, startPos.y, width, height)
        } else if (tool === "circle") {
          const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2))
          ctx.beginPath()
          ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2)
          ctx.stroke()
        } else if (tool === "triangle") {
          const topX = startPos.x + (pos.x - startPos.x) / 2
          const topY = startPos.y
          ctx.beginPath()
          ctx.moveTo(topX, topY)
          ctx.lineTo(pos.x, pos.y)
          ctx.lineTo(startPos.x, pos.y)
          ctx.closePath()
          ctx.stroke()
        }
      }
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const pos = getMousePos(e)
    let newElement: DrawingElement | null = null

    if (tool === "pencil" && currentPath.length > 0) {
      newElement = {
        type: "path",
        points: [...currentPath, pos],
        color,
        strokeWidth,
      }
    } else if (tool === "rectangle" && startPos) {
      newElement = {
        type: "rectangle",
        x: startPos.x,
        y: startPos.y,
        width: pos.x - startPos.x,
        height: pos.y - startPos.y,
        color,
        strokeWidth,
      }
    } else if (tool === "circle" && startPos) {
      const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2))
      newElement = {
        type: "circle",
        x: startPos.x,
        y: startPos.y,
        radius,
        color,
        strokeWidth,
      }
    } else if (tool === "triangle" && startPos) {
      const topX = startPos.x + (pos.x - startPos.x) / 2
      newElement = {
        type: "triangle",
        points: [
          { x: topX, y: startPos.y },
          { x: pos.x, y: pos.y },
          { x: startPos.x, y: pos.y },
        ],
        color,
        strokeWidth,
      }
    }

    if (newElement) {
      const newElements = [...elements, newElement]
      setElements(newElements)
      addToHistory(newElements)
    }

    setIsDrawing(false)
    setCurrentPath([])
    setStartPos(null)
  }

  const addToHistory = (newElements: DrawingElement[]) => {
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(newElements)
    setHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1)
      setElements(history[historyStep - 1])
    } else if (historyStep === 0) {
      setHistoryStep(-1)
      setElements([])
    }
  }

  const redo = () => {
    if (historyStep < history.length - 1) {
      setHistoryStep(historyStep + 1)
      setElements(history[historyStep + 1])
    }
  }

  const clearCanvas = () => {
    setElements([])
    addToHistory([])
  }

  const exportCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "canvas-drawing.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const tools = [
    { id: "select" as Tool, icon: MousePointer2, label: "Select" },
    { id: "pan" as Tool, icon: Move, label: "Pan" },
    { id: "pencil" as Tool, icon: Pencil, label: "Pencil" },
    { id: "rectangle" as Tool, icon: Square, label: "Rectangle" },
    { id: "circle" as Tool, icon: Circle, label: "Circle" },
    { id: "triangle" as Tool, icon: Triangle, label: "Triangle" },
    { id: "text" as Tool, icon: Type, label: "Text" },
    { id: "eraser" as Tool, icon: Eraser, label: "Eraser" },
  ]

  const colors = ["#ffffff", "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#000000"]

  return (
    <GlassLayout>
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Pencil className="w-10 h-10 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg font-serif">Canvas</h1>
              <p className="text-white/70 drop-shadow-md">Draw, sketch, and create</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={undo}
              disabled={historyStep < 0}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo"
            >
              <Undo2 className="w-5 h-5" />
            </button>
            <button
              onClick={redo}
              disabled={historyStep >= history.length - 1}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo"
            >
              <Redo2 className="w-5 h-5" />
            </button>
            <button
              onClick={clearCanvas}
              className="p-3 rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white hover:bg-red-500/30 transition-all duration-300"
              title="Clear Canvas"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={exportCanvas}
              className="p-3 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-white hover:bg-green-500/30 transition-all duration-300"
              title="Export"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-6">
            {/* Tools */}
            <div className="flex gap-2">
              {tools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`p-3 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                    tool === t.id
                      ? "bg-white/30 border-white/40 text-white"
                      : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                  }`}
                  title={t.label}
                >
                  <t.icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-white/20" />

            {/* Colors */}
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-300 ${
                    color === c ? "border-white scale-110" : "border-white/30 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>

            <div className="w-px h-8 bg-white/20" />

            {/* Stroke Width */}
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-sm">Stroke:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-white text-sm w-8">{strokeWidth}px</span>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDrawing(false)}
            className="w-full h-full cursor-crosshair"
            style={{ touchAction: "none" }}
          />
        </div>
      </div>
    </GlassLayout>
  )
}
