import { GlassLayout } from "@/components/glass-layout"
import { GlassCard } from "@/components/glass-card"
import { LayoutGrid, CheckCircle2, Circle, Clock } from "lucide-react"

export default function TaskboardPage() {
  const tasks = [
    { id: 1, title: "Design new landing page", status: "completed", priority: "high" },
    { id: 2, title: "Review pull requests", status: "in-progress", priority: "medium" },
    { id: 3, title: "Update documentation", status: "todo", priority: "low" },
    { id: 4, title: "Fix responsive issues", status: "in-progress", priority: "high" },
  ]

  return (
    <GlassLayout>
      <div className="flex flex-col h-full gap-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4">
          <LayoutGrid className="w-12 h-12 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Taskboard</h1>
            <p className="text-white/70 drop-shadow-md">4 tasks in progress</p>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <GlassCard key={task.id} className="p-6 hover:bg-white/15 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                {task.status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6 text-green-300 flex-shrink-0" strokeWidth={1.5} />
                ) : task.status === "in-progress" ? (
                  <Clock className="w-6 h-6 text-blue-300 flex-shrink-0" strokeWidth={1.5} />
                ) : (
                  <Circle className="w-6 h-6 text-white/50 flex-shrink-0" strokeWidth={1.5} />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-400/30 text-red-200"
                          : task.priority === "medium"
                            ? "bg-yellow-400/30 text-yellow-200"
                            : "bg-green-400/30 text-green-200"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-xs text-white/60 capitalize">{task.status.replace("-", " ")}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </GlassLayout>
  )
}
