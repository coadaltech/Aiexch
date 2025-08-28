"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Download, CreditCard, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"

const transactions = [
  {
    id: 1,
    date: "2024-01-15",
    type: "deposit",
    method: "UPI",
    amount: 10000,
    status: "completed",
    reference: "TXN123456789",
    description: "Deposit via PhonePe",
  },
  {
    id: 2,
    date: "2024-01-14",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 15000,
    status: "completed",
    reference: "WTH987654321",
    description: "Withdrawal to HDFC Bank",
  },
  {
    id: 3,
    date: "2024-01-13",
    type: "deposit",
    method: "Credit Card",
    amount: 5000,
    status: "pending",
    reference: "TXN456789123",
    description: "Deposit via Visa Card",
  },
  {
    id: 4,
    date: "2024-01-12",
    type: "withdrawal",
    method: "UPI",
    amount: 8000,
    status: "failed",
    reference: "WTH789123456",
    description: "Withdrawal via Google Pay",
  },
  {
    id: 5,
    date: "2024-01-11",
    type: "deposit",
    method: "Net Banking",
    amount: 20000,
    status: "completed",
    reference: "TXN321654987",
    description: "Deposit via SBI Net Banking",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.method.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || transaction.type === selectedType
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
  const pendingTransactions = transactions.filter((t) => t.status === "pending").length
  const failedTransactions = transactions.filter((t) => t.status === "failed").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "deposit" ? (
      <ArrowDownLeft className="h-4 w-4 text-green-400" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-blue-400" />
    )
  }

  return (
    <LayoutWrapper 
      title="Transaction History" 
      subtitle="Complete record of deposits and withdrawals"
      icon={CreditCard}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <ArrowDownLeft className="h-5 w-5" />
                Total Deposits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{totalDeposits.toLocaleString()}</div>
              <p className="text-sm text-green-400 mt-1">Money added</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <ArrowUpRight className="h-5 w-5" />
                Total Withdrawals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{totalWithdrawals.toLocaleString()}</div>
              <p className="text-sm text-blue-400 mt-1">Money withdrawn</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{pendingTransactions}</div>
              <p className="text-sm text-yellow-400 mt-1">Awaiting processing</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-400 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Failed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{failedTransactions}</div>
              <p className="text-sm text-red-400 mt-1">Failed transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Filter Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search" className="text-gray-300">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Transaction Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
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

        {/* Transaction History */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
            <CardDescription className="text-gray-400">
              Complete history of your deposits and withdrawals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col xl:flex-row xl:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 mb-4 xl:mb-0">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "deposit" ? "bg-green-600/20" : "bg-blue-600/20"
                      }`}
                    >
                      {getTypeIcon(transaction.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <h3 className="font-semibold text-white capitalize">{transaction.type}</h3>
                        <Badge
                          variant="secondary"
                          className={
                            transaction.status === "completed"
                              ? "bg-green-600 text-white"
                              : transaction.status === "pending"
                                ? "bg-yellow-600 text-white"
                                : "bg-red-600 text-white"
                          }
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transaction.status)}
                            {transaction.status}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{transaction.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">Ref: {transaction.reference}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Method</p>
                      <p className="font-semibold text-white text-sm lg:text-base">{transaction.method}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "deposit" ? "text-green-400" : "text-blue-400"
                        }`}
                      >
                        {transaction.type === "deposit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">
                        {transaction.type === "deposit" ? "Added" : "Withdrawn"}
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
