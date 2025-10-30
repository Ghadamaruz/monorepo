import { GlassLayout } from "@/components/glass-layout"
import { Bell, Check, X, AlertCircle, Info } from "lucide-react"
import { GlassCard } from "@/components/glass-card"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "success",
      icon: Check,
      title: "Task Completed",
      message: "Your project has been successfully deployed",
      time: "2 minutes ago",
      color: "from-green-400/20 to-emerald-500/20",
    },
    {
      id: 2,
      type: "warning",
      icon: AlertCircle,
      title: "Storage Warning",
      message: "You're using 85% of your storage space",
      time: "1 hour ago",
      color: "from-yellow-400/20 to-orange-500/20",
    },
    {
      id: 3,
      type: "info",
      icon: Info,
      title: "New Update Available",
      message: "Version 2.0 is now available for download",
      time: "3 hours ago",
      color: "from-blue-400/20 to-cyan-500/20",
    },
    {
      id: 4,
      type: "error",
      icon: X,
      title: "Sync Failed",
      message: "Unable to sync with cloud storage",
      time: "5 hours ago",
      color: "from-red-400/20 to-pink-500/20",
    },
  ]

  return (
    <GlassLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Bell className="w-12 h-12 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Notifications</h1>
            <p className="text-white/70 drop-shadow-md">4 unread notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <GlassCard key={notification.id} className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br ${notification.color} backdrop-blur-sm border border-white/20`}
                >
                  <notification.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-white/70 mb-2">{notification.message}</p>
                  <span className="text-sm text-white/50">{notification.time}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            Mark all as read
          </button>
        </div>
      </div>
    </GlassLayout>
  )
}
