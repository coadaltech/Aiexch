"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { History, Search, Download, Calendar, TrendingUp, BarChart3, Filter } from 'lucide-react'
import { useState } from "react"

interface TurnoverHistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const turnoverData = [
  {
    id: 1,
    date: "2024-01-07",
    game: "Cyber Strike Elite",
    betAmount: 1500,
    winAmount: 3750,
    turnover: 5250,
    status: "completed",
    type: "tournament"
  },
  {
    id: 2,
    date: "2024-01-07",
    game: "Lightning Dice",
    betAmount: 800,
    winAmount: 0,
    turnover: 800,
    status: "completed",
    type: "quick"
  },
  {
    id: 3,
    date: "2024-01-06",
    game: "Neon Racing",
    betAmount: 1200,
    winAmount: 2640,
    turnover: 3840,
    status: "completed",
    type: "tournament"
  },
  {
    id: 4,
    date: "2024-01-06",
    game: "Crystal Mines",
    betAmount: 600,
    winAmount: 1440,
    turnover: 2040,
    status: "completed",
    type: "quick"
  },
  {
    id: 5,
    date: "2024-01-05",
    game: "Space Conquest",
    betAmount: 2000,
    winAmount: 4800,
    turnover: 6800,
    status: "completed",
    type: "tournament"
  },
  {
    id: 6,
    date: "2024-01-05",
    game: "Rocket Crash",
    betAmount: 400,
    winAmount: 0,
    turnover: 400,
    status: "completed",
    type: "quick"
  },
  {
    id: 7,
    date: "2024-01-04",
    game: "Golden Coins",
    betAmount: 900,
    winAmount: 2250,
    turnover: 3150,
    status: "completed",
    type: "quick"
  },
  {
    id: 8,
    date: "2024-01-04",
    game: "Fire Storm",
    betAmount: 1100,
    winAmount: 0,
    turnover: 1100,
    status: "completed",
    type: "quick"
  }
]

export function TurnoverHistoryModal({ open, onOpenChange }: TurnoverHistoryModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredData = turnoverData.filter(item => {
    const matchesSearch = item.game.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalTurnover = filteredData.reduce((sum, item) => sum + item.turnover, 0)
  const totalBets = filteredData.reduce((sum, item) => sum + item.betAmount, 0)
  const totalWins = filteredData.reduce((sum, item) => sum + item.winAmount, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <History className="h-6 w-6 text-cyan-400" />
            Turnover History
          </DialogTitle>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹{totalTurnover.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Turnover</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹{totalBets.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Bets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹{totalWins.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Wins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by game name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tournament">Tournament</SelectItem>
              <SelectItem value="quick">Quick Games</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Turnover Table */}
        <div className="space-y-4">
          {filteredData.map((item) => (
            <Card key={item.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.game}</h3>
                      <p className="text-sm text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${item.type === 'tournament' ? 'bg-purple-500' : 'bg-blue-500'} text-white`}>
                      {item.type === 'tournament' ? 'Tournament' : 'Quick Game'}
                    </Badge>
                    <Badge className="bg-green-500 text-white">
                      {item.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Bet Amount</p>
                    <p className="text-lg font-semibold text-white">₹{item.betAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Win Amount</p>
                    <p className={`text-lg font-semibold ${item.winAmount > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                      ₹{item.winAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Turnover</p>
                    <p className="text-lg font-semibold text-cyan-400">₹{item.turnover.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Net Result</p>
                    <p className={`text-lg font-semibold ${item.winAmount - item.betAmount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.winAmount - item.betAmount >= 0 ? '+' : ''}₹{(item.winAmount - item.betAmount).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Turnover Breakdown */}
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Turnover Breakdown:</span>
                    <span className="text-white">
                      Bet: ₹{item.betAmount.toLocaleString()} + Win: ₹{item.winAmount.toLocaleString()} = ₹{item.turnover.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No turnover records found matching your criteria.</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Turnover Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Average Turnover per Game</p>
              <p className="text-white font-semibold">₹{Math.round(totalTurnover / filteredData.length || 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Win Rate</p>
              <p className="text-white font-semibold">{((filteredData.filter(item => item.winAmount > 0).length / filteredData.length) * 100 || 0).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-400">Total Transactions</p>
              <p className="text-white font-semibold">{filteredData.length}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
