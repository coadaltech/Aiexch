"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, TrendingUp, Search, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { LayoutWrapper } from "@/components/layout-wrapper"

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

// Generate sample matches for each sport
const generateMatches = (sport: string) => {
  const teams = {
    cricket: [
      ["England Lions", "Australia Kangaroos"],
      ["India Tigers", "Pakistan Eagles"],
      ["South Africa Proteas", "New Zealand Kiwis"],
      ["West Indies Hurricanes", "Sri Lanka Elephants"],
      ["Bangladesh Bears", "Afghanistan Wolves"],
      ["Ireland Shamrocks", "Scotland Highlanders"],
      ["Netherlands Orange", "Zimbabwe Eagles"],
      ["Kenya Lions", "Uganda Cranes"],
      ["Mumbai Indians", "Chennai Super Kings"],
      ["Royal Challengers", "Delhi Capitals"],
      ["Kolkata Knight Riders", "Punjab Kings"],
      ["Rajasthan Royals", "Sunrisers Hyderabad"],
    ],
    football: [
      ["Manchester United", "Liverpool FC"],
      ["Barcelona", "Real Madrid"],
      ["Bayern Munich", "Borussia Dortmund"],
      ["Juventus", "AC Milan"],
      ["PSG", "Marseille"],
      ["Chelsea", "Arsenal"],
      ["Inter Milan", "AS Roma"],
      ["Atletico Madrid", "Valencia"],
      ["Manchester City", "Tottenham"],
      ["Leicester City", "West Ham"],
      ["Everton", "Newcastle"],
      ["Brighton", "Crystal Palace"],
    ],
    tennis: [
      ["Novak Djokovic", "Rafael Nadal"],
      ["Roger Federer", "Andy Murray"],
      ["Stefanos Tsitsipas", "Alexander Zverev"],
      ["Daniil Medvedev", "Carlos Alcaraz"],
      ["Serena Williams", "Naomi Osaka"],
      ["Ashleigh Barty", "Simona Halep"],
      ["Iga Swiatek", "Aryna Sabalenka"],
      ["Coco Gauff", "Emma Raducanu"],
      ["Jannik Sinner", "Casper Ruud"],
      ["Felix Auger-Aliassime", "Hubert Hurkacz"],
      ["Taylor Fritz", "Frances Tiafoe"],
      ["Jessica Pegula", "Madison Keys"],
    ],
    basketball: [
      ["Lakers", "Warriors"],
      ["Celtics", "Heat"],
      ["Nets", "76ers"],
      ["Bucks", "Bulls"],
      ["Clippers", "Suns"],
      ["Nuggets", "Jazz"],
      ["Mavericks", "Rockets"],
      ["Knicks", "Hawks"],
      ["Pistons", "Pacers"],
      ["Kings", "Trail Blazers"],
      ["Magic", "Hornets"],
      ["Spurs", "Thunder"],
    ],
  }

  const leagues = {
    cricket: [
      "ICC World Cup",
      "IPL 2024",
      "The Hundred",
      "Big Bash League",
      "Caribbean Premier League",
      "Pakistan Super League",
    ],
    football: ["Premier League", "Champions League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"],
    tennis: ["Wimbledon", "US Open", "French Open", "Australian Open", "ATP Masters", "WTA Finals"],
    basketball: [
      "NBA Regular Season",
      "NBA Playoffs",
      "EuroLeague",
      "NCAA Tournament",
      "FIBA World Cup",
      "NBA Summer League",
    ],
  }

  const sportTeams = teams[sport as keyof typeof teams] || teams.cricket
  const sportLeagues = leagues[sport as keyof typeof leagues] || leagues.cricket

  return Array.from({ length: 16 }, (_, i) => ({
    id: `${sport}-${i}`,
    league: sportLeagues[i % sportLeagues.length],
    team1: sportTeams[i % sportTeams.length][0],
    team2: sportTeams[i % sportTeams.length][1],
    date: i < 6 ? "Today" : `${25 + (i % 7)} Aug`,
    time: `${(14 + i) % 24}:${(i * 15) % 60 < 10 ? "0" : ""}${(i * 15) % 60}`,
    status: i < 6 ? "live" : i < 10 ? "today" : "upcoming",
    odds: {
      team1: {
        value: Number((1.5 + Math.random() * 2).toFixed(2)),
        volume: `${Math.floor(Math.random() * 100)}K`,
      },
      draw:
        Math.random() > 0.5
          ? {
              value: Number((2.5 + Math.random() * 1.5).toFixed(2)),
              volume: `${Math.floor(Math.random() * 50)}K`,
            }
          : undefined,
      team2: {
        value: Number((1.5 + Math.random() * 2).toFixed(2)),
        volume: `${Math.floor(Math.random() * 100)}K`,
      },
    },
    markets: ["P", "MO", "BM", "F", "O/U", "HT", "CS", "BTS"],
  }))
}

