"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Search, Download, Calendar, ArrowUpRight, ArrowDownLeft, Wallet, Plus, Minus, Clock } from 'lucide-react'
import { useState } from "react"

interface TransactionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const transactions = [
  {
    id: 1,
    date: "2024-01-07 14:30",
    type: "deposit",
    method: "UPI",
    description: "Deposit via PhonePe",
    amount: 5000,
    fee: 0,
    status: "completed",
    reference: "TXN123456789",
    balance: 28480
  },
  {
    id: 2,
    date: "2024-01-07 10:15",
    type: "withdrawal",
    method: "Bank Transfer",
    description: "Withdrawal to HDFC Bank",
    amount: -2000,
    fee: 50,
    status: "completed",
    reference: "WTH987654321",
    balance: 23480
  },
  {
    id: 3,
    date: "2024-01-06 16:45",
    type: "deposit",
    method: "Credit Card",
    description: "Deposit via Visa ****1234",
    amount: 3000,
    fee: 75,
    status: "completed",
    reference: "TXN456789123",
    balance: 25480
  },
  {
    id: 4,
    date: "2024-01-06 09:20",
    type: "withdrawal",
    method: "UPI",
    description: "Withdrawal via Google Pay",
    amount: -1500,
    fee: 0,
    status: "pending",
    reference: "WTH789123456",
    balance: 22405
  },
  {
    id: 5,
    date: "2024-01-05 18:30",
    type: "deposit",
    method: "Net Banking",
    description: "Deposit via SBI Net Banking",
    amount: 4000,
    fee: 25,
    status: "completed",
    reference: "TXN321654987",
    balance: 23905
  },
  {
    id: 6,
    date: "2024-01-05 12:10",
    type: "withdrawal",
    method: "Bank Transfer",
    description: "Withdrawal to ICICI Bank",
    amount: -2500,
    fee: 50,
    status: "failed",
    reference: "WTH654321987",
    balance: 19880
  },
  {
    id: 7,
    date: "2024-01-04 20:45",
    type: "deposit",
    method: "Wallet",
    description: "Deposit via Paytm Wallet",
    amount: 1500,
    fee: 0,
    status: "completed",
    reference: "TXN147258369",
    balance: 22380
  },
  {
    id: 8,
    date: "2024-01-04 14:25",
    type: "withdrawal",
    method: "UPI",
    description: "Withdrawal via PhonePe",
    amount: -800,
    fee: 0,
    status: "completed",
    reference: "WTH369258147",
    balance: 20880
  }
]

export function TransactionModal({ open, onOpenChange }: TransactionModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus
    const matchesMethod = filterMethod === "all" || transaction.method === filterMethod
    return matchesSearch && matchesType && matchesStatus && matchesMethod
  })

  const deposits = filteredTransactions.filter(t => t.type === 'deposit')
  const withdrawals = filteredTransactions.filter(t => t.type === 'withdrawal')
  
  const totalDeposits = deposits.reduce((sum, t) => sum + t.amount, 0)
  const totalWithdrawals = Math.abs(withdrawals.reduce((sum, t) => sum + t.amount, 0))
  const totalFees = filteredTransactions.reduce((sum, t) => sum + t.fee, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getTransactionIcon = (type: string) => {
    return type === 'deposit' ? 
      <ArrowDownLeft className="h-4 w-4 text-green-400" /> : 
      <ArrowUpRight className="h-4 w-4 text-red-400" />
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'UPI': return '📱'
      case 'Credit Card': return '💳'
      case 'Bank Transfer': return '🏦'
      case 'Net Banking': return '💻'
      case 'Wallet': return '👛'
      default: return '💰'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-7xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-cyan-400" />
            Transaction History
          </DialogTitle>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Plus className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalDeposits.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Deposits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Minus className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalWithdrawals.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Withdrawals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{filteredTransactions.length}</p>
                  <p className="text-sm text-gray-400">Total Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Wallet className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{totalFees.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Total Fees</p>
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
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="UPI">UPI</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Net Banking">Net Banking</SelectItem>
              <SelectItem value="Wallet">Wallet</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-cyan-600">
              All ({filteredTransactions.length})
            </TabsTrigger>
            <TabsTrigger value="deposits" className="data-[state=active]:bg-green-600">
              Deposits ({deposits.length})
            </TabsTrigger>
            <TabsTrigger value="withdrawals" className="data-[state=active]:bg-red-600">
              Withdrawals ({withdrawals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div className="text-2xl">{getMethodIcon(transaction.method)}</div>
                        <div>
                          <h4 className="font-semibold text-white">{transaction.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                            <span>•</span>
                            <span>Ref: {transaction.reference}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(transaction.status)} text-white capitalize`}>
                        {transaction.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {transaction.status}
                      </Badge>
                      
                      <div className="text-right">
                        <p className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        {transaction.fee > 0 && (
                          <p className="text-sm text-gray-400">Fee: ₹{transaction.fee}</p>
                        )}
                        <p className="text-sm text-gray-400">
                          Balance: ₹{transaction.balance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="deposits" className="space-y-4">
            {deposits.map((transaction) => (
              <Card key={transaction.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <ArrowDownLeft className="h-4 w-4 text-green-400" />
                        <div className="text-2xl">{getMethodIcon(transaction.method)}</div>
                        <div>
                          <h4 className="font-semibold text-white">{transaction.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(transaction.status)} text-white capitalize`}>
                        {transaction.status}
                      </Badge>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-400">
                          +₹{transaction.amount.toLocaleString()}
                        </p>
                        {transaction.fee > 0 && (
                          <p className="text-sm text-gray-400">Fee: ₹{transaction.fee}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-4">
            {withdrawals.map((transaction) => (
              <Card key={transaction.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-red-400/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <ArrowUpRight className="h-4 w-4 text-red-400" />
                        <div className="text-2xl">{getMethodIcon(transaction.method)}</div>
                        <div>
                          <h4 className="font-semibold text-white">{transaction.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge className={`${getStatusColor(transaction.status)} text-white capitalize`}>
                        {transaction.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {transaction.status}
                      </Badge>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-400">
                          ₹{Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        {transaction.fee > 0 && (
                          <p className="text-sm text-gray-400">Fee: ₹{transaction.fee}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions found matching your criteria.</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Transaction Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Processing Time: <span className="text-white font-semibold">Instant to 24 hours</span></p>
              <p className="text-gray-400">Daily Limit: <span className="text-white font-semibold">₹1,00,000</span></p>
            </div>
            <div>
              <p className="text-gray-400">Monthly Limit: <span className="text-white font-semibold">₹10,00,000</span></p>
              <p className="text-gray-400">Support: <span className="text-white font-semibold">24/7 Available</span></p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
