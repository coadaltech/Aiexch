"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"
import {
  Search,
  Bell,
  Trophy,
  Star,
  Play,
  Users,
  Zap,
  Crown,
  Gamepad2,
  TrendingUp,
  File as Fire,
  Gift,
  Wallet,
  Plus,
  ChevronRight,
  ChevronLeft,
  Heart,
  Share2,
  Filter,
  Grid3X3,
  List,
  Eye,
  Target,
  Sparkles,
  Gem,
  Coins,
  Rocket,
  Shield,
  CloudLightning as Lightning,
  Palette,
  X,
} from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { GameModal } from "@/components/game-modal"
import { NotificationPanel } from "@/components/notification-panel"
import { UserProfile } from "@/components/user-profile"
import { WalletModal } from "@/components/wallet-modal"
import { SettingsModal } from "@/components/settings-modal"
import { TournamentModal } from "@/components/tournament-modal"
import { StreamModal } from "@/components/stream-modal"
import { AuthModal } from "@/components/auth-modal"
import { WhiteLabelAdmin } from "@/components/white-label-admin"

const gameCategories = [
  { name: "All Games", icon: Grid3X3, count: 150, active: true },
  { name: "Trending", icon: TrendingUp, count: 24, active: false },
  { name: "New Releases", icon: Sparkles, count: 12, active: false },
  { name: "Action", icon: Zap, count: 45, active: false },
  { name: "Strategy", icon: Target, count: 32, active: false },
  { name: "Arcade", icon: Gamepad2, count: 28, active: false },
  { name: "Live Games", icon: Users, count: 16, active: false },
]

const featuredGames = [
  {
    id: 1,
    name: "Cyber Strike Elite",
    category: "Action",
    image: "/cyber-game.png",
    players: "2.4M",
    rating: 4.9,
    status: "live",
    prize: "$50K",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    description: "Ultimate cyberpunk battle royale with advanced AI opponents",
    minBet: 10,
    maxBet: 1000,
    duration: "45 min",
  },
  {
    id: 2,
    name: "Neon Racing",
    category: "Racing",
    image: "/neon-racing.png",
    players: "1.8M",
    rating: 4.8,
    status: "tournament",
    prize: "$25K",
    gradient: "from-pink-400 via-red-500 to-orange-500",
    description: "High-speed neon racing through futuristic cityscapes",
    minBet: 5,
    maxBet: 500,
    duration: "30 min",
  },
  {
    id: 3,
    name: "Space Conquest",
    category: "Strategy",
    image: "/space-game.png",
    players: "3.1M",
    rating: 4.9,
    status: "new",
    prize: "$75K",
    gradient: "from-purple-400 via-indigo-500 to-blue-600",
    description: "Build your galactic empire and conquer the universe",
    minBet: 20,
    maxBet: 2000,
    duration: "60 min",
  },
]

const casinoCategories = [
  {
    id: 1,
    name: "India Casino",
    image: "/cyber-game.png",
    games: 45,
    description: "Traditional Indian casino games",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 2,
    name: "Live Casino",
    image: "/neon-racing.png",
    games: 32,
    description: "Real dealers, real-time action",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    name: "Trending Casino",
    image: "/space-game.png",
    games: 28,
    description: "Most popular casino games",
    gradient: "from-purple-500 to-pink-600",
  },
]

const liveStreams = [
  { id: 1, streamer: "ProGamer_X", game: "Cyber Strike", viewers: "45.2K", thumbnail: "/stream1.png", isLive: true },
  { id: 2, streamer: "NeonQueen", game: "Racing Elite", viewers: "32.8K", thumbnail: "/stream2.png", isLive: true },
  { id: 3, streamer: "SpaceKing", game: "Galaxy Wars", viewers: "28.5K", thumbnail: "/stream3.png", isLive: true },
  { id: 4, streamer: "CrystalMaster", game: "Gem Hunter", viewers: "19.7K", thumbnail: "/stream4.png", isLive: false },
]