const sportsData = {
  cricket: { name: "Cricket", icon: "🏏", gradient: "from-red-500 to-orange-500" },
  football: { name: "Football", icon: "⚽", gradient: "from-green-500 to-emerald-500" },
  tennis: { name: "Tennis", icon: "🎾", gradient: "from-yellow-500 to-orange-500" },
  basketball: { name: "Basketball", icon: "🏀", gradient: "from-purple-500 to-pink-500" },
  kabaddi: { name: "Kabaddi", icon: "🤼", gradient: "from-orange-500 to-red-500" },
  baseball: { name: "Baseball", icon: "⚾", gradient: "from-blue-500 to-cyan-500" },
  greyhound: { name: "GreyHound", icon: "🐕", gradient: "from-gray-500 to-slate-500" },
  horserace: { name: "Horse Race", icon: "🐎", gradient: "from-amber-500 to-yellow-500" },
  volleyball: { name: "Volleyball", icon: "🏐", gradient: "from-teal-500 to-green-500" },
  darts: { name: "Darts", icon: "🎯", gradient: "from-red-500 to-pink-500" },
  futsal: { name: "Futsal", icon: "⚽", gradient: "from-indigo-500 to-purple-500" },
  tabletennis: { name: "Table Tennis", icon: "🏓", gradient: "from-pink-500 to-rose-500" },
}

