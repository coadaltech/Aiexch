"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  History,
  TrendingUp,
  CalendarIcon,
  Search,
  Download,
  BarChart3,
  Target,
  Trophy,
  Gamepad2,
  Eye,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const turnoverData = [
  {
    id: "TO001",
    date: "2024-01-20",
    game: "Cyber Strike Elite",
    category: "Esports",
    betAmount: 2500,
    winAmount: 4200,
    turnover: 6700,
    commission: 67,
    netResult: 1633,
    status: "settled",
    icon: Gamepad2,
  },
  {
    id: "TO002",
    date: "2024-01-20",
    game: "Cricket World Cup",
    category: "Sports",
    betAmount: 5000,
    winAmount: 0,
    turnover: 5000,
    commission: 50,
    netResult: -5050,
    status: "settled",
    icon: Trophy,
  },
  {
    id: "TO003",
    date: "2024-01-19",
    game: "Lightning Dice",
    category: "Casino",
    betAmount: 1000,
    winAmount: 3500,
    turnover: 4500,
    commission: 45,
    netResult: 2455,
    status: "settled",
    icon: Target,
  },
  {
    id: "TO004",
    date: "2024-01-19",
    game: "Neon Racing Championship",
    category: "Racing",
    betAmount: 3000,
    winAmount: 1800,
    turnover: 4800,
    commission: 48,
    netResult: -1248,
    status: "settled",
    icon: Target,
  },
  {
    id: "TO005",
    date: "2024-01-18",
    game: "Space Conquest War",
    category: "Strategy",
    betAmount: 1500,
    winAmount: 4500,
    turnover: 6000,
    commission: 60,
    netResult: 2940,
    status: "settled",
    icon: Gamepad2,
  },
]

const summaryStats = {
  totalTurnover: 156750,
  totalCommission: 1567.5,
  totalBets: 45,
  avgTurnover: 3483.33,
  highestTurnover: 8500,
  lowestTurnover: 500,
}

export default function TurnoverHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const filteredData = turnoverData.filter((item) => {
    const matchesSearch =
      item.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesStatus = filterStatus === "all" || item.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your turnover history is being exported to CSV format.",
    })
  }

  const handleViewDetails = (item: any) => {
    toast({
      title: "Turnover Details",
      description: `Viewing details for ${item.id}`,
    })
  }

  return (
    <LayoutWrapper
      title="Turnover History"
      subtitle="Track your betting turnover and commission details"
      icon={History}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 lg:p-6">
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">
                    ₹{summaryStats.totalTurnover.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Total Turnover</p>
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
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">
                    ₹{summaryStats.totalCommission.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Total Commission</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20 backdrop-blur-sm col-span-2 lg:col-span-1">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">
                    ₹{summaryStats.avgTurnover.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Avg Turnover</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by game name or turnover ID..."
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
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

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="settled">Settled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={1}
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>

                <Button variant="outline" onClick={handleExport} className="bg-white/5 border-white/10 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Turnover History */}
        <div className="space-y-3 sm:space-y-4">
          {filteredData.length === 0 ? (
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No turnover records found</h3>
                <p className="text-gray-400">Try adjusting your filters or search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredData.map((item) => {
              const IconComponent = item.icon
              return (
                <Card
                  key={item.id}
                  className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                      {/* Left Section - Game Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-lg">
                          <IconComponent className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white text-sm sm:text-base truncate">{item.game}</h3>
                            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs w-fit">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-400">
                            <span>ID: {item.id}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                            <Badge
                              variant={item.status === "settled" ? "default" : "secondary"}
                              className={`text-xs w-fit ${
                                item.status === "settled"
                                  ? "bg-green-600/20 text-green-300"
                                  : "bg-yellow-600/20 text-yellow-300"
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Financial Info */}
                      <div className="w-full lg:w-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 lg:gap-6">
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">Bet Amount</p>
                            <p className="text-sm font-semibold text-white">₹{item.betAmount.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">Win Amount</p>
                            <p className="text-sm font-semibold text-green-400">₹{item.winAmount.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">Turnover</p>
                            <p className="text-sm font-semibold text-blue-400">₹{item.turnover.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">Net Result</p>
                            <p
                              className={`text-sm font-semibold ${item.netResult >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {item.netResult >= 0 ? "+" : ""}₹{item.netResult.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end mt-3 lg:mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(item)}
                            className="bg-white/5 border-white/10 text-white hover:bg-white/10 text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}