const liveEvents = [
  {
    id: 1,
    title: "Cyber Strike Championship",
    description: "Ultimate battle royale tournament with ₹10L prize pool",
    startTime: "2024-01-20T18:00:00Z",
    participants: 2847,
    prizePool: "₹10,00,000",
    status: "live",
    category: "Tournament",
    image: "/cyber-game.png",
    timeLeft: "2h 45m",
  },
  {
    id: 2,
    title: "Speed Racing League",
    description: "High-octane racing competition",
    startTime: "2024-01-20T20:00:00Z",
    participants: 1523,
    prizePool: "₹5,00,000",
    status: "starting_soon",
    category: "Racing",
    image: "/neon-racing.png",
    timeLeft: "45m",
  },
  {
    id: 3,
    title: "Space Conquest War",
    description: "Galactic strategy tournament",
    startTime: "2024-01-21T10:00:00Z",
    participants: 3421,
    prizePool: "₹15,00,000",
    status: "upcoming",
    category: "Strategy",
    image: "/space-game.png",
    timeLeft: "16h 30m",
  },
]

const trendingEvents = [
  {
    id: 1,
    title: "Lightning Dice Mania",
    description: "Quick dice games with instant rewards",
    participants: 15420,
    trend: "+245%",
    category: "Quick Game",
    multiplier: "x999",
    icon: Lightning,
  },
  {
    id: 2,
    title: "Crystal Mining Rush",
    description: "Dig for precious gems and win big",
    participants: 8934,
    trend: "+189%",
    category: "Adventure",
    multiplier: "x50",
    icon: Gem,
  },
  {
    id: 3,
    title: "Rocket Launch Challenge",
    description: "Time your rocket launch perfectly",
    participants: 12567,
    trend: "+156%",
    category: "Skill",
    multiplier: "x∞",
    icon: Rocket,
  },
  {
    id: 4,
    title: "Golden Coin Collector",
    description: "Collect coins in this endless runner",
    participants: 9876,
    trend: "+134%",
    category: "Arcade",
    multiplier: "x25",
    icon: Coins,
  },
]

const mostLikedGamesOld = [
  {
    id: 1,
    name: "Dragon Quest Elite",
    category: "Fantasy RPG",
    image: "/cyber-game.png",
    players: "1.2M",
    rating: 4.9,
    likes: "892K",
    likePercentage: 94,
    prize: "₹75K",
  },
  {
    id: 2,
    name: "Mystic Warriors",
    category: "Action Adventure",
    image: "/neon-racing.png",
    players: "856K",
    rating: 4.8,
    likes: "743K",
    likePercentage: 92,
    prize: "₹50K",
  },
  {
    id: 3,
    name: "Cyber Legends",
    category: "Sci-Fi Shooter",
    image: "/space-game.png",
    players: "2.1M",
    rating: 4.9,
    likes: "1.8M",
    likePercentage: 96,
    prize: "₹100K",
  },
  {
    id: 4,
    name: "Magic Realms",
    category: "Fantasy Strategy",
    image: "/cyber-game.png",
    players: "654K",
    rating: 4.7,
    likes: "589K",
    likePercentage: 89,
    prize: "₹40K",
  },
  {
    id: 5,
    name: "Neon Speedster",
    category: "Racing",
    image: "/neon-racing.png",
    players: "1.5M",
    rating: 4.8,
    likes: "1.2M",
    likePercentage: 91,
    prize: "₹60K",
  },
  {
    id: 6,
    name: "Galaxy Conquest",
    category: "Space Strategy",
    image: "/space-game.png",
    players: "987K",
    rating: 4.9,
    likes: "876K",
    likePercentage: 93,
    prize: "₹80K",
  },
  {
    id: 7,
    name: "Fire Storm Arena",
    category: "Battle Royale",
    image: "/cyber-game.png",
    players: "1.8M",
    rating: 4.8,
    likes: "1.5M",
    likePercentage: 95,
    prize: "₹90K",
  },
  {
    id: 8,
    name: "Crystal Legends",
    category: "Adventure RPG",
    image: "/neon-racing.png",
    players: "723K",
    rating: 4.7,
    likes: "645K",
    likePercentage: 88,
    prize: "₹55K",
  },
]

