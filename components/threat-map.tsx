"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, Activity, ExternalLink } from "lucide-react"
import Link from "next/link"

export function ThreatMap() {
  // Mock threat data
  const threats = [
    {
      id: 1,
      location: "Mumbai Coast",
      coordinates: { lat: 19.076, lng: 72.8777 },
      type: "High Waves",
      severity: "high",
      reports: 12,
      lastUpdate: "5 minutes ago",
    },
    {
      id: 2,
      location: "Chennai Port",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      type: "Storm Surge",
      severity: "medium",
      reports: 8,
      lastUpdate: "15 minutes ago",
    },
    {
      id: 3,
      location: "Kochi Harbor",
      coordinates: { lat: 9.9312, lng: 76.2673 },
      type: "Unusual Marine Activity",
      severity: "medium",
      reports: 5,
      lastUpdate: "1 hour ago",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-amber-500"
      case "low":
        return "bg-yellow-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Interactive Threat Map</CardTitle>
              <CardDescription>Real-time visualization of ocean hazards and incident clustering</CardDescription>
            </div>
            <Link href="/live-map">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Map
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {/* Placeholder for actual map integration */}
          <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto" />
              <p className="text-slate-600">Interactive Map Component</p>
              <p className="text-sm text-slate-500">Integration with mapping service (Google Maps, Mapbox, etc.)</p>
              <div className="mt-4 p-3 bg-white/80 rounded-lg">
                <p className="text-xs text-slate-600">
                  <strong>Live Features Available:</strong> Real-time citizen locations, resizable danger zones,
                  interactive location pinning
                </p>
              </div>
            </div>

            {/* Mock threat markers */}
            {threats.map((threat, index) => (
              <div
                key={threat.id}
                className="absolute"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`,
                }}
              >
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(threat.severity)} animate-pulse`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Threat Zones</CardTitle>
            <CardDescription>Current hazard locations and severity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {threats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`}></div>
                    <div>
                      <div className="font-medium text-slate-900">{threat.location}</div>
                      <div className="text-sm text-slate-600">{threat.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={threat.severity === "high" ? "destructive" : "default"}>
                      {threat.severity.toUpperCase()}
                    </Badge>
                    <div className="text-xs text-slate-500 mt-1">{threat.reports} reports</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hotspot Analysis</CardTitle>
            <CardDescription>AI-powered clustering and pattern detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium text-red-900">Western Coast Cluster</div>
                    <div className="text-sm text-red-700">Mumbai to Goa region</div>
                  </div>
                </div>
                <Badge variant="destructive">HIGH RISK</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-amber-500" />
                  <div>
                    <div className="font-medium text-amber-900">Eastern Coast Activity</div>
                    <div className="text-sm text-amber-700">Chennai to Visakhapatnam</div>
                  </div>
                </div>
                <Badge variant="default">MODERATE</Badge>
              </div>

              <div className="p-3 bg-slate-50 border rounded-lg">
                <div className="text-sm text-slate-600">
                  <strong>Pattern Analysis:</strong> Increased activity along western coastline correlates with monsoon
                  patterns. Recommend enhanced monitoring for next 48 hours.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
