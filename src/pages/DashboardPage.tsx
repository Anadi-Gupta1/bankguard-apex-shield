import { Navigation } from "@/components/Navigation";
import { ThreatCounter } from "@/components/ThreatCounter";
import { LiveThreatFeed } from "@/components/LiveThreatFeed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Minus
} from "lucide-react";

export const DashboardPage = () => {
  const threatLevel = "medium"; // critical, high, medium, low

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "critical": return "text-destructive border-destructive bg-destructive/10";
      case "high": return "text-destructive border-destructive bg-destructive/10";
      case "medium": return "text-warning border-warning bg-warning/10";
      case "low": return "text-success border-success bg-success/10";
      default: return "text-muted-foreground border-muted bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Security Operations Center</h1>
            <p className="text-muted-foreground">Real-time threat monitoring and response</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className={`px-4 py-2 ${getThreatLevelColor(threatLevel)}`}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Threat Level: {threatLevel.toUpperCase()}
            </Badge>
            <Button variant="emergency" size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Emergency Lockdown
            </Button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ThreatCounter
            title="Active Threats"
            count={23}
            trend="down"
            icon={<AlertTriangle className="h-6 w-6" />}
            variant="threat"
          />
          <ThreatCounter
            title="Protected Customers"
            count={45678}
            trend="up"
            icon={<Users className="h-6 w-6" />}
            variant="success"
          />
          <ThreatCounter
            title="APKs Analyzed Today"
            count={1247}
            trend="up"
            icon={<Activity className="h-6 w-6" />}
            variant="default"
          />
          <ThreatCounter
            title="System Uptime"
            count={99.99}
            trend="stable"
            icon={<Server className="h-6 w-6" />}
            variant="success"
          />
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Threat Timeline */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">24-Hour Threat Timeline</h3>
              <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive threat timeline chart would be here</p>
              </div>
            </Card>

            {/* Malware Distribution */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Malware Type Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Banking Trojans</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={45} className="w-24" />
                    <span className="text-sm font-mono">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Phishing Apps</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={30} className="w-24" />
                    <span className="text-sm font-mono">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spyware</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={15} className="w-24" />
                    <span className="text-sm font-mono">15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Adware</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={10} className="w-24" />
                    <span className="text-sm font-mono">10%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Events */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Recent Security Events</h3>
              <div className="space-y-3">
                {[
                  { time: "14:32", event: "High-risk APK blocked", severity: "high", user: "Customer #12847" },
                  { time: "14:28", event: "Phishing attempt detected", severity: "medium", user: "Customer #11203" },
                  { time: "14:25", event: "Banking trojan quarantined", severity: "critical", user: "Customer #15692" },
                  { time: "14:20", event: "Safe APK verified", severity: "low", user: "Customer #18745" },
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                    <div className="text-xs text-muted-foreground font-mono">{event.time}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.user}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        event.severity === 'critical' ? 'border-destructive text-destructive' :
                        event.severity === 'high' ? 'border-destructive text-destructive' :
                        event.severity === 'medium' ? 'border-warning text-warning' :
                        'border-success text-success'
                      }`}
                    >
                      {event.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <LiveThreatFeed />
            
            {/* Global Threat Map */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Global Threat Map</h3>
              <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                <p className="text-muted-foreground text-center">
                  Interactive world map<br />showing threat origins
                </p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-destructive rounded-full"></div>
                    <span>High Risk Regions</span>
                  </div>
                  <span className="font-mono">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span>Medium Risk</span>
                  </div>
                  <span className="font-mono">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Low Risk</span>
                  </div>
                  <span className="font-mono">23</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
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
                <Button variant="emergency" size="sm" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Initiate Lockdown
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};