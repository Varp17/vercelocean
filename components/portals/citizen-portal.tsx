"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Shield, Navigation, Phone, Bell, Users, Waves, Wind, CloudRain, Zap } from "lucide-react"
import { usePortalStore } from "@/lib/store/portal-store"
import { useLiveLocation } from "@/lib/hooks/use-live-location"
import { useRealTimeNotifications } from "@/lib/hooks/use-real-time-notifications"
import { LiveInteractiveMap } from "@/components/maps/live-interactive-map"
import { EmergencyReportForm } from "@/components/forms/emergency-report-form"

interface SafetyStatus {
  level: "safe" | "caution" | "danger" | "critical"
  message: string
  nearestSafeZone?: {
    name: string
    distance: number
    directions: string
  }
}

export function CitizenPortal() {
  const { currentUser, zones, reports, setCurrentUser } = usePortalStore()
  const { currentLocation, isTracking, startTracking, stopTracking } = useLiveLocation()
  const { notifications, unreadCount } = useRealTimeNotifications()
  const [showReportForm, setShowReportForm] = useState(false)
  const [safetyStatus, setSafetyStatus] = useState<SafetyStatus>({
    level: "safe",
    message: "You are in a safe area",
  })

  // Mock user for demo
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser({
        id: "1",
        name: "John Citizen",
        email: "john@example.com",
        role: "citizen",
        location: currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined,
        isActive: true,
      })
    }
  }, [currentUser, currentLocation, setCurrentUser])

  // Calculate safety status based on location and zones
  useEffect(() => {
    if (!currentLocation) return

    const dangerZones = zones.filter((zone) => zone.type === "danger" && zone.isActive)
    const safeZones = zones.filter((zone) => zone.type === "safe" && zone.isActive)

    // Simple distance calculation (in a real app, use proper geospatial calculations)
    const isInDangerZone = dangerZones.some((zone) => {
      // Simplified check - in real app, use proper polygon containment
      return (
        Math.abs(currentLocation.lat - zone.coordinates[0][0]) < 0.01 &&
        Math.abs(currentLocation.lng - zone.coordinates[0][1]) < 0.01
      )
    })

    if (isInDangerZone) {
      const nearestSafe = safeZones[0] // Simplified - find actual nearest
      setSafetyStatus({
        level: "danger",
        message: "You are in a danger zone! Move to safety immediately.",
        nearestSafeZone: nearestSafe
          ? {
              name: nearestSafe.name,
              distance: 1.2, // Mock distance
              directions: "Head northeast to safety",
            }
          : undefined,
      })
    } else {
      setSafetyStatus({
        level: "safe",
        message: "You are in a safe area",
      })
    }
  }, [currentLocation, zones])

  const quickReportTypes = [
    { id: "flood", name: "Flood", icon: <Waves className="h-6 w-6" />, color: "bg-blue-500" },
    { id: "high_waves", name: "High Waves", icon: <Wind className="h-6 w-6" />, color: "bg-cyan-500" },
    { id: "heavy_rain", name: "Heavy Rain", icon: <CloudRain className="h-6 w-6" />, color: "bg-gray-500" },
    { id: "power_outage", name: "Power Out", icon: <Zap className="h-6 w-6" />, color: "bg-yellow-500" },
  ]

  const recentReports = reports.slice(0, 5)

  const getSafetyStatusColor = (level: string) => {
    switch (level) {
      case "safe":
        return "bg-green-500"
      case "caution":
        return "bg-yellow-500"
      case "danger":
        return "bg-red-500"
      case "critical":
        return "bg-red-700"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Atlas-Alert</h1>
                <p className="text-sm text-gray-600">Citizen Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={isTracking ? stopTracking : startTracking}
                className={isTracking ? "bg-green-50 border-green-200" : ""}
              >
                <Navigation className="h-4 w-4 mr-1" />
                {isTracking ? "Tracking" : "Start GPS"}
              </Button>

              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">{unreadCount}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Status Alert */}
      {safetyStatus.level !== "safe" && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Alert
            className={`border-2 ${safetyStatus.level === "danger" ? "border-red-500 bg-red-50" : "border-yellow-500 bg-yellow-50"}`}
          >
            <AlertTriangle className="h-5 w-5" />
            <AlertDescription className="font-medium">
              <div className="flex items-center justify-between">
                <span>{safetyStatus.message}</span>
                {safetyStatus.nearestSafeZone && (
                  <Button size="sm" className="ml-4">
                    <Shield className="h-4 w-4 mr-1" />
                    Go to {safetyStatus.nearestSafeZone.name}
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Status Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Safety Status */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSafetyStatusColor(safetyStatus.level)}`} />
                    Safety Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">{safetyStatus.message}</p>
                    {currentLocation && (
                      <div className="text-xs text-gray-500">
                        <div>
                          📍 {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                        </div>
                        <div>🎯 Accuracy: ±{currentLocation.accuracy?.toFixed(0)}m</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Activity */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Nearby Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Citizens:</span>
                      <Badge variant="secondary">247</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Recent Reports:</span>
                      <Badge variant="secondary">{recentReports.length}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Safe Zones:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {zones.filter((z) => z.type === "safe").length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Police: 100
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Fire: 101
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Ambulance: 108
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Report Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickReportTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      className="h-20 flex flex-col items-center gap-2 hover:bg-gray-50 bg-transparent"
                      onClick={() => setShowReportForm(true)}
                    >
                      <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center text-white`}>
                        {type.icon}
                      </div>
                      <span className="text-sm">{type.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports in Your Area</CardTitle>
              </CardHeader>
              <CardContent>
                {recentReports.length > 0 ? (
                  <div className="space-y-3">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              report.severity === "high"
                                ? "bg-red-500"
                                : report.severity === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div>
                            <div className="font-medium text-sm">{report.type.replace("_", " ")}</div>
                            <div className="text-xs text-gray-600">{report.description}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {new Date(report.timestamp).toLocaleTimeString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent reports in your area</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Map Tab */}
          <TabsContent value="map">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <LiveInteractiveMap userRole="citizen" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Submit Emergency Report</CardTitle>
              </CardHeader>
              <CardContent>
                <EmergencyReportForm onClose={() => setShowReportForm(false)} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Alerts
                  <Badge variant="secondary">{notifications.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.slice(0, 10).map((notification) => (
                      <div key={notification.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={notification.severity === "critical" ? "destructive" : "secondary"}>
                                {notification.type}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No alerts at this time</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Emergency Report Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <EmergencyReportForm onClose={() => setShowReportForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
