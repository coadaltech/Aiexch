"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Trophy, Target, Dices, Users, Clock } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"

const gameCategories = [
  {
    id: "sports",
    name: "Sports Betting",
    icon: Trophy,
    games: [
      {
        name: "Cricket",
        description: "Bet on cricket matches including Test, ODI, and T20 formats",
        rules: [
          "Bets are settled based on official match results",
          "Weather-affected matches follow official tournament rules",
          "Player performance bets require minimum overs/balls faced",
          "Dead heat rules apply for tied positions",
        ],
      },
      {
        name: "Football",
        description: "Football betting on leagues, tournaments, and individual matches",
        rules: [
          "Results are based on 90 minutes plus injury time",
          "Extra time and penalties count only if specified",
          "Abandoned matches are void unless 90% completed",
          "Player bets require player to start the match",
        ],
      },
    ],
  },
  {
    id: "casino",
    name: "Casino Games",
    icon: Dices,
    games: [
      {
        name: "Blackjack",
        description: "Classic card game where you aim to beat the dealer",
        rules: [
          "Goal is to get cards totaling closer to 21 than dealer without going over",
          "Aces count as 1 or 11, face cards count as 10",
          "Blackjack (21 with first two cards) pays 3:2",
          "Dealer must hit on 16 and stand on 17",
        ],
      },
      {
        name: "Roulette",
        description: "Spin the wheel and bet on where the ball will land",
        rules: [
          "European roulette has numbers 0-36 with house edge of 2.7%",
          "American roulette has 0 and 00 with house edge of 5.26%",
          "Inside bets: straight, split, street, corner, line",
          "Outside bets: red/black, odd/even, high/low, dozens, columns",
        ],
      },
    ],
  },
  {
    id: "live",
    name: "Live Games",
    icon: Users,
    games: [
      {
        name: "Live Dealer Blackjack",
        description: "Real-time blackjack with professional dealers",
        rules: [
          "Same rules as standard blackjack apply",
          "Betting time is limited (usually 15-20 seconds)",
          "Side bets may be available (Perfect Pairs, 21+3)",
          "Chat with dealer and other players is allowed",
        ],
      },
      {
        name: "Live Roulette",
        description: "Watch the wheel spin in real-time with live dealers",
        rules: [
          "European roulette rules apply",
          "Betting closes when dealer announces 'no more bets'",
          "Special bets like neighbors and orphans available",
          "Multiple camera angles show the action",
        ],
      },
    ],
  },
]

export default function GameRulesPage() {
  return (
    <LayoutWrapper 
      title="Game Rules" 
      subtitle="Complete guide to all games and betting rules"
      icon={HelpCircle}
    >
      <div className="p-4 lg:p-6 space-y-6">
        {/* General Rules */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5" />
              General Betting Rules
            </CardTitle>
            <CardDescription className="text-gray-400">
              Universal rules that apply to all games on our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Bet Acceptance</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>All bets are subject to acceptance by the platform</li>
                  <li>Bets may be rejected due to technical issues or rule violations</li>
                  <li>Confirmed bets cannot be cancelled once accepted</li>
                  <li>Stake limits apply to all bet types</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Settlement</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Bets are settled based on official results</li>
                  <li>Winnings are credited automatically after settlement</li>
                  <li>Disputed results are reviewed by our team</li>
                  <li>Settlement times vary by game type</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Odds Changes</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Odds may change based on market conditions</li>
                  <li>Your bet is settled at the odds when placed</li>
                  <li>Significant odds changes may require confirmation</li>
                  <li>Best odds guaranteed on selected markets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Void Bets</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Bets are void if events are cancelled or postponed</li>
                  <li>Stakes are returned for void bets</li>
                  <li>Partial voids may apply to combination bets</li>
                  <li>Technical issues may result in void bets</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Categories */}
        <Tabs defaultValue="sports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
            {gameCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-cyan-600">
                <category.icon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {gameCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-6">
                {category.games.map((game, index) => (
                  <Card key={index} className="bg-black/40 border-white/10">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <CardTitle className="text-white flex items-center gap-2">
                          <category.icon className="h-5 w-5" />
                          {game.name}
                        </CardTitle>
                        <Badge className="bg-cyan-600 text-white w-fit">{category.name}</Badge>
                      </div>
                      <CardDescription className="text-gray-400">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-semibold text-white mb-3">Game Rules:</h4>
                        <ul className="space-y-2 text-gray-300">
                          {game.rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span className="text-sm">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Additional Information */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Rule Updates</h4>
              <p className="text-blue-200 text-sm">
                Game rules may be updated from time to time. Users will be notified of significant changes. It is your
                responsibility to stay informed about current rules.
              </p>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">Disputes</h4>
              <p className="text-yellow-200 text-sm">
                If you have questions about game rules or bet settlements, contact our support team within 30 days of
                the event. All decisions by our team are final.
              </p>
            </div>

            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-semibold mb-2">Fair Play</h4>
              <p className="text-green-200 text-sm">
                We are committed to fair play and use certified random number generators for all games. Our platform
                is regularly audited for fairness and security.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  )
}
