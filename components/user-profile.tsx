"use client"

import { useState } from "react"
import { User, Trophy, Star, Edit3, Camera, Crown, Coins, Flame, Shield, Zap, LogOut } from "lucide-react"

interface UserProfileProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  balance: number
  user?: any
  onLogout?: () => void
}

export function UserProfile({ open, onOpenChange, balance, user, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    onOpenChange(false)
    setTimeout(() => {
      onLogout()
    }, 300)
    // Don't reload the page - let the parent component handle the logout flow
  }

  const achievements = [
    {
      id: 1,
      title: "First Victory",
      description: "Win your first game",
      icon: Trophy,
      earned: true,
      date: "2023-01-20",
    },
    {
      id: 2,
      title: "High Roller",
      description: "Bet over ₹10,000 in a single game",
      icon: Coins,
      earned: true,
      date: "2023-02-15",
    },
    {
      id: 3,
      title: "Tournament Champion",
      description: "Win a tournament",
      icon: Crown,
      earned: true,
      date: "2023-03-10",
    },
    { id: 4, title: "Streak Master", description: "Win 10 games in a row", icon: Flame, earned: false, date: null },
    {
      id: 5,
      title: "Loyal Player",
      description: "Play for 100 consecutive days",
      icon: Shield,
      earned: false,
      date: null,
    },
    {
      id: 6,
      title: "Speed Demon",
      description: "Complete 50 quick games",
      icon: Zap,
      earned: true,
      date: "2023-04-05",
    },
  ]

  const recentGames = [
    { id: 1, name: "Cyber Strike Elite", result: "Won", prize: "+₹2,500", date: "2 hours ago", status: "win" },
    { id: 2, name: "Neon Racing", result: "2nd Place", prize: "+₹1,200", date: "5 hours ago", status: "place" },
    { id: 3, name: "Space Conquest", result: "Lost", prize: "-₹800", date: "1 day ago", status: "loss" },
    { id: 4, name: "Lightning Dice", result: "Won", prize: "+₹3,750", date: "2 days ago", status: "win" },
    { id: 5, name: "Crystal Mines", result: "Won", prize: "+₹1,500", date: "3 days ago", status: "win" },
  ]

  

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-gray-900 border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <User className="h-5 w-5 sm:h-6 sm:w-6" /> Player Profile
          </h2>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-white text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-lg p-4 sm:p-6 mb-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={user?.avatar || "/user-avatar.png"}
              alt="avatar"
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full ring-4 ring-cyan-400/50 object-cover"
            />
            <button className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{user?.name || "Guest User"}</h2>
              <span className="px-2 py-1 rounded bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm">
                Level {user?.level || 1}
              </span>
            </div>
            <p className="text-gray-400 mb-2 text-sm sm:text-base">{user?.email || "guest@example.com"}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-300">
              <span>Balance: ₹{balance?.toLocaleString() || "0"}</span>
              <span>Games: 156</span>
              <span>Wins: 89</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="border border-cyan-500/50 text-cyan-400 px-3 sm:px-4 py-2 rounded hover:bg-cyan-500/10 flex items-center gap-2 text-sm"
            >
              <Edit3 className="h-4 w-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            <button
              onClick={handleLogout}
              className="border border-red-500/50 text-red-400 px-3 sm:px-4 py-2 rounded hover:bg-red-500/10 flex items-center gap-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4">
          {/* Tab Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-800 rounded-lg overflow-hidden">
            {["overview", "achievements", "history", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 text-xs sm:text-sm font-medium truncate ${
                  activeTab === tab ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
                title={tab.charAt(0).toUpperCase() + tab.slice(1)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="space-y-6">
            {/* Overview */}
            {activeTab === "overview" && (
              <>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-semibold flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-yellow-400" /> Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentGames.slice(0, 3).map((game) => (
                      <div key={game.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-white text-sm sm:text-base truncate">{game.name}</p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {game.result} • {game.date}
                          </p>
                        </div>
                        <span
                          className={`font-bold text-sm sm:text-base ml-2 ${
                            game.status === "win"
                              ? "text-green-400"
                              : game.status === "place"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {game.prize}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Achievements */}
            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      ach.earned ? "bg-yellow-500/10 border-yellow-500/20" : "bg-gray-800/50 border-gray-700"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-full flex-shrink-0 ${ach.earned ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-700 text-gray-500"}`}
                    >
                      <ach.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-sm sm:text-base ${ach.earned ? "text-white" : "text-gray-400"}`}
                      >
                        {ach.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400">{ach.description}</p>
                      {ach.earned && ach.date && <p className="text-xs text-yellow-400 mt-1">Earned on {ach.date}</p>}
                    </div>
                    {ach.earned && (
                      <span className="px-2 py-1 rounded bg-yellow-500 text-black text-xs flex-shrink-0">Earned</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Game History */}
            {activeTab === "history" && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
                {recentGames.map((game) => (
                  <div key={game.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          game.status === "win"
                            ? "bg-green-400"
                            : game.status === "place"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      ></span>
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm sm:text-base truncate">{game.name}</p>
                        <p className="text-xs sm:text-sm text-gray-400">
                          {game.result} • {game.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-bold text-sm sm:text-base ml-2 ${
                        game.status === "win"
                          ? "text-green-400"
                          : game.status === "place"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {game.prize}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Settings / Edit Profile */}
            {activeTab === "settings" &&
              (isEditing ? (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-4">
                  <h3 className="text-white font-semibold text-lg">Edit Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-white mb-1 text-sm">Full Name</label>
                      <input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="bg-gray-700 border border-gray-600 text-white p-2 rounded text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-white mb-1 text-sm">Email</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="bg-gray-700 border border-gray-600 text-white p-2 rounded text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-white mb-1 text-sm">Phone</label>
                    <input
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="bg-gray-700 border border-gray-600 text-white p-2 rounded text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded text-white text-sm">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-500 px-4 py-2 rounded text-white hover:bg-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Full Name</label>
                    <p className="text-white font-medium">{user?.name || "Not set"}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white font-medium">{user?.email || "Not set"}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Phone</label>
                    <p className="text-white font-medium">{user?.phone || "Not set"}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Member Since</label>
                    <p className="text-white font-medium">{user?.joinDate || "Unknown"}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}