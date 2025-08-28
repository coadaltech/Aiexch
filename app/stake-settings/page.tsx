"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, RotateCcw, AlertTriangle, DollarSign, Clock, Shield } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"
import { toast } from "@/hooks/use-toast"

export default function StakeSettingsPage() {
  const [settings, setSettings] = useState({
    defaultStake: 1000,
    maxStake: 50000,
    minStake: 100,
    quickStakes: [500, 1000, 2000, 5000, 10000],
    autoAcceptOdds: true,
    oddsChangeThreshold: 0.1,
    confirmBets: true,
    sessionLimit: 100000,
    dailyLimit: 500000,
    weeklyLimit: 2000000,
    enableLimits: true,
    timeoutDuration: 30,
    autoLogout: false,
    logoutTime: 60,
  })

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your stake settings have been updated successfully.",
    })
  }

  const handleReset = () => {
    setSettings({
      defaultStake: 1000,
      maxStake: 50000,
      minStake: 100,
      quickStakes: [500, 1000, 2000, 5000, 10000],
      autoAcceptOdds: true,
      oddsChangeThreshold: 0.1,
      confirmBets: true,
      sessionLimit: 100000,
      dailyLimit: 500000,
      weeklyLimit: 2000000,
      enableLimits: true,
      timeoutDuration: 30,
      autoLogout: false,
      logoutTime: 60,
    })
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    })
  }

  return (
    <LayoutWrapper 
      title="Stake Settings" 
      subtitle="Configure your betting preferences and limits"
      icon={Settings}
    >
      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="stakes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            <TabsTrigger value="stakes" className="data-[state=active]:bg-cyan-600">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Stake Settings</span>
              <span className="sm:hidden">Stakes</span>
            </TabsTrigger>
            <TabsTrigger value="limits" className="data-[state=active]:bg-cyan-600">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Betting Limits</span>
              <span className="sm:hidden">Limits</span>
            </TabsTrigger>
            <TabsTrigger value="session" className="data-[state=active]:bg-cyan-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Session Settings</span>
              <span className="sm:hidden">Session</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stakes" className="space-y-6">
            {/* Default Stake Settings */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Default Stake Configuration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Set your default betting amounts and quick stake options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <Label htmlFor="defaultStake" className="text-gray-300">
                      Default Stake (₹)
                    </Label>
                    <Input
                      id="defaultStake"
                      type="number"
                      value={settings.defaultStake}
                      onChange={(e) => setSettings({ ...settings, defaultStake: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minStake" className="text-gray-300">
                      Minimum Stake (₹)
                    </Label>
                    <Input
                      id="minStake"
                      type="number"
                      value={settings.minStake}
                      onChange={(e) => setSettings({ ...settings, minStake: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxStake" className="text-gray-300">
                      Maximum Stake (₹)
                    </Label>
                    <Input
                      id="maxStake"
                      type="number"
                      value={settings.maxStake}
                      onChange={(e) => setSettings({ ...settings, maxStake: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300">Quick Stake Buttons (₹)</Label>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {settings.quickStakes.map((stake, index) => (
                      <Input
                        key={index}
                        type="number"
                        value={stake}
                        onChange={(e) => {
                          const newQuickStakes = [...settings.quickStakes]
                          newQuickStakes[index] = Number.parseInt(e.target.value)
                          setSettings({ ...settings, quickStakes: newQuickStakes })
                        }}
                        className="bg-white/5 border-white/10 text-white text-center"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Betting Behavior */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Betting Behavior</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure how bets are placed and confirmed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Auto Accept Odds Changes</Label>
                    <p className="text-sm text-gray-400">Automatically accept small odds changes</p>
                  </div>
                  <Switch
                    checked={settings.autoAcceptOdds}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptOdds: checked })}
                  />
                </div>

                <div>
                  <Label htmlFor="oddsThreshold" className="text-gray-300">
                    Odds Change Threshold (%)
                  </Label>
                  <Input
                    id="oddsThreshold"
                    type="number"
                    step="0.1"
                    value={settings.oddsChangeThreshold}
                    onChange={(e) =>
                      setSettings({ ...settings, oddsChangeThreshold: Number.parseFloat(e.target.value) })
                    }
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                  <p className="text-xs text-gray-400 mt-1">Auto-accept odds changes below this threshold</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Confirm Bets</Label>
                    <p className="text-sm text-gray-400">Show confirmation dialog before placing bets</p>
                  </div>
                  <Switch
                    checked={settings.confirmBets}
                    onCheckedChange={(checked) => setSettings({ ...settings, confirmBets: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limits" className="space-y-6">
            {/* Betting Limits */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Responsible Gaming Limits
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Set limits to control your betting activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Betting Limits</Label>
                    <p className="text-sm text-gray-400">Activate all betting limits and controls</p>
                  </div>
                  <Switch
                    checked={settings.enableLimits}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableLimits: checked })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <Label htmlFor="sessionLimit" className="text-gray-300">
                      Session Limit (₹)
                    </Label>
                    <Input
                      id="sessionLimit"
                      type="number"
                      value={settings.sessionLimit}
                      onChange={(e) => setSettings({ ...settings, sessionLimit: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white"
                      disabled={!settings.enableLimits}
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum bet amount per session</p>
                  </div>
                  <div>
                    <Label htmlFor="dailyLimit" className="text-gray-300">
                      Daily Limit (₹)
                    </Label>
                    <Input
                      id="dailyLimit"
                      type="number"
                      value={settings.dailyLimit}
                      onChange={(e) => setSettings({ ...settings, dailyLimit: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white"
                      disabled={!settings.enableLimits}
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum bet amount per day</p>
                  </div>
                  <div>
                    <Label htmlFor="weeklyLimit" className="text-gray-300">
                      Weekly Limit (₹)
                    </Label>
                    <Input
                      id="weeklyLimit"
                      type="number"
                      value={settings.weeklyLimit}
                      onChange={(e) => setSettings({ ...settings, weeklyLimit: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white"
                      disabled={!settings.enableLimits}
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum bet amount per week</p>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-400 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-semibold">Important Notice</span>
                  </div>
                  <p className="text-sm text-yellow-200">
                    Betting limits help promote responsible gaming. Once set, limits can only be decreased
                    immediately. Increases require a 24-hour cooling-off period.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="session" className="space-y-6">
            {/* Session Management */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Session Management
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure session timeouts and auto-logout settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="timeoutDuration" className="text-gray-300">
                    Session Timeout (minutes)
                  </Label>
                  <Select
                    value={settings.timeoutDuration.toString()}
                    onValueChange={(value) => setSettings({ ...settings, timeoutDuration: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-400 mt-1">Automatically log out after this period of inactivity</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Auto Logout</Label>
                    <p className="text-sm text-gray-400">Enable automatic logout after specified time</p>
                  </div>
                  <Switch
                    checked={settings.autoLogout}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoLogout: checked })}
                  />
                </div>

                {settings.autoLogout && (
                  <div>
                    <Label htmlFor="logoutTime" className="text-gray-300">
                      Auto Logout Time (minutes)
                    </Label>
                    <Input
                      id="logoutTime"
                      type="number"
                      value={settings.logoutTime}
                      onChange={(e) => setSettings({ ...settings, logoutTime: Number.parseInt(e.target.value) })}
                      className="bg-white/5 border-white/10 text-white mt-2"
                    />
                    <p className="text-xs text-gray-400 mt-1">Force logout after this time regardless of activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
        </div>
      </div>
    </LayoutWrapper>
  )
}
