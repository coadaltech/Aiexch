"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, ExternalLink, Shield, Users, AlertTriangle } from 'lucide-react'

interface TermsPolicyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsPolicyModal({ open, onOpenChange }: TermsPolicyModalProps) {
  const handleDownload = (document: string) => {
    // Simulate download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${document}.pdf`
    link.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl flex items-center gap-2">
            <FileText className="h-6 w-6 text-cyan-400" />
            Terms & Policies
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="terms" className="data-[state=active]:bg-cyan-600">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-cyan-600">Privacy Policy</TabsTrigger>
            <TabsTrigger value="responsible" className="data-[state=active]:bg-cyan-600">Responsible Gaming</TabsTrigger>
            <TabsTrigger value="aml" className="data-[state=active]:bg-cyan-600">AML Policy</TabsList>

          <TabsContent value="terms" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-xl">Terms of Service</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload('terms-of-service')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">1. Acceptance of Terms</h4>
                    <p>By accessing and using AIEXCH gaming platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">2. Eligibility</h4>
                    <p>You must be at least 18 years old to use our services. By using our platform, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">3. Account Registration</h4>
                    <p>To access certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">4. User Conduct</h4>
                    <p>You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. You also agree not to attempt to gain unauthorized access to any part of the platform.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">5. Gaming Rules</h4>
                    <p>All games are subject to specific rules and regulations. Players must familiarize themselves with the rules before participating. AIEXCH reserves the right to void any bets or winnings if rules are violated.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">6. Deposits and Withdrawals</h4>
                    <p>All financial transactions are subject to our payment terms and conditions. We reserve the right to request additional verification for withdrawals and may impose limits on transaction amounts.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">7. Limitation of Liability</h4>
                    <p>AIEXCH shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">8. Termination</h4>
                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Privacy Policy
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload('privacy-policy')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Information We Collect</h4>
                    <p>We collect information you provide directly to us, such as when you create an account, make a deposit, or contact us for support. This includes personal information like your name, email address, phone number, and payment information.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">How We Use Your Information</h4>
                    <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Information Sharing</h4>
                    <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our platform.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Data Security</h4>
                    <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Cookies and Tracking</h4>
                    <p>We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our platform.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Your Rights</h4>
                    <p>You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact our support team to exercise these rights.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responsible" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Responsible Gaming Policy
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload('responsible-gaming')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Our Commitment</h4>
                    <p>AIEXCH is committed to promoting responsible gaming and providing a safe, fair, and enjoyable gaming environment for all our users. We believe that gaming should be entertaining and never cause financial or personal problems.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Age Verification</h4>
                    <p>We strictly prohibit underage gaming. All users must be at least 18 years old. We use advanced age verification systems and may request additional documentation to verify age.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Self-Exclusion Tools</h4>
                    <p>We provide various tools to help you control your gaming activity, including deposit limits, session time limits, loss limits, and self-exclusion options. These tools can be accessed through your account settings.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Warning Signs</h4>
                    <p>Be aware of warning signs of problem gaming: spending more than you can afford, chasing losses, gaming to escape problems, neglecting responsibilities, or lying about gaming activities.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Getting Help</h4>
                    <p>If you or someone you know has a gaming problem, help is available. Contact organizations like Gamblers Anonymous, National Council on Problem Gambling, or speak with a healthcare professional.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Support Resources</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>National Problem Gaming Helpline: 1-800-522-4700</li>
                      <li>Gamblers Anonymous: www.gamblersanonymous.org</li>
                      <li>National Council on Problem Gaming: www.ncpgambling.org</li>
                      <li>AIEXCH Support: support@aiexch.com</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aml" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    Anti-Money Laundering Policy
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload('aml-policy')}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
                
                <div className="space-y-4 text-gray-300 text-sm">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Policy Statement</h4>
                    <p>AIEXCH is committed to preventing money laundering and terrorist financing. We have implemented comprehensive policies and procedures to detect and prevent such activities on our platform.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Customer Due Diligence</h4>
                    <p>We conduct thorough customer due diligence procedures, including identity verification, address verification, and source of funds verification for all customers before allowing them to use our services.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Transaction Monitoring</h4>
                    <p>We monitor all transactions for suspicious activity using advanced automated systems and manual reviews. Unusual patterns or large transactions may trigger additional scrutiny.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Reporting Obligations</h4>
                    <p>We are required to report suspicious transactions to relevant authorities. We maintain detailed records of all transactions and customer information as required by law.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Prohibited Activities</h4>
                    <p>The following activities are strictly prohibited: money laundering, terrorist financing, fraud, structuring transactions to avoid reporting requirements, and using our platform for any illegal purposes.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Compliance Requirements</h4>
                    <p>All users must comply with applicable laws and regulations. We may request additional documentation or information to ensure compliance with AML requirements.</p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Consequences of Violations</h4>
                    <p>Violations of our AML policy may result in account suspension, termination, forfeiture of funds, and reporting to law enforcement authorities.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Important Information
          </h4>
          <div className="text-gray-400 text-sm space-y-2">
            <p>• These documents are legally binding and govern your use of AIEXCH services</p>
            <p>• We may update these policies from time to time. Check back regularly for updates</p>
            <p>• If you have questions about any of these policies, contact our support team</p>
            <p>• Last updated: January 2024</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