// Banner configurations
const bannerConfigs = [
  {
    id: "live-events",
    type: "live",
    title: "Live Events Now!",
    subtitle: "Join 50K+ Players in Real-Time Tournaments",
    description:
      "Experience the thrill of live gaming with massive prize pools up to ₹15L. Compete against players worldwide in real-time tournaments featuring your favorite games.",
    image: "/images/live-events-banner.png",
    gradient: "from-red-500/20 via-orange-500/20 to-yellow-500/20",
    borderColor: "border-red-500/30",
    icon: Trophy,
    iconColor: "text-red-400",
    buttonText: "Join Live Events",
    buttonGradient: "from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700",
    stats: [
      { label: "Live Events", value: "24" },
      { label: "Prize Pool", value: "₹30L+" },
      { label: "Players Online", value: "50K+" },
    ],
  },
  {
    id: "trending",
    type: "trending",
    title: "Trending Games 🔥",
    subtitle: "Hottest Games with 200%+ Growth",
    description:
      "Discover the most popular games right now! Join millions of players in trending games with incredible multipliers and instant rewards. Dont miss out on the action!",
    image: "/images/trending-banner.png",
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    borderColor: "border-green-500/30",
    icon: TrendingUp,
    iconColor: "text-green-400",
    buttonText: "Play Trending",
    buttonGradient: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    stats: [
      { label: "Growth Rate", value: "+245%" },
      { label: "Active Players", value: "2.4M" },
      { label: "Max Multiplier", value: "x999" },
    ],
  },
  {
    id: "bonus",
    type: "bonus",
    title: "Welcome Bonus!",
    subtitle: "Get ₹1,000 Free + 100% Match Bonus",
    description:
      "New to AIEXCH? Claim your exclusive welcome package! Get ₹1,000 free credits plus 100% match bonus on your first deposit. Start your gaming journey with extra rewards!",
    image: "/images/bonus-banner.png",
    gradient: "from-yellow-500/20 via-orange-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    icon: Gift,
    iconColor: "text-yellow-400",
    buttonText: "Claim Bonus",
    buttonGradient: "from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
    stats: [
      { label: "Free Credits", value: "₹1,000" },
      { label: "Match Bonus", value: "100%" },
      { label: "Valid For", value: "30 Days" },
    ],
  },
]

// Auto-rotating banner data
const banners = [
  {
    id: 1,
    title: "Live Cricket Championship",
    subtitle: "India vs Australia - Live Now!",
    image: "/images/live-events-banner.png",
    cta: "Bet Now",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 2,
    title: "Trending Games",
    subtitle: "Play the most popular games",
    image: "/images/trending-banner.png",
    cta: "Play Now",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    title: "Welcome Bonus",
    subtitle: "Get 100% bonus up to ₹10,000",
    image: "/images/bonus-banner.png",
    cta: "Claim Now",
    gradient: "from-green-500 to-emerald-600",
  },
]

// Most liked games with video backgrounds
const mostLikedGames = [
  {
    id: 1,
    title: "Dragon Quest",
    category: "Adventure",
    rating: 4.9,
    players: 2500,
    likes: 1250,
    video: "/videos/dragon-quest.mp4",
    image: "/cyber-game.png",
  },
  {
    id: 2,
    title: "Mystic Warriors",
    category: "Action",
    rating: 4.8,
    players: 1800,
    likes: 980,
    video: "/videos/mystic-warriors.mp4",
    image: "/neon-racing.png",
  },
  {
    id: 3,
    title: "Cyber Legends",
    category: "Sci-Fi",
    rating: 4.7,
    players: 2100,
    likes: 1100,
    video: "/videos/cyber-legends.mp4",
    image: "/space-game.png",
  },
  {
    id: 4,
    title: "Magic Realms",
    category: "Fantasy",
    rating: 4.6,
    players: 1600,
    likes: 850,
    video: "/videos/magic-realms.mp4",
    image: "/cyber-game.png",
  },
  {
    id: 5,
    title: "Neon Speedster",
    category: "Racing",
    rating: 4.5,
    players: 1400,
    likes: 720,
    video: "/videos/neon-speedster.mp4",
    image: "/neon-racing.png",
  },
  {
    id: 6,
    title: "Galaxy Conquest",
    category: "Strategy",
    rating: 4.8,
    players: 1900,
    likes: 950,
    video: "/videos/galaxy-conquest.mp4",
    image: "/space-game.png",
  },
]

// Casino games data
const casinoGames = [
  {
    id: 1,
    title: "India Casino",
    description: "Traditional Indian casino games with live dealers",
    image: "/golden-coins-rewards.png",
    gameCount: 150,
    category: "Traditional",
  },
  {
    id: 2,
    title: "Live Casino",
    description: "Real-time casino experience with professional dealers",
    image: "/live-gaming-table.png",
    gameCount: 85,
    category: "Live",
  },
  {
    id: 3,
    title: "Trending Casino",
    description: "Most popular casino games trending right now",
    image: "/placeholder-iifxi.png",
    gameCount: 120,
    category: "Trending",
  },
]

