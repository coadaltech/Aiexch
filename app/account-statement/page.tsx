"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Download, FileText, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"

const transactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Deposit via UPI",
    type: "credit",
    amount: 10000,
    balance: 35000,
    reference: "TXN123456789",
  },
  {
    id: 2,
    date: "2024-01-15",
    description: "Cricket Bet - India vs Australia",
    type: "debit",
    amount: 5000,
    balance: 30000,
    reference: "BET987654321",
  },
  {
    id: 3,
    date: "2024-01-14",
    description: "Winning from Football Bet",
    type: "credit",
    amount: 8500,
    balance: 35000,
    reference: "WIN456789123",
  },
  {
    id: 4,
    date: "2024-01-14",
    description: "Withdrawal to Bank",
    type: "debit",
    amount: 15000,
    balance: 26500,
    reference: "WTH789123456",
  },
  {
    id: 5,
    date: "2024-01-13",
    description: "Tennis Bet - Australian Open",
    type: "debit",
    amount: 3000,
    balance: 41500,
    reference: "BET321654987",
  },
  {
    id: 6,
    date: "2024-01-13",
    description: "Bonus Credit",
    type: "credit",
    amount: 2000,
    balance: 44500,
    reference: "BON147258369",
  },
]

export default function AccountStatementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || transaction.type === selectedType
    return matchesSearch && matchesType
  })

  const totalCredits = transactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)
  const totalDebits = transactions.filter((t) => t.type === "debit").reduce((sum, t) => sum + t.amount, 0)
  const netBalance = totalCredits - totalDebits

  return (
    <LayoutWrapper 
      title="Account Statement" 
      subtitle="Complete transaction history and account summary"
      icon={FileText}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Total Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{totalCredits.toLocaleString()}</div>
              <p className="text-sm text-green-400 mt-1">Money received</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-400 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Total Debits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹{totalDebits.toLocaleString()}</div>
              <p className="text-sm text-red-400 mt-1">Money spent</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Net Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-xl lg:text-2xl font-bold ${netBalance >= 0 ? "text-green-400" : "text-red-400"}`}>
                ₹{Math.abs(netBalance).toLocaleString()}
              </div>
              <p className="text-sm text-blue-400 mt-1">{netBalance >= 0 ? "Positive" : "Negative"} balance</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Filter Transactions</CardTitle>
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
                    <SelectItem value="credit">Credits Only</SelectItem>
                    <SelectItem value="debit">Debits Only</SelectItem>
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
                Download Statement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Transaction History</CardTitle>
            <CardDescription className="text-gray-400">Complete record of all account transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 mb-4 lg:mb-0">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "credit"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {transaction.type === "credit" ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{transaction.description}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">Ref: {transaction.reference}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === "credit" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">Balance: ₹{transaction.balance.toLocaleString()}</p>
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
