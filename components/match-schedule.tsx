"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Match {
  id: string
  league: string
  team1: string
  team2: string
  date: string
  time: string
  status: "live" | "upcoming" | "today"
  odds: {
    team1: { value: number; volume: string }
    draw?: { value: number; volume: string }
    team2: { value: number; volume: string }
  }
  markets: string[]
}

interface MatchScheduleProps {
  sport: string
  matches: Match[]
  onClose: () => void
}

export function MatchSchedule({ sport, matches, onClose }: MatchScheduleProps) {
  const [selectedMarket, setSelectedMarket] = useState("match-odds")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white animate-pulse"
      case "today":
        return "bg-orange-500 text-white"
      case "upcoming":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatTime = (time: string) => {
    return new Date(`2024-01-01 ${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 border-white/20 text-white overflow-hidden">
        <CardHeader className="border-b border-white/20 bg-gradient-to-r from-cyan-600 to-blue-600 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold">
                  {sport.toUpperCase()} MATCH SCHEDULE
                </CardTitle>
                <p className="text-sm sm:text-base text-white/80">{matches.length} matches available</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 p-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Market Selector */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {["match-odds", "over-under", "handicap"].map((market) => (
              <Button
                key={market}
                variant={selectedMarket === market ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedMarket(market)}
                className={cn(
                  "whitespace-nowrap text-xs sm:text-sm",
                  selectedMarket === market
                    ? "bg-white text-gray-900 hover:bg-white/90"
                    : "text-white hover:bg-white/20",
                )}
              >
                {market.replace("-", " ").toUpperCase()}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Header Row */}
          <div className="sticky top-0 bg-gray-800/95 backdrop-blur-sm border-b border-white/10 p-3 sm:p-4">
            <div className="grid grid-cols-12 gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-300">
              <div className="col-span-1 sm:col-span-1">STATUS</div>
              <div className="col-span-5 sm:col-span-4">MATCH</div>
              <div className="col-span-2 sm:col-span-2 text-center">1</div>
              <div className="col-span-1 sm:col-span-1 text-center">X</div>
              <div className="col-span-2 sm:col-span-2 text-center">2</div>
              <div className="col-span-1 sm:col-span-2 text-center">MARKETS</div>
            </div>
          </div>

          {/* Match Rows */}
          <div className="divide-y divide-white/10">
            {matches.map((match, index) => (
              <div
                key={match.id}
                className={cn(
                  "p-3 sm:p-4 hover:bg-white/5 transition-colors",
                  match.status === "live" && "bg-gradient-to-r from-red-500/10 to-pink-500/10",
                )}
              >
                <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                  {/* Status */}
                  <div className="col-span-1 sm:col-span-1">
                    <Badge className={cn("text-xs px-1 py-0.5 sm:px-2 sm:py-1", getStatusColor(match.status))}>
                      {match.status === "live" ? "LIVE" : match.status.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Match Info */}
                  <div className="col-span-5 sm:col-span-4 min-w-0">
                    <div className="space-y-1">
                      <div className="text-xs sm:text-sm font-medium text-gray-400 truncate">{match.league}</div>
                      <div className="text-sm sm:text-base font-semibold text-white">
                        <div className="truncate">{match.team1}</div>
                        <div className="text-xs text-gray-400">VS</div>
                        <div className="truncate">{match.team2}</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>
                          {match.date} {formatTime(match.time)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Team 1 Odds */}
                  <div className="col-span-2 sm:col-span-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-cyan-500/20 border-cyan-500/50 text-white hover:bg-cyan-500/30 p-1 sm:p-2"
                    >
                      <div className="text-center">
                        <div className="text-sm sm:text-base font-bold">{match.odds.team1.value}</div>
                        <div className="text-xs text-gray-300">{match.odds.team1.volume}</div>
                      </div>
                    </Button>
                  </div>

                  {/* Draw Odds */}
                  <div className="col-span-1 sm:col-span-1">
                    {match.odds.draw && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-yellow-500/20 border-yellow-500/50 text-white hover:bg-yellow-500/30 p-1 sm:p-2"
                      >
                        <div className="text-center">
                          <div className="text-sm sm:text-base font-bold">{match.odds.draw.value}</div>
                          <div className="text-xs text-gray-300">{match.odds.draw.volume}</div>
                        </div>
                      </Button>
                    )}
                  </div>

                  {/* Team 2 Odds */}
                  <div className="col-span-2 sm:col-span-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-pink-500/20 border-pink-500/50 text-white hover:bg-pink-500/30 p-1 sm:p-2"
                    >
                      <div className="text-center">
                        <div className="text-sm sm:text-base font-bold">{match.odds.team2.value}</div>
                        <div className="text-xs text-gray-300">{match.odds.team2.volume}</div>
                      </div>
                    </Button>
                  </div>

                  {/* Markets */}
                  <div className="col-span-1 sm:col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {match.markets.slice(0, 4).map((market) => (
                        <Button
                          key={market}
                          variant="ghost"
                          size="sm"
                          className="text-xs px-1 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 h-auto"
                        >
                          {market}
                        </Button>
                      ))}
                      {match.markets.length > 4 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs px-1 py-0.5 sm:px-2 sm:py-1 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 h-auto"
                        >
                          +{match.markets.length - 4}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
