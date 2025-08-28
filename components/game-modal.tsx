"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Play, Star, Users, Trophy, Clock, Heart, Share2, Download, Settings, Maximize } from "lucide-react"

interface GameModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  game: {
    id: string
    title: string
    image: string
    category: string
    rating: number
    players: number
    description: string
    features: string[]
    screenshots: string[]
  }
}

export function GameModal({ open, onOpenChange, game }: GameModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFavorite, setIsFavorite] = useState(false)

  const handlePlayGame = () => {
    // Game launch logic here
    console.log(`Launching game: ${game.title}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-black/95 border-white/10 text-white max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-start gap-4">
            <img
              src={game.image || "/placeholder.svg"}
              alt={game.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">{game.title}</DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">
                {game.category} • {game.players.toLocaleString()} players online
              </DialogDescription>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{game.rating}</span>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  <Users className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-400" : "text-gray-400"}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About This Game</h3>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
              </div>

              <Separator className="bg-gray-700" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {game.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div>
                <h3 className="text-lg font-semibold mb-3">Game Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <Users className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-400">Players</p>
                    <p className="font-semibold">{game.players.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-400">Tournaments</p>
                    <p className="font-semibold">24</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <Clock className="h-6 w-6 text-green-400 mx-auto mb-1" />
                    <p className="text-sm text-gray-400">Avg. Session</p>
                    <p className="font-semibold">45m</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="screenshots" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {game.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Maximize className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        U{review}
                      </div>
                      <div>
                        <p className="font-medium">User{review}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Great game with amazing graphics and smooth gameplay. Highly recommended!
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              onClick={handlePlayGame}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Play Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
