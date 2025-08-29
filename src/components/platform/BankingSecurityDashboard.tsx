import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  Users, 
  Server, 
  Eye, 
  Lock, 
  Zap,
  Bell,
  Settings,
  FileText,
  TrendingUp,
  Globe,
  BarChart3,
  CreditCard
} from 'lucide-react';

// TODO: Connect to backend for real-time security data
// TODO: Add role-based access control and permissions
// TODO: Integrate with emergency response system
// TODO: Add live charts, threat maps, and analytics

interface SecurityMetric {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  description: string;
}

interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: 'APK_BLOCKED' | 'SUSPICIOUS_ACTIVITY' | 'SYSTEM_ALERT' | 'USER_ACTION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  source: string;
  status: 'ACTIVE' | 'RESOLVED' | 'INVESTIGATING';
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  variant: 'default' | 'destructive' | 'warning' | 'success';
}

export const BankingSecurityDashboard: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('MEDIUM');
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [recentEvents, setRecentEvents] = useState<ThreatEvent[]>([]);
  const [emergencyMode, setEmergencyMode] = useState(false);

  // TODO: Replace with real backend data
  useEffect(() => {
    const mockMetrics: SecurityMetric[] = [
      {
        title: 'Active Threats',
        value: 23,
        change: -5,
        trend: 'down',
        color: 'text-destructive',
        description: 'Threats detected in last 24h'
      },
      {
        title: 'Protected Customers',
        value: 98234,
        change: 12,
        trend: 'up',
        color: 'text-green-600',
        description: 'Users under active protection'
      },
      {
        title: 'APKs Analyzed',
        value: 1547,
        change: 8,
        trend: 'up',
        color: 'text-blue-600',
        description: 'Files processed today'
      },
      {
        title: 'System Uptime',
        value: 99.99,
        change: 0,
        trend: 'stable',
        color: 'text-green-600',
        description: 'Current system availability'
      }
    ];

    const mockEvents: ThreatEvent[] = [
      {
        id: '1',
        timestamp: new Date(),
        type: 'APK_BLOCKED',
        severity: 'HIGH',
        message: 'Malicious APK blocked: banking_trojan.apk',
        source: 'Auto-Detection',
        status: 'RESOLVED'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000),
        type: 'SUSPICIOUS_ACTIVITY',
        severity: 'MEDIUM',
        message: 'Multiple failed login attempts from IP: 192.168.1.100',
        source: 'Auth System',
        status: 'INVESTIGATING'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 600000),
        type: 'SYSTEM_ALERT',
        severity: 'LOW',
        message: 'Threat database updated successfully',
        source: 'System',
        status: 'RESOLVED'
      }
    ];

    setSecurityMetrics(mockMetrics);
    setRecentEvents(mockEvents);
  }, []);

  const quickActions: QuickAction[] = [
    {
      title: 'Emergency Lockdown',
      description: 'Immediately lock all banking systems',
      icon: <Lock className="h-8 w-8" />,
      action: () => setEmergencyMode(true),
      variant: 'destructive'
    },
    {
      title: 'Bulk APK Scan',
      description: 'Scan multiple APK files at once',
      icon: <Server className="h-8 w-8" />,
      action: () => console.log('Bulk scan initiated'),
      variant: 'default'
    },
    {
      title: 'Generate Report',
      description: 'Create comprehensive security report',
      icon: <FileText className="h-8 w-8" />,
      action: () => console.log('Report generation started'),
      variant: 'success'
    },
    {
      title: 'Update Threat DB',
      description: 'Refresh global threat intelligence',
      icon: <TrendingUp className="h-8 w-8" />,
      action: () => console.log('Threat database update started'),
      variant: 'warning'
    }
  ];

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-destructive/10 border-destructive text-destructive';
      case 'HIGH': return 'bg-orange-500/10 border-orange-500 text-orange-600';
      case 'MEDIUM': return 'bg-yellow-500/10 border-yellow-500 text-yellow-600';
      case 'LOW': return 'bg-green-500/10 border-green-500 text-green-600';
      default: return 'bg-muted border-muted-foreground text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Banking Security Command Center</h1>
              <p className="text-sm text-muted-foreground">Real-time threat monitoring & emergency response</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Threat Level Indicator */}
            <Badge className={`px-3 py-2 ${getThreatLevelColor(threatLevel)}`}>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse mr-2" />
              {threatLevel} THREAT LEVEL
            </Badge>
            
            {/* Emergency Button */}
            <Button 
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={() => setEmergencyMode(true)}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              EMERGENCY
            </Button>
            
            {/* Notifications */}
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-2 -right-2 bg-destructive text-white text-xs px-1.5 py-0.5 rounded-full">
                3
              </Badge>
            </Button>
            
            {/* Settings */}
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-card/30 backdrop-blur-sm border-r min-h-screen p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Security Monitoring</h3>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Security Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Threat Detection
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              APK Analysis
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Banking Operations</h3>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Customer Security
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Transaction Monitoring
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Server className="h-4 w-4 mr-2" />
              ATM Dashboard
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Emergency Response</h3>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <Zap className="h-4 w-4 mr-2" />
              Emergency Center
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-8">
          {/* Security Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>
                        {metric.title.includes('Uptime') ? `${metric.value}%` : metric.value.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}{metric.title.includes('Uptime') ? '' : '%'}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Security Events */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 h-5 text-primary" />
                  Live Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                        <AlertTriangle className={`h-4 w-4 mt-1 ${
                          event.severity === 'CRITICAL' ? 'text-destructive' :
                          event.severity === 'HIGH' ? 'text-orange-500' :
                          event.severity === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{event.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {event.source}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {event.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {event.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Threat Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Global Threat Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Live threat map</p>
                    <p className="text-xs">TODO: Integrate with backend</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                    <CardContent className="p-4 text-center">
                      <div className={`mx-auto mb-3 ${
                        action.variant === 'destructive' ? 'text-destructive' :
                        action.variant === 'warning' ? 'text-yellow-500' :
                        action.variant === 'success' ? 'text-green-600' : 'text-primary'
                      }`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Alert Modal */}
      {emergencyMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="max-w-md mx-4 border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Emergency Mode Activated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>All banking systems have been locked down. Only authorized personnel can access critical functions.</p>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  onClick={() => setEmergencyMode(false)}
                  className="flex-1"
                >
                  Deactivate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setEmergencyMode(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
