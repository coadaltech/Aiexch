"use client"

import type React from "react"
import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { NotificationPanel } from "@/components/notification-panel"
import { GamesSidebar } from "@/components/games-sidebar"
import { UserProfile } from "@/components/user-profile"
import { WalletModal } from "@/components/wallet-modal"
import { SettingsModal } from "@/components/settings-modal"
import { Search, Coins, Plus, Bell, Crown } from 'lucide-react'
import { Toaster } from "@/components/ui/toaster"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"

interface LayoutWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }>
}

export function LayoutWrapper({ children, title, subtitle, icon: Icon }: LayoutWrapperProps) {
  const [balance, setBalance] = useState(25000)
  const [user, setUser] = useState({
    name: "John Doe",
    level: 5,
    email: "john@example.com",
    avatar: "/user-avatar.png"
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Tournament Starting",
      message: "Cyber Strike Elite tournament begins in 5 minutes",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Reward Earned",
      message: "You earned ₹500 from daily login bonus",
      time: "1 hour ago",
      read: false,
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = () => {
    // Clear user data
    setUser(null)
    setBalance(0)
    localStorage.removeItem("aiexch_user")

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home page
    window.location.href = "/"
  }

  const handleAddFunds = (amount: number) => {
    setBalance((prev) => prev + amount)
    toast({
      title: "Funds Added",
      description: `₹${amount} added to your wallet successfully!`,
    })
  }

  const handleWithdraw = (amount: number) => {
    if (amount <= balance) {
      setBalance((prev) => prev - amount)
      toast({
        title: "Withdrawal Successful",
        description: `₹${amount} withdrawn successfully!`,
      })
    } else {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      })
    }
  }

  const markNotificationRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex w-full">
        {/* Animated Background - Fixed positioning */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <AppSidebar balance={balance} user={user} onLogout={handleLogout} />

        <SidebarInset className="flex-1 min-w-0 relative">
          {/* Consistent Header */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
            <div className="flex flex-wrap items-center justify-between h-16 px-4 lg:px-6">
              {/* Left Section */}
              <div className="flex items-center gap-3 min-w-0">
                <SidebarTrigger className="text-white" />

                {/* Logo */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                </div>

                {/* Page Title */}
                {(title || Icon) && (
                  <div className="hidden xl:flex items-center gap-3 ml-4">
                    {Icon && <Icon className="h-6 w-6 text-cyan-400" />}
                    <div>
                      {title && <h1 className="text-xl font-bold text-white">{title}</h1>}
                      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
                    </div>
                  </div>
                )}

              </div>

              {/* Search (hidden on mobile) */}
              <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    placeholder="Search games, tournaments..."
                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-full"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Balance (hidden on small screens) */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right cursor-pointer" onClick={() => setShowWallet(true)}>
                    <p className="text-sm font-semibold text-white">₹{balance.toLocaleString()}</p>
                    <p className="text-xs text-green-400">+₹2,340</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    onClick={() => setShowWallet(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Funds
                  </Button>
                </div>

                {/* Mobile Wallet */}
                <Button
                  size="sm"
                  className="md:hidden bg-gradient-to-r from-green-500 to-emerald-600"
                  onClick={() => setShowWallet(true)}
                >
                  <Coins className="h-4 w-4" />
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                      {unreadCount}
                    </div>
                  )}
                </Button>

                {/* Profile */}
                <Avatar className="h-9 w-9 ring-2 ring-cyan-400/50 cursor-pointer" onClick={() => setShowProfile(true)}>
                  <AvatarImage src={user?.avatar || "/user-avatar.png"} />
                  <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative z-10 flex-1 overflow-auto">{children}</main>
        </SidebarInset>
      </div>

      {/* All Modals */}
      <NotificationPanel
        open={showNotifications}
        onOpenChange={setShowNotifications}
        notifications={notifications}
        onMarkRead={markNotificationRead}
      />

      <UserProfile
        open={showProfile}
        onOpenChange={setShowProfile}
        balance={balance}
        user={user}
        onLogout={handleLogout}
      />

      <WalletModal
        open={showWallet}
        onOpenChange={setShowWallet}
        balance={balance}
        onAddFunds={handleAddFunds}
        onWithdraw={handleWithdraw}
      />

      <SettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
        soundEnabled={true}
        onSoundToggle={() => { }}
      />

      <Toaster />
    </SidebarProvider>
  )
}
