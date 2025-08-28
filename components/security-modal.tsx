"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react'
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface SecurityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SecurityModal({ open, onOpenChange }: SecurityModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)

  const passwordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return 'bg-red-500'
      case 2: return 'bg-orange-500'
      case 3: return 'bg-yellow-500'
      case 4: return 'bg-green-500'
      case 5: return 'bg-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  const getStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return 'Very Weak'
      case 2: return 'Weak'
      case 3: return 'Fair'
      case 4: return 'Strong'
      case 5: return 'Very Strong'
      default: return 'Unknown'
    }
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive"
      })
      return
    }

    if (passwordStrength(newPassword) < 3) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled for enhanced security.",
    })
  }

  const recentActivity = [
    {
      id: 1,
      action: "Login",
      device: "Chrome on Windows",
      location: "Mumbai, India",
      time: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      action: "Password Change",
      device: "Mobile App",
      location: "Mumbai, India",
      time: "1 day ago",
      status: "success"
    },
    {
      id: 3,
      action: "Failed Login Attempt",
      device: "Unknown Device",
      location: "Delhi, India",
      time: "3 days ago",
      status: "failed"
    },
    {
      id: 4,
      action: "Login",
      device: "Safari on iPhone",
      location: "Mumbai, India",
      time: "1 week ago",
      status: "success"
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-cyan-400" />
            Security Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Password Change */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-yellow-400" />
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm">Current Password</Label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white pr-10"
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">New Password</Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white pr-10"
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength(newPassword))}`}
                            style={{ width: `${(passwordStrength(newPassword) / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {getStrengthText(passwordStrength(newPassword))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white pr-10"
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {confirmPassword && (
                    <div className="mt-1 flex items-center gap-1">
                      {newPassword === confirmPassword ? (
                        <>
                          <Check className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-400">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 text-red-400" />
                          <span className="text-xs text-red-400">Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handlePasswordChange}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                >
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-400" />
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white">Enable 2FA</p>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={twoFactorEnabled ? 'bg-green-500' : 'bg-gray-500'}>
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                  <Switch checked={twoFactorEnabled} onCheckedChange={handleEnable2FA} />
                </div>
              </div>
              {twoFactorEnabled && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Two-factor authentication is active. You'll need your authenticator app to log in.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Security Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive security alerts via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">SMS Notifications</p>
                    <p className="text-sm text-gray-400">Receive security alerts via SMS</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Login Alerts</p>
                    <p className="text-sm text-gray-400">Get notified of new device logins</p>
                  </div>
                  <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4">Recent Security Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.device} • {activity.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{activity.time}</p>
                      <Badge className={activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Tips
          </h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Use a strong, unique password for your account</li>
            <li>• Enable two-factor authentication for enhanced security</li>
            <li>• Never share your login credentials with anyone</li>
            <li>• Log out from shared or public devices</li>
            <li>• Report suspicious activity immediately</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
