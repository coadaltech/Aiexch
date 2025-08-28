"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown, Calendar } from 'lucide-react'

interface MyBetsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const activeBets = [
  {
    id: 1,
    game: "Cyber Strike Elite",
    betType: "Tournament Winner",
    amount: 500,
    odds: 2.5,
    potentialWin: 1250,
    status: "active",
    timeLeft: "2h 45m",
    progress: 65
  },
  {
    id: 2,
    game: "Neon Racing",
    betType: "First Place",
    amount: 300,
    odds: 3.2,
    potentialWin: 960,
    status: "active",
    timeLeft: "1h 20m",
    progress: 80
  }
]

const completedBets = [
  {
    id: 3,
    game: "Space Conquest",
    betType: "Match Winner",
    amount: 750,
    odds: 1.8,
    actualWin: 1350,
    status: "won",
    completedAt: "2 hours ago",
    profit: 600
  },
  {
    id: 4,
    game: "Lightning Dice",
    betType: "High Roll",
    amount: 200,
    odds: 4.0,
    actualWin: 0,
    status: "lost",
    completedAt: "5 hours ago",
    profit: -200
  },
  {
    id: 5,
    game: "Crystal Mines",
    betType: "Bonus Round",
    amount: 400,
    odds: 2.2,
    actualWin: 880,
    status: "won",
    completedAt: "1 day ago",
    profit: 480
  }
]

export function MyBetsModal({ open, onOpenChange }: MyBetsModalProps) {
  const totalActive = activeBets.reduce((sum, bet) => sum + bet.amount, 0)
  const totalPotential = activeBets.reduce((sum, bet) => sum + bet.potentialWin, 0)
  const totalProfit = completedBets.reduce((sum, bet) => sum + bet.profit, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            My Bets
          </DialogTitle>
        </DialogHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹{totalActive.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Active Bets</p>
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
                  <p className="text-2xl font-bold text-white">₹{totalPotential.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Potential Win</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${totalProfit >= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${totalProfit >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-lg`}>
                  {totalProfit >= 0 ? 
                    <TrendingUp className="h-5 w-5 text-green-400" /> : 
                    <TrendingDown className="h-5 w-5 text-red-400" />
                  }
                </div>
                <div>
                  <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalProfit >= 0 ? '+' : ''}₹{totalProfit.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Total P&L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="active" className="data-[state=active]:bg-cyan-600">
              Active Bets ({activeBets.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-cyan-600">
              Bet History ({completedBets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeBets.map((bet) => (
              <Card key={bet.id} className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{bet.game}</h3>
                      <p className="text-gray-400">{bet.betType}</p>
                    </div>
                    <Badge className="bg-blue-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {bet.timeLeft}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Bet Amount</p>
                      <p className="text-lg font-semibold text-white">₹{bet.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Odds</p>
                      <p className="text-lg font-semibold text-cyan-400">{bet.odds}x</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Potential Win</p>
                      <p className="text-lg font-semibold text-green-400">₹{bet.potentialWin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${bet.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{bet.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cash Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBets.map((bet) => (
              <Card key={bet.id} className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{bet.game}</h3>
                      <p className="text-gray-400">{bet.betType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {bet.status === 'won' ? (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Won
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500 text-white">
                          <XCircle className="h-3 w-3 mr-1" />
                          Lost
                        </Badge>
                      )}
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {bet.completedAt}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Bet Amount</p>
                      <p className="text-lg font-semibold text-white">₹{bet.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Odds</p>
                      <p className="text-lg font-semibold text-cyan-400">{bet.odds}x</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Payout</p>
                      <p className="text-lg font-semibold text-white">₹{bet.actualWin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Profit/Loss</p>
                      <p className={`text-lg font-semibold ${bet.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {bet.profit >= 0 ? '+' : ''}₹{bet.profit}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
