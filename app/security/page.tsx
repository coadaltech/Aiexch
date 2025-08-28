"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"
import { toast } from "@/hooks/use-toast"

const loginHistory = [
  {
    id: 1,
    date: "2024-01-15 14:30",
    device: "Chrome on Windows",
    location: "Mumbai, India",
    ip: "192.168.1.1",
    status: "success",
  },
  {
    id: 2,
    date: "2024-01-14 09:15",
    device: "Mobile App on Android",
    location: "Mumbai, India",
    ip: "192.168.1.2",
    status: "success",
  },
  {
    id: 3,
    date: "2024-01-13 22:45",
    device: "Safari on iPhone",
    location: "Delhi, India",
    ip: "192.168.1.3",
    status: "failed",
  },
]

export default function SecurityPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    })
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled
        ? "Two-factor authentication has been disabled."
        : "Two-factor authentication has been enabled.",
    })
  }

  return (
    <LayoutWrapper 
      title="Security Settings" 
      subtitle="Manage your account security and privacy"
      icon={Shield}
    >
      <div className="p-4 lg:p-6 space-y-6">
        <Tabs defaultValue="password" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            <TabsTrigger value="password" className="data-[state=active]:bg-cyan-600">
              <Key className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Password</span>
              <span className="sm:hidden">Pass</span>
            </TabsTrigger>
            <TabsTrigger value="2fa" className="data-[state=active]:bg-cyan-600">
              <Smartphone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Two-Factor Auth</span>
              <span className="sm:hidden">2FA</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-cyan-600">
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Login Activity</span>
              <span className="sm:hidden">Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-6">
            {/* Password Change */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your account password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword" className="text-gray-300">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pr-10"
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
                  <Label htmlFor="newPassword" className="text-gray-300">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pr-10"
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
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="bg-white/5 border-white/10 text-white pr-10"
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
                </div>

                <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
                  <h4 className="text-blue-400 font-semibold mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-blue-200 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains uppercase and lowercase letters</li>
                    <li>• Contains at least one number</li>
                    <li>• Contains at least one special character</li>
                  </ul>
                </div>

                <Button onClick={handlePasswordChange} className="bg-green-600 hover:bg-green-700">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="2fa" className="space-y-6">
            {/* Two-Factor Authentication */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Two-Factor Authentication
                  {twoFactorEnabled && (
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-400">
                      Require a verification code from your phone when signing in
                    </p>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={handleEnable2FA} />
                </div>

                {twoFactorEnabled && (
                  <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-semibold">2FA is Active</span>
                    </div>
                    <p className="text-sm text-green-200 mb-4">
                      Your account is protected with two-factor authentication using your mobile device.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="border-green-500/20 text-green-400 hover:bg-green-500/10 bg-transparent"
                      >
                        View Recovery Codes
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-500/20 text-green-400 hover:bg-green-500/10 bg-transparent"
                      >
                        Regenerate Codes
                      </Button>
                    </div>
                  </div>
                )}

                {!twoFactorEnabled && (
                  <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-semibold">Enhance Your Security</span>
                    </div>
                    <p className="text-sm text-yellow-200">
                      Enable two-factor authentication to significantly improve your account security. This will
                      require a verification code from your mobile device when logging in.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Security Notifications</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose how you want to be notified about security events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Get notified via email about login attempts and security changes
                    </p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">SMS Notifications</Label>
                    <p className="text-sm text-gray-400">Get notified via SMS about suspicious activities</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            {/* Login Activity */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Login Activity
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor recent login attempts and active sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loginHistory.map((login) => (
                    <div
                      key={login.id}
                      className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex-1 mb-4 lg:mb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                          <div className="text-white font-semibold">{login.device}</div>
                          <Badge
                            variant="secondary"
                            className={
                              login.status === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                            }
                          >
                            {login.status === "success" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {login.status}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {login.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {login.location}
                          </span>
                          <span>IP: {login.ip}</span>
                        </div>
                      </div>
                      {login.status === "success" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
                        >
                          Terminate Session
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Actions */}
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Security Actions</CardTitle>
                <CardDescription className="text-gray-400">
                  Additional security measures for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Report Suspicious Activity
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Terminate All Sessions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutWrapper>
  )
}
