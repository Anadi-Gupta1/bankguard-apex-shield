import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Activity, 
  Target, 
  Zap, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Globe,
  Database,
  Network,
  Eye,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

// TODO: Connect to real analytics backend
// TODO: Integrate with threat intelligence feeds  
// TODO: Add machine learning predictions
// TODO: Connect to APK analysis results

interface ThreatMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ThreatIntelligence {
  id: string;
  threatType: string;
  confidence: number;
  firstSeen: Date;
  lastSeen: Date;
  prevalence: number;
  riskScore: number;
  geographicSpread: string[];
  indicators: string[];
}

interface APKThreatSummary {
  totalScanned: number;
  threatsDetected: number;
  malwareTypes: { [key: string]: number };
  riskDistribution: { [key: string]: number };
  detectionRate: number;
}

interface PredictiveAnalysis {
  nextThreatWindow: string;
  riskIncreaseProb: number;
  targetSectors: string[];
  recommendedActions: string[];
}

export const ThreatAnalyticsDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [threatMetrics, setThreatMetrics] = useState<ThreatMetric[]>([]);
  const [threatIntelligence, setThreatIntelligence] = useState<ThreatIntelligence[]>([]);
  const [apkSummary, setAPKSummary] = useState<APKThreatSummary | null>(null);
  const [predictiveAnalysis, setPredictiveAnalysis] = useState<PredictiveAnalysis | null>(null);

  // TODO: Replace with real backend data
  useEffect(() => {
    const mockThreatMetrics: ThreatMetric[] = [
      {
        name: 'Banking Trojans',
        value: 247,
        change: 18.5,
        trend: 'up',
        severity: 'critical'
      },
      {
        name: 'Phishing Apps',
        value: 189,
        change: -12.3,
        trend: 'down',
        severity: 'high'
      },
      {
        name: 'Credential Stealers',
        value: 156,
        change: 7.8,
        trend: 'up',
        severity: 'high'
      },
      {
        name: 'Fake Banking Apps',
        value: 94,
        change: 23.1,
        trend: 'up',
        severity: 'medium'
      },
      {
        name: 'SMS Interceptors',
        value: 73,
        change: -5.2,
        trend: 'down',
        severity: 'medium'
      },
      {
        name: 'Keyloggers',
        value: 42,
        change: 14.6,
        trend: 'up',
        severity: 'high'
      }
    ];

    const mockThreatIntel: ThreatIntelligence[] = [
      {
        id: 'INTEL-001',
        threatType: 'Anubis Banking Trojan',
        confidence: 95,
        firstSeen: new Date('2024-01-15'),
        lastSeen: new Date(),
        prevalence: 847,
        riskScore: 9.2,
        geographicSpread: ['North America', 'Europe', 'Asia-Pacific'],
        indicators: [
          'com.security.update',
          'banking_overlay_v2.dex',
          'C2: 185.234.xxx.xxx'
        ]
      },
      {
        id: 'INTEL-002',
        threatType: 'FluBot SMS Stealer',
        confidence: 88,
        firstSeen: new Date('2024-01-20'),
        lastSeen: new Date(Date.now() - 86400000),
        prevalence: 623,
        riskScore: 8.4,
        geographicSpread: ['Europe', 'Australia'],
        indicators: [
          'fedex_delivery_app.apk',
          'sms_forward_module',
          'C2: flubot-c2.onion'
        ]
      },
      {
        id: 'INTEL-003',
        threatType: 'Cerberus Banking Malware',
        confidence: 92,
        firstSeen: new Date('2024-01-10'),
        lastSeen: new Date(Date.now() - 43200000),
        prevalence: 1204,
        riskScore: 9.7,
        geographicSpread: ['Global'],
        indicators: [
          'accessibility_service_bot',
          'remote_access_module',
          'C2: cerberus-panel.net'
        ]
      }
    ];

    const mockAPKSummary: APKThreatSummary = {
      totalScanned: 15847,
      threatsDetected: 3298,
      malwareTypes: {
        'Banking Trojans': 892,
        'Phishing Apps': 647,
        'Adware': 523,
        'Spyware': 378,
        'Fake Apps': 312,
        'SMS Stealers': 189,
        'Keyloggers': 156,
        'Remote Access Tools': 134,
        'Clickers': 67
      },
      riskDistribution: {
        'Critical': 12,
        'High': 23,
        'Medium': 41,
        'Low': 24
      },
      detectionRate: 20.8
    };

    const mockPredictiveAnalysis: PredictiveAnalysis = {
      nextThreatWindow: '48-72 hours',
      riskIncreaseProb: 73,
      targetSectors: ['Mobile Banking', 'Digital Wallets', 'Cryptocurrency'],
      recommendedActions: [
        'Increase APK scanning frequency',
        'Update banking trojan signatures',
        'Alert mobile security teams',
        'Enhance user education campaigns'
      ]
    };

    setThreatMetrics(mockThreatMetrics);
    setThreatIntelligence(mockThreatIntel);
    setAPKSummary(mockAPKSummary);
    setPredictiveAnalysis(mockPredictiveAnalysis);
  }, []);

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return <TrendingUp className={`h-4 w-4 ${change > 0 ? 'text-red-500' : 'text-green-500'}`} />;
    } else if (trend === 'down') {
      return <TrendingDown className={`h-4 w-4 ${change < 0 ? 'text-green-500' : 'text-red-500'}`} />;
    }
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Threat Analytics Center</h1>
              <p className="text-sm text-muted-foreground">
                Real-time threat intelligence and predictive analysis
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <div className="flex bg-muted rounded-lg p-1">
              {(['1h', '24h', '7d', '30d'] as const).map((range) => (
                <Button
                  key={range}
                  variant={selectedTimeRange === range ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeRange(range)}
                  className="text-xs"
                >
                  {range.toUpperCase()}
                </Button>
              ))}
            </div>
            
            {/* Real-time Status */}
            <Badge className="px-3 py-2 bg-green-100 text-green-700 border-green-200">
              <Activity className="h-4 w-4 mr-2 animate-pulse" />
              LIVE
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-card/30 backdrop-blur-sm border-r min-h-screen p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Analytics Overview</h3>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Threat Metrics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Target className="h-4 w-4 mr-2" />
              Threat Intelligence
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Zap className="h-4 w-4 mr-2" />
              APK Analysis
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Predictive Analysis</h3>
            <Button variant="ghost" className="w-full justify-start">
              <LineChart className="h-4 w-4 mr-2" />
              Risk Forecasting
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="h-4 w-4 mr-2" />
              Global Trends
            </Button>
            
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 mt-8">Intelligence Feeds</h3>
            <Button variant="ghost" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Threat Databases
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Network className="h-4 w-4 mr-2" />
              IOC Feeds
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="metrics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="metrics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Threat Metrics
              </TabsTrigger>
              <TabsTrigger value="intelligence" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Intelligence
              </TabsTrigger>
              <TabsTrigger value="apk" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                APK Analysis
              </TabsTrigger>
              <TabsTrigger value="predictive" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Predictions
              </TabsTrigger>
            </TabsList>

            {/* Threat Metrics Tab */}
            <TabsContent value="metrics" className="space-y-6">
              {/* Threat Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {threatMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            metric.severity === 'critical' ? 'bg-red-500' :
                            metric.severity === 'high' ? 'bg-orange-500' :
                            metric.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <span className="text-sm text-muted-foreground">{metric.name}</span>
                        </div>
                        <Badge className={`text-xs ${getSeverityColor(metric.severity)}`}>
                          {metric.severity.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{metric.value.toLocaleString()}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {getTrendIcon(metric.trend, metric.change)}
                            <span className={`text-sm font-medium ${
                              (metric.trend === 'up' && metric.change > 0) || 
                              (metric.trend === 'down' && metric.change < 0) 
                                ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {metric.change > 0 ? '+' : ''}{metric.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs text-muted-foreground">
                        Last {selectedTimeRange}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Threat Trends Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Threat Trends Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive threat trends chart</p>
                      <p className="text-sm text-muted-foreground">
                        TODO: Integrate with Chart.js or D3.js
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Threat Intelligence Tab */}
            <TabsContent value="intelligence" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Active Threat Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threatIntelligence.map((intel) => (
                      <div key={intel.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{intel.threatType}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>Risk Score: {intel.riskScore}/10</span>
                              <span>Confidence: {intel.confidence}%</span>
                              <span>Prevalence: {intel.prevalence.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                              intel.riskScore >= 9 ? 'bg-red-100 text-red-800' :
                              intel.riskScore >= 7 ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              Risk: {intel.riskScore}/10
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium mb-2">Geographic Spread</h5>
                            <div className="flex flex-wrap gap-1">
                              {intel.geographicSpread.map((region, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <Globe className="h-3 w-3 mr-1" />
                                  {region}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium mb-2">Key Indicators</h5>
                            <div className="space-y-1">
                              {intel.indicators.slice(0, 2).map((indicator, idx) => (
                                <code key={idx} className="text-xs bg-muted px-2 py-1 rounded block">
                                  {indicator}
                                </code>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Shield className="h-3 w-3 mr-1" />
                            Create Rule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* APK Analysis Tab */}
            <TabsContent value="apk" className="space-y-6">
              {apkSummary && (
                <>
                  {/* APK Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Scanned</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {apkSummary.totalScanned.toLocaleString()}
                            </p>
                          </div>
                          <Shield className="h-8 w-8 text-blue-600" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">APK files analyzed</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Threats Detected</p>
                            <p className="text-2xl font-bold text-red-600">
                              {apkSummary.threatsDetected.toLocaleString()}
                            </p>
                          </div>
                          <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Malicious APKs found</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Detection Rate</p>
                            <p className="text-2xl font-bold text-orange-600">
                              {apkSummary.detectionRate}%
                            </p>
                          </div>
                          <Target className="h-8 w-8 text-orange-600" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Current detection rate</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Clean Files</p>
                            <p className="text-2xl font-bold text-green-600">
                              {(apkSummary.totalScanned - apkSummary.threatsDetected).toLocaleString()}
                            </p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Safe APK files</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Malware Types Distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-primary" />
                          Malware Types Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(apkSummary.malwareTypes).map(([type, count]) => (
                            <div key={type} className="flex items-center justify-between">
                              <span className="text-sm">{type}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ 
                                      width: `${(count / Math.max(...Object.values(apkSummary.malwareTypes))) * 100}%` 
                                    }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12 text-right">
                                  {count}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-primary" />
                          Risk Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.entries(apkSummary.riskDistribution).map(([risk, percentage]) => (
                            <div key={risk} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className={`font-medium ${
                                  risk === 'Critical' ? 'text-red-600' :
                                  risk === 'High' ? 'text-orange-600' :
                                  risk === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                  {risk} Risk
                                </span>
                                <span>{percentage}%</span>
                              </div>
                              <Progress 
                                value={percentage} 
                                className={`h-2 ${
                                  risk === 'Critical' ? '[&>div]:bg-red-500' :
                                  risk === 'High' ? '[&>div]:bg-orange-500' :
                                  risk === 'Medium' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
                                }`}
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            {/* Predictive Analysis Tab */}
            <TabsContent value="predictive" className="space-y-6">
              {predictiveAnalysis && (
                <>
                  <Card className="border-orange-200 bg-orange-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-orange-800">
                        <Clock className="h-5 w-5" />
                        Threat Prediction Alert
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-orange-800 mb-2">Next Threat Window</h4>
                          <p className="text-2xl font-bold text-orange-600 mb-2">
                            {predictiveAnalysis.nextThreatWindow}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Based on historical patterns and current trends
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-800 mb-2">Risk Increase Probability</h4>
                          <div className="flex items-center gap-2">
                            <Progress value={predictiveAnalysis.riskIncreaseProb} className="flex-1" />
                            <span className="text-2xl font-bold text-orange-600">
                              {predictiveAnalysis.riskIncreaseProb}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          Predicted Target Sectors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {predictiveAnalysis.targetSectors.map((sector, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              <span className="font-medium">{sector}</span>
                              <Badge variant="outline" className="ml-auto">
                                High Risk
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Recommended Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {predictiveAnalysis.recommendedActions.map((action, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                              <span className="text-sm">{action}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
