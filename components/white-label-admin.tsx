"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import {
  Palette,
  Upload,
  Download,
  Eye,
  Settings,
  Globe,
  Crown,
  Zap,
  Save,
  RefreshCw,
  Paintbrush,
  ImageIcon,
  Layout,
  Tablet,
} from "lucide-react"

interface WhiteLabelConfig {
  branding: {
    platformName: string
    tagline: string
    logo: string
    favicon: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    theme: string
  }
  features: {
    sportsEnabled: boolean
    casinoEnabled: boolean
    liveStreamingEnabled: boolean
    tournamentEnabled: boolean
    walletEnabled: boolean
    socialLoginEnabled: boolean
  }
  customization: {
    welcomeBonus: number
    currency: string
    language: string
    timezone: string
    supportEmail: string
    supportPhone: string
  }
  domain: {
    subdomain: string
    customDomain: string
    sslEnabled: boolean
  }
}

interface WhiteLabelAdminProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfigSave: (config: WhiteLabelConfig) => void
}

const themes = [
  {
    name: "Cyber Neon",
    id: "cyber",
    primary: "#00ffff",
    secondary: "#ff00ff",
    accent: "#ffff00",
    preview: "from-cyan-500 to-purple-600",
    description: "Futuristic cyberpunk theme with neon colors",
  },
  {
    name: "Royal Gold",
    id: "royal",
    primary: "#ffd700",
    secondary: "#8b4513",
    accent: "#ff6347",
    preview: "from-yellow-500 to-orange-600",
    description: "Luxurious golden theme for premium feel",
  },
  {
    name: "Ocean Blue",
    id: "ocean",
    primary: "#0066cc",
    secondary: "#004499",
    accent: "#00ccff",
    preview: "from-blue-500 to-cyan-600",
    description: "Professional blue theme for corporate look",
  },
  {
    name: "Forest Green",
    id: "forest",
    primary: "#228b22",
    secondary: "#006400",
    accent: "#32cd32",
    preview: "from-green-500 to-emerald-600",
    description: "Natural green theme for eco-friendly brands",
  },
  {
    name: "Sunset Orange",
    id: "sunset",
    primary: "#ff6600",
    secondary: "#cc3300",
    accent: "#ffcc00",
    preview: "from-orange-500 to-red-600",
    description: "Warm sunset colors for energetic brands",
  },
  {
    name: "Midnight Purple",
    id: "midnight",
    primary: "#6a0dad",
    secondary: "#4b0082",
    accent: "#9370db",
    preview: "from-purple-500 to-indigo-600",
    description: "Deep purple theme for mysterious appeal",
  },
]

const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
]

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "es", name: "Español (Spanish)" },
  { code: "fr", name: "Français (French)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "ru", name: "Русский (Russian)" },
  { code: "ja", name: "日本語 (Japanese)" },
  { code: "ko", name: "한국어 (Korean)" },
  { code: "ar", name: "العربية (Arabic)" },
]

