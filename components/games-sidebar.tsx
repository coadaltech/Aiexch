"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Gamepad2,
  Search,
  Filter,
  Star,
  Users,
  Trophy,
  Zap,
  Target,
  Flame,
  Crown,
  Dice1,
  Car,
  Swords,
} from "lucide-react"

const gameCategories = [
  { id: "all", name: "All Games", icon: Gamepad2, count: 150 },
  { id: "popular", name: "Popular", icon: Star, count: 24 },
  { id: "new", name: "New Releases", icon: Zap, count: 12 },
  { id: "tournaments", name: "Tournaments", icon: Trophy, count: 8 },
  { id: "multiplayer", name: "Multiplayer", icon: Users, count: 45 },
  { id: "action", name: "Action", icon: Target, count: 32 },
  { id: "strategy", name: "Strategy", icon: Crown, count: 28 },
  { id: "casino", name: "Casino", icon: Dice1, count: 18 },
  { id: "racing", name: "Racing", icon: Car, count: 15 },
  { id: "fighting", name: "Fighting", icon: Swords, count: 22 },
]

const featuredGames = [
  {
    id: "1",
    title: "Cyber Legends",
    category: "Action",
    players: 1250,
    rating: 4.8,
    image: "/cyber-game.png",
    isNew: true,
  },
  {
    id: "2",
    title: "Neon Racing",
    category: "Racing",
    players: 890,
    rating: 4.6,
    image: "/neon-racing.png",
    isHot: true,
  },
  {
    id: "3",
    title: "Space Conquest",
    category: "Strategy",
    players: 2100,
    rating: 4.9,
    image: "/space-game.png",
    isTournament: true,
  },
]

export function GamesSidebar() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
          <Gamepad2 className="h-4 w-4 mr-2" />
          Browse Games
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-black/95 border-white/10">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-cyan-400" />
            Game Library
          </SheetTitle>
          <SheetDescription className="text-gray-400">Discover and play amazing games</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="players">Players</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Categories</h3>
            <ScrollArea className="h-48">
              <div className="space-y-1">
                {gameCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category.id ? "bg-cyan-600 text-white" : "text-gray-300 hover:bg-gray-800"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    <span className="flex-1 text-left">{category.name}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Featured Games */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Featured Games</h3>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {featuredGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white truncate">{game.title}</h4>
                          {game.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                          {game.isHot && (
                            <Badge className="bg-red-500 text-white text-xs">
                              <Flame className="h-3 w-3 mr-1" />
                              HOT
                            </Badge>
                          )}
                          {game.isTournament && (
                            <Badge className="bg-yellow-500 text-black text-xs">
                              <Trophy className="h-3 w-3 mr-1" />
                              TOURNAMENT
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{game.category}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-400">{game.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-blue-400" />
                            <span className="text-xs text-gray-400">{game.players}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
