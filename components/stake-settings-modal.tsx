"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, DollarSign, Percent, Clock, Shield, Save, RotateCcw } from 'lucide-react'
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface StakeSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StakeSettingsModal({ open, onOpenChange }: StakeSettingsModalProps) {
  const [quickStakeAmounts, setQuickStakeAmounts] = useState([100, 500, 1000, 2500, 5000])
  const [defaultStake, setDefaultStake] = useState(500)
  const [maxStakePerBet, setMaxStakePerBet] = useState([10000])
  const [maxStakePerDay, setMaxStakePerDay] = useState([50000])
  const [autoStakeEnabled, setAutoStakeEnabled] = useState(false)
  const [autoStakeMultiplier, setAutoStakeMultiplier] = useState([2])
  const [lossLimitEnabled, setLossLimitEnabled] = useState(true)
  const [dailyLossLimit, setDailyLossLimit] = useState([5000])
  const [sessionTimeLimit, setSessionTimeLimit] = useState([120])
  const [confirmBetsEnabled, setConfirmBetsEnabled] = useState(true)
  const [stakeCurrency, setStakeCurrency] = useState("INR")

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your stake settings have been updated successfully.",
    })
    onOpenChange(false)
  }

  const handleReset = () => {
    setQuickStakeAmounts([100, 500, 1000, 2500, 5000])
    setDefaultStake(500)
    setMaxStakePerBet([10000])
    setMaxStakePerDay([50000])
    setAutoStakeEnabled(false)
    setAutoStakeMultiplier([2])
    setLossLimitEnabled(true)
    setDailyLossLimit([5000])
    setSessionTimeLimit([120])
    setConfirmBetsEnabled(true)
    setStakeCurrency("INR")
    
    toast({
      title: "Settings Reset",
      description: "All stake settings have been reset to default values.",
    })
  }

  const updateQuickStakeAmount = (index: number, value: string) => {
    const newAmounts = [...quickStakeAmounts]
    newAmounts[index] = parseInt(value) || 0
    setQuickStakeAmounts(newAmounts)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <Settings className="h-6 w-6 text-cyan-400" />
            Stake Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stake Amounts */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Quick Stake Amounts
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {quickStakeAmounts.map((amount, index) => (
                  <div key={index}>
                    <Label className="text-gray-400 text-sm">Amount {index + 1}</Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => updateQuickStakeAmount(index, e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white mt-1"
                      placeholder="Amount"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Default Settings */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-cyan-400" />
                Default Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-400 text-sm">Default Stake Amount</Label>
                  <Input
                    type="number"
                    value={defaultStake}
                    onChange={(e) => setDefaultStake(parseInt(e.target.value) || 0)}
                    className="bg-gray-800 border-gray-600 text-white mt-1"
                    placeholder="Default stake"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Currency</Label>
                  <Select value={stakeCurrency} onValueChange={setStakeCurrency}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Betting Limits */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                Betting Limits
              </h3>
              <div className="space-y-6">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">
                    Maximum Stake Per Bet: ₹{maxStakePerBet[0].toLocaleString()}
                  </Label>
                  <Slider
                    value={maxStakePerBet}
                    onValueChange={setMaxStakePerBet}
                    max={100000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">
                    Maximum Stake Per Day: ₹{maxStakePerDay[0].toLocaleString()}
                  </Label>
                  <Slider
                    value={maxStakePerDay}
                    onValueChange={setMaxStakePerDay}
                    max={500000}
                    min={5000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹5,000</span>
                    <span>₹5,00,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auto Stake Settings */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Percent className="h-5 w-5 text-purple-400" />
                Auto Stake Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Auto Stake</Label>
                    <p className="text-sm text-gray-400">Automatically adjust stake based on wins/losses</p>
                  </div>
                  <Switch checked={autoStakeEnabled} onCheckedChange={setAutoStakeEnabled} />
                </div>

                {autoStakeEnabled && (
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">
                      Auto Stake Multiplier: {autoStakeMultiplier[0]}x
                    </Label>
                    <Slider
                      value={autoStakeMultiplier}
                      onValueChange={setAutoStakeMultiplier}
                      max={5}
                      min={1.1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1.1x</span>
                      <span>5.0x</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Responsible Gaming */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Responsible Gaming
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Daily Loss Limit</Label>
                    <p className="text-sm text-gray-400">Set a maximum loss limit per day</p>
                  </div>
                  <Switch checked={lossLimitEnabled} onCheckedChange={setLossLimitEnabled} />
                </div>

                {lossLimitEnabled && (
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">
                      Daily Loss Limit: ₹{dailyLossLimit[0].toLocaleString()}
                    </Label>
                    <Slider
                      value={dailyLossLimit}
                      onValueChange={setDailyLossLimit}
                      max={100000}
                      min={1000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">
                    Session Time Limit: {sessionTimeLimit[0]} minutes
                  </Label>
                  <Slider
                    value={sessionTimeLimit}
                    onValueChange={setSessionTimeLimit}
                    max={480}
                    min={30}
                    step={30}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>30 min</span>
                    <span>8 hours</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Confirm Bets</Label>
                    <p className="text-sm text-gray-400">Require confirmation before placing bets</p>
                  </div>
                  <Switch checked={confirmBetsEnabled} onCheckedChange={setConfirmBetsEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Responsible Gaming Notice
          </h4>
          <p className="text-gray-400 text-sm">
            These settings help you maintain control over your gaming activities. 
            Please gamble responsibly and never bet more than you can afford to lose. 
            If you need help with gambling addiction, please contact our support team.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