export default function MatchesPage() {
  const params = useParams()
  const router = useRouter()
  const sport = params.sport as string
  const [selectedMarket, setSelectedMarket] = useState("match-odds")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const sportInfo = sportsData[sport as keyof typeof sportsData] || sportsData.cricket
  const matches = generateMatches(sport)

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.league.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || match.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <LayoutWrapper
      title="Game Rules"
      subtitle="Complete guide to all games and betting rules"
      icon={HelpCircle}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-white/20 text-white overflow-hidden">
          <CardHeader className="border-b border-white/20 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${sportInfo.gradient} rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-xl lg:text-2xl">{sportInfo.icon}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl lg:text-2xl xl:text-3xl font-bold">
                      {sportInfo.name.toUpperCase()} MATCHES
                    </CardTitle>
                    <p className="text-sm lg:text-base text-white/80">{filteredMatches.length} matches available</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Match Schedule */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-white/20 text-white">
          <CardContent className="p-0">
            <div className="relative">
              <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                <div className="min-w-max">
                  {/* Header Row */}
                  <div className="sticky top-0 bg-gray-800/95 backdrop-blur-sm border-b border-white/10 p-1 lg:p-2 overflow-x-auto">
                    <div className="min-w-max grid grid-cols-12 gap-1 lg:gap-2 text-[11px] lg:text-[14px] font-semibold text-gray-300">
                      <div className="col-span-2 text-center whitespace-nowrap">STATUS</div>
                      <div className="col-span-3 text-center whitespace-nowrap">MATCH</div>
                      <div className="col-span-1 text-center whitespace-nowrap">1</div>
                      <div className="col-span-1 text-center whitespace-nowrap">X</div>
                      <div className="col-span-1 text-center whitespace-nowrap">2</div>
                      <div className="col-span-4 text-center whitespace-nowrap">MARKETS</div>
                    </div>
                  </div>

                  {/* Match Rows */}
                  <div className="divide-y divide-white/10">
                    {filteredMatches.map((match) => (
                      <div
                        key={match.id}
                        className={cn(
                          "p-1 lg:p-2 hover:bg-white/5 transition-colors h-16 lg:h-20 flex items-center",
                          match.status === "live" && "bg-gradient-to-r from-red-500/10 to-pink-500/10"
                        )}
                      >
                        <div className="min-w-max grid grid-cols-12 gap-1 lg:gap-2 items-center w-full">
                          {/* Status */}
                          <div className="col-span-2 text-center">
                            <Badge className={cn("text-[11px] px-2 py-0.5", getStatusColor(match.status))}>
                              {match.status === "live" ? "LIVE" : match.status.toUpperCase()}
                            </Badge>
                          </div>

                          {/* Match Info */}
                          <div className="col-span-3 min-w-0">
                            <div className="space-y-0.5">
                              <div className="text-[14px] font-medium text-gray-400 truncate">{match.league}</div>
                              <div className="text-[11px] lg:text-[16px] font-semibold text-white truncate">
                                {match.team1} <span className="text-gray-400 text-[9px]">vs</span> {match.team2}
                              </div>
                              <div className="flex items-center gap-1 text-[12px] text-gray-400 truncate">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {match.date} {formatTime(match.time)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Team 1 Odds */}
                          <div className="col-span-1">
                            <div className="grid grid-rows-2 gap-0.5">
                              <div className="bg-cyan-500/20 border border-cyan-500/50 text-white text-[13px] font-bold rounded-sm flex items-center justify-center">
                                {match.odds.team1.value}
                              </div>
                              <div className="bg-cyan-500/10 border border-cyan-500/30 text-gray-300 text-[11px] rounded-sm flex items-center justify-center">
                                {match.odds.team1.volume}
                              </div>
                            </div>
                          </div>

                          {/* Draw Odds */}
                          <div className="col-span-1">
                            {match.odds.draw ? (
                              <div className="grid grid-rows-2 gap-0.5">
                                <div className="bg-yellow-500/20 border border-yellow-500/50 text-white text-[13px] font-bold rounded-sm flex items-center justify-center">
                                  {match.odds.draw.value}
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-500/30 text-gray-300 text-[11px] rounded-sm flex items-center justify-center">
                                  {match.odds.draw.volume}
                                </div>
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px]">N/A</div>
                            )}
                          </div>

                          {/* Team 2 Odds */}
                          <div className="col-span-1">
                            <div className="grid grid-rows-2 gap-0.5">
                              <div className="bg-pink-500/20 border border-pink-500/50 text-white text-[13px] font-bold rounded-sm flex items-center justify-center">
                                {match.odds.team2.value}
                              </div>
                              <div className="bg-pink-500/10 border border-pink-500/30 text-gray-300 text-[11px] rounded-sm flex items-center justify-center">
                                {match.odds.team2.volume}
                              </div>
                            </div>
                          </div>

                          {/* Markets */}
                          <div className="col-span-4">
                            <div className="flex flex-wrap justify-center gap-1">
                              {match.markets.slice(0, 3).map((market) => (
                                <Button
                                  key={market}
                                  variant="ghost"
                                  size="sm"
                                  className="text-[12px] px-2 py-0.5 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 h-auto whitespace-nowrap"
                                >
                                  {market}
                                </Button>
                              ))}
                              {match.markets.length > 3 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[9px] px-2 py-0.5 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 h-auto"
                                >
                                  +{match.markets.length - 3}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
