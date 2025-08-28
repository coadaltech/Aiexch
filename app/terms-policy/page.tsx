"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Shield, Eye, Scale, Users } from 'lucide-react'
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function TermsPolicyPage() {
  return (
    <LayoutWrapper
      title="Terms & Policies"
      subtitle="Legal information and platform policies"
      icon={FileText}
    >
      <div className="p-4 lg:p-6 space-y-6" >
        <Tabs defaultValue="terms" className="space-y-6">

          <TabsContent value="terms" className="space-y-6">
            <Card className="bg-black/40 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Terms of Service
                </CardTitle>
                <CardDescription className="text-gray-400">Last updated: January 15, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h3>
                  <p className="leading-relaxed">
                    By accessing and using AIEXCH Gaming Exchange ("the Platform"), you accept and agree to be bound
                    by the terms and provision of this agreement. If you do not agree to abide by the above, please do
                    not use this service.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">2. Eligibility</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>You must be at least 18 years of age to use this platform</li>
                    <li>You must be legally eligible to participate in gaming activities in your jurisdiction</li>
                    <li>You must provide accurate and complete registration information</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">3. Account Responsibilities</h3>
                  <p className="leading-relaxed mb-3">Users are responsible for:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Maintaining accurate account information</li>
                    <li>Keeping login credentials secure</li>
                    <li>All activities that occur under their account</li>
                    <li>Complying with all applicable laws and regulations</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">4. Prohibited Activities</h3>
                  <p className="leading-relaxed mb-3">The following activities are strictly prohibited:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Creating multiple accounts</li>
                    <li>Using automated betting systems or bots</li>
                    <li>Attempting to manipulate odds or outcomes</li>
                    <li>Money laundering or fraudulent activities</li>
                    <li>Sharing account credentials with third parties</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">5. Financial Terms</h3>
                  <p className="leading-relaxed mb-3">All financial transactions are subject to:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Verification procedures for deposits and withdrawals</li>
                    <li>Minimum and maximum transaction limits</li>
                    <li>Processing fees as disclosed at the time of transaction</li>
                    <li>Anti-money laundering compliance requirements</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">6. Limitation of Liability</h3>
                  <p className="leading-relaxed">
                    AIEXCH Gaming Exchange shall not be liable for any direct, indirect, incidental, special,
                    consequential, or punitive damages resulting from your use of the platform. We reserve the right
                    to suspend or terminate accounts that violate these terms.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutWrapper>
  )
}
