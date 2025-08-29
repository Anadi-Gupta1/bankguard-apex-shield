import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Bell,
  Power,
  Truck,
  X
} from 'lucide-react';

// TODO: Connect to backend for real ATM network data
// TODO: Add real-time ATM status monitoring
// TODO: Integrate with transaction processing systems
// TODO: Add emergency response and security controls

interface ATMLocation {
  id: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'online' | 'offline' | 'maintenance' | 'error';
  cashLevel: number;
  alerts: number;
  dailyTransactions: number;
  lastUpdate: Date;
}

interface ATMAlert {
  id: string;
  atmId: string;
  location: string;
  type: 'TAMPERING' | 'LOW_CASH' | 'NETWORK_ERROR' | 'CARD_SKIMMING' | 'SUSPICIOUS_ACTIVITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: Date;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
}

interface NetworkStats {
  totalATMs: number;
  onlineATMs: number;
  activeAlerts: number;
  dailyTransactions: number;
  securityScore: number;
}

export const ATMNetworkDashboard: React.FC = () => {
  const [selectedATM, setSelectedATM] = useState<string | null>(null);
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalATMs: 0,
    onlineATMs: 0,
    activeAlerts: 0,
    dailyTransactions: 0,
    securityScore: 0
  });
  const [atmLocations, setATMLocations] = useState<ATMLocation[]>([]);
  const [alerts, setAlerts] = useState<ATMAlert[]>([]);
  const [emergencyAlert, setEmergencyAlert] = useState<ATMAlert | null>(null);

  // TODO: Replace with real backend data
  useEffect(() => {
    const mockATMs: ATMLocation[] = [
      {
        id: 'ATM-001',
        location: 'Main Street Branch',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        status: 'online',
        cashLevel: 85,
        alerts: 0,
        dailyTransactions: 127,
        lastUpdate: new Date()
      },
      {
        id: 'ATM-002',
        location: 'Downtown Plaza',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        status: 'online',
        cashLevel: 42,
        alerts: 1,
        dailyTransactions: 203,
        lastUpdate: new Date()
      },
      {
        id: 'ATM-003',
        location: 'Airport Terminal',
        coordinates: { lat: 40.6892, lng: -74.1745 },
        status: 'offline',
        cashLevel: 0,
        alerts: 2,
        dailyTransactions: 0,
        lastUpdate: new Date(Date.now() - 3600000)
      },
      {
        id: 'ATM-004',
        location: 'Shopping Mall',
        coordinates: { lat: 40.7282, lng: -73.7949 },
        status: 'online',
        cashLevel: 78,
        alerts: 0,
        dailyTransactions: 156,
        lastUpdate: new Date()
      },
      {
        id: 'ATM-005',
        location: 'University Campus',
        coordinates: { lat: 40.8176, lng: -73.7787 },
        status: 'maintenance',
        cashLevel: 65,
        alerts: 1,
        dailyTransactions: 89,
        lastUpdate: new Date()
      }
    ];

    const mockAlerts: ATMAlert[] = [
      {
        id: 'ALERT-001',
        atmId: 'ATM-002',
        location: 'Downtown Plaza',
        type: 'LOW_CASH',
        severity: 'MEDIUM',
        message: 'Cash level below 50% threshold',
        timestamp: new Date(),
        status: 'ACTIVE'
      },
      {
        id: 'ALERT-002',
        atmId: 'ATM-003',
        location: 'Airport Terminal',
        type: 'NETWORK_ERROR',
        severity: 'HIGH',
        message: 'Lost network connection - ATM offline',
        timestamp: new Date(Date.now() - 1800000),
        status: 'ACTIVE'
      },
      {
        id: 'ALERT-003',
        atmId: 'ATM-003',
        location: 'Airport Terminal',
        type: 'TAMPERING',
        severity: 'CRITICAL',
        message: 'Possible tampering detected - Card reader anomaly',
        timestamp: new Date(Date.now() - 900000),
        status: 'ACTIVE'
      }
    ];

    const mockStats: NetworkStats = {
      totalATMs: mockATMs.length,
      onlineATMs: mockATMs.filter(atm => atm.status === 'online').length,
      activeAlerts: mockAlerts.filter(alert => alert.status === 'ACTIVE').length,
      dailyTransactions: mockATMs.reduce((sum, atm) => sum + atm.dailyTransactions, 0),
      securityScore: 8.7
    };

    setATMLocations(mockATMs);
    setAlerts(mockAlerts);
    setNetworkStats(mockStats);

    // Simulate critical alert
    const criticalAlert = mockAlerts.find(alert => alert.severity === 'CRITICAL');
    if (criticalAlert) {
      setTimeout(() => setEmergencyAlert(criticalAlert), 2000);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100 border-green-200';
      case 'offline': return 'text-red-600 bg-red-100 border-red-200';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'error': return 'text-orange-600 bg-orange-100 border-orange-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-100 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'LOW': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const handleEmergencyShutdown = (atmId: string) => {
    console.log('Emergency shutdown initiated for ATM:', atmId);
    // TODO: Connect to backend emergency shutdown system
  };

  const handleDispatchSecurity = (atmId: string) => {
    console.log('Security dispatched to ATM:', atmId);
    // TODO: Connect to security dispatch system
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">ATM Network Security Center</h1>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring of {networkStats.totalATMs} ATM locations
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Network Status */}
            <Badge className="px-3 py-2 bg-green-100 text-green-700 border-green-200">
              <Wifi className="h-4 w-4 mr-2" />
              {networkStats.onlineATMs}/{networkStats.totalATMs} ONLINE
            </Badge>
            
            {/* Emergency Controls */}
            <Button variant="outline" size="sm" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Network Alert
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              <Power className="h-4 w-4 mr-2" />
              Emergency Shutdown
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-card/30 backdrop-blur-sm border-r min-h-screen p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Network Overview</h3>
            <Button variant="ghost" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              Network Status
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              ATM Locations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Security Monitoring
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Transaction Monitoring</h3>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Live Transactions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Fraud Detection
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Physical Security</h3>
            <Button variant="ghost" className="w-full justify-start">
              <Camera className="h-4 w-4 mr-2" />
              Camera Monitoring
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Alarm Systems
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Emergency Controls</h3>
            <Button variant="ghost" className="w-full justify-start text-red-600">
              <Power className="h-4 w-4 mr-2" />
              Emergency Response
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-8">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Online ATMs</p>
                    <p className="text-2xl font-bold text-green-600">
                      {networkStats.onlineATMs}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {Math.round((networkStats.onlineATMs / networkStats.totalATMs) * 100)}%
                    </div>
                  </div>
                </div>
                <Progress 
                  value={(networkStats.onlineATMs / networkStats.totalATMs) * 100} 
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-2xl font-bold text-red-600">
                      {networkStats.activeAlerts}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Transactions</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {networkStats.dailyTransactions.toLocaleString()}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Across all ATMs</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Security Score</p>
                    <p className="text-2xl font-bold text-green-600">
                      {networkStats.securityScore}/10
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Network security rating</p>
              </CardContent>
            </Card>
          </div>

          {/* ATM Network Map and Live Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ATM Network Map */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  ATM Network Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted/20 rounded-lg p-4">
                  {/* TODO: Replace with interactive map */}
                  <div className="grid grid-cols-3 gap-4 h-full">
                    {atmLocations.map((atm) => (
                      <div
                        key={atm.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getStatusColor(atm.status)}`}
                        onClick={() => setSelectedATM(atm.id)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {atm.status === 'online' ? (
                            <Wifi className="h-4 w-4" />
                          ) : (
                            <WifiOff className="h-4 w-4" />
                          )}
                          <span className="font-medium text-xs">{atm.id}</span>
                        </div>
                        <p className="text-xs mb-1">{atm.location}</p>
                        <div className="flex justify-between text-xs">
                          <span>Cash: {atm.cashLevel}%</span>
                          <span>Alerts: {atm.alerts}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live ATM Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Live ATM Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80">
                  <div className="space-y-3">
                    {atmLocations
                      .filter(atm => atm.alerts > 0 || atm.status !== 'online')
                      .map((atm) => (
                        <div key={atm.id} className="p-3 rounded-lg bg-muted/20 border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{atm.id}</span>
                            <Badge className={`text-xs ${getStatusColor(atm.status)}`}>
                              {atm.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{atm.location}</p>
                          {atm.alerts > 0 && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-orange-500" />
                              <span className="text-xs text-orange-600">
                                {atm.alerts} active alert{atm.alerts > 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Security Alerts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 rounded-lg border">
                    <AlertTriangle className={`h-5 w-5 mt-1 ${
                      alert.severity === 'CRITICAL' ? 'text-red-600' :
                      alert.severity === 'HIGH' ? 'text-orange-500' :
                      alert.severity === 'MEDIUM' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{alert.message}</h4>
                          <p className="text-sm text-muted-foreground">
                            {alert.atmId} - {alert.location}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        {alert.severity === 'CRITICAL' && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            <Power className="h-3 w-3 mr-1" />
                            Emergency Shutdown
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency ATM Alert Modal */}
      {emergencyAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="max-w-lg mx-4 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Bell className="h-6 w-6 animate-pulse" />
                CRITICAL ATM ALERT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-700">
                      {emergencyAlert.atmId}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {emergencyAlert.location}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-red-700 font-medium">
                    {emergencyAlert.type.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {emergencyAlert.message}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleEmergencyShutdown(emergencyAlert.atmId)}
                >
                  <Power className="h-4 w-4 mr-2" />
                  Emergency Shutdown
                </Button>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-600"
                  onClick={() => console.log('Isolate ATM')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Isolate ATM
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDispatchSecurity(emergencyAlert.atmId)}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Dispatch Security
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEmergencyAlert(null)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Acknowledge
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
