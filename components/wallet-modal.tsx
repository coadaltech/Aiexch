"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  CreditCard,
  Smartphone,
  Building2,
  Plus,
  Minus,
  History,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface WalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  balance: number
  onAddFunds: (amount: number) => void
  onWithdraw: (amount: number) => void
}

const quickAmounts = [500, 1000, 2500, 5000, 10000]

const recentTransactions = [
  {
    id: "1",
    type: "deposit",
    amount: 5000,
    method: "UPI",
    status: "completed",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "withdrawal",
    amount: 2500,
    method: "Bank Transfer",
    status: "pending",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "deposit",
    amount: 1000,
    method: "Credit Card",
    status: "completed",
    timestamp: "3 days ago",
  },
]

export function WalletModal({ open, onOpenChange, balance, onAddFunds, onWithdraw }: WalletModalProps) {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")

  const handleDeposit = () => {
    const amount = Number.parseFloat(depositAmount)
    if (amount && amount > 0) {
      onAddFunds(amount)
      setDepositAmount("")
      toast({
        title: "Deposit Initiated",
        description: `₹${amount} deposit request submitted successfully!`,
      })
    }
  }

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount)
    if (amount && amount > 0 && amount <= balance) {
      onWithdraw(amount)
      setWithdrawAmount("")
      toast({
        title: "Withdrawal Initiated",
        description: `₹${amount} withdrawal request submitted successfully!`,
      })
    } else if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/95 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-400" />
            Wallet Management
          </DialogTitle>
          <DialogDescription className="text-gray-400">Manage your funds, deposits, and withdrawals</DialogDescription>
        </DialogHeader>

        {/* Balance Display */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Available Balance</p>
              <p className="text-2xl font-bold text-white">₹{balance.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-400">+₹2,340 today</p>
              <p className="text-xs text-gray-500">+12.5% this week</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="deposit" className="data-[state=active]:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="data-[state=active]:bg-red-600">
              <Minus className="h-4 w-4 mr-2" />
              Withdraw
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-600">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount">Deposit Amount</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount(amount.toString())}
                    className="border-gray-700 hover:bg-gray-700 text-xs"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <div>
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="upi">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        UPI
                      </div>
                    </SelectItem>
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </div>
                    </SelectItem>
                    <SelectItem value="netbanking">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Net Banking
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleDeposit}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!depositAmount || !selectedPaymentMethod}
              >
                Deposit ₹{depositAmount || "0"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount">Withdrawal Amount</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">Available: ₹{balance.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((percentage) => (
                  <Button
                    key={percentage}
                    variant="outline"
                    size="sm"
                    onClick={() => setWithdrawAmount(((balance * percentage) / 100).toString())}
                    className="border-gray-700 hover:bg-gray-700"
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-sm text-yellow-400">
                  <strong>Note:</strong> Withdrawals are processed within 24 hours. Minimum withdrawal amount is ₹100.
                </p>
              </div>

              <Button
                onClick={handleWithdraw}
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) > balance}
              >
                Withdraw ₹{withdrawAmount || "0"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "deposit" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}
                    >
                      {transaction.type === "deposit" ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-gray-400">{transaction.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.type === "deposit" ? "text-green-400" : "text-red-400"}`}>
                      {transaction.type === "deposit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={`${getStatusColor(transaction.status)} text-white text-xs`}>
                        {transaction.status}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {transaction.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
