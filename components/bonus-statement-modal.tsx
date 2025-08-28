"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Search, Download, Calendar, Star, Trophy, Users, Coins } from 'lucide-react'
import { useState } from "react"

interface BonusStatementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const bonusData = [
  {
    id: 1,
    date: "2024-01-07",
    type: "welcome",
    title: "Welcome Bonus",
    description: "First deposit bonus - 100% match",
    amount: 5000,
    status: "credited",
    expiryDate: "2024-02-07",
    wagering: 10000,
    wageringCompleted: 8500,
    icon: Gift
  },
  {
    id: 2,
    date: "2024-01-06",
    type: "daily",
    title: "Daily Login Bonus",
    description: "Daily login reward for 7 consecutive days",
    amount: 500,
    status: "credited",
    expiryDate: "2024-01-13",
    wagering: 1500,
    wageringCompleted: 1500,
    icon: Star
  },
  {
    id: 3,
    date: "2024-01-05",
    type: "tournament",
    title: "Tournament Participation",
    description: "Bonus for participating in Cyber Strike Elite",
    amount: 1000,
    status: "credited",
    expiryDate: "2024-01-20",
    wagering: 3000,
    wageringCompleted: 2100,
    icon: Trophy
  },
  {
    id: 4,
    date: "2024-01-04",
    type: "referral",
    title: "Referral Bonus",
    description: "Bonus for referring ProGamer_99",
    amount: 1500,
    status: "pending",
    expiryDate: "2024-01-18",
    wagering: 4500,
    wageringCompleted: 0,
    icon: Users
  },
  {
    id: 5,
    date: "2024-01-03",
    type: "cashback",
    title: "Weekly Cashback",
    description: "5% cashback on losses from last week",
    amount: 750,
    status: "credited",
    expiryDate: "2024-01-17",
    wagering: 2250,
    wageringCompleted: 2250,
    icon: Coins
  },
  {
    id: 6,
    date: "2024-01-02",
    type: "loyalty",
    title: "Loyalty Bonus",
    description: "Level 25 achievement bonus",
    amount: 2000,
    status: "expired",
    expiryDate: "2024-01-16",
    wagering: 6000,
    wageringCompleted: 1200,
    icon: Star
  }
]

export function BonusStatementModal({ open, onOpenChange }: BonusStatementModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredData = bonusData.filter(bonus => {
    const matchesSearch = bonus.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bonus.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || bonus.type === filterType
    const matchesStatus = filterStatus === "all" || bonus.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalBonuses = filteredData.reduce((sum, bonus) => sum + bonus.amount, 0)
  const activeBonuses = filteredData.filter(bonus => bonus.status === 'credited').length
  const pendingBonuses = filteredData.filter(bonus => bonus.status === 'pending').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'credited': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'expired': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getBonusTypeColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-purple-500'
      case 'daily': return 'bg-blue-500'
      case 'tournament': return 'bg-orange-500'
      case 'referral': return 'bg-green-500'
      case 'cashback': return 'bg-cyan-500'
      case 'loyalty': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <Gift className="h-6 w-6 text-cyan-400" />
            Bonus Statement
          </DialogTitle>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Gift className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">₹{totalBonuses.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Bonuses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Star className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{activeBonuses}</p>
                  <p className="text-sm text-gray-400">Active Bonuses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingBonuses}</p>
                  <p className="text-sm text-gray-400">Pending Bonuses</p>
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
              placeholder="Search bonuses..."
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
              <SelectItem value="welcome">Welcome</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="tournament">Tournament</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="cashback">Cashback</SelectItem>
              <SelectItem value="loyalty">Loyalty</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="credited">Credited</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Bonus List */}
        <div className="space-y-4">
          {filteredData.map((bonus) => (
            <Card key={bonus.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-gradient-to-r ${getBonusTypeColor(bonus.type)} rounded-lg`}>
                      <bonus.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{bonus.title}</h3>
                      <p className="text-sm text-gray-400">{bonus.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-500">{bonus.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getBonusTypeColor(bonus.type)} text-white capitalize`}>
                      {bonus.type}
                    </Badge>
                    <Badge className={`${getStatusColor(bonus.status)} text-white capitalize`}>
                      {bonus.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Bonus Amount</p>
                    <p className="text-lg font-semibold text-green-400">₹{bonus.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Wagering Required</p>
                    <p className="text-lg font-semibold text-white">₹{bonus.wagering.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Wagering Completed</p>
                    <p className="text-lg font-semibold text-cyan-400">₹{bonus.wageringCompleted.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Expires On</p>
                    <p className="text-lg font-semibold text-white">{bonus.expiryDate}</p>
                  </div>
                </div>

                {/* Wagering Progress */}
                {bonus.status === 'credited' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Wagering Progress</span>
                      <span>{((bonus.wageringCompleted / bonus.wagering) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((bonus.wageringCompleted / bonus.wagering) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹{bonus.wageringCompleted.toLocaleString()}</span>
                      <span>₹{bonus.wagering.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No bonus records found matching your criteria.</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Gift className="h-4 w-4" />
            Bonus Information
          </h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• All bonuses have wagering requirements that must be completed</li>
            <li>• Bonuses expire on the specified date if wagering is not completed</li>
            <li>• Only real money bets contribute to wagering requirements</li>
            <li>• Maximum bet limit applies when using bonus funds</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
