"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Plus, Eye, Copy, Edit, Trash2, Globe, Users, DollarSign, Zap, BarChart3 } from "lucide-react"
import { WhiteLabelAdmin } from "./white-label-admin"

interface WhiteLabelSite {
  id: string
  name: string
  domain: string
  status: "active" | "inactive" | "pending"
  theme: string
  users: number
  revenue: number
  createdAt: string
  lastUpdated: string
  features: string[]
}

export function WhiteLabelDashboard() {
  const [sites, setSites] = useState<WhiteLabelSite[]>([
    {
      id: "1",
      name: "GameZone Pro",
      domain: "gamezone.aiexch.com",
      status: "active",
      theme: "Cyber Neon",
      users: 2450,
      revenue: 125000,
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      features: ["Sports", "Casino", "Tournaments", "Live Streaming"],
    },
    {
      id: "2",
      name: "Royal Casino",
      domain: "royalcasino.aiexch.com",
      status: "active",
      theme: "Royal Gold",
      users: 1890,
      revenue: 89000,
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-19",
      features: ["Casino", "Sports", "Wallet"],
    },
    {
      id: "3",
      name: "Ocean Sports",
      domain: "oceansports.aiexch.com",
      status: "pending",
      theme: "Ocean Blue",
      users: 0,
      revenue: 0,
      createdAt: "2024-01-22",
      lastUpdated: "2024-01-22",
      features: ["Sports", "Live Streaming"],
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSite, setSelectedSite] = useState<WhiteLabelSite | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  const totalUsers = sites.reduce((sum, site) => sum + site.users, 0)
  const totalRevenue = sites.reduce((sum, site) => sum + site.revenue, 0)
  const activeSites = sites.filter((site) => site.status === "active").length

  const handleCreateSite = (config: any) => {
    const newSite: WhiteLabelSite = {
      id: Date.now().toString(),
      name: config.branding.platformName,
      domain: `${config.domain.subdomain}.aiexch.com`,
      status: "pending",
      theme: config.branding.theme,
      users: 0,
      revenue: 0,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      features: Object.entries(config.features)
        .filter(([_, enabled]) => enabled)
        .map(([feature, _]) => feature.replace("Enabled", "")),
    }

    setSites((prev) => [...prev, newSite])
    setShowCreateModal(false)

    toast({
      title: "Site Created",
      description: `${newSite.name} has been created successfully!`,
    })
  }

  const handleEditSite = (config: any) => {
    if (selectedSite) {
      setSites((prev) =>
        prev.map((site) =>
          site.id === selectedSite.id
            ? {
                ...site,
                name: config.branding.platformName,
                domain: `${config.domain.subdomain}.aiexch.com`,
                theme: config.branding.theme,
                lastUpdated: new Date().toISOString().split("T")[0],
                features: Object.entries(config.features)
                  .filter(([_, enabled]) => enabled)
                  .map(([feature, _]) => feature.replace("Enabled", "")),
              }
            : site,
        ),
      )
      setShowEditModal(false)
      setSelectedSite(null)

      toast({
        title: "Site Updated",
        description: "Site configuration has been updated successfully!",
      })
    }
  }

  const handleDeleteSite = (siteId: string) => {
    setSites((prev) => prev.filter((site) => site.id !== siteId))
    toast({
      title: "Site Deleted",
      description: "Site has been deleted successfully!",
    })
  }

  const handleCopyDomain = (domain: string) => {
    navigator.clipboard.writeText(`https://${domain}`)
    toast({
      title: "Domain Copied",
      description: "Domain URL has been copied to clipboard!",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case "Cyber Neon":
        return "from-cyan-500 to-purple-600"
      case "Royal Gold":
        return "from-yellow-500 to-orange-600"
      case "Ocean Blue":
        return "from-blue-500 to-cyan-600"
      case "Forest Green":
        return "from-green-500 to-emerald-600"
      case "Sunset Orange":
        return "from-orange-500 to-red-600"
      case "Midnight Purple":
        return "from-purple-500 to-indigo-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">White Label Dashboard</h1>
            <p className="text-gray-400">Manage your white-label gaming platforms</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Site
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Sites</p>
                  <p className="text-3xl font-bold text-white">{sites.length}</p>
                </div>
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Globe className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Sites</p>
                  <p className="text-3xl font-bold text-white">{activeSites}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-3xl font-bold text-white">{totalUsers.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <Card
              key={site.id}
              className="bg-black/40 border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white text-lg truncate">{site.name}</CardTitle>
                    <CardDescription className="text-gray-400 flex items-center gap-2 mt-1">
                      <Globe className="h-3 w-3" />
                      {site.domain}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(site.status)} text-white`}>{site.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Theme Preview */}
                <div
                  className={`h-16 rounded-lg bg-gradient-to-r ${getThemeGradient(site.theme)} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-2 left-2 text-white text-sm font-medium">{site.theme}</div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {site.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Users</p>
                    <p className="text-white font-semibold">{site.users.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Revenue</p>
                    <p className="text-white font-semibold">₹{site.revenue.toLocaleString()}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() => window.open(`https://${site.domain}`, "_blank")}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() => handleCopyDomain(site.domain)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    onClick={() => {
                      setSelectedSite(site)
                      setShowEditModal(true)
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-700 bg-transparent"
                    onClick={() => handleDeleteSite(site.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                {/* Last Updated */}
                <p className="text-xs text-gray-500">Updated: {new Date(site.lastUpdated).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Section */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {((activeSites / sites.length) * 100).toFixed(1)}%
                </div>
                <p className="text-gray-400">Active Sites</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{(totalUsers / sites.length).toFixed(0)}</div>
                <p className="text-gray-400">Avg Users per Site</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  ₹{(totalRevenue / activeSites || 0).toFixed(0)}
                </div>
                <p className="text-gray-400">Avg Revenue per Site</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Site Modal */}
      <WhiteLabelAdmin open={showCreateModal} onOpenChange={setShowCreateModal} onConfigSave={handleCreateSite} />

      {/* Edit Site Modal */}
      <WhiteLabelAdmin open={showEditModal} onOpenChange={setShowEditModal} onConfigSave={handleEditSite} />
    </div>
  )
}
