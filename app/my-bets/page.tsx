"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Trophy,
  Target,
  Gamepad2,
  Eye,
  RefreshCw,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const betHistory = [
  {
    id: "BET001",
    game: "Cyber Strike Elite",
    type: "Tournament",
    betAmount: 500,
    potentialWin: 1250,
    actualWin: 1250,
    status: "won",
    placedAt: "2024-01-20 14:30",
    settledAt: "2024-01-20 16:15",
    odds: 2.5,
    category: "Esports",
    icon: Gamepad2,
  },
  {
    id: "BET002",
    game: "Neon Racing Championship",
    type: "Live Game",
    betAmount: 1000,
    potentialWin: 1800,
    actualWin: 0,
    status: "lost",
    placedAt: "2024-01-20 12:00",
    settledAt: "2024-01-20 12:45",
    odds: 1.8,
    category: "Racing",
    icon: Target,
  },
  {
    id: "BET003",
    game: "Space Conquest War",
    type: "Tournament",
    betAmount: 750,
    potentialWin: 2250,
    actualWin: null,
    status: "pending",
    placedAt: "2024-01-20 18:00",
    settledAt: null,
    odds: 3.0,
    category: "Strategy",
    icon: Trophy,
  },
  {
    id: "BET004",
    game: "Cricket World Cup",
    type: "Sports",
    betAmount: 2000,
    potentialWin: 3000,
    actualWin: null,
    status: "active",
    placedAt: "2024-01-20 10:00",
    settledAt: null,
    odds: 1.5,
    category: "Sports",
    icon: Trophy,
  },
  {
    id: "BET005",
    game: "Lightning Dice",
    type: "Quick Game",
    betAmount: 200,
    potentialWin: 1000,
    actualWin: 1000,
    status: "won",
    placedAt: "2024-01-19 20:30",
    settledAt: "2024-01-19 20:32",
    odds: 5.0,
    category: "Casino",
    icon: Gamepad2,
  },
]

const betStats = {
  totalBets: 45,
  totalStaked: 25000,
  totalWon: 18500,
  winRate: 62,
  profit: -6500,
  activeBets: 3,
  pendingBets: 2,
}

export default function MyBetsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredBets = betHistory.filter((bet) => {
    const matchesSearch =
      bet.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bet.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || bet.status === filterStatus
    const matchesCategory = filterCategory === "all" || bet.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && (bet.status === "active" || bet.status === "pending")) ||
      (activeTab === "settled" && (bet.status === "won" || bet.status === "lost"))

    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "lost":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "active":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "won":
        return <CheckCircle className="h-4 w-4" />
      case "lost":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "active":
        return <RefreshCw className="h-4 w-4 animate-spin" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleViewDetails = (bet: any) => {
    toast({
      title: "Bet Details",
      description: `Viewing details for ${bet.id}`,
    })
  }

  return (
    <LayoutWrapper title="My Bets" subtitle="Track your betting history and performance" icon={BarChart3}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">{betStats.totalBets}</p>
                  <p className="text-xs text-gray-400">Total Bets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">{betStats.winRate}%</p>
                  <p className="text-xs text-gray-400">Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">
                    ₹{betStats.totalWon.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Total Won</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-r ${betStats.profit >= 0 ? "from-green-500/10 to-emerald-600/10 border-green-500/20" : "from-red-500/10 to-pink-600/10 border-red-500/20"} backdrop-blur-sm`}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`p-1.5 sm:p-2 ${betStats.profit >= 0 ? "bg-green-500/20" : "bg-red-500/20"} rounded-lg`}
                >
                  {betStats.profit >= 0 ? (
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm sm:text-base lg:text-lg font-bold ${betStats.profit >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {betStats.profit >= 0 ? "+" : ""}₹{betStats.profit.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Net Profit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by game name or bet ID..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[140px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-[140px] bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="esports">Esports</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="casino">Casino</SelectItem>
                    <SelectItem value="racing">Racing</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bets Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All Bets ({betHistory.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              Active ({betStats.activeBets + betStats.pendingBets})
            </TabsTrigger>
            <TabsTrigger value="settled" className="text-xs sm:text-sm">
              Settled ({betHistory.filter((b) => b.status === "won" || b.status === "lost").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredBets.length === 0 ? (
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No bets found</h3>
                  <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredBets.map((bet) => (
                  <Card
                    key={bet.id}
                    className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        {/* Bet Info */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <bet.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">{bet.game}</h3>
                              <Badge variant="outline" className="text-xs w-fit">
                                {bet.type}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Bet ID</p>
                                <p className="text-white font-mono">{bet.id}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Amount</p>
                                <p className="text-white font-semibold">₹{bet.betAmount}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Odds</p>
                                <p className="text-white font-semibold">{bet.odds}x</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Potential Win</p>
                                <p className="text-white font-semibold">₹{bet.potentialWin}</p>
                              </div>
                            </div>
                            <div className="mt-3 text-xs text-gray-400">
                              <p>Placed: {bet.placedAt}</p>
                              {bet.settledAt && <p>Settled: {bet.settledAt}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                          <div className="flex items-center gap-3">
                            <Badge className={`${getStatusColor(bet.status)} border text-xs`}>
                              {getStatusIcon(bet.status)}
                              <span className="ml-1 capitalize">{bet.status}</span>
                            </Badge>
                            {bet.actualWin !== null && (
                              <div className="text-right">
                                <p className="text-xs text-gray-400">Result</p>
                                <p
                                  className={`text-sm font-bold ${bet.actualWin > 0 ? "text-green-400" : "text-red-400"}`}
                                >
                                  {bet.actualWin > 0 ? `+₹${bet.actualWin}` : `-₹${bet.betAmount}`}
                                </p>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(bet)}
                            className="text-xs w-full sm:w-auto"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </LayoutWrapper>
  )
}
