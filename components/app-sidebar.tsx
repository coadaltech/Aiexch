

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { Badge } from "@/components/ui/badge"
// import {
//   Home,
//   Trophy,
//   Wallet,
//   Settings,
//   BarChart3,
//   History,
//   Award,
//   CreditCard,
//   FileText,
//   Shield,
//   HelpCircle,
//   ChevronRight,
//   Crown,
//   Users,
// } from "lucide-react"
// import { toast } from "@/hooks/use-toast"
// import { WalletModal } from "@/components/wallet-modal"
// import { MatchSchedule } from "@/components/match-schedule"

// // Generate sample matches for each sport
// const generateMatches = (sport: string) => {
//   const teams = {
//     cricket: [
//       ["England Lions", "Australia Kangaroos"],
//       ["India Tigers", "Pakistan Eagles"],
//       ["South Africa Proteas", "New Zealand Kiwis"],
//       ["West Indies Hurricanes", "Sri Lanka Elephants"],
//       ["Bangladesh Bears", "Afghanistan Wolves"],
//       ["Ireland Shamrocks", "Scotland Highlanders"],
//       ["Netherlands Orange", "Zimbabwe Eagles"],
//       ["Kenya Lions", "Uganda Cranes"],
//     ],
//     football: [
//       ["Manchester United", "Liverpool FC"],
//       ["Barcelona", "Real Madrid"],
//       ["Bayern Munich", "Borussia Dortmund"],
//       ["Juventus", "AC Milan"],
//       ["PSG", "Marseille"],
//       ["Chelsea", "Arsenal"],
//       ["Inter Milan", "AS Roma"],
//       ["Atletico Madrid", "Valencia"],
//     ],
//     tennis: [
//       ["Novak Djokovic", "Rafael Nadal"],
//       ["Roger Federer", "Andy Murray"],
//       ["Stefanos Tsitsipas", "Alexander Zverev"],
//       ["Daniil Medvedev", "Carlos Alcaraz"],
//       ["Serena Williams", "Naomi Osaka"],
//       ["Ashleigh Barty", "Simona Halep"],
//       ["Iga Swiatek", "Aryna Sabalenka"],
//       ["Coco Gauff", "Emma Raducanu"],
//     ],
//     basketball: [
//       ["Lakers", "Warriors"],
//       ["Celtics", "Heat"],
//       ["Nets", "76ers"],
//       ["Bucks", "Bulls"],
//       ["Clippers", "Suns"],
//       ["Nuggets", "Jazz"],
//       ["Mavericks", "Rockets"],
//       ["Knicks", "Hawks"],
//     ],
//   }

//   const leagues = {
//     cricket: ["ICC World Cup", "IPL 2024", "The Hundred", "Big Bash League", "Caribbean Premier League"],
//     football: ["Premier League", "Champions League", "La Liga", "Serie A", "Bundesliga"],
//     tennis: ["Wimbledon", "US Open", "French Open", "Australian Open", "ATP Masters"],
//     basketball: ["NBA Regular Season", "NBA Playoffs", "EuroLeague", "NCAA Tournament", "FIBA World Cup"],
//   }

//   const sportTeams = teams[sport as keyof typeof teams] || teams.cricket
//   const sportLeagues = leagues[sport as keyof typeof leagues] || leagues.cricket

//   return Array.from({ length: 12 }, (_, i) => ({
//     id: `${sport}-${i}`,
//     league: sportLeagues[i % sportLeagues.length],
//     team1: sportTeams[i % sportTeams.length][0],
//     team2: sportTeams[i % sportTeams.length][1],
//     date: i < 4 ? "Today" : `${25 + (i % 7)} Aug`,
//     time: `${(14 + i) % 24}:${(i * 15) % 60 < 10 ? "0" : ""}${(i * 15) % 60} PM`,
//     status: i < 4 ? "live" : i < 8 ? "today" : "upcoming",
//     odds: {
//       team1: {
//         value: Number((1.5 + Math.random() * 2).toFixed(2)),
//         volume: `${Math.floor(Math.random() * 100)}K`,
//       },
//       draw:
//         Math.random() > 0.5
//           ? {
//               value: Number((2.5 + Math.random() * 1.5).toFixed(2)),
//               volume: `${Math.floor(Math.random() * 50)}K`,
//             }
//           : undefined,
//       team2: {
//         value: Number((1.5 + Math.random() * 2).toFixed(2)),
//         volume: `${Math.floor(Math.random() * 100)}K`,
//       },
//     },
//     markets: ["P", "MO", "BM", "F", "O/U", "HT", "CS", "BTS"],
//   }))
// }

