import { GlassLayout } from "@/components/glass-layout"
import { Trash2, FileText, ImageIcon, Video, RotateCcw, X } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

export default function TrashPage() {
  const trashedItems = [
    {
      id: 1,
      icon: FileText,
      name: "Project Proposal.pdf",
      deletedDate: "2 days ago",
      size: "2.4 MB",
      type: "Document",
    },
    {
      id: 2,
      icon: ImageIcon,
      name: "Design Mockup.fig",
      deletedDate: "5 days ago",
      size: "8.1 MB",
      type: "Design",
    },
    {
      id: 3,
      icon: Video,
      name: "Tutorial Video.mp4",
      deletedDate: "1 week ago",
      size: "45.2 MB",
      type: "Video",
    },
    {
      id: 4,
      icon: FileText,
      name: "Meeting Notes.txt",
      deletedDate: "2 weeks ago",
      size: "12 KB",
      type: "Document",
    },
  ]

  return (
    <GlassLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Trash2 className="w-12 h-12 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Trash</h1>
            <p className="text-white/70 drop-shadow-md">Items will be permanently deleted after 30 days</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-white/70">{trashedItems.length} items in trash</p>
          <button className="px-6 py-3 rounded-2xl bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white hover:bg-red-500/30 transition-all duration-300">
            Empty Trash
          </button>
        </div>

        <div className="space-y-4">
          {trashedItems.map((item) => (
            <GlassCard key={item.id} className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <item.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>Deleted {item.deletedDate}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-white hover:bg-green-500/30 transition-all duration-300">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-white hover:bg-red-500/30 transition-all duration-300">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {trashedItems.length === 0 && (
          <div className="text-center py-16">
            <Trash2 className="w-24 h-24 text-white/30 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-xl text-white/50">Trash is empty</p>
          </div>
        )}
      </div>
    </GlassLayout>
  )
}
