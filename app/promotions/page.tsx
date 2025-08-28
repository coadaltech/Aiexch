"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Trophy, Clock, Users, Star, Calendar, Coins, Crown, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const activePromotions = [
  {
    id: 1,
    title: "Welcome Bonus",
    description: "Get 100% match bonus up to ₹10,000 on your first deposit",
    type: "deposit",
    value: "100%",
    maxAmount: "₹10,000",
    validUntil: "2024-02-15",
    progress: 0,
    claimed: false,
    icon: Gift,
    gradient: "from-green-500 to-emerald-600",
    requirements: "Minimum deposit of ₹500",
  },
  {
    id: 2,
    title: "Daily Login Bonus",
    description: "Login daily to earn up to ₹500 bonus credits",
    type: "daily",
    value: "₹50-500",
    maxAmount: "₹500",
    validUntil: "Ongoing",
    progress: 60,
    claimed: false,
    icon: Calendar,
    gradient: "from-blue-500 to-cyan-600",
    requirements: "Login for 7 consecutive days",
  },
  {
    id: 3,
    title: "Tournament Winner Bonus",
    description: "Extra 25% bonus on tournament winnings",
    type: "tournament",
    value: "25%",
    maxAmount: "₹5,000",
    validUntil: "2024-01-31",
    progress: 100,
    claimed: true,
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-600",
    requirements: "Win any tournament",
  },
  {
    id: 4,
    title: "Referral Bonus",
    description: "Earn ₹1,000 for each friend you refer",
    type: "referral",
    value: "₹1,000",
    maxAmount: "Unlimited",
    validUntil: "Ongoing",
    progress: 33,
    claimed: false,
    icon: Users,
    gradient: "from-purple-500 to-pink-600",
    requirements: "Friend must deposit minimum ₹1,000",
  },
]

const upcomingPromotions = [
  {
    id: 5,
    title: "Weekend Cashback",
    description: "Get 10% cashback on weekend losses",
    type: "cashback",
    value: "10%",
    maxAmount: "₹2,000",
    startsOn: "2024-01-27",
    icon: Coins,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    id: 6,
    title: "High Roller Bonus",
    description: "Exclusive bonus for VIP players",
    type: "vip",
    value: "50%",
    maxAmount: "₹25,000",
    startsOn: "2024-02-01",
    icon: Crown,
    gradient: "from-amber-500 to-yellow-600",
  },
]

const completedPromotions = [
  {
    id: 7,
    title: "New Year Special",
    description: "Special bonus for New Year celebration",
    type: "special",
    value: "₹2,000",
    completedOn: "2024-01-01",
    claimed: true,
    icon: Sparkles,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 8,
    title: "Christmas Bonus",
    description: "Holiday season bonus for all players",
    type: "seasonal",
    value: "₹1,500",
    completedOn: "2023-12-25",
    claimed: true,
    icon: Gift,
    gradient: "from-red-500 to-pink-600",
  },
]

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState("active")

  const handleClaimBonus = (promotion: any) => {
    toast({
      title: "Bonus Claimed!",
      description: `${promotion.title} has been added to your account.`,
    })
  }

  const handleViewDetails = (promotion: any) => {
    toast({
      title: "Promotion Details",
      description: `Viewing details for ${promotion.title}`,
    })
  }

  return (
    <LayoutWrapper title="Promotions" subtitle="Claim your bonuses and rewards" icon={Gift}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ">
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                  <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">4</p>
                  <p className="text-xs text-gray-400">Active Bonuses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                  <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">₹15,500</p>
                  <p className="text-xs text-gray-400">Total Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">2</p>
                  <p className="text-xs text-gray-400">Expiring Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border-yellow-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-yellow-500/20 rounded-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">VIP</p>
                  <p className="text-xs text-gray-400">Status Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promotions Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 backdrop-blur-sm">
            <TabsTrigger value="active" className="text-xs sm:text-sm">
              Active ({activePromotions.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
              Upcoming ({upcomingPromotions.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm">
              Completed ({completedPromotions.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Promotions */}
          <TabsContent value="active" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {activePromotions.map((promotion) => (
                <Card
                  key={promotion.id}
                  className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${promotion.gradient}`}></div>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${promotion.gradient} rounded-lg flex items-center justify-center`}
                        >
                          <promotion.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-base sm:text-lg text-white line-clamp-1">
                            {promotion.title}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{promotion.description}</p>
                        </div>
                      </div>
                      <Badge
                        variant={promotion.claimed ? "secondary" : "default"}
                        className={`${promotion.claimed ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"} text-xs`}
                      >
                        {promotion.claimed ? "Claimed" : "Available"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-4">
                      {/* Promotion Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Bonus Value</p>
                          <p className="text-white font-semibold">{promotion.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Max Amount</p>
                          <p className="text-white font-semibold">{promotion.maxAmount}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Valid Until</p>
                          <p className="text-white font-semibold">{promotion.validUntil}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Type</p>
                          <p className="text-white font-semibold capitalize">{promotion.type}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {promotion.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{promotion.progress}%</span>
                          </div>
                          <Progress value={promotion.progress} className="h-2" />
                        </div>
                      )}

                      {/* Requirements */}
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400 mb-1">Requirements:</p>
                        <p className="text-xs sm:text-sm text-white">{promotion.requirements}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 ${
                            promotion.claimed
                              ? "bg-gray-600 hover:bg-gray-700"
                              : `bg-gradient-to-r ${promotion.gradient} hover:opacity-90`
                          } text-sm`}
                          disabled={promotion.claimed}
                          onClick={() => handleClaimBonus(promotion)}
                        >
                          {promotion.claimed ? "Already Claimed" : "Claim Bonus"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(promotion)}
                          className="text-xs sm:text-sm"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Promotions */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {upcomingPromotions.map((promotion) => (
                <Card
                  key={promotion.id}
                  className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${promotion.gradient}`}></div>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${promotion.gradient} rounded-lg flex items-center justify-center`}
                        >
                          <promotion.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-base sm:text-lg text-white line-clamp-1">
                            {promotion.title}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{promotion.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">Coming Soon</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-4">
                      {/* Promotion Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Bonus Value</p>
                          <p className="text-white font-semibold">{promotion.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Max Amount</p>
                          <p className="text-white font-semibold">{promotion.maxAmount}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-400">Starts On</p>
                          <p className="text-white font-semibold">{promotion.startsOn}</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        className="w-full text-sm bg-transparent"
                        onClick={() => handleViewDetails(promotion)}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Set Reminder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Promotions */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {completedPromotions.map((promotion) => (
                <Card
                  key={promotion.id}
                  className="group bg-black/40 border-white/10 backdrop-blur-sm opacity-75 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${promotion.gradient} opacity-50`}></div>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${promotion.gradient} rounded-lg flex items-center justify-center opacity-75`}
                        >
                          <promotion.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-base sm:text-lg text-white line-clamp-1">
                            {promotion.title}
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{promotion.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 text-xs">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-4">
                      {/* Promotion Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Bonus Value</p>
                          <p className="text-white font-semibold">{promotion.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Completed On</p>
                          <p className="text-white font-semibold">{promotion.completedOn}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <p className="text-sm text-green-400">Bonus successfully claimed and credited</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutWrapper>
  )
}
