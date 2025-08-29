import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  AlertTriangle, 
  DollarSign, 
  Activity, 
  Eye, 
  Lock, 
  Wifi, 
  WifiOff,
  CreditCard,
  Shield,
  Camera,
  Bell
} from "lucide-react";

export const ATMDashboard = () => {
  const atmData = [
    { id: "ATM-001", location: "Main Street Branch", status: "online", cash: 85, alerts: 0, transactions: 127 },
    { id: "ATM-002", location: "Downtown Plaza", status: "online", cash: 42, alerts: 1, transactions: 203 },
    { id: "ATM-003", location: "Airport Terminal", status: "offline", cash: 0, alerts: 2, transactions: 0 },
    { id: "ATM-004", location: "Shopping Mall", status: "online", cash: 78, alerts: 0, transactions: 156 },
    { id: "ATM-005", location: "University Campus", status: "maintenance", cash: 65, alerts: 1, transactions: 89 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-success border-success bg-success/10";
      case "offline": return "text-destructive border-destructive bg-destructive/10";
      case "maintenance": return "text-warning border-warning bg-warning/10";
      default: return "text-muted-foreground border-muted bg-muted/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Wifi className="h-4 w-4" />;
      case "offline": return <WifiOff className="h-4 w-4" />;
      case "maintenance": return <Activity className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const totalOnline = atmData.filter(atm => atm.status === "online").length;
  const totalAlerts = atmData.reduce((sum, atm) => sum + atm.alerts, 0);
  const totalTransactions = atmData.reduce((sum, atm) => sum + atm.transactions, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">ATM Network Monitor</h1>
            <p className="text-muted-foreground">Real-time ATM security and operational status</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="px-4 py-2 border-success text-success bg-success/10">
              <Shield className="h-4 w-4 mr-2" />
              Network Secure
            </Badge>
            <Button variant="emergency" size="sm">
              <Lock className="h-4 w-4 mr-2" />
              Emergency Shutdown
            </Button>
          </div>
        </div>

        {/* Network Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 surface-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online ATMs</p>
                <p className="text-3xl font-bold text-success">{totalOnline}/{atmData.length}</p>
              </div>
              <Wifi className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="p-6 surface-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-3xl font-bold text-warning">{totalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </Card>

          <Card className="p-6 surface-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Transactions</p>
                <p className="text-3xl font-bold">{totalTransactions.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6 surface-elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className="text-3xl font-bold text-success">98.5%</p>
              </div>
              <Shield className="h-8 w-8 text-success" />
            </div>
          </Card>
        </div>

        {/* ATM Grid and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* ATM Status List */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">ATM Status Overview</h3>
              <div className="space-y-4">
                {atmData.map((atm) => (
                  <div key={atm.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getStatusColor(atm.status)}`}>
                          {getStatusIcon(atm.status)}
                          <span className="ml-2">{atm.status}</span>
                        </Badge>
                        <div>
                          <p className="font-medium">{atm.id}</p>
                          <p className="text-sm text-muted-foreground">{atm.location}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-1" />
                          Camera
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Cash Level</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={atm.cash} className="flex-1" />
                          <span className="text-sm font-mono">{atm.cash}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Alerts</p>
                        <p className={`text-sm font-bold ${atm.alerts > 0 ? 'text-warning' : 'text-success'}`}>
                          {atm.alerts}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Transactions Today</p>
                        <p className="text-sm font-bold">{atm.transactions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Transaction Monitoring */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Live Transaction Monitoring</h3>
              <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                <p className="text-muted-foreground">Real-time transaction volume chart</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">$2.4M</p>
                  <p className="text-xs text-muted-foreground">Today's Volume</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Avg per Hour</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">3</p>
                  <p className="text-xs text-muted-foreground">Suspicious</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* ATM Network Map */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Network Map</h3>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive ATM<br />location map</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span>Online</span>
                  </div>
                  <span className="font-mono">{totalOnline}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>Offline</span>
                  </div>
                  <span className="font-mono">1</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>Maintenance</span>
                  </div>
                  <span className="font-mono">1</span>
                </div>
              </div>
            </Card>

            {/* Security Alerts */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Security Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border border-warning/30 bg-warning/5 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Low Cash Alert</p>
                    <p className="text-xs text-muted-foreground">ATM-002: Cash level below 50%</p>
                    <p className="text-xs text-muted-foreground">2 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 border border-destructive/30 bg-destructive/5 rounded-lg">
                  <WifiOff className="h-4 w-4 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Connection Lost</p>
                    <p className="text-xs text-muted-foreground">ATM-003: Network connectivity lost</p>
                    <p className="text-xs text-muted-foreground">15 min ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 border border-warning/30 bg-warning/5 rounded-lg">
                  <Activity className="h-4 w-4 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Maintenance Due</p>
                    <p className="text-xs text-muted-foreground">ATM-005: Scheduled maintenance</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency Controls */}
            <Card className="p-6 surface-elevated">
              <h3 className="text-lg font-semibold mb-4">Emergency Controls</h3>
              <div className="space-y-3">
                <Button variant="emergency" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Network-wide Shutdown
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Isolate ATM
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Dispatch Security
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  View All Cameras
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};