// // Sports data with leagues
// const sportsData = {
//   cricket: {
//     name: "Cricket",
//     icon: "🏏",
//     gradient: "from-red-500 to-orange-500",
//     leagues: [
//       "England / One-Day Cup, League 2, Women",
//       "Caribbean Premier League",
//       "International / ICC Cricket World Cup, Challenge League",
//       "The Hundred - Womens",
//       "Maharaja Trophy KSCA T20",
//     ],
//   },
//   football: {
//     name: "Football",
//     icon: "⚽",
//     gradient: "from-green-500 to-emerald-500",
//     leagues: ["Premier League", "Champions League", "La Liga", "Serie A", "Bundesliga"],
//   },
//   tennis: {
//     name: "Tennis",
//     icon: "🎾",
//     gradient: "from-yellow-500 to-orange-500",
//     leagues: ["Wimbledon", "US Open", "French Open", "Australian Open", "ATP Masters"],
//   },
//   kabaddi: {
//     name: "Kabaddi",
//     icon: "🤼",
//     gradient: "from-orange-500 to-red-500",
//     leagues: [
//       "Pro Kabaddi League",
//       "Kabaddi World Cup",
//       "Asian Kabaddi Championship",
//       "Junior Kabaddi League",
//       "Women's Kabaddi League",
//     ],
//   },
//   basketball: {
//     name: "Basketball",
//     icon: "🏀",
//     gradient: "from-purple-500 to-pink-500",
//     leagues: ["NBA", "EuroLeague", "NCAA Basketball", "FIBA World Cup", "NBA G League"],
//   },
//   baseball: {
//     name: "Baseball",
//     icon: "⚾",
//     gradient: "from-blue-500 to-cyan-500",
//     leagues: [
//       "Major League Baseball",
//       "World Baseball Classic",
//       "Japanese Professional Baseball",
//       "Korean Baseball Organization",
//       "Minor League Baseball",
//     ],
//   },
//   greyhound: {
//     name: "GreyHound",
//     icon: "🐕",
//     gradient: "from-gray-500 to-slate-500",
//     leagues: [
//       "Greyhound Derby",
//       "English Greyhound Derby",
//       "Irish Greyhound Derby",
//       "Australian Greyhound Derby",
//       "American Greyhound Track",
//     ],
//   },
//   horserace: {
//     name: "Horse Race",
//     icon: "🐎",
//     gradient: "from-amber-500 to-yellow-500",
//     leagues: ["Kentucky Derby", "Royal Ascot", "Melbourne Cup", "Dubai World Cup", "Breeders' Cup"],
//   },
//   volleyball: {
//     name: "Volleyball",
//     icon: "🏐",
//     gradient: "from-teal-500 to-green-500",
//     leagues: [
//       "FIVB Volleyball World Championship",
//       "Olympic Volleyball",
//       "CEV Champions League",
//       "NCAA Volleyball",
//       "Beach Volleyball World Tour",
//     ],
//   },
//   darts: {
//     name: "Darts",
//     icon: "🎯",
//     gradient: "from-red-500 to-pink-500",
//     leagues: ["PDC World Championship", "World Matchplay", "UK Open", "Premier League Darts", "World Grand Prix"],
//   },
//   futsal: {
//     name: "Futsal",
//     icon: "⚽",
//     gradient: "from-indigo-500 to-purple-500",
//     leagues: [
//       "FIFA Futsal World Cup",
//       "UEFA Futsal Championship",
//       "Copa América de Futsal",
//       "AFC Futsal Championship",
//       "Futsal Champions League",
//     ],
//   },
//   tabletennis: {
//     name: "Table Tennis",
//     icon: "🏓",
//     gradient: "from-pink-500 to-rose-500",
//     leagues: [
//       "ITTF World Championships",
//       "Olympic Table Tennis",
//       "World Table Tennis Championships",
//       "ITTF World Tour",
//       "European Table Tennis Championships",
//     ],
//   },
// }

