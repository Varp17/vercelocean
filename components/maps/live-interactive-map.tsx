"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Users, AlertTriangle, Shield, Thermometer, Plus, Minus, Navigation, Radio } from "lucide-react"

interface LiveInteractiveMapProps {
  userRole: "citizen" | "admin" | "analyst"
}

interface MapLayer {
  id: string
  name: string
  visible: boolean
  color: string
  icon: React.ReactNode
}

interface CitizenLocation {
  id: string
  lat: number
  lng: number
  accuracy: number
  timestamp: Date
  isActive: boolean
}

interface HazardReport {
  id: string
  type: string
  lat: number
  lng: number
  severity: "low" | "medium" | "high"
  verified: boolean
  timestamp: Date
  description: string
}

interface Zone {
  id: string
  type: "danger" | "safe"
  name: string
  coordinates: Array<[number, number]>
  capacity?: number
  currentOccupancy?: number
  instructions?: string
}

interface ResponseTeam {
  id: string
  name: string
  lat: number
  lng: number
  status: "available" | "deployed" | "busy"
  members: number
}

export function LiveInteractiveMap({ userRole }: LiveInteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isCreatingZone, setIsCreatingZone] = useState(false)
  const [zoneType, setZoneType] = useState<"danger" | "safe">("danger")
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Layer visibility controls
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: "citizens", name: "Citizen Locations", visible: true, color: "#3b82f6", icon: <Users className="h-4 w-4" /> },
    {
      id: "reports",
      name: "Hazard Reports",
      visible: true,
      color: "#ef4444",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      id: "danger_zones",
      name: "Danger Zones",
      visible: true,
      color: "#dc2626",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    { id: "safe_zones", name: "Safe Zones", visible: true, color: "#16a34a", icon: <Shield className="h-4 w-4" /> },
    {
      id: "response_teams",
      name: "Response Teams",
      visible: userRole === "admin",
      color: "#7c3aed",
      icon: <Radio className="h-4 w-4" />,
    },
    {
      id: "weather",
      name: "Weather Data",
      visible: false,
      color: "#0ea5e9",
      icon: <Thermometer className="h-4 w-4" />,
    },
  ])

  // Mock live data
  const [citizenLocations, setCitizenLocations] = useState<CitizenLocation[]>([
    { id: "1", lat: 19.076, lng: 72.8777, accuracy: 10, timestamp: new Date(), isActive: true },
    { id: "2", lat: 19.0896, lng: 72.8656, accuracy: 15, timestamp: new Date(), isActive: true },
    { id: "3", lat: 19.0822, lng: 72.8911, accuracy: 8, timestamp: new Date(), isActive: true },
    { id: "4", lat: 19.0759, lng: 72.8773, accuracy: 12, timestamp: new Date(), isActive: true },
    { id: "5", lat: 19.0901, lng: 72.8687, accuracy: 20, timestamp: new Date(), isActive: true },
  ])

  const [hazardReports, setHazardReports] = useState<HazardReport[]>([
    {
      id: "1",
      type: "flood",
      lat: 19.076,
      lng: 72.8777,
      severity: "high",
      verified: true,
      timestamp: new Date(),
      description: "Severe flooding on Marine Drive",
    },
    {
      id: "2",
      type: "high_waves",
      lat: 19.0896,
      lng: 72.8656,
      severity: "medium",
      verified: false,
      timestamp: new Date(),
      description: "Unusual wave patterns at Juhu Beach",
    },
    {
      id: "3",
      type: "oil_spill",
      lat: 19.0822,
      lng: 72.8911,
      severity: "high",
      verified: true,
      timestamp: new Date(),
      description: "Oil spill detected near port area",
    },
  ])

  const [zones, setZones] = useState<Zone[]>([
    {
      id: "1",
      type: "danger",
      name: "Flood Zone - Marine Drive",
      coordinates: [
        [19.075, 72.8767],
        [19.077, 72.8767],
        [19.077, 72.8787],
        [19.075, 72.8787],
      ],
      instructions: "Avoid this area due to severe flooding",
    },
    {
      id: "2",
      type: "safe",
      name: "Emergency Shelter - Community Center",
      coordinates: [
        [19.089, 72.865],
        [19.09, 72.865],
        [19.09, 72.866],
        [19.089, 72.866],
      ],
      capacity: 500,
      currentOccupancy: 127,
      instructions: "Emergency shelter with medical facilities",
    },
  ])

  const [responseTeams, setResponseTeams] = useState<ResponseTeam[]>([
    { id: "1", name: "Team Alpha", lat: 19.078, lng: 72.879, status: "deployed", members: 6 },
    { id: "2", name: "Team Beta", lat: 19.085, lng: 72.87, status: "available", members: 4 },
    { id: "3", name: "Team Gamma", lat: 19.09, lng: 72.88, status: "busy", members: 8 },
  ])

  const [weatherData] = useState({
    temperature: 28,
    humidity: 78,
    windSpeed: 15,
    waveHeight: 2.3,
    tideLevel: 1.8,
    visibility: 8.5,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update citizen locations with small random movements
      setCitizenLocations((prev) =>
        prev.map((citizen) => ({
          ...citizen,
          lat: citizen.lat + (Math.random() - 0.5) * 0.001,
          lng: citizen.lng + (Math.random() - 0.5) * 0.001,
          timestamp: new Date(),
        })),
      )

      // Occasionally add new reports
      if (Math.random() < 0.1) {
        const newReport: HazardReport = {
          id: Date.now().toString(),
          type: ["flood", "high_waves", "oil_spill"][Math.floor(Math.random() * 3)],
          lat: 19.076 + (Math.random() - 0.5) * 0.02,
          lng: 72.8777 + (Math.random() - 0.5) * 0.02,
          severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as "low" | "medium" | "high",
          verified: Math.random() > 0.5,
          timestamp: new Date(),
          description: "Real-time hazard detected",
        }
        setHazardReports((prev) => [...prev.slice(-9), newReport])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleLayer = (layerId: string) => {
    setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer)))
  }

  const handleMapClick = (event: React.MouseEvent) => {
    if (isCreatingZone && userRole === "admin") {
      const rect = mapRef.current?.getBoundingClientRect()
      if (rect) {
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        // Convert pixel coordinates to lat/lng (simplified)
        const lat = 19.076 + (y - rect.height / 2) * -0.0001
        const lng = 72.8777 + (x - rect.width / 2) * 0.0001
        setSelectedLocation({ lat, lng })
      }
    }
  }

  const createZone = () => {
    if (selectedLocation && userRole === "admin") {
      const newZone: Zone = {
        id: Date.now().toString(),
        type: zoneType,
        name: `${zoneType === "danger" ? "Danger" : "Safe"} Zone - ${new Date().toLocaleTimeString()}`,
        coordinates: [
          [selectedLocation.lat - 0.002, selectedLocation.lng - 0.002],
          [selectedLocation.lat + 0.002, selectedLocation.lng - 0.002],
          [selectedLocation.lat + 0.002, selectedLocation.lng + 0.002],
          [selectedLocation.lat - 0.002, selectedLocation.lng + 0.002],
        ],
        ...(zoneType === "safe" && { capacity: 200, currentOccupancy: 0 }),
      }
      setZones((prev) => [...prev, newZone])
      setIsCreatingZone(false)
      setSelectedLocation(null)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "#dc2626"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#16a34a"
      default:
        return "#6b7280"
    }
  }

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "#16a34a"
      case "deployed":
        return "#f59e0b"
      case "busy":
        return "#dc2626"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="h-full flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        <div
          ref={mapRef}
          className="w-full h-full bg-blue-50 relative overflow-hidden cursor-crosshair"
          onClick={handleMapClick}
        >
          {/* Base Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* Citizen Locations */}
          {layers.find((l) => l.id === "citizens")?.visible &&
            citizenLocations.map((citizen, index) => (
              <div
                key={citizen.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`,
                }}
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-20 animate-ping" />
                </div>
              </div>
            ))}

          {/* Hazard Reports */}
          {layers.find((l) => l.id === "reports")?.visible &&
            hazardReports.map((report, index) => (
              <div
                key={report.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  left: `${25 + index * 20}%`,
                  top: `${40 + index * 15}%`,
                }}
              >
                <div className="relative group">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: getSeverityColor(report.severity) }}
                  >
                    <AlertTriangle className="h-2 w-2 text-white" />
                  </div>
                  {report.verified && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                    {report.type.replace("_", " ")} - {report.severity}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-black" />
                  </div>
                </div>
              </div>
            ))}

          {/* Zones */}
          {zones.map((zone, index) => {
            const layerVisible = layers.find((l) => l.id === `${zone.type}_zones`)?.visible
            if (!layerVisible) return null

            return (
              <div
                key={zone.id}
                className="absolute z-5"
                style={{
                  left: `${15 + index * 25}%`,
                  top: `${20 + index * 20}%`,
                  width: "120px",
                  height: "80px",
                }}
              >
                <div
                  className={`w-full h-full rounded-lg border-2 ${
                    zone.type === "danger"
                      ? "bg-red-500 bg-opacity-20 border-red-500"
                      : "bg-green-500 bg-opacity-20 border-green-500"
                  }`}
                >
                  <div className="p-1">
                    <div
                      className={`text-xs font-semibold ${zone.type === "danger" ? "text-red-700" : "text-green-700"}`}
                    >
                      {zone.name}
                    </div>
                    {zone.capacity && (
                      <div className="text-xs text-gray-600">
                        {zone.currentOccupancy}/{zone.capacity}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Response Teams (Admin only) */}
          {userRole === "admin" &&
            layers.find((l) => l.id === "response_teams")?.visible &&
            responseTeams.map((team, index) => (
              <div
                key={team.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15"
                style={{
                  left: `${60 + index * 10}%`,
                  top: `${50 + index * 8}%`,
                }}
              >
                <div className="relative group">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: getTeamStatusColor(team.status) }}
                  >
                    <Radio className="h-3 w-3 text-white" />
                  </div>

                  {/* Team Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                    {team.name} - {team.status} ({team.members} members)
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-black" />
                  </div>
                </div>
              </div>
            ))}

          {/* Selected Location for Zone Creation */}
          {selectedLocation && isCreatingZone && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
              style={{
                left: "50%",
                top: "50%",
              }}
            >
              <div
                className={`w-8 h-8 rounded-full border-4 border-dashed ${
                  zoneType === "danger" ? "border-red-500" : "border-green-500"
                } bg-white bg-opacity-80 flex items-center justify-center animate-pulse`}
              >
                <Plus className="h-4 w-4" />
              </div>
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
            <Button size="sm" variant="outline" className="bg-white">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white">
              <Minus className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-white">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-80 bg-white border-l p-4 overflow-y-auto">
        {/* Layer Controls */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">Map Layers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }} />
                  <span className="text-sm">{layer.name}</span>
                </div>
                <Switch checked={layer.visible} onCheckedChange={() => toggleLayer(layer.id)} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Weather Data */}
        {layers.find((l) => l.id === "weather")?.visible && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Live Weather
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Temperature:</span>
                <span>{weatherData.temperature}°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Humidity:</span>
                <span>{weatherData.humidity}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Wind Speed:</span>
                <span>{weatherData.windSpeed} km/h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Wave Height:</span>
                <span>{weatherData.waveHeight}m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tide Level:</span>
                <span>{weatherData.tideLevel}m</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Zone Creation */}
        {userRole === "admin" && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-sm">Zone Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={zoneType === "danger" ? "default" : "outline"}
                  onClick={() => setZoneType("danger")}
                  className="flex-1"
                >
                  Danger Zone
                </Button>
                <Button
                  size="sm"
                  variant={zoneType === "safe" ? "default" : "outline"}
                  onClick={() => setZoneType("safe")}
                  className="flex-1"
                >
                  Safe Zone
                </Button>
              </div>

              {!isCreatingZone ? (
                <Button size="sm" className="w-full" onClick={() => setIsCreatingZone(true)}>
                  Create New Zone
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">Click on map to place zone</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={createZone} disabled={!selectedLocation}>
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsCreatingZone(false)
                        setSelectedLocation(null)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Live Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Live Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Active Citizens:</span>
              <Badge variant="secondary">{citizenLocations.filter((c) => c.isActive).length}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Reports:</span>
              <Badge variant="secondary">{hazardReports.length}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Verified Reports:</span>
              <Badge variant="secondary">{hazardReports.filter((r) => r.verified).length}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Active Zones:</span>
              <Badge variant="secondary">{zones.length}</Badge>
            </div>
            {userRole === "admin" && (
              <div className="flex justify-between text-sm">
                <span>Response Teams:</span>
                <Badge variant="secondary">{responseTeams.length}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