export function WhiteLabelAdmin({ open, onOpenChange, onConfigSave }: WhiteLabelAdminProps) {
  const [config, setConfig] = useState<WhiteLabelConfig>({
    branding: {
      platformName: "AIEXCH",
      tagline: "Gaming Exchange",
      logo: "",
      favicon: "",
      primaryColor: "#00ffff",
      secondaryColor: "#ff00ff",
      accentColor: "#ffff00",
      theme: "cyber",
    },
    features: {
      sportsEnabled: true,
      casinoEnabled: true,
      liveStreamingEnabled: true,
      tournamentEnabled: true,
      walletEnabled: true,
      socialLoginEnabled: true,
    },
    customization: {
      welcomeBonus: 1000,
      currency: "INR",
      language: "en",
      timezone: "Asia/Kolkata",
      supportEmail: "support@aiexch.com",
      supportPhone: "+91-9876543210",
    },
    domain: {
      subdomain: "",
      customDomain: "",
      sslEnabled: true,
    },
  })

  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleThemeChange = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      setConfig((prev) => ({
        ...prev,
        branding: {
          ...prev.branding,
          theme: themeId,
          primaryColor: theme.primary,
          secondaryColor: theme.secondary,
          accentColor: theme.accent,
        },
      }))
    }
  }

  const handleSaveConfig = () => {
    onConfigSave(config)
    toast({
      title: "Configuration Saved",
      description: "White-label configuration has been saved successfully!",
    })
  }

  const handleGenerateDemo = async () => {
    setIsGenerating(true)
    // Simulate demo generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)

    toast({
      title: "Demo Generated",
      description: `Demo site created at ${config.domain.subdomain}.aiexch.com`,
    })
  }

  const handleExportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${config.branding.platformName.toLowerCase()}-config.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Config Exported",
      description: "Configuration file has been downloaded",
    })
  }

  const selectedTheme = themes.find((t) => t.id === config.branding.theme)
  const selectedCurrency = currencies.find((c) => c.code === config.customization.currency)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            White Label Configuration
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="domain">Domain</TabsTrigger>
              </TabsList>

              {/* Branding Tab */}
              <TabsContent value="branding" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Paintbrush className="h-5 w-5" />
                      Brand Identity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Platform Name</Label>
                        <Input
                          value={config.branding.platformName}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, platformName: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Your Platform Name"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Tagline</Label>
                        <Input
                          value={config.branding.tagline}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, tagline: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Your tagline"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Logo URL</Label>
                        <div className="flex gap-2">
                          <Input
                            value={config.branding.logo}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, logo: e.target.value },
                              }))
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="https://..."
                          />
                          <Button size="icon" variant="outline" className="border-gray-600 bg-transparent">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Favicon URL</Label>
                        <div className="flex gap-2">
                          <Input
                            value={config.branding.favicon}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, favicon: e.target.value },
                              }))
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="https://..."
                          />
                          <Button size="icon" variant="outline" className="border-gray-600 bg-transparent">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Theme Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            config.branding.theme === theme.id
                              ? "border-cyan-400 bg-cyan-400/10"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                          onClick={() => handleThemeChange(theme.id)}
                        >
                          <div className={`h-12 rounded-lg bg-gradient-to-r ${theme.preview} mb-3`}></div>
                          <h3 className="text-white font-semibold">{theme.name}</h3>
                          <p className="text-gray-400 text-sm">{theme.description}</p>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6 bg-gray-600" />

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white">Primary Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={config.branding.primaryColor}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, primaryColor: e.target.value },
                              }))
                            }
                            className="w-12 h-10 p-1 bg-gray-700 border-gray-600"
                          />
                          <Input
                            value={config.branding.primaryColor}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, primaryColor: e.target.value },
                              }))
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Secondary Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={config.branding.secondaryColor}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, secondaryColor: e.target.value },
                              }))
                            }
                            className="w-12 h-10 p-1 bg-gray-700 border-gray-600"
                          />
                          <Input
                            value={config.branding.secondaryColor}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, secondaryColor: e.target.value },
                              }))
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">Accent Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={config.branding.accentColor}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, accentColor: e.target.value },
                              }))
                            }
                            className="w-12 h-10 p-1 bg-gray-700 border-gray-600"
                          />
                          <Input
                            value={config.branding.accentColor}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, accentColor: e.target.value },
                              }))
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Platform Features
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Enable or disable features for your white-label platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Sports Betting</Label>
                          <p className="text-sm text-gray-400">Enable sports betting functionality</p>
                        </div>
                        <Switch
                          checked={config.features.sportsEnabled}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              features: { ...prev.features, sportsEnabled: checked },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Casino Games</Label>
                          <p className="text-sm text-gray-400">Enable casino and slot games</p>
                        </div>
                        <Switch
                          checked={config.features.casinoEnabled}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              features: { ...prev.features, casinoEnabled: checked },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Live Streaming</Label>
                          <p className="text-sm text-gray-400">Enable live game streaming</p>
                        </div>
                        <Switch
                          checked={config.features.liveStreamingEnabled}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              features: { ...prev.features, liveStreamingEnabled: checked },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Tournaments</Label>
                          <p className="text-sm text-gray-400">Enable tournament system</p>
                        </div>
                        <Switch
                          checked={config.features.tournamentEnabled}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              features: { ...prev.features, tournamentEnabled: checked },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Wallet System</Label>
                          <p className="text-sm text-gray-400">Enable wallet and payments</p>
                        </div>
                        <Switch
                          checked={config.features.walletEnabled}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              features: { ...prev.features, walletEnabled: checked },
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white">Social Login</Label>
                          <p className="text-sm text-gray-400">Enable Google/Facebook login</p>
                        </div>
                        <Switch
                          checked={config.features.socialLoginEnabled}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              features: { ...prev.features, socialLoginEnabled: checked },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Platform Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Welcome Bonus</Label>
                        <Input
                          type="number"
                          value={config.customization.welcomeBonus}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              customization: {
                                ...prev.customization,
                                welcomeBonus: Number.parseInt(e.target.value) || 0,
                              },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Currency</Label>
                        <Select
                          value={config.customization.currency}
                          onValueChange={(value) =>
                            setConfig((prev) => ({
                              ...prev,
                              customization: { ...prev.customization, currency: value },
                            }))
                          }
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            {currencies.map((currency) => (
                              <SelectItem key={currency.code} value={currency.code}>
                                {currency.symbol} {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Language</Label>
                        <Select
                          value={config.customization.language}
                          onValueChange={(value) =>
                            setConfig((prev) => ({
                              ...prev,
                              customization: { ...prev.customization, language: value },
                            }))
                          }
                        >
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            {languages.map((language) => (
                              <SelectItem key={language.code} value={language.code}>
                                {language.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">Timezone</Label>
                        <Input
                          value={config.customization.timezone}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              customization: { ...prev.customization, timezone: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Support Email</Label>
                        <Input
                          type="email"
                          value={config.customization.supportEmail}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              customization: { ...prev.customization, supportEmail: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">Support Phone</Label>
                        <Input
                          value={config.customization.supportPhone}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              customization: { ...prev.customization, supportPhone: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Domain Tab */}
              <TabsContent value="domain" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Domain Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white">Subdomain</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={config.domain.subdomain}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              domain: { ...prev.domain, subdomain: e.target.value },
                            }))
                          }
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="yoursite"
                        />
                        <span className="text-gray-400">.aiexch.com</span>
                      </div>
                      {config.domain.subdomain && (
                        <p className="text-sm text-cyan-400 mt-1">
                          Your site will be available at: {config.domain.subdomain}.aiexch.com
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-white">Custom Domain (Optional)</Label>
                      <Input
                        value={config.domain.customDomain}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            domain: { ...prev.domain, customDomain: e.target.value },
                          }))
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="yourdomain.com"
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        Point your domain's DNS to our servers for custom branding
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">SSL Certificate</Label>
                        <p className="text-sm text-gray-400">Enable HTTPS for secure connections</p>
                      </div>
                      <Switch
                        checked={config.domain.sslEnabled}
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({
                            ...prev,
                            domain: { ...prev.domain, sslEnabled: checked },
                          }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant={previewMode === "desktop" ? "default" : "ghost"}
                      onClick={() => setPreviewMode("desktop")}
                      className="h-8 w-8"
                    >
                      <Layout className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={previewMode === "tablet" ? "default" : "ghost"}
                      onClick={() => setPreviewMode("tablet")}
                      className="h-8 w-8"
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant={previewMode === "mobile" ? "default" : "ghost"}
                      onClick={() => setPreviewMode("mobile")}
                      className="h-8 w-8"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`
                  bg-gray-900 rounded-lg overflow-hidden border border-gray-600
                  ${previewMode === "desktop" ? "h-64" : previewMode === "tablet" ? "h-80 w-48 mx-auto" : "h-96 w-32 mx-auto"}
                `}
                >
                  {/* Preview Header */}
                  <div
                    className="h-12 flex items-center justify-between px-3"
                    style={{ backgroundColor: config.branding.primaryColor + "20" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ backgroundColor: config.branding.primaryColor }}
                      >
                        <Crown className="h-3 w-3 text-white" />
                      </div>
                      <div className="text-xs">
                        <div className="text-white font-semibold">{config.branding.platformName}</div>
                        <div className="text-gray-400 text-xs">{config.branding.tagline}</div>
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-3 space-y-2">
                    <div
                      className="h-16 rounded"
                      style={{
                        background: `linear-gradient(135deg, ${config.branding.primaryColor}40, ${config.branding.secondaryColor}40)`,
                      }}
                    ></div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="h-8 bg-gray-700 rounded"></div>
                      <div className="h-8 bg-gray-700 rounded"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Preview Footer */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-800 flex items-center justify-center">
                    <div className="text-xs text-gray-400">
                      {selectedCurrency?.symbol}
                      {config.customization.welcomeBonus} Welcome Bonus
                    </div>
                  </div>
                </div>

                {/* Theme Info */}
                {selectedTheme && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <h4 className="text-white font-semibold mb-1">{selectedTheme.name}</h4>
                    <p className="text-gray-400 text-sm">{selectedTheme.description}</p>
                    <div className="flex gap-2 mt-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: config.branding.primaryColor }}></div>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: config.branding.secondaryColor }}
                      ></div>
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: config.branding.accentColor }}></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportConfig} className="border-gray-600 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <Button variant="outline" className="border-gray-600 bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Import Config
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleGenerateDemo}
              disabled={isGenerating || !config.domain.subdomain}
              className="border-gray-600 bg-transparent"
            >
              {isGenerating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Eye className="h-4 w-4 mr-2" />}
              {isGenerating ? "Generating..." : "Generate Demo"}
            </Button>
            <Button onClick={handleSaveConfig} className="bg-gradient-to-r from-cyan-500 to-purple-600">
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
