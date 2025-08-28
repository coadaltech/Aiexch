"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Send,
  FileText,
  Shield,
  Settings,
  Gamepad2,
  CreditCard,
  Users,
  Headphones,
  Globe,
  Zap,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

const faqCategories = [
  {
    id: "account",
    name: "Account & Profile",
    icon: Users,
    count: 12,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "payments",
    name: "Payments & Withdrawals",
    icon: CreditCard,
    count: 18,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "games",
    name: "Games & Betting",
    icon: Gamepad2,
    count: 24,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "security",
    name: "Security & Privacy",
    icon: Shield,
    count: 8,
    color: "from-orange-500 to-red-600",
  },
  {
    id: "technical",
    name: "Technical Issues",
    icon: Settings,
    count: 15,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "general",
    name: "General Questions",
    icon: HelpCircle,
    count: 10,
    color: "from-gray-500 to-slate-600",
  },
]

const popularFAQs = [
  {
    id: 1,
    question: "How do I withdraw my winnings?",
    answer:
      "You can withdraw your winnings by going to the Wallet section and clicking on 'Withdraw'. Minimum withdrawal amount is ₹500 and processing takes 24-48 hours.",
    category: "payments",
    views: 1250,
  },
  {
    id: 2,
    question: "Is my personal information secure?",
    answer:
      "Yes, we use industry-standard encryption and security measures to protect your personal and financial information. All data is encrypted and stored securely.",
    category: "security",
    views: 980,
  },
  {
    id: 3,
    question: "How do I verify my account?",
    answer:
      "Account verification requires uploading a government-issued ID and proof of address. This process typically takes 24-48 hours to complete.",
    category: "account",
    views: 875,
  },
  {
    id: 4,
    question: "What games can I play?",
    answer:
      "We offer a wide variety of games including esports tournaments, sports betting, casino games, and skill-based competitions. All games are fair and regulated.",
    category: "games",
    views: 756,
  },
  {
    id: 5,
    question: "How do I contact customer support?",
    answer:
      "You can contact our 24/7 customer support via live chat, email at support@aiexch.com, or phone at +91-1234567890.",
    category: "general",
    views: 642,
  },
]



const contactMethods = [
  {
    method: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    responseTime: "< 2 minutes",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-600",
    action: "Start Chat",
  },
  {
    method: "Email Support",
    description: "Send us a detailed message",
    availability: "24/7",
    responseTime: "< 4 hours",
    icon: Mail,
    color: "from-blue-500 to-cyan-600",
    action: "Send Email",
  },
  {
    method: "Phone Support",
    description: "Speak directly with our team",
    availability: "9 AM - 9 PM",
    responseTime: "Immediate",
    icon: Phone,
    color: "from-purple-500 to-pink-600",
    action: "Call Now",
  },
  {
    method: "WhatsApp",
    description: "Chat with us on WhatsApp",
    availability: "24/7",
    responseTime: "< 5 minutes",
    icon: MessageCircle,
    color: "from-green-600 to-green-700",
    action: "Open WhatsApp",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFAQs = popularFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  

  const handleContactMethod = (method: string) => {
    toast({
      title: `${method} Support`,
      description: `Opening ${method.toLowerCase()} support...`,
    })
  }

  return (
    <LayoutWrapper title="Help & Support" subtitle="Get help and find answers to your questions" icon={HelpCircle}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ">
          <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                  <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">24/7</p>
                  <p className="text-xs text-gray-400">Support Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-600/10 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">&lt; 2 min</p>
                  <p className="text-xs text-gray-400">Avg Response</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">87</p>
                  <p className="text-xs text-gray-400">FAQ Articles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border-yellow-500/20 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-yellow-500/20 rounded-lg">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white">5</p>
                  <p className="text-xs text-gray-400">Languages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((contact) => (
            <Card
              key={contact.method}
              className="group bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 cursor-pointer card-hover"
              onClick={() => handleContactMethod(contact.method)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="text-center space-y-3">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <contact.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">{contact.method}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">{contact.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Available: {contact.availability}</p>
                      <p className="text-xs text-gray-500">Response: {contact.responseTime}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${contact.color} hover:opacity-90 text-xs sm:text-sm`}
                  >
                    {contact.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </LayoutWrapper>
  )
}
