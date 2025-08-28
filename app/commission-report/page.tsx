"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Download, Award, TrendingUp, Users, Percent } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"

const commissions = [
  {
    id: 1,
    date: "2024-01-15",
    referral: "USER123",
    game: "Cricket - India vs Australia",
    userBet: 10000,
    commissionRate: 2.5,
    commissionEarned: 250,
    status: "paid",
  },
  {
    id: 2,
    date: "2024-01-14",
    referral: "USER456",
    game: "Football - Premier League",
    userBet: 15000,
    commissionRate: 3.0,
    commissionEarned: 450,
    status: "paid",
  },
  {
    id: 3,
    date: "2024-01-13",
    referral: "USER789",
    game: "Tennis - Australian Open",
    userBet: 8000,
    commissionRate: 2.0,
    commissionEarned: 160,
    status: "pending",
  },
  {
    id: 4,
    date: "2024-01-12",
    referral: "USER321",
    game: "Basketball - NBA",
    userBet: 12000,
    commissionRate: 2.5,
    commissionEarned: 300,
    status: "paid",
  },
]

export default function CommissionReportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredCommissions = commissions.filter((commission) => {
    const matchesSearch =
      commission.referral.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission.game.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || commission.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalCommission = commissions.reduce((sum, c) => sum + c.commissionEarned, 0)
  const paidCommission = commissions.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.commissionEarned, 0)
  const pendingCommission = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => sum + c.commissionEarned, 0)
  const totalReferrals = new Set(commissions.map((c) => c.referral)).size

  return (
    <LayoutWrapper 
      title="Commission Report" 
      subtitle="Track your referral commissions and earnings"
      icon={Award}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Total Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{totalCommission.toLocaleString()}</div>
              <p className="text-sm text-purple-400 mt-1">All time earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Paid Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{paidCommission.toLocaleString()}</div>
              <p className="text-sm text-green-400 mt-1">Already received</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Percent className="h-5 w-5" />
                Pending Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{pendingCommission.toLocaleString()}</div>
              <p className="text-sm text-yellow-400 mt-1">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{totalReferrals}</div>
              <p className="text-sm text-blue-400 mt-1">Unique users</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Filter Commission Records</CardTitle>
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
                    placeholder="Search referrals or games..."
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
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">From Date</Label>
                <Input type="date" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-300">To Date</Label>
                <Input type="date" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Search className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Commission Records */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Commission Records</CardTitle>
            <CardDescription className="text-gray-400">
              Detailed breakdown of your referral commissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCommissions.map((commission) => (
                <div
                  key={commission.id}
                  className="flex flex-col xl:flex-row xl:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex-1 mb-4 xl:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{commission.game}</h3>
                      <Badge
                        variant={commission.status === "paid" ? "default" : "secondary"}
                        className={
                          commission.status === "paid" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                        }
                      >
                        {commission.status}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(commission.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-400">Referral: {commission.referral}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">User Bet</p>
                      <p className="font-semibold text-white text-sm lg:text-base">₹{commission.userBet.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Rate</p>
                      <p className="font-semibold text-blue-400 text-sm lg:text-base">{commission.commissionRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Commission</p>
                      <p className="font-semibold text-green-400 text-sm lg:text-base">₹{commission.commissionEarned}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Status</p>
                      <p
                        className={`font-semibold text-sm lg:text-base ${
                          commission.status === "paid" ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </p>
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
