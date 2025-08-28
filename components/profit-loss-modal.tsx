"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Calendar, BarChart3, PieChart, DollarSign } from 'lucide-react'
import { useState } from "react"

interface ProfitLossModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const dailyData = [
  { date: "2024-01-07", profit: 1250, loss: 300, net: 950, games: 8 },
  { date: "2024-01-06", profit: 800, loss: 450, net: 350, games: 6 },
  { date: "2024-01-05", profit: 2100, loss: 800, net: 1300, games: 12 },
  { date: "2024-01-04", profit: 600, loss: 900, net: -300, games: 5 },
  { date: "2024-01-03", profit: 1800, loss: 200, net: 1600, games: 10 },
]

const weeklyData = [
  { week: "Week 1 Jan", profit: 5550, loss: 2650, net: 2900, games: 41 },
  { week: "Week 4 Dec", profit: 4200, loss: 3100, net: 1100, games: 35 },
  { week: "Week 3 Dec", profit: 6800, loss: 1900, net: 4900, games: 48 },
  { week: "Week 2 Dec", profit: 3400, loss: 4200, net: -800, games: 28 },
]

const monthlyData = [
  { month: "January 2024", profit: 5550, loss: 2650, net: 2900, games: 41 },
  { month: "December 2023", profit: 14400, loss: 9200, net: 5200, games: 111 },
  { month: "November 2023", profit: 12800, loss: 8500, net: 4300, games: 95 },
  { month: "October 2023", profit: 9600, loss: 11200, net: -1600, games: 78 },
]

export function ProfitLossModal({ open, onOpenChange }: ProfitLossModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("daily")

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case "weekly": return weeklyData
      case "monthly": return monthlyData
      default: return dailyData
    }
  }

  const data = getCurrentData()
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0)
  const totalLoss = data.reduce((sum, item) => sum + item.loss, 0)
  const netProfit = totalProfit - totalLoss
  const totalGames = data.reduce((sum, item) => sum + item.games, 0)
  const winRate = totalGames > 0 ? ((data.filter(item => item.net > 0).length / data.length) * 100).toFixed(1) : "0"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-cyan-400" />
            Profit & Loss Analysis
          </DialogTitle>
        </DialogHeader>

        {/* Period Selection */}
        <div className="flex items-center gap-4 mb-6">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="daily">Daily View</SelectItem>
              <SelectItem value="weekly">Weekly View</SelectItem>
              <SelectItem value="monthly">Monthly View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">₹{totalProfit.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Profit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">₹{totalLoss.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Loss</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${netProfit >= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${netProfit >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-lg`}>
                  <DollarSign className={`h-5 w-5 ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {netProfit >= 0 ? '+' : ''}₹{netProfit.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Net P&L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">{winRate}%</p>
                  <p className="text-sm text-gray-400">Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Detailed Breakdown</h3>
          
          {data.map((item, index) => {
            const period = item.date || item.week || item.month
            const isProfit = item.net >= 0
            
            return (
              <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <h4 className="text-lg font-semibold text-white">{period}</h4>
                    </div>
                    <Badge className={`${isProfit ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                      {isProfit ? 'Profit' : 'Loss'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Total Profit</p>
                      <p className="text-lg font-semibold text-green-400">₹{item.profit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Loss</p>
                      <p className="text-lg font-semibold text-red-400">₹{item.loss.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Net P&L</p>
                      <p className={`text-lg font-semibold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                        {isProfit ? '+' : ''}₹{item.net.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Games Played</p>
                      <p className="text-lg font-semibold text-white">{item.games}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Profit vs Loss Ratio</span>
                      <span>{((item.profit / (item.profit + item.loss)) * 100).toFixed(1)}% profit</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(item.profit / (item.profit + item.loss)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Performance Insights
          </h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Your win rate is {winRate}% over the selected period</li>
            <li>• Average profit per winning session: ₹{Math.round(totalProfit / data.filter(item => item.net > 0).length || 0)}</li>
            <li>• Total games played: {totalGames}</li>
            <li>• {netProfit >= 0 ? 'You are in profit!' : 'Focus on risk management to improve performance'}</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
