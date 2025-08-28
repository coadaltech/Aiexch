"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Users,
  Eye,
  Send,
  Settings,
  Share2,
  Fullscreen,
} from "lucide-react"

interface StreamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stream: {
    id: string
    title: string
    streamer: string
    game: string
    viewers: number
    thumbnail: string
    isLive: boolean
    category: string
  }
}

const mockChatMessages = [
  { id: 1, user: "GameFan123", message: "Amazing gameplay! 🔥", timestamp: "2m ago" },
  { id: 2, user: "ProPlayer", message: "How did you do that combo?", timestamp: "1m ago" },
  { id: 3, user: "StreamLover", message: "Best stream ever!", timestamp: "30s ago" },
  { id: 4, user: "NewViewer", message: "Just joined, what game is this?", timestamp: "10s ago" },
]

export function StreamModal({ open, onOpenChange, stream }: StreamModalProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(mockChatMessages)

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "You",
        message: chatMessage,
        timestamp: "now",
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1200px] bg-black/95 border-white/10 text-white max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={stream.thumbnail || "/placeholder.svg"}
                  alt={stream.streamer}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {stream.isLive && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse"></div>
                )}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{stream.title}</DialogTitle>
                <DialogDescription className="text-gray-400">
                  {stream.streamer} • {stream.game}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-red-500 text-white">
                <Eye className="h-3 w-3 mr-1" />
                {stream.viewers.toLocaleString()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFollow}
                className={isFollowing ? "text-red-400" : "text-gray-400"}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFollowing ? "fill-current" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 h-[500px]">
          {/* Video Player */}
          <div className="col-span-2 relative bg-gray-900 rounded-lg overflow-hidden">
            <img src={stream.thumbnail || "/placeholder.svg"} alt="Stream" className="w-full h-full object-cover" />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-black/50 hover:bg-black/70"
                    >
                      {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-black/50 hover:bg-black/70"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70">
                      <Settings className="h-5 w-5 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70">
                      <Share2 className="h-5 w-5 text-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70">
                      <Fullscreen className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Badge */}
            {stream.isLive && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
              </div>
            )}
          </div>

          {/* Chat Section */}
          <div className="bg-gray-800/50 rounded-lg flex flex-col">
            <div className="p-3 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-400" />
                <span className="font-medium">Live Chat</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {stream.viewers}
                </Badge>
              </div>
            </div>

            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-400">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-gray-700 border-gray-600 text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Category: {stream.category}</span>
            <span>•</span>
            <span>{stream.viewers.toLocaleString()} viewers</span>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
