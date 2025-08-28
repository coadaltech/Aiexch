"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Trophy, Users, Clock, Calendar, Star, Medal, Target, Zap, Gift, Crown } from "lucide-react"

interface TournamentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tournament: {
    id: string
    title: string
    game: string
    image: string
    prizePool: number
    entryFee: number
    participants: number
    maxParticipants: number
    startTime: string
    duration: string
    status: "upcoming" | "live" | "completed"
    description: string
    rules: string[]
    prizes: { position: string; amount: number }[]
  }
}

const mockLeaderboard = [
  { rank: 1, player: "ProGamer123", score: 15420, avatar: "/user-avatar.png" },
  { rank: 2, player: "ElitePlayer", score: 14890, avatar: "/user-avatar.png" },
  { rank: 3, player: "GameMaster", score: 14250, avatar: "/user-avatar.png" },
  { rank: 4, player: "SkillShot", score: 13800, avatar: "/user-avatar.png" },
  { rank: 5, player: "TopGun", score: 13500, avatar: "/user-avatar.png" },
]

export function TournamentModal({ open, onOpenChange, tournament }: TournamentModalProps) {
  const [isRegistered, setIsRegistered] = useState(false)
  const participationPercentage = (tournament.participants / tournament.maxParticipants) * 100

  const handleRegister = () => {
    setIsRegistered(true)
    // Registration logic here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500"
      case "live":
        return "bg-green-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-400">#{rank}</span>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-black/95 border-white/10 text-white max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-start gap-4">
            <img
              src={tournament.image || "/placeholder.svg"}
              alt={tournament.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">{tournament.title}</DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">{tournament.game} Tournament</DialogDescription>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className={`${getStatusColor(tournament.status)} text-white`}>
                  {tournament.status.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  <span>₹{tournament.prizePool.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>
                    {tournament.participants}/{tournament.maxParticipants}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="prizes">Prizes</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">Start Time</span>
                  </div>
                  <p className="font-semibold">{tournament.startTime}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-semibold">{tournament.duration}</p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div>
                <h3 className="text-lg font-semibold mb-2">Tournament Details</h3>
                <p className="text-gray-300 leading-relaxed">{tournament.description}</p>
              </div>

              <Separator className="bg-gray-700" />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Participation</h3>
                  <span className="text-sm text-gray-400">
                    {tournament.participants} / {tournament.maxParticipants} players
                  </span>
                </div>
                <Progress value={participationPercentage} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">{Math.round(participationPercentage)}% filled</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Gift className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Prize Pool</p>
                  <p className="font-semibold">₹{tournament.prizePool.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Target className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Entry Fee</p>
                  <p className="font-semibold">₹{tournament.entryFee}</p>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-400">Format</p>
                  <p className="font-semibold">Elimination</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prizes" className="space-y-4">
              <div className="space-y-3">
                {tournament.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getRankIcon(Number.parseInt(prize.position))}
                      <span className="font-medium">{prize.position} Place</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">₹{prize.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        {((prize.amount / tournament.prizePool) * 100).toFixed(1)}% of pool
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-4">
              <div className="space-y-2">
                {mockLeaderboard.map((player) => (
                  <div key={player.rank} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-center w-8">{getRankIcon(player.rank)}</div>
                    <img
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.player}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{player.player}</p>
                      <p className="text-sm text-gray-400">Score: {player.score.toLocaleString()}</p>
                    </div>
                    {player.rank <= 3 && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                        Winner
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Tournament Rules</h3>
                <div className="space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-300">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Registration closes in 2 hours</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {!isRegistered ? (
              <Button
                onClick={handleRegister}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                disabled={tournament.status === "completed"}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Register (₹{tournament.entryFee})
              </Button>
            ) : (
              <Button disabled className="bg-green-600">
                <Star className="h-4 w-4 mr-2" />
                Registered
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
