"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Brain, MapPin, MessageSquare, CheckCircle, XCircle, Activity } from "lucide-react"
import { LiveInteractiveMap } from "@/components/maps/live-interactive-map"
import { SocialMediaFeed } from "@/components/social-media-feed"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { ReportsList } from "@/components/reports-list"
import { ComprehensiveAnalytics } from "@/components/comprehensive-analytics"

export function AnalystDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userRole] = useState<"citizen" | "admin" | "analyst">("analyst")

  // Mock analytics data
  const [analyticsData] = useState({
    totalReports: 1247,
    verifiedReports: 892,
    mlConfidence: 87.3,
    socialMentions: 2341,
    hotspots: 15,
    sentimentScore: 0.72,
  })

  const [pendingVerification] = useState([
    {
      id: "1",
      type: "flood",
      location: "Mumbai Coast",
      confidence: 0.89,
      socialCorroboration: 12,
      time: "5 min ago",
      priority: "high",
    },
    {
      id: "2",
      type: "high_waves",
      location: "Chennai Marina",
      confidence: 0.76,
      socialCorroboration: 8,
      time: "12 min ago",
      priority: "medium",
    },
    {
      id: "3",
      type: "oil_spill",
      location: "Kochi Port",
      confidence: 0.94,
      socialCorroboration: 23,
      time: "18 min ago",
      priority: "high",
    },
  ])

  const [mlMetrics] = useState({
    textClassification: 89.2,
    imageAnalysis: 91.7,
    sentimentAnalysis: 85.4,
    locationExtraction: 93.1,
    threatAssessment: 87.8,
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Atlas Alert - Analyst Dashboard</h1>
            <p className="text-gray-600">AI-Powered Threat Analysis & Verification</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Brain className="h-3 w-3 mr-1" />
              ML Models Active
            </Badge>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="social">Social Analysis</TabsTrigger>
            <TabsTrigger value="map">Hotspot Map</TabsTrigger>
            <TabsTrigger value="ml">ML Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.totalReports.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+23% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ML Confidence</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.mlConfidence}%</div>
                  <p className="text-xs text-muted-foreground">Average model accuracy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Social Mentions</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.socialMentions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Disaster-related posts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Hotspots</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.hotspots}</div>
                  <p className="text-xs text-muted-foreground">Detected clusters</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((analyticsData.verifiedReports / analyticsData.totalReports) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">{analyticsData.verifiedReports} verified</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.sentimentScore.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Public concern level</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Verification Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingVerification.slice(0, 3).map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(report.priority)}`} />
                          <div>
                            <p className="font-medium capitalize">{report.type.replace("_", " ")}</p>
                            <p className="text-sm text-gray-600">{report.location}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Confidence: {Math.round(report.confidence * 100)}%</span>
                              <span>•</span>
                              <span>{report.socialCorroboration} social mentions</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-transparent" variant="outline">
                    View All Pending ({pendingVerification.length})
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ML Model Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(mlMetrics).map(([model, accuracy]) => (
                      <div key={model} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{model.replace(/([A-Z])/g, " $1").trim()}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${accuracy}%` }} />
                          </div>
                          <span className="text-sm font-medium">{accuracy}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="verification">
            <ReportsList />
          </TabsContent>

          <TabsContent value="social">
            <SocialMediaFeed />
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Hotspot Detection & Clustering Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <LiveInteractiveMap userRole={userRole} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ml">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Accuracy Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalyticsCharts />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Processing Queue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span>Image Analysis Queue</span>
                      </div>
                      <Badge>23 pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-green-600" />
                        <span>Text Classification</span>
                      </div>
                      <Badge>12 pending</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                        <span>Sentiment Analysis</span>
                      </div>
                      <Badge>8 pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <ComprehensiveAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