// const mainNavItems = [
//   { title: "Dashboard", icon: Home, url: "/", isActive: true },
//   { title: "Live Games", icon: Trophy, url: "/live-games", badge: "24" },
//   { title: "Tournaments", icon: Users, url: "/tournaments", badge: "3" },
// ]

// const accountItems = [
//   { title: "Wallet", icon: Wallet, url: "#" },
//   { title: "Promotions", icon: Trophy, url: "/promotions" },
//   { title: "My Bets", icon: BarChart3, url: "/my-bets" },
//   { title: "Profit & Loss", icon: History, url: "/profit-loss" },
//   { title: "Turnover History", icon: History, url: "/turnover-history" },
//   { title: "Account Statement", icon: FileText, url: "/account-statement" },
//   { title: "Commission Report", icon: Award, url: "/commission-report" },
//   { title: "Bonus Statement", icon: Trophy, url: "/bonus-statement" },
//   { title: "Transaction History", icon: CreditCard, url: "/transactions" },
// ]

// const supportItems = [
//   { title: "Stake Settings", icon: Settings, url: "/stake-settings" },
//   { title: "Security", icon: Shield, url: "/security" },
//   { title: "Terms & Policy", icon: FileText, url: "/terms-policy" },
//   { title: "Game Rules", icon: HelpCircle, url: "/game-rules" },
//   { title: "Help & Support", icon: HelpCircle, url: "/support" },
// ]

// interface AppSidebarProps {
//   balance: number
//   user?: any
//   onLogout?: () => void
// }

// export function AppSidebar({ balance, user, onLogout, ...props }: AppSidebarProps) {
//   const router = useRouter()
//   const [showWallet, setShowWallet] = useState(false)
//   const [selectedSport, setSelectedSport] = useState<string | null>(null)
//   const [showMatchSchedule, setShowMatchSchedule] = useState(false)

//   const handleAddFunds = (amount: number) => {
//     toast({ title: "Funds Added", description: `₹${amount} added to your wallet successfully!` })
//   }

//   const handleWithdraw = (amount: number) => {
//     toast({ title: "Withdrawal Successful", description: `₹${amount} withdrawn successfully!` })
//   }

//   const handleNavClick = (url: string, title: string) => {
//     if (title === "Wallet") {
//       setShowWallet(true)
//     } else if (url !== "#") {
//       router.push(url)
//     } else {
//       toast({
//         title: `${title} Coming Soon`,
//         description: `${title} page is under development.`,
//       })
//     }
//   }

//   const handleSportClick = (sportKey: string, sportName: string) => {
//     setSelectedSport(sportKey)
//     setShowMatchSchedule(true)
//   }

//   return (
//     <>
//       <Sidebar collapsible="icon" className="border-r border-white/10 bg-gray-900" {...props}>
//         <SidebarHeader className="border-b border-white/10 p-4">
//           <div className="flex items-center gap-3">
//             <div className="relative flex-shrink-0">
//               <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
//                 <Crown className="h-5 w-5 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
//             </div>
//             <div className="group-data-[collapsible=icon]:hidden min-w-0">
//               <h1 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent truncate">
//                 AIEXCH
//               </h1>
//               <p className="text-xs text-gray-400 truncate">Gaming Exchange</p>
//             </div>
//           </div>
//         </SidebarHeader>

