"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Check } from 'lucide-react'
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface LanguageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    isDefault: true,
    isPopular: true
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    flag: "🇮🇳",
    isDefault: false,
    isPopular: true
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    isDefault: false,
    isPopular: true
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    isDefault: false,
    isPopular: false
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    isDefault: false,
    isPopular: false
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    isDefault: false,
    isPopular: true
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    isDefault: false,
    isPopular: false
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    isDefault: false,
    isPopular: false
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    isDefault: false,
    isPopular: false
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    isDefault: false,
    isPopular: true
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    isDefault: false,
    isPopular: false
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    isDefault: false,
    isPopular: true
  }
]

export function LanguageModal({ open, onOpenChange }: LanguageModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    const language = languages.find(lang => lang.code === languageCode)
    toast({
      title: "Language Changed",
      description: `Language changed to ${language?.name}. The interface will update shortly.`,
    })
    setTimeout(() => {
      onOpenChange(false)
    }, 1000)
  }

  const popularLanguages = languages.filter(lang => lang.isPopular)
  const otherLanguages = languages.filter(lang => !lang.isPopular)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <Globe className="h-6 w-6 text-cyan-400" />
            Language Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Language */}
          <Card className="bg-cyan-500/10 border-cyan-500/20">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-2">Current Language</h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
                <div>
                  <p className="text-white font-medium">
                    {languages.find(lang => lang.code === selectedLanguage)?.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {languages.find(lang => lang.code === selectedLanguage)?.nativeName}
                  </p>
                </div>
                <Badge className="ml-auto bg-cyan-500 text-white">Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Popular Languages */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Popular Languages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {popularLanguages.map((language) => (
                <Card 
                  key={language.code} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedLanguage === language.code 
                      ? 'bg-cyan-500/20 border-cyan-500/50' 
                      : 'bg-black/40 border-white/10 hover:border-cyan-400/50'
                  }`}
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">{language.name}</p>
                        <p className="text-gray-400 text-sm">{language.nativeName}</p>
                      </div>
                      {selectedLanguage === language.code && (
                        <Check className="h-5 w-5 text-cyan-400" />
                      )}
                      {language.isDefault && (
                        <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Other Languages */}
          <div>
            <h3 className="text-white font-semibold mb-4">Other Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {otherLanguages.map((language) => (
                <Card 
                  key={language.code} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedLanguage === language.code 
                      ? 'bg-cyan-500/20 border-cyan-500/50' 
                      : 'bg-black/40 border-white/10 hover:border-cyan-400/50'
                  }`}
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium">{language.name}</p>
                        <p className="text-gray-400 text-sm">{language.nativeName}</p>
                      </div>
                      {selectedLanguage === language.code && (
                        <Check className="h-5 w-5 text-cyan-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Language Information
          </h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Language changes will take effect immediately</li>
            <li>• Some content may still appear in English during translation</li>
            <li>• Game content and rules are available in selected languages</li>
            <li>• Customer support is available in popular languages</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
