import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ThreatCounter } from "@/components/ThreatCounter";
import { LiveThreatFeed } from "@/components/LiveThreatFeed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Users, 
  Server, 
  Eye, 
  Lock, 
  Zap,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Globe,
  Database,
  Wifi,
  CreditCard,
  Building,
  Phone,
  Settings,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

interface SecurityMetric {
  title: string;
  value: string | number;
  trend: "up" | "down" | "stable";
  change: string;
  icon: React.ReactNode;
  variant: "threat" | "success" | "warning" | "default";
}

interface SecurityEvent {
  id: string;
  time: string;
  event: string;
  severity: "critical" | "high" | "medium" | "low";
  user: string;
  location?: string;
}

export const DashboardPage = () => {
  const [threatLevel, setThreatLevel] = useState<"low" | "medium" | "high" | "critical">("medium");
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [recentEvents, setRecentEvents] = useState<SecurityEvent[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    apiHealth: 98.5,
    dbConnections: 45,
    activeUsers: 1247,
    totalTransactions: 15690,
    uptime: "99.99%"
  });

  useEffect(() => {
    // Initialize security metrics
    const metrics: SecurityMetric[] = [
      {
        title: "Active Threats",
        value: 23,
        trend: "down",
        change: "-12%",
        icon: <AlertTriangle className="h-6 w-6" />,
        variant: "threat"
      },
      {
        title: "Protected Customers",
        value: "45.6K",
        trend: "up",
        change: "+8.2%",
        icon: <Users className="h-6 w-6" />,
        variant: "success"
      },
      {
        title: "APKs Analyzed Today",
        value: 1247,
        trend: "up",
        change: "+15.3%",
        icon: <Activity className="h-6 w-6" />,
        variant: "default"
      },
      {
        title: "System Uptime",
        value: "99.99%",
        trend: "stable",
        change: "0%",
        icon: <Server className="h-6 w-6" />,
        variant: "success"
      }
    ];

    const events: SecurityEvent[] = [
      { 
        id: "1", 
        time: "14:32", 
        event: "High-risk APK blocked", 
        severity: "high", 
        user: "Customer #12847",
        location: "New York, US"
      },
      { 
        id: "2", 
        time: "14:28", 
        event: "Phishing attempt detected", 
        severity: "medium", 
        user: "Customer #11203",
        location: "London, UK"
      },
      { 
        id: "3", 
        time: "14:25", 
        event: "Banking trojan quarantined", 
        severity: "critical", 
        user: "Customer #15692",
        location: "Berlin, DE"
      },
      { 
        id: "4", 
        time: "14:20", 
        event: "Safe APK verified", 
        severity: "low", 
        user: "Customer #18745",
        location: "Tokyo, JP"
      },
      { 
        id: "5", 
        time: "14:15", 
        event: "2FA authentication successful", 
        severity: "low", 
        user: "Customer #19823",
        location: "Sydney, AU"
      }
    ];

    setSecurityMetrics(metrics);
    setRecentEvents(events);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update threat level occasionally
      if (Math.random() > 0.95) {
        const levels: typeof threatLevel[] = ["low", "medium", "high", "critical"];
        setThreatLevel(levels[Math.floor(Math.random() * levels.length)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "border-red-500 text-red-700 bg-red-50";
      case "high": return "border-orange-500 text-orange-700 bg-orange-50";
      case "medium": return "border-yellow-500 text-yellow-700 bg-yellow-50";
      case "low": return "border-green-500 text-green-700 bg-green-50";
      default: return "border-gray-500 text-gray-700 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Emergency Alert Banner */}
      {threatLevel === "critical" && (
        <div className="bg-red-600 text-white p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
            <span className="font-medium">CRITICAL THREAT DETECTED - Emergency protocols activated</span>
            <Button size="sm" variant="secondary" className="ml-4">
              View Details
            </Button>
          </div>
        </div>
      )}
      
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Security Operations Center
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time threat monitoring and response • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className={`px-4 py-2 ${getThreatLevelColor(threatLevel)}`}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Threat Level: {threatLevel.toUpperCase()}
            </Badge>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              <Zap className="h-4 w-4 mr-2" />
              Emergency Actions
            </Button>
          </div>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityMetrics.map((metric, index) => (
            <ThreatCounter
              key={index}
              title={metric.title}
              count={typeof metric.value === "number" ? metric.value : 0}
              trend={metric.trend}
              icon={metric.icon}
              variant={metric.variant}
            />
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="threats" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Threats
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="systems" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Systems
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Threat Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-primary" />
                      24-Hour Threat Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                      <div className="text-center z-10">
                        <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Interactive threat timeline</p>
                        <p className="text-sm text-muted-foreground">Real-time data visualization</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Malware Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-primary" />
                      Malware Type Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Banking Trojans", value: 45, color: "bg-red-500" },
                        { name: "Phishing Apps", value: 30, color: "bg-orange-500" },
                        { name: "Spyware", value: 15, color: "bg-yellow-500" },
                        { name: "Adware", value: 10, color: "bg-green-500" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={item.value} className="w-24 h-2" />
                            <span className="text-sm font-mono w-12 text-right">{item.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Live Threat Feed */}
                <LiveThreatFeed />
                
                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{systemStatus.apiHealth}%</p>
                        <p className="text-xs text-muted-foreground">API Health</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{systemStatus.dbConnections}</p>
                        <p className="text-xs text-muted-foreground">DB Connections</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">{systemStatus.activeUsers.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Active Users</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-600">{systemStatus.totalTransactions.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Transactions</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">System Uptime</span>
                        <span className="text-sm font-mono text-green-600">{systemStatus.uptime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Scan Multiple APKs
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Update Threat Database
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Generate Security Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Configuration
                    </Button>
                    <Button size="sm" className="w-full justify-start bg-red-600 hover:bg-red-700 text-white">
                      <Lock className="h-4 w-4 mr-2" />
                      Emergency Lockdown
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Security Events Tab */}
          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Recent Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                          {event.time}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{event.event}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span>{event.user}</span>
                              {event.location && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getSeverityColor(event.severity)}`}
                          >
                            {event.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detection Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
                    <div className="text-sm text-muted-foreground">Last 30 days</div>
                    <div className="mt-4">
                      <Progress value={98.7} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1.2s</div>
                    <div className="text-sm text-muted-foreground">Average response</div>
                    <div className="mt-4 flex justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">False Positives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">0.3%</div>
                    <div className="text-sm text-muted-foreground">Industry leading</div>
                    <div className="mt-4">
                      <Progress value={0.3} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Systems Tab */}
          <TabsContent value="systems" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Infrastructure Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "API Gateway", status: "online", uptime: "99.99%" },
                    { name: "Database Cluster", status: "online", uptime: "99.97%" },
                    { name: "ML Processing", status: "online", uptime: "99.95%" },
                    { name: "Threat Intelligence", status: "online", uptime: "99.99%" },
                    { name: "Alert System", status: "online", uptime: "100%" }
                  ].map((system, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{system.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-green-600">{system.uptime}</div>
                        <div className="text-xs text-muted-foreground">{system.status}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { region: "North America", status: "optimal", latency: "12ms" },
                    { region: "Europe", status: "optimal", latency: "8ms" },
                    { region: "Asia Pacific", status: "good", latency: "24ms" },
                    { region: "South America", status: "good", latency: "18ms" },
                    { region: "Africa", status: "optimal", latency: "15ms" }
                  ].map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Wifi className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{region.region}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono">{region.latency}</div>
                        <div className="text-xs text-green-600">{region.status}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                    <div className="text-sm text-muted-foreground">Current active users</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">89</div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">12</div>
                    <div className="text-sm text-muted-foreground">Requiring attention</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
