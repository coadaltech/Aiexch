"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Clock, Users, Trophy, Star, ChevronRight } from 'lucide-react'

interface PromotionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const promotions = [
  {
    id: 1,
    title: "Welcome Bonus",
    description: "Get 100% bonus on your first deposit up to ₹10,000",
    type: "Deposit Bonus",
    validUntil: "Dec 31, 2024",
    minDeposit: "₹500",
    gradient: "from-green-500 to-emerald-600",
    icon: Gift,
    claimed: false
  },
  {
    id: 2,
    title: "Daily Login Reward",
    description: "Login daily and earn up to ₹500 bonus every day",
    type: "Daily Bonus",
    validUntil: "Ongoing",
    minDeposit: "No minimum",
    gradient: "from-blue-500 to-cyan-600",
    icon: Star,
    claimed: true
  },
  {
    id: 3,
    title: "Tournament Entry",
    description: "Free entry to premium tournaments worth ₹50,000",
    type: "Tournament",
    validUntil: "Jan 15, 2025",
    minDeposit: "₹1,000",
    gradient: "from-purple-500 to-pink-600",
    icon: Trophy,
    claimed: false
  },
  {
    id: 4,
    title: "Refer & Earn",
    description: "Earn ₹1,000 for every friend you refer who deposits ₹2,000",
    type: "Referral",
    validUntil: "Ongoing",
    minDeposit: "₹2,000",
    gradient: "from-orange-500 to-red-600",
    icon: Users,
    claimed: false
  }
]

export function PromotionsModal({ open, onOpenChange }: PromotionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <Gift className="h-6 w-6 text-cyan-400" />
            Promotions & Bonuses
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {promotions.map((promo) => (
            <Card key={promo.id} className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className={`w-full h-32 bg-gradient-to-r ${promo.gradient} rounded-lg flex items-center justify-center mb-4 relative`}>
                  <promo.icon className="h-12 w-12 text-white" />
                  {promo.claimed && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Claimed
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{promo.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {promo.type}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 text-sm">{promo.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>Valid until: {promo.validUntil}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span>Min deposit: {promo.minDeposit}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${promo.claimed ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700'}`}
                    disabled={promo.claimed}
                  >
                    {promo.claimed ? 'Already Claimed' : 'Claim Now'}
                    {!promo.claimed && <ChevronRight className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Terms & Conditions</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• All bonuses are subject to wagering requirements</li>
            <li>• Promotions cannot be combined unless specified</li>
            <li>• AIEXCH reserves the right to modify or cancel promotions</li>
            <li>• Players must be 18+ to participate</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
