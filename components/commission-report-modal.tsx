"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, TrendingUp, Users, Calendar, Download, BarChart3, DollarSign } from 'lucide-react'
import { useState } from "react"

interface CommissionReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const commissionData = [
  {
    id: 1,
    period: "January 2024 - Week 1",
    referrals: 3,
    activeReferrals: 2,
    totalTurnover: 45000,
    commissionRate: 2.5,
    commissionEarned: 1125,
    status: "paid",
    paidDate: "2024-01-08"
  },
  {
    id: 2,
    period: "December 2023 - Week 4",
    referrals: 5,
    activeReferrals: 4,
    totalTurnover: 68000,
    commissionRate: 2.5,
    commissionEarned: 1700,
    status: "paid",
    paidDate: "2024-01-01"
  },
  {
    id: 3,
    period: "December 2023 - Week 3",
    referrals: 4,
    activeReferrals: 3,
    totalTurnover: 52000,
    commissionRate: 2.0,
    commissionEarned: 1040,
    status: "paid",
    paidDate: "2023-12-25"
  },
  {
    id: 4,
    period: "December 2023 - Week 2",
    referrals: 6,
    activeReferrals: 5,
    totalTurnover: 89000,
    commissionRate: 3.0,
    commissionEarned: 2670,
    status: "pending",
    paidDate: null
  },
  {
    id: 5,
    period: "December 2023 - Week 1",
    referrals: 2,
    activeReferrals: 2,
    totalTurnover: 34000,
    commissionRate: 2.0,
    commissionEarned: 680,
    status: "paid",
    paidDate: "2023-12-11"
  }
]

const referralStats = {
  totalReferrals: 20,
  activeReferrals: 16,
  totalCommissionEarned: 7215,
  pendingCommission: 2670,
  averageCommissionRate: 2.4,
  topPerformingMonth: "December 2023"
}

export function CommissionReportModal({ open, onOpenChange }: CommissionReportModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredData = commissionData.filter(item => {
    const matchesPeriod = selectedPeriod === "all" || item.period.includes(selectedPeriod)
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesPeriod && matchesStatus
  })

  const totalCommission = filteredData.reduce((sum, item) => sum + item.commissionEarned, 0)
  const totalTurnover = filteredData.reduce((sum, item) => sum + item.totalTurnover, 0)
  const totalReferrals = filteredData.reduce((sum, item) => sum + item.referrals, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <Award className="h-6 w-6 text-cyan-400" />
            Commission Report
          </DialogTitle>
        </DialogHeader>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{referralStats.totalCommissionEarned.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{referralStats.pendingCommission.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{referralStats.totalReferrals}</p>
                  <p className="text-sm text-gray-400">Total Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{referralStats.averageCommissionRate}%</p>
                  <p className="text-sm text-gray-400">Avg Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Periods</SelectItem>
              <SelectItem value="January 2024">January 2024</SelectItem>
              <SelectItem value="December 2023">December 2023</SelectItem>
              <SelectItem value="November 2023">November 2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2 ml-auto">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Commission Details */}
        <div className="space-y-4">
          {filteredData.map((item) => (
            <Card key={item.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.period}</h3>
                      {item.paidDate && (
                        <p className="text-sm text-gray-400">Paid on: {item.paidDate}</p>
                      )}
                    </div>
                  </div>
                  <Badge className={`${item.status === 'paid' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                    {item.status === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Referrals</p>
                    <p className="text-lg font-semibold text-white">{item.referrals}</p>
                    <p className="text-xs text-gray-500">({item.activeReferrals} active)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Turnover</p>
                    <p className="text-lg font-semibold text-cyan-400">₹{item.totalTurnover.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Commission Rate</p>
                    <p className="text-lg font-semibold text-purple-400">{item.commissionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Commission Earned</p>
                    <p className="text-lg font-semibold text-green-400">₹{item.commissionEarned.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className={`text-lg font-semibold ${item.status === 'paid' ? 'text-green-400' : 'text-orange-400'}`}>
                      {item.status === 'paid' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </div>

                {/* Commission Breakdown */}
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Commission Calculation:</span>
                    <span className="text-white">
                      ₹{item.totalTurnover.toLocaleString()} × {item.commissionRate}% = ₹{item.commissionEarned.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No commission records found for the selected criteria.</p>
          </div>
        )}

        {/* Performance Insights */}
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Performance Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Active Referral Rate: <span className="text-white font-semibold">{((referralStats.activeReferrals / referralStats.totalReferrals) * 100).toFixed(1)}%</span></p>
              <p className="text-gray-400">Best Performing Period: <span className="text-white font-semibold">{referralStats.topPerformingMonth}</span></p>
            </div>
            <div>
              <p className="text-gray-400">Average Commission per Referral: <span className="text-white font-semibold">₹{Math.round(referralStats.totalCommissionEarned / referralStats.totalReferrals)}</span></p>
              <p className="text-gray-400">Next Payout: <span className="text-white font-semibold">Every Monday</span></p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
