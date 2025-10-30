import { GlassLayout } from "@/components/glass-layout"
import { GlassCard } from "@/components/glass-card"
import { Folder, FileText, ImageIcon, Video, Music } from "lucide-react"

export default function FolderPage() {
  const folders = [
    { id: 1, name: "Documents", icon: FileText, items: 24, color: "text-blue-300" },
    { id: 2, name: "Images", icon: ImageIcon, items: 156, color: "text-purple-300" },
    { id: 3, name: "Videos", icon: Video, items: 12, color: "text-pink-300" },
    { id: 4, name: "Music", icon: Music, items: 89, color: "text-cyan-300" },
  ]

  const recentFiles = [
    { id: 1, name: "Project Proposal.pdf", size: "2.4 MB", modified: "2 hours ago" },
    { id: 2, name: "Design Mockup.fig", size: "8.1 MB", modified: "5 hours ago" },
    { id: 3, name: "Meeting Notes.txt", size: "12 KB", modified: "1 day ago" },
  ]

  return (
    <GlassLayout>
      <div className="flex flex-col h-full gap-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Folder className="w-12 h-12 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Folders</h1>
            <p className="text-white/70 drop-shadow-md">281 items across 4 folders</p>
          </div>
        </div>

        {/* Folders Grid */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">My Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <GlassCard key={folder.id} className="p-6 hover:bg-white/15 transition-all cursor-pointer">
                <div className="flex flex-col items-center text-center gap-3">
                  <folder.icon className={`w-12 h-12 ${folder.color} drop-shadow-lg`} strokeWidth={1.5} />
                  <div>
                    <h3 className="font-semibold text-white">{folder.name}</h3>
                    <p className="text-sm text-white/60">{folder.items} items</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Files</h2>
          <div className="flex flex-col gap-3">
            {recentFiles.map((file) => (
              <GlassCard key={file.id} className="p-4 hover:bg-white/15 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-white/70" strokeWidth={1.5} />
                    <div>
                      <p className="text-white font-medium">{file.name}</p>
                      <p className="text-sm text-white/60">{file.size}</p>
                    </div>
                  </div>
                  <span className="text-sm text-white/60">{file.modified}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </GlassLayout>
  )
}