//         <SidebarContent className="bg-gray-900 overflow-y-auto">
//           {/* Main Navigation */}
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
//               Navigation
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {mainNavItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       onClick={() => router.push(item.url)}
//                       isActive={item.isActive}
//                       className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10 data-[active=true]:bg-cyan-500/20 data-[active=true]:text-cyan-400"
//                     >
//                       <item.icon className="h-4 w-4 flex-shrink-0" />
//                       <span className="truncate">{item.title}</span>
//                       {item.badge && (
//                         <Badge variant="secondary" className="ml-auto text-xs bg-cyan-500 text-white flex-shrink-0">
//                           {item.badge}
//                         </Badge>
//                       )}
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>

//           {/* Sports & Games Section */}
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
//               Sports & Games
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {Object.entries(sportsData).map(([key, sport]) => (
//                   <Collapsible key={key} asChild>
//                     <SidebarMenuItem>
//                       <CollapsibleTrigger asChild>
//                         <SidebarMenuButton
//                           className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10"
//                           onClick={() => handleSportClick(key, sport.name)}
//                         >
//                           <div
//                             className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${sport.gradient} flex items-center justify-center flex-shrink-0`}
//                           >
//                             <span className="text-xs">{sport.icon}</span>
//                           </div>
//                           <span className="text-sm font-medium truncate">{sport.name}</span>
//                           <ChevronRight className="h-3 w-3 ml-auto transition-transform group-data-[state=open]:rotate-90 flex-shrink-0" />
//                         </SidebarMenuButton>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent className="overflow-hidden">
//                         <SidebarMenuSub className="ml-6 border-l border-white/10 pl-4 space-y-1">
//                           {sport.leagues.map((league, index) => (
//                             <SidebarMenuSubItem key={index}>
//                               <SidebarMenuSubButton asChild>
//                                 <button
//                                   className="w-full text-left text-gray-400 hover:text-white text-xs py-1.5 px-2 rounded hover:bg-white/5 transition-colors truncate"
//                                   onClick={() => handleSportClick(key, sport.name)}
//                                 >
//                                   {league}
//                                 </button>
//                               </SidebarMenuSubButton>
//                             </SidebarMenuSubItem>
//                           ))}
//                         </SidebarMenuSub>
//                       </CollapsibleContent>
//                     </SidebarMenuItem>
//                   </Collapsible>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>

//           {/* Account Section */}
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
//               Account
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {accountItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       onClick={() => handleNavClick(item.url, item.title)}
//                       className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10"
//                     >
//                       <item.icon className="h-4 w-4 flex-shrink-0" />
//                       <span className="truncate">{item.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>

//           {/* Support Section */}
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
//               Support
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {supportItems.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       onClick={() => handleNavClick(item.url, item.title)}
//                       className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10"
//                     >
//                       <item.icon className="h-4 w-4 flex-shrink-0" />
//                       <span className="truncate">{item.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>

//         <SidebarFooter className="border-t border-white/10 p-2">
//           <div className="text-xs text-gray-500 text-center group-data-[collapsible=icon]:hidden">© 2024 AIEXCH</div>
//         </SidebarFooter>
//         <SidebarRail />
//       </Sidebar>

//       {/* Wallet Modal */}
//       <WalletModal
//         open={showWallet}
//         onOpenChange={setShowWallet}
//         balance={balance}
//         onAddFunds={handleAddFunds}
//         onWithdraw={handleWithdraw}
//       />

//       {/* Match Schedule Modal */}
//       {showMatchSchedule && selectedSport && (
//         <MatchSchedule
//           sport={sportsData[selectedSport as keyof typeof sportsData].name}
//           matches={generateMatches(selectedSport)}
//           onClose={() => {
//             setShowMatchSchedule(false)
//             setSelectedSport(null)
//           }}
//         />
//       )}
//     </>
//   )
// }



"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Trophy,
  Wallet,
  Settings,
  BarChart3,
  History,
  Award,
  CreditCard,
  FileText,
  Shield,
  HelpCircle,
  ChevronRight,
  Crown,
  Users,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { WalletModal } from "@/components/wallet-modal"

// Sports data with leagues
const sportsData = {
  cricket: {
    name: "Cricket",
    icon: "🏏",
    gradient: "from-red-500 to-orange-500",
    leagues: [
      "England / One-Day Cup, League 2, Women",
      "Caribbean Premier League",
      "International / ICC Cricket World Cup, Challenge League",
      "The Hundred - Womens",
      "Maharaja Trophy KSCA T20",
    ],
  },
  football: {
    name: "Football",
    icon: "⚽",
    gradient: "from-green-500 to-emerald-500",
    leagues: ["Premier League", "Champions League", "La Liga", "Serie A", "Bundesliga"],
  },
  tennis: {
    name: "Tennis",
    icon: "🎾",
    gradient: "from-yellow-500 to-orange-500",
    leagues: ["Wimbledon", "US Open", "French Open", "Australian Open", "ATP Masters"],
  },
  kabaddi: {
    name: "Kabaddi",
    icon: "🤼",
    gradient: "from-orange-500 to-red-500",
    leagues: [
      "Pro Kabaddi League",
      "Kabaddi World Cup",
      "Asian Kabaddi Championship",
      "Junior Kabaddi League",
      "Women's Kabaddi League",
    ],
  },
  basketball: {
    name: "Basketball",
    icon: "🏀",
    gradient: "from-purple-500 to-pink-500",
    leagues: ["NBA", "EuroLeague", "NCAA Basketball", "FIBA World Cup", "NBA G League"],
  },
  baseball: {
    name: "Baseball",
    icon: "⚾",
    gradient: "from-blue-500 to-cyan-500",
    leagues: [
      "Major League Baseball",
      "World Baseball Classic",
      "Japanese Professional Baseball",
      "Korean Baseball Organization",
      "Minor League Baseball",
    ],
  },
  greyhound: {
    name: "GreyHound",
    icon: "🐕",
    gradient: "from-gray-500 to-slate-500",
    leagues: [
      "Greyhound Derby",
      "English Greyhound Derby",
      "Irish Greyhound Derby",
      "Australian Greyhound Derby",
      "American Greyhound Track",
    ],
  },
  horserace: {
    name: "Horse Race",
    icon: "🐎",
    gradient: "from-amber-500 to-yellow-500",
    leagues: ["Kentucky Derby", "Royal Ascot", "Melbourne Cup", "Dubai World Cup", "Breeders' Cup"],
  },
  volleyball: {
    name: "Volleyball",
    icon: "🏐",
    gradient: "from-teal-500 to-green-500",
    leagues: [
      "FIVB Volleyball World Championship",
      "Olympic Volleyball",
      "CEV Champions League",
      "NCAA Volleyball",
      "Beach Volleyball World Tour",
    ],
  },
  darts: {
    name: "Darts",
    icon: "🎯",
    gradient: "from-red-500 to-pink-500",
    leagues: ["PDC World Championship", "World Matchplay", "UK Open", "Premier League Darts", "World Grand Prix"],
  },
  futsal: {
    name: "Futsal",
    icon: "⚽",
    gradient: "from-indigo-500 to-purple-500",
    leagues: [
      "FIFA Futsal World Cup",
      "UEFA Futsal Championship",
      "Copa América de Futsal",
      "AFC Futsal Championship",
      "Futsal Champions League",
    ],
  },
  tabletennis: {
    name: "Table Tennis",
    icon: "🏓",
    gradient: "from-pink-500 to-rose-500",
    leagues: [
      "ITTF World Championships",
      "Olympic Table Tennis",
      "World Table Tennis Championships",
      "ITTF World Tour",
      "European Table Tennis Championships",
    ],
  },
}

const mainNavItems = [
  { title: "Dashboard", icon: Home, url: "/", isActive: true },
  { title: "Live Games", icon: Trophy, url: "/live-games", badge: "24" },
  { title: "Tournaments", icon: Users, url: "/tournaments", badge: "3" },
]

const accountItems = [
  { title: "Wallet", icon: Wallet, url: "#" },
  { title: "Promotions", icon: Trophy, url: "/promotions" },
  { title: "My Bets", icon: BarChart3, url: "/my-bets" },
  { title: "Profit & Loss", icon: History, url: "/profit-loss" },
  { title: "Turnover History", icon: History, url: "/turnover-history" },
  { title: "Account Statement", icon: FileText, url: "/account-statement" },
  { title: "Commission Report", icon: Award, url: "/commission-report" },
  { title: "Bonus Statement", icon: Trophy, url: "/bonus-statement" },
  { title: "Transaction History", icon: CreditCard, url: "/transactions" },
]

const supportItems = [
  { title: "Stake Settings", icon: Settings, url: "/stake-settings" },
  { title: "Security", icon: Shield, url: "/security" },
  { title: "Terms & Policy", icon: FileText, url: "/terms-policy" },
  { title: "Game Rules", icon: HelpCircle, url: "/game-rules" },
  { title: "Help & Support", icon: HelpCircle, url: "/support" },
]

interface AppSidebarProps {
  balance: number
  user?: any
  onLogout?: () => void
}

export function AppSidebar({ balance, user, onLogout, ...props }: AppSidebarProps) {
  const router = useRouter()
  const [showWallet, setShowWallet] = useState(false)

  const handleAddFunds = (amount: number) => {
    toast({ title: "Funds Added", description: `₹${amount} added to your wallet successfully!` })
  }

  const handleWithdraw = (amount: number) => {
    toast({ title: "Withdrawal Successful", description: `₹${amount} withdrawn successfully!` })
  }

  const handleNavClick = (url: string, title: string) => {
    if (title === "Wallet") {
      setShowWallet(true)
    } else if (url !== "#") {
      router.push(url)
    } else {
      toast({
        title: `${title} Coming Soon`,
        description: `${title} page is under development.`,
      })
    }
  }

  const handleSportClick = (sportKey: string, sportName: string) => {
    router.push(`/matches/${sportKey}`)
  }

  const handleLeagueClick = (sportKey: string, league: string) => {
    router.push(`/matches/${sportKey}`)
    toast({
      title: league,
      description: `Loading ${league} matches...`,
    })
  }

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-white/10 bg-gray-900" {...props}>
        <SidebarHeader className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div className="group-data-[collapsible=icon]:hidden min-w-0">
              <h1 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent truncate">
                AIEXCH
              </h1>
              <p className="text-xs text-gray-400 truncate">Gaming Exchange</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-gray-900 overflow-y-auto">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => router.push(item.url)}
                      isActive={item.isActive}
                      className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10 data-[active=true]:bg-cyan-500/20 data-[active=true]:text-cyan-400"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs bg-cyan-500 text-white flex-shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Sports & Games Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
              Sports & Games
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.entries(sportsData).map(([key, sport]) => (
                  <Collapsible key={key} asChild>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10">
                          <div
                            className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${sport.gradient} flex items-center justify-center flex-shrink-0`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSportClick(key, sport.name)
                            }}
                          >
                            <span className="text-xs">{sport.icon}</span>
                          </div>
                          <span
                            className="text-sm font-medium truncate cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSportClick(key, sport.name)
                            }}
                          >
                            {sport.name}
                          </span>
                          <ChevronRight className="h-3 w-3 ml-auto transition-transform group-data-[state=open]:rotate-90 flex-shrink-0" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden">
                        <SidebarMenuSub className="ml-6 border-l border-white/10 pl-4 space-y-1">
                          {sport.leagues.map((league, index) => (
                            <SidebarMenuSubItem key={index}>
                              <SidebarMenuSubButton asChild>
                                <button
                                  className="w-full text-left text-gray-400 hover:text-white text-xs py-1.5 px-2 rounded hover:bg-white/5 transition-colors truncate"
                                  onClick={() => handleLeagueClick(key, league)}
                                >
                                  {league}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleNavClick(item.url, item.title)}
                      className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Support Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider px-2">
              Support
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleNavClick(item.url, item.title)}
                      className="group relative overflow-hidden text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-white/10 p-2">
          <div className="text-xs text-gray-500 text-center group-data-[collapsible=icon]:hidden">© 2024 AIEXCH</div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Wallet Modal */}
      <WalletModal
        open={showWallet}
        onOpenChange={setShowWallet}
        balance={balance}
        onAddFunds={handleAddFunds}
        onWithdraw={handleWithdraw}
      />
    </>
  )
}
