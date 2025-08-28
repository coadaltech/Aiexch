"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Trophy, Gamepad2, Target, Users, Star, Clock, DollarSign } from 'lucide-react'

interface GameRulesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GameRulesModal({ open, onOpenChange }: GameRulesModalProps) {
  const gameCategories = [
    {
      id: "tournaments",
      name: "Tournaments",
      icon: Trophy,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      id: "quick-games",
      name: "Quick Games",
      icon: Gamepad2,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      id: "sports",
      name: "Sports Betting",
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      id: "multiplayer",
      name: "Multiplayer",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-cyan-400" />
            Game Rules & Guidelines
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="tournaments" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            {gameCategories.map((category) => (
              <TabsTrigger 
                key={category.id}
                value={category.id} 
                className="data-[state=active]:bg-cyan-600 flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="tournaments" className="space-y-6">
            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  Tournament Rules
                </h3>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      Entry and Registration
                    </h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Players must register before the tournament start time</li>
                      <li>Entry fees must be paid in full before participation</li>
                      <li>Late registrations are not accepted once the tournament begins</li>
                      <li>Minimum and maximum player limits apply to each tournament</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      Prize Distribution
                    </h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Prize pools are distributed based on final rankings</li>
                      <li>Minimum 3 players required for prize distribution</li>
                      <li>Prizes are credited automatically after tournament completion</li>
                      <li>Tax implications are the responsibility of the winner</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Tournament Format</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Single elimination, double elimination, or round-robin formats</li>
                      <li>Match duration and rules vary by game type</li>
                      <li>Disconnections may result in automatic forfeit</li>
                      <li>Disputes are resolved by tournament administrators</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Fair Play</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Cheating, hacking, or exploiting bugs is strictly prohibited</li>
                      <li>Collusion between players will result in disqualification</li>
                      <li>All gameplay is monitored and recorded</li>
                      <li>Violations may result in permanent account suspension</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quick-games" className="space-y-6">
            <Card className="bg-cyan-500/10 border-cyan-500/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6 text-cyan-400" />
                  Quick Games Rules
                </h3>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Game Types</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h5 className="text-cyan-400 font-semibold">Lightning Dice</h5>
                        <p>Predict the outcome of dice rolls with multipliers up to 999x</p>
                        <Badge className="mt-2 bg-cyan-500">RTP: 96.5%</Badge>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h5 className="text-cyan-400 font-semibold">Crystal Mines</h5>
                        <p>Navigate through a minefield to collect gems and multipliers</p>
                        <Badge className="mt-2 bg-cyan-500">RTP: 97.2%</Badge>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h5 className="text-cyan-400 font-semibold">Rocket Crash</h5>
                        <p>Cash out before the rocket crashes for maximum winnings</p>
                        <Badge className="mt-2 bg-cyan-500">RTP: 99%</Badge>
                      </div>
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <h5 className="text-cyan-400 font-semibold">Golden Coins</h5>
                        <p>Flip coins and predict outcomes for instant wins</p>
                        <Badge className="mt-2 bg-cyan-500">RTP: 98.1%</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Betting Rules</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Minimum bet: ₹10, Maximum bet: ₹10,000 per round</li>
                      <li>Bets are final once placed and cannot be cancelled</li>
                      <li>Auto-bet features available with customizable settings</li>
                      <li>Maximum win per round is capped at ₹1,00,000</li>
                      <li>Games use provably fair algorithms for transparency</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Game Mechanics</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>All games use certified random number generators</li>
                      <li>Results are determined instantly and cannot be influenced</li>
                      <li>Game history is available for the last 100 rounds</li>
                      <li>Disconnections during gameplay may void the round</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Payouts</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Winnings are credited immediately to your account</li>
                      <li>Payout ratios are displayed before each game</li>
                      <li>Maximum payout limits apply to prevent system abuse</li>
                      <li>All payouts are subject to verification procedures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sports" className="space-y-6">
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-400" />
                  Sports Betting Rules
                </h3>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Available Sports</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Cricket', 'Football', 'Tennis', 'Basketball', 'Horse Racing', 'Kabaddi', 'Baseball', 'Volleyball'].map((sport) => (
                        <Badge key={sport} className="bg-green-500 text-white justify-center">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Bet Types</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Match Winner: Predict the winner of a match</li>
                      <li>Over/Under: Bet on total points/goals scored</li>
                      <li>Handicap: Betting with point spreads</li>
                      <li>Live Betting: Place bets during ongoing matches</li>
                      <li>Accumulator: Combine multiple bets for higher odds</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Betting Limits</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Minimum bet: ₹50 per selection</li>
                      <li>Maximum bet varies by sport and market</li>
                      <li>Daily betting limit: ₹50,000 per account</li>
                      <li>Accumulator maximum: 20 selections</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Settlement Rules</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Bets are settled based on official results</li>
                      <li>Abandoned matches are voided unless otherwise stated</li>
                      <li>Live bets are settled based on the score at bet placement</li>
                      <li>Dead heat rules apply where applicable</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="multiplayer" className="space-y-6">
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-400" />
                  Multiplayer Game Rules
                </h3>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Room Creation</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Players can create private or public rooms</li>
                      <li>Room creators set entry fees and prize distribution</li>
                      <li>Maximum 8 players per room (varies by game)</li>
                      <li>Rooms auto-start when minimum players join</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Gameplay</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Turn-based or real-time gameplay depending on game type</li>
                      <li>30-second time limit per turn (where applicable)</li>
                      <li>Disconnected players are automatically eliminated</li>
                      <li>Chat features available with moderation</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Scoring and Ranking</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Points awarded based on performance and placement</li>
                      <li>Leaderboards updated in real-time</li>
                      <li>Seasonal rankings with special rewards</li>
                      <li>ELO rating system for competitive play</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Conduct Rules</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Respectful communication required at all times</li>
                      <li>No harassment, abuse, or discriminatory language</li>
                      <li>Sharing personal information is prohibited</li>
                      <li>Violations result in warnings, mutes, or bans</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Star className="h-4 w-4" />
            General Rules & Fair Play
          </h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• All games are monitored for fair play and compliance</li>
            <li>• Use of bots, scripts, or automated tools is strictly prohibited</li>
            <li>• Account sharing or multiple accounts per person are not allowed</li>
            <li>• AIEXCH reserves the right to void bets and confiscate winnings for rule violations</li>
            <li>• Disputes must be reported within 24 hours of the incident</li>
            <li>• Management decisions on rule interpretations are final</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </h4>
          <p className="text-gray-400 text-sm mb-3">
            If you have questions about game rules or need clarification, our support team is here to help.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Contact Support
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
