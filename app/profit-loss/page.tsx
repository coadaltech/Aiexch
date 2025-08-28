"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  History,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Trophy,
  Gamepad2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react"

const profitLossData = [
  {
    period: "Today",
    totalBets: 8,
    totalStaked: 4500,
    totalWon: 6200,
    profit: 1700,
    winRate: 62.5,
    biggestWin: 2500,
    biggestLoss: 1000,
  },
  {
    period: "This Week",
    totalBets: 45,
    totalStaked: 25000,
    totalWon: 28500,
    profit: 3500,
    winRate: 58.8,
    biggestWin: 5000,
    biggestLoss: 2000,
  },
  {
    period: "This Month",
    totalBets: 180,
    totalStaked: 95000,
    totalWon: 87500,
    profit: -7500,
    winRate: 52.2,
    biggestWin: 8000,
    biggestLoss: 5000,
  },
  {
    period: "All Time",
    totalBets: 520,
    totalStaked: 285000,
    totalWon: 268000,
    profit: -17000,
    winRate: 48.5,
    biggestWin: 15000,
    biggestLoss: 8000,
  },
]

const categoryBreakdown = [
  {
    category: "Esports",
    totalBets: 120,
    totalStaked: 65000,
    totalWon: 58000,
    profit: -7000,
    winRate: 45.8,
    icon: Gamepad2,
    color: "from-purple-500 to-pink-600",
  },
  {
    category: "Sports",
    totalBets: 180,
    totalStaked: 95000,
    totalWon: 102000,
    profit: 7000,
    winRate: 55.6,
    icon: Trophy,
    color: "from-green-500 to-emerald-600",
  },
  {
    category: "Casino",
    totalBets: 150,
    totalStaked: 85000,
    totalWon: 78000,
    profit: -7000,
    winRate: 48.0,
    icon: Target,
    color: "from-orange-500 to-red-600",
  },
  {
    category: "Racing",
    totalBets: 70,
    totalStaked: 40000,
    totalWon: 30000,
    profit: -10000,
    winRate: 42.9,
    icon: Activity,
    color: "from-blue-500 to-cyan-600",
  },
]

const recentTransactions = [
  {
    id: "TXN001",
    type: "win",
    game: "Cyber Strike Elite",
    amount: 2500,
    date: "2024-01-20 16:15",
    category: "Esports",
  },
  {
    id: "TXN002",
    type: "loss",
    game: "Neon Racing",
    amount: -1000,
    date: "2024-01-20 12:45",
    category: "Racing",
  },
  {
    id: "TXN003",
    type: "win",
    game: "Lightning Dice",
    amount: 800,
    date: "2024-01-19 20:32",
    category: "Casino",
  },
  {
    id: "TXN004",
    type: "loss",
    game: "Football Match",
    amount: -1500,
    date: "2024-01-19 18:00",
    category: "Sports",
  },
  {
    id: "TXN005",
    type: "win",
    game: "Space Conquest",
    amount: 3200,
    date: "2024-01-19 14:30",
    category: "Esports",
  },
]

export default function ProfitLossPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Week")
  const [activeTab, setActiveTab] = useState("overview")

  const currentData = profitLossData.find((data) => data.period === selectedPeriod) || profitLossData[1]

  return (
    <LayoutWrapper
      title="Profit & Loss"
      subtitle="Track your betting performance and financial overview"
      icon={History}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Period Selection */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Performance Overview</h3>
                <p className="text-sm text-gray-400">Select a time period to view your betting performance</p>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full sm:w-[180px] bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="This Week">This Week</SelectItem>
                  <SelectItem value="This Month">This Month</SelectItem>
                  <SelectItem value="All Time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">{currentData.totalBets}</p>
                  <p className="text-xs text-gray-400">Total Bets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">
                    ₹{currentData.totalStaked.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Total Staked</p>
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
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">{currentData.winRate}%</p>
                  <p className="text-xs text-gray-400">Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-r ${currentData.profit >= 0 ? "from-green-500/10 to-emerald-600/10 border-green-500/20" : "from-red-500/10 to-pink-600/10 border-red-500/20"} backdrop-blur-sm`}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`p-1.5 sm:p-2 ${currentData.profit >= 0 ? "bg-green-500/20" : "bg-red-500/20"} rounded-lg`}
                >
                  {currentData.profit >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm sm:text-base lg:text-lg font-bold ${currentData.profit >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {currentData.profit >= 0 ? "+" : ""}₹{currentData.profit.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Net Profit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Performance Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Biggest Win</p>
                      <p className="text-xs text-gray-400">{selectedPeriod}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-green-400">+₹{currentData.biggestWin.toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <ArrowDownRight className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Biggest Loss</p>
                      <p className="text-xs text-gray-400">{selectedPeriod}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-red-400">-₹{currentData.biggestLoss.toLocaleString()}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Total Won</p>
                      <p className="text-xs text-gray-400">{selectedPeriod}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blue-400">₹{currentData.totalWon.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <PieChart className="h-5 w-5 text-cyan-400" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3">
                {categoryBreakdown.map((category) => (
                  <div key={category.category} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}
                      >
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{category.category}</p>
                        <p className="text-xs text-gray-400">
                          {category.totalBets} bets • {category.winRate}% win rate
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${category.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {category.profit >= 0 ? "+" : ""}₹{category.profit.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">₹{category.totalStaked.toLocaleString()} staked</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 ${transaction.type === "win" ? "bg-green-500/20" : "bg-red-500/20"} rounded-lg flex items-center justify-center`}
                    >
                      {transaction.type === "win" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white line-clamp-1">{transaction.game}</p>
                      <p className="text-xs text-gray-400">
                        {transaction.date} • {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${transaction.amount >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {transaction.amount >= 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.id}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm" className="text-sm bg-transparent">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