// Game providers data
const gameProviders = [
  { name: "Evolution Gaming", logo: "/placeholder.svg?height=60&width=120&text=Evolution", games: 150 },
  { name: "Pragmatic Play", logo: "/placeholder.svg?height=60&width=120&text=Pragmatic", games: 200 },
  { name: "NetEnt", logo: "/placeholder.svg?height=60&width=120&text=NetEnt", games: 180 },
  { name: "Microgaming", logo: "/placeholder.svg?height=60&width=120&text=Microgaming", games: 220 },
  { name: "Play'n GO", logo: "/placeholder.svg?height=60&width=120&text=PlaynGO", games: 160 },
  { name: "Red Tiger", logo: "/placeholder.svg?height=60&width=120&text=RedTiger", games: 140 },
]

export default function Component() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All Games")
  const [searchQuery, setSearchQuery] = useState("")
  const [balance, setBalance] = useState(25480.5)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showWhiteLabelAdmin, setShowWhiteLabelAdmin] = useState(false)
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
    {
      id: 3,
      title: "Friend Request",
      message: "ProGamer_X sent you a friend request",
      time: "3 hours ago",
      read: true,
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [selectedTournament, setSelectedTournament] = useState<any>(null)
  const [selectedStream, setSelectedStream] = useState<any>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [filterPrice, setFilterPrice] = useState([0, 1000])

  // Banner state
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [showBanner, setShowBanner] = useState(true)
  const [bannerAnimation, setBannerAnimation] = useState("animate-slide-in-right")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Banner rotation effect
  useEffect(() => {
    if (!isAuthenticated) return

    const bannerInterval = setInterval(() => {
      setBannerAnimation("animate-slide-out-left")

      setTimeout(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerConfigs.length)
        setBannerAnimation("animate-slide-in-right")
      }, 350)
    }, 4500) // Change banner every 5 seconds (2 seconds visible + 3 seconds transition)

    return () => clearInterval(bannerInterval)
  }, [isAuthenticated])

  // Check for existing session on component mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("aiexch_user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        // Validate the user data before setting it
        if (userData && userData.id && userData.name && userData.email) {
          setUser(userData)
          setIsAuthenticated(true)
          setBalance(userData.balance || 0)
        } else {
          // Invalid user data, clear it
          localStorage.removeItem("aiexch_user")
        }
      }
    } catch (error) {
      // If there's an error parsing the saved user data, clear it
      console.error("Error loading saved user:", error)
      localStorage.removeItem("aiexch_user")
    }
  }, [])

  const handleLoginSuccess = (userData: any) => {
    setUser(userData)
    setIsAuthenticated(true)
    setBalance(userData.balance)
    localStorage.setItem("aiexch_user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setBalance(0)
    setShowProfile(false) // Close profile modal
    setShowWallet(false) // Close any open modals
    setShowSettings(false)
    setShowNotifications(false)
    localStorage.removeItem("aiexch_user")

    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out. Please login again to continue.",
    })
  }

  const handleGameLaunch = (game: any) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      toast({
        title: "Login Required",
        description: "Please login to play games.",
        variant: "destructive",
      })
      return
    }
    setSelectedGame(game)
    toast({
      title: "Game Loading",
      description: `Launching ${game.name}...`,
    })
  }

  const handleTournamentJoin = (game: any) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      toast({
        title: "Login Required",
        description: "Please login to join tournaments.",
        variant: "destructive",
      })
      return
    }
    setSelectedTournament(game)
    toast({
      title: "Tournament",
      description: `Joining ${game.name} tournament...`,
    })
  }

  const handleStreamWatch = (stream: any) => {
    setSelectedStream(stream)
    toast({
      title: "Stream",
      description: `Watching ${stream.streamer}'s stream...`,
    })
  }

  const handleAddFunds = (amount: number) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
    setBalance((prev) => prev + amount)
    toast({
      title: "Funds Added",
      description: `₹${amount} added to your wallet successfully!`,
    })
  }

  const handleWithdraw = (amount: number) => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }
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

  const filteredGames = featuredGames.filter(
    (game) =>
      (selectedCategory === "All Games" || game.category === selectedCategory) &&
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      game.minBet >= filterPrice[0] &&
      game.minBet <= filterPrice[1],
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleBannerAction = (bannerType: string) => {
    switch (bannerType) {
      case "live":
        toast({
          title: "Live Events",
          description: "Loading live tournaments...",
        })
        break
      case "trending":
        setSelectedCategory("Trending")
        toast({
          title: "Trending Games",
          description: "Showing trending games...",
        })
        break
      case "bonus":
        setShowWallet(true)
        toast({
          title: "Welcome Bonus",
          description: "Opening wallet to claim your bonus...",
        })
        break
    }
  }

  // If not authenticated, show landing page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AIEXCH
              </h1>
              <p className="text-gray-400">Gaming Exchange</p>
            </div>
          </div>

          {/* Hero Content */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The Future of
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Gaming{" "}
              </span>
              is Here
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of players in the ultimate gaming experience. Compete in tournaments, win prizes, and become
              a legend in the world of competitive gaming.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Win Big Prizes</h3>
                <p className="text-gray-400">Compete for millions in prize pools across various tournaments</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Secure Platform</h3>
                <p className="text-gray-400">Advanced security measures to protect your account and earnings</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Global Community</h3>
                <p className="text-gray-400">Connect with players from around the world</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-lg px-8 py-6"
                onClick={() => setShowAuthModal(true)}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Playing Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
                onClick={() => setShowAuthModal(true)}
              >
                <Gift className="h-5 w-5 mr-2" />
                Get ₹1,000 Bonus
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 text-lg px-8 py-6 bg-transparent"
                onClick={() => setShowWhiteLabelAdmin(true)}
              >
                <Palette className="h-5 w-5 mr-2" />
                White Label Demo
              </Button> */}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-bold text-cyan-400">2.4M+</div>
              <div className="text-gray-400">Active Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">₹2.5Cr</div>
              <div className="text-gray-400">Prize Pool</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">156</div>
              <div className="text-gray-400">Games Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">24/7</div>
              <div className="text-gray-400">Live Support</div>
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} onLoginSuccess={handleLoginSuccess} />

        {/* White Label Admin Modal */}
        <WhiteLabelAdmin
          open={showWhiteLabelAdmin}
          onOpenChange={setShowWhiteLabelAdmin}
          onConfigSave={(config) => {
            toast({
              title: "Demo Configuration Saved",
              description: "White-label demo configuration has been saved!",
            })
          }}
        />
      </div>
    )
  }

  const currentBanner = bannerConfigs[currentBannerIndex]

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex w-full">
        {/* Main Sidebar */}
        <AppSidebar balance={balance} user={user} onLogout={handleLogout} />

        {/* Main Content Area */}
        <SidebarInset className="flex-1 min-w-0 relative">
          {/* Animated Background - Fixed positioning */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
            <div className="flex flex-wrap items-center justify-between h-16 px-4 lg:px-6">
              {/* Left Section: Logo & Sidebar */}
              <div className="flex items-center gap-3 min-w-0">
                <SidebarTrigger className="text-white sm:block" />

                {/* Logo */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                </div>

                {/* Brand Name (hidden on very small screens) */}
                <div className="hidden sm:block min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    AIEXCH
                  </h1>
                  <p className="text-xs text-gray-400">Gaming Exchange</p>
                </div>
              </div>

              {/* Search (full width on tablet, hidden on mobile) */}
              <div className="order-3 w-full mt-2 sm:mt-0 sm:order-2 sm:w-auto lg:flex items-center flex-1 max-w-md mx-0 sm:mx-6 hidden">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search games, tournaments..."
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-400/50 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2 sm:gap-4 order-2 sm:order-3">
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
                  <Wallet className="h-4 w-4" />
                </Button>

                {/* White Label */}
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 bg-transparent"
                  onClick={() => setShowWhiteLabelAdmin(true)}
                >
                  <Palette className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">White Label</span>
                </Button> */}

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

          {/* Floating Auto-Rotating Banners */}
          {showBanner && (
            <div className="relative z-50 mx-4 mt-4">
              <div className={`${bannerAnimation} transition-all duration-300`}>
                <div
                  className={`bg-gradient-to-r ${currentBanner.gradient} border ${currentBanner.borderColor} rounded-xl backdrop-blur-sm overflow-hidden shadow-2xl`}
                >
                  <div className="flex items-center p-4 lg:p-6">
                    {/* Banner Image */}
                    <div className="hidden md:block w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0 mr-6">
                      <img
                        src={currentBanner.image || "/placeholder.svg"}
                        alt={currentBanner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Banner Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          {/* Title and Icon */}
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-12 h-12 bg-gradient-to-r ${currentBanner.buttonGradient} rounded-full flex items-center justify-center animate-bounce`}
                            >
                              <currentBanner.icon className={`h-6 w-6 text-white`} />
                            </div>
                            <div>
                              <h3 className="text-xl lg:text-2xl font-bold text-white">{currentBanner.title}</h3>
                              <p className="text-sm lg:text-base text-gray-200">{currentBanner.subtitle}</p>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm lg:text-base text-gray-300 mb-4 line-clamp-2 lg:line-clamp-none">
                            {currentBanner.description}
                          </p>

                          {/* Stats */}
                          <div className="flex flex-wrap gap-4 mb-4">
                            {currentBanner.stats.map((stat, index) => (
                              <div key={index} className="text-center">
                                <div className="text-lg lg:text-xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-gray-400">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Close Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white flex-shrink-0 ml-2"
                          onClick={() => setShowBanner(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <Button
                          className={`bg-gradient-to-r ${currentBanner.buttonGradient} text-white font-bold px-6 py-2 lg:px-8 lg:py-3`}
                          onClick={() => handleBannerAction(currentBanner.type)}
                        >
                          {currentBanner.buttonText}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>

                        {/* Banner Indicators */}
                        <div className="flex gap-2">
                          {bannerConfigs.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentBannerIndex ? "bg-white" : "bg-white/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Search Bar */}
          <div className="lg:hidden relative z-40 p-4 bg-black/10 backdrop-blur-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search games, tournaments..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="relative z-10 p-4 lg:p-8 space-y-8 max-w-full overflow-hidden">
            {/* Welcome Message */}
            {user && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user.name}! 🎮</h2>
                <p className="text-gray-300">
                  Ready to dominate the leaderboards? You have {user.gamesPlayed} games played and {user.tournamentsWon}{" "}
                  tournaments won!
                </p>
              </div>
            )}

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Users className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-1xl font-bold text-white">2.4M</p>
                      <p className="text-xs text-gray-400">Active Players</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Trophy className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-1xl font-bold text-white">₹2.5Cr</p>
                      <p className="text-xs text-gray-400">Prize Pool</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Zap className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-1xl font-bold text-white">156</p>
                      <p className="text-xs text-gray-400">Live Games</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500/10 to-red-600/10 border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Fire className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-1xl font-bold text-white">24h</p>
                      <p className="text-xs text-gray-400">Tournament</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-3xl font-bold text-white">Live Events</h2>
                  <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                </div>
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {liveEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-red-400/50 transition-all duration-500 overflow-hidden card-hover cursor-pointer"
                    onClick={() => handleTournamentJoin(event)}
                  >
                    <div className="relative">
                      <div className="h-40 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={`${
                              event.status === "live"
                                ? "bg-red-500 animate-pulse"
                                : event.status === "starting_soon"
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                            } text-white`}
                          >
                            {event.status === "live" && (
                              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                            )}
                            {event.status === "live"
                              ? "LIVE"
                              : event.status === "starting_soon"
                                ? "STARTING SOON"
                                : "UPCOMING"}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-sm text-white font-bold">
                          {event.timeLeft}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span className="text-sm font-medium">{event.participants.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm font-bold">{event.prizePool}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                          <p className="text-gray-400 text-sm">{event.description}</p>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 group-hover:scale-105 transition-transform duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleTournamentJoin(event)
                          }}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {event.status === "live" ? "Join Now" : "Register"}
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Trending Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                  <h2 className="text-3xl font-bold text-white">Trending Now</h2>
                  <Badge className="bg-green-500 text-white">HOT</Badge>
                </div>
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 cursor-pointer card-hover"
                    onClick={() => handleGameLaunch(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <event.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-sm">{event.trend}</div>
                          <div className="text-xs text-gray-400">growth</div>
                        </div>
                      </div>
                      <h3 className="text-white font-bold mb-1">{event.title}</h3>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Users className="h-3 w-3" />
                          <span>{event.participants.toLocaleString()}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {event.multiplier}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Most Liked Games */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-pink-400" />
                  <h2 className="text-3xl font-bold text-white">Most Liked Games</h2>
                  <Badge className="bg-pink-500 text-white">❤️ LOVED</Badge>
                </div>
              </div>

              <div className="relative">
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10"
                  onClick={() => {
                    const container = document.getElementById("most-liked-scroll")
                    if (container) {
                      container.scrollBy({ left: -250, behavior: "smooth" })
                    }
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10"
                  onClick={() => {
                    const container = document.getElementById("most-liked-scroll")
                    if (container) {
                      container.scrollBy({ left: 250, behavior: "smooth" })
                    }
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Horizontal Scrollable Container */}
                <div
                  id="most-liked-scroll"
                  className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-4 px-12"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {mostLikedGamesOld.map((game, index) => (
                    <Card
                      key={index}
                      className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-pink-400/50 transition-all duration-300 cursor-pointer card-hover flex-shrink-0 w-64"
                      onClick={() => handleGameLaunch(game)}
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        {/* Animated GIF-like Image */}
                        <div className="h-32 relative overflow-hidden">
                          <div className="w-full h-full relative">
                            {/* Animated background with pulsing effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse"></div>

                            {/* Main game image with animation */}
                            <img
                              src={game.image || "/placeholder.svg"}
                              alt={game.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 animate-pulse"
                            />

                            {/* Animated overlay effects */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Floating particles effect */}
                            <div className="absolute top-2 left-2 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                            <div className="absolute top-4 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                          </div>

                          {/* Live Badge */}
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-pink-500 text-white animate-pulse text-xs">
                              <Heart className="w-2 h-2 mr-1 fill-current" />
                              LOVED
                            </Badge>
                          </div>

                          {/* Like Count */}
                          <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1">
                            <Heart className="w-3 h-3 text-pink-400 fill-current" />
                            {game.likes}
                          </div>

                          {/* Bottom Info */}
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="flex items-center justify-between text-white text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{game.players}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span>{game.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-3">
                          <div className="mb-2">
                            <h3 className="text-sm font-bold text-white mb-1 truncate">{game.name}</h3>
                            <p className="text-gray-400 text-xs truncate">{game.category}</p>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1 text-xs text-pink-400">
                              <Heart className="h-3 w-3 fill-current" />
                              <span>{game.likePercentage}%</span>
                            </div>
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              {game.prize}
                            </Badge>
                          </div>

                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 group-hover:scale-105 transition-transform duration-300 text-xs py-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleGameLaunch(game)
                            }}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Play Now
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
                <div className="flex gap-2 pb-2 lg:pb-0">
                  {gameCategories.slice(0, 5).map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.name)}
                      className={`${selectedCategory === category.name ? "bg-cyan-500 hover:bg-cyan-600" : ""} whitespace-nowrap flex-shrink-0`}
                    >
                      <category.icon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto lg:ml-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700 w-[95vw] max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-white">Filter Games</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-white mb-2 block">Price Range</label>
                        <Slider
                          value={filterPrice}
                          onValueChange={setFilterPrice}
                          max={1000}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                          <span>₹{filterPrice[0]}</span>
                          <span>₹{filterPrice[1]}</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Games */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Featured Tournaments</h2>
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div
                className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredGames.map((game) => (
                  <Card
                    key={game.id}
                    className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500 overflow-hidden card-hover"
                  >
                    <div className="relative">
                      <div className={`h-48 bg-gradient-to-br ${game.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={`${game.status === "live" ? "bg-red-500" : game.status === "tournament" ? "bg-purple-500" : "bg-green-500"} text-white`}
                          >
                            {game.status === "live" && (
                              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                            )}
                            {game.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/20 hover:bg-black/40">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 bg-black/20 hover:bg-black/40">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span className="text-sm font-medium">{game.players}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm font-bold">{game.prize}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                            <p className="text-gray-400 text-sm">{game.category}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-white">{game.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 group-hover:scale-105 transition-transform duration-300"
                            onClick={() => handleTournamentJoin(game)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Join Tournament
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleGameLaunch(game)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Casino Games */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Casino Games</h2>
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {casinoCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 cursor-pointer card-hover overflow-hidden"
                    onClick={() => handleGameLaunch(category)}
                  >
                    <div className="relative">
                      <div className={`h-48 bg-gradient-to-br ${category.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>

                        {/* Category Image */}
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Game Count Badge */}
                        <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm font-bold">
                          {category.games} Games
                        </div>

                        {/* Category Info */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                          <p className="text-gray-200 text-sm mb-3">{category.description}</p>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 group-hover:scale-105 transition-transform duration-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleGameLaunch(category)
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Play Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Live Streams */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Live Streams</h2>
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {liveStreams.map((stream) => (
                  <Card
                    key={stream.id}
                    className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-red-400/50 transition-all duration-300 cursor-pointer overflow-hidden card-hover"
                    onClick={() => handleStreamWatch(stream)}
                  >
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-br from-red-500 to-pink-600 relative">
                        <div className="absolute top-2 left-2">
                          <Badge className={`${stream.isLive ? "bg-red-500" : "bg-gray-500"} text-white text-xs`}>
                            {stream.isLive && <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>}
                            {stream.isLive ? "LIVE" : "OFFLINE"}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                          <Eye className="h-3 w-3 inline mr-1" />
                          {stream.viewers}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-white text-sm mb-1 truncate">{stream.streamer}</h3>
                        <p className="text-xs text-gray-400 truncate">{stream.game}</p>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Games Provider */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Games Provider</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-2">
                {liveStreams.map((stream) => (
                  <Card
                    key={stream.id}
                    className="group bg-gradient-to-br from-pink-600 to-red-500 border border-pink-400/30 
                            hover:border-white/40 transition-all duration-300 cursor-pointer 
                            overflow-hidden rounded-lg shadow-md hover:shadow-pink-500/40 
                            w-32 h-20 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      {/* Streamer/Game Info */}
                      <CardContent className="absolute bottom-1 px-1 text-center">
                        <h3 className="font-semibold text-white text-xs truncate max-w-[100px]">SPRIBE</h3>
                        {/* <p className="text-[10px] text-darkpink-100 truncate">{stream.game}</p> */}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-[#111] text-white mt-10">
              {/* Logo + Support Section */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 py-6 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  {/* Logo Image */}
                  <div className="flex items-center gap-2">
                    <img
                      src="/aiexch-logo.png" // yaha apna logo image dalna (jo aapne bheja)
                      alt="AIEXCH Logo"
                      className="w-10 h-10 rounded-lg"
                    />
                    <div className="text-left">
                      <h2 className="text-lg font-bold text-white">AIEXCH</h2>
                      <p className="text-sm text-blue-200">Gaming Exchange</p>
                    </div>
                  </div>

                  <h2 className="text-base font-semibold mt-3">
                    Need help? Our 24/7 support team is here for you anytime!
                  </h2>
                  <div className="flex justify-center gap-4 mt-2">
                    <a href="#" className="hover:text-gray-300">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      <i className="fab fa-telegram-plane"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6 items-center border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <img src="/secure.png" alt="Secure SSL" className="w-20 h-auto" />
                  <div>
                    <h3 className="font-bold text-lg text-blue-300">100% Safe</h3>
                    <p className="text-sm text-gray-300">
                      Your data is safe with encrypted protection. Enjoy a secure and private connection.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end gap-4">
                  <img src="/gamcare.png" alt="GamCare" className="w-14 h-14" />
                  <img src="/18plus.png" alt="18+" className="w-14 h-14" />
                </div>
              </div>

              {/* Description */}
              <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-center md:text-left text-gray-400">
                <p>
                  AIEXCH offers a smooth and secure platform dedicated to skill-based competition, with a variety of
                  trusted payment options. Whether you're engaging in casino challenges or sports strategy contests, our
                  platform ensures quick and hassle-free transactions. Enjoy the convenience of seamless deposits and
                  withdrawals, so you can focus on honing your skills and outsmarting your opponents.
                </p>
              </div>

              {/* Copyright */}
              <div className="text-center py-4 text-xs border-t border-gray-700 text-gray-500">
                <p>© Copyright 2024. All Rights Reserved. Powered by AIEXCH.</p>
                <p className="mt-1">RULES &amp; REGULATIONS © 2025</p>
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>

      {/* All Modals */}
      <NotificationPanel
        open={showNotifications}
        onOpenChange={setShowNotifications}
        notifications={notifications}
        onMarkRead={markNotificationRead}
      />

      <UserProfile open={showProfile} onOpenChange={setShowProfile} balance={balance} user={user} />

      <WalletModal open={showWallet} on balance={balance} user={user} />

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
        soundEnabled={soundEnabled}
        onSoundToggle={setSoundEnabled}
      />

      {selectedGame && (
        <GameModal game={selectedGame} open={!!selectedGame} onOpenChange={() => setSelectedGame(null)} />
      )}

      {selectedTournament && (
        <TournamentModal
          tournament={selectedTournament}
          open={!!selectedTournament}
          onOpenChange={() => setSelectedTournament(null)}
        />
      )}

      {selectedStream && (
        <StreamModal stream={selectedStream} open={!!selectedStream} onOpenChange={() => setSelectedStream(null)} />
      )}

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} onLoginSuccess={handleLoginSuccess} />

      <WhiteLabelAdmin
        open={showWhiteLabelAdmin}
        onOpenChange={setShowWhiteLabelAdmin}
        onConfigSave={(config) => {
          toast({
            title: "Configuration Saved",
            description: "White-label configuration has been saved successfully!",
          })
        }}
      />
    </SidebarProvider>
  )
}
