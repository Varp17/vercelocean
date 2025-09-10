"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, BarChart3, MapPin, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PortalSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🌊 Ocean Hazard Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Integrated emergency response system with AI-powered hazard detection and real-time coordination
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Citizen Portal */}
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-emerald-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Citizen Portal</CardTitle>
              <CardDescription>Report hazards, view alerts, find safe zones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Interactive hazard maps</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">5-step report submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">Real-time safety alerts</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                PWA Ready
              </Badge>
              <Link href="/citizen" className="block">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Enter Citizen Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Portal */}
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Manage operations, deploy teams, coordinate response</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Team management & tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Emergency alert broadcasting</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Live operational dashboard</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                Command Center
              </Badge>
              <Link href="/admin" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Enter Admin Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Analyst Portal */}
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Analyst Portal</CardTitle>
              <CardDescription>AI insights, trends analysis, predictive modeling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Hazard clustering & trends</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Social media sentiment analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Predictive risk modeling</span>
                </div>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                AI Powered
              </Badge>
              <Link href="/analyst" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Enter Analyst Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">1,247</div>
                <div className="text-sm text-gray-600">Active Citizens</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">Response Teams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">156</div>
                <div className="text-sm text-gray-600">Active Reports</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">7</div>
                <div className="text-sm text-gray-600">Red Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
