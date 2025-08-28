"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Download, Calendar, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard } from 'lucide-react'
import { useState } from "react"

interface AccountStatementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const transactions = [
  {
    id: 1,
    date: "2024-01-07 14:30",
    type: "deposit",
    description: "UPI Deposit - PhonePe",
    amount: 5000,
    balance: 28480,
    status: "completed",
    reference: "TXN123456789"
  },
  {
    id: 2,
    date: "2024-01-07 13:45",
    type: "bet",
    description: "Bet placed - Cyber Strike Elite",
    amount: -1500,
    balance: 23480,
    status: "completed",
    reference: "BET987654321"
  },
  {
    id: 3,
    date: "2024-01-07 13:50",
    type: "win",
    description: "Win - Cyber Strike Elite Tournament",
    amount: 3750,
    balance: 24980,
    status: "completed",
    reference: "WIN456789123"
  },
  {
    id: 4,
    date: "2024-01-06 19:20",
    type: "withdrawal",
    description: "Bank Transfer - HDFC Bank",
    amount: -2000,
    balance: 21230,
    status: "completed",
    reference: "WTH789123456"
  },
  {
    id: 5,
    date: "2024-01-06 16:15",
    type: "bet",
    description: "Bet placed - Lightning Dice",
    amount: -800,
    balance: 23230,
    status: "completed",
    reference: "BET654321987"
  },
  {
    id: 6,
    date: "2024-01-06 11:30",
    type: "bonus",
    description: "Daily Login Bonus",
    amount: 500,
    balance: 24030,
    status: "completed",
    reference: "BON321654987"
  },
  {
    id: 7,
    date: "2024-01-05 20:45",
    type: "win",
    description: "Win - Neon Racing Championship",
    amount: 2640,
    balance: 23530,
    status: "completed",
    reference: "WIN147258369"
  },
  {
    id: 8,
    date: "2024-01-05 20:30",
    type: "bet",
    description: "Bet placed - Neon Racing",
    amount: -1200,
    balance: 20890,
    status: "completed",
    reference: "BET369258147"
  }
]

export function AccountStatementModal({ open, onOpenChange }: AccountStatementModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState("7days")

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesType
  })

  const totalDeposits = filteredTransactions
    .filter(t => t.type === 'deposit' || t.type === 'bonus')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalWithdrawals = Math.abs(filteredTransactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + t.amount, 0))
  
  const totalBets = Math.abs(filteredTransactions
    .filter(t => t.type === 'bet')
    .reduce((sum, t) => sum + t.amount, 0))
  
  const totalWins = filteredTransactions
    .filter(t => t.type === 'win')
    .reduce((sum, t) => sum + t.amount, 0)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'bonus':
      case 'win':
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />
      case 'withdrawal':
      case 'bet':
        return <ArrowUpRight className="h-4 w-4 text-red-400" />
      default:
        return <Wallet className="h-4 w-4 text-gray-400" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-blue-500'
      case 'withdrawal':
        return 'bg-orange-500'
      case 'bet':
        return 'bg-red-500'
      case 'win':
        return 'bg-green-500'
      case 'bonus':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-cyan-400" />
            Account Statement
          </DialogTitle>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <ArrowDownLeft className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalDeposits.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Credits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalWithdrawals.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Withdrawals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <CreditCard className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalBets.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Bets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Wallet className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalWins.toLocaleString()}</p>
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
              placeholder="Search transactions..."
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
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="bet">Bets</SelectItem>
              <SelectItem value="win">Wins</SelectItem>
              <SelectItem value="bonus">Bonuses</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <h4 className="font-semibold text-white">{transaction.description}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>Ref: {transaction.reference}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={`${getTransactionColor(transaction.type)} text-white capitalize`}>
                      {transaction.type}
                    </Badge>
                    
                    <div className="text-right">
                      <p className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">
                        Balance: ₹{transaction.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions found matching your criteria.</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Statement Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Current Balance: <span className="text-white font-semibold">₹{transactions[0]?.balance.toLocaleString()}</span></p>
              <p className="text-gray-400">Total Transactions: <span className="text-white font-semibold">{filteredTransactions.length}</span></p>
            </div>
            <div>
              <p className="text-gray-400">Net Flow: <span className={`font-semibold ${(totalDeposits + totalWins - totalWithdrawals - totalBets) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(totalDeposits + totalWins - totalWithdrawals - totalBets) >= 0 ? '+' : ''}₹{(totalDeposits + totalWins - totalWithdrawals - totalBets).toLocaleString()}
              </span></p>
              <p className="text-gray-400">Statement Period: <span className="text-white font-semibold">{dateRange === '7days' ? 'Last 7 Days' : dateRange === '30days' ? 'Last 30 Days' : 'Custom Range'}</span></p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
