"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Gift, Trophy, Star, Clock } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"

const bonuses = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Welcome Bonus",
    amount: 5000,
    status: "credited",
    description: "New user welcome bonus",
    expiryDate: "2024-02-15",
    wagering: 10000,
    wageringCompleted: 8500,
  },
  {
    id: 2,
    date: "2024-01-10",
    type: "Deposit Bonus",
    amount: 2000,
    status: "credited",
    description: "50% deposit match bonus",
    expiryDate: "2024-02-10",
    wagering: 4000,
    wageringCompleted: 4000,
  },
  {
    id: 3,
    date: "2024-01-08",
    type: "Loyalty Bonus",
    amount: 1500,
    status: "pending",
    description: "Monthly loyalty reward",
    expiryDate: "2024-02-08",
    wagering: 3000,
    wageringCompleted: 0,
  },
  {
    id: 4,
    date: "2024-01-05",
    type: "Referral Bonus",
    amount: 1000,
    status: "expired",
    description: "Friend referral bonus",
    expiryDate: "2024-01-20",
    wagering: 2000,
    wageringCompleted: 500,
  },
]

export default function BonusStatementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const filteredBonuses = bonuses.filter((bonus) => {
    const matchesSearch =
      bonus.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bonus.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || bonus.status === selectedStatus
    const matchesType = selectedType === "all" || bonus.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSearch && matchesStatus && matchesType
  })

  const totalBonuses = bonuses.reduce((sum, b) => sum + b.amount, 0)
  const creditedBonuses = bonuses.filter((b) => b.status === "credited").reduce((sum, b) => sum + b.amount, 0)
  const pendingBonuses = bonuses.filter((b) => b.status === "pending").reduce((sum, b) => sum + b.amount, 0)
  const activeBonuses = bonuses.filter((b) => b.status === "credited" && new Date(b.expiryDate) > new Date()).length

  return (
    <LayoutWrapper 
      title="Bonus Statement" 
      subtitle="Track your bonuses and wagering requirements"
      icon={Gift}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Total Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{totalBonuses.toLocaleString()}</div>
              <p className="text-sm text-purple-400 mt-1">All time received</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Credited Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{creditedBonuses.toLocaleString()}</div>
              <p className="text-sm text-green-400 mt-1">Successfully credited</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{pendingBonuses.toLocaleString()}</div>
              <p className="text-sm text-yellow-400 mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Active Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{activeBonuses}</div>
              <p className="text-sm text-blue-400 mt-1">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Filter Bonus Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search" className="text-gray-300">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search bonuses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="credited">Credited</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Bonus Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="loyalty">Loyalty</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="bg-cyan-600 hover:bg-cyan-700 w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bonus Records */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Bonus History</CardTitle>
            <CardDescription className="text-gray-400">
              Complete record of all your bonuses and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBonuses.map((bonus) => (
                <div
                  key={bonus.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white">{bonus.type}</h3>
                        <Badge
                          variant="secondary"
                          className={
                            bonus.status === "credited"
                              ? "bg-green-600 text-white"
                              : bonus.status === "pending"
                                ? "bg-yellow-600 text-white"
                                : "bg-red-600 text-white"
                          }
                        >
                          {bonus.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{bonus.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Received: {new Date(bonus.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-400">
                          Expires: {new Date(bonus.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Bonus Amount</p>
                        <p className="font-semibold text-green-400 text-sm lg:text-base">₹{bonus.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Wagering Required</p>
                        <p className="font-semibold text-white text-sm lg:text-base">₹{bonus.wagering.toLocaleString()}</p>
                      </div>
                      <div className="text-center col-span-2 lg:col-span-1">
                        <p className="text-xs text-gray-400">Wagering Progress</p>
                        <div className="flex flex-col items-center">
                          <p className="font-semibold text-blue-400 text-sm lg:text-base">₹{bonus.wageringCompleted.toLocaleString()}</p>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{
                                width: `${Math.min((bonus.wageringCompleted / bonus.wagering) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {Math.round((bonus.wageringCompleted / bonus.wagering) * 100)}% complete
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
