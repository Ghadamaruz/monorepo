import { GlassLayout } from "@/components/glass-layout"
import { GlassCard } from "@/components/glass-card"
import { MessageCircle, Send, User } from "lucide-react"

export default function ChatPage() {
  const messages = [
    { id: 1, user: "Alice", message: "Hey! How's the new interface looking?", time: "2:30 PM" },
    { id: 2, user: "You", message: "It's amazing! The glass effect is so smooth.", time: "2:32 PM" },
    { id: 3, user: "Bob", message: "Can't wait to try it out!", time: "2:35 PM" },
  ]

  return (
    <GlassLayout>
      <div className="flex flex-col h-full gap-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4">
          <MessageCircle className="w-12 h-12 text-white/80 drop-shadow-lg" strokeWidth={1.5} />
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Chat</h1>
            <p className="text-white/70 drop-shadow-md">3 active conversations</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-4 overflow-auto">
          {messages.map((msg) => (
            <GlassCard key={msg.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{msg.user}</span>
                    <span className="text-xs text-white/60">{msg.time}</span>
                  </div>
                  <p className="text-white/90">{msg.message}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Input */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all">
              <Send className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
          </div>
        </GlassCard>
      </div>
    </GlassLayout>
  )
}
