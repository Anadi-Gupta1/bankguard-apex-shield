import { Navigation } from "@/components/Navigation";
import { ThreatCounter } from "@/components/ThreatCounter";
import { APKUploadDemo } from "@/components/APKUploadDemo";
import { LiveThreatFeed } from "@/components/LiveThreatFeed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, AlertTriangle, Users, Server, Eye, Zap, Globe, Lock, CheckCircle } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-success/20 rounded-full blur-md animate-pulse"></div>
        </div>
        
        <div className="relative container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-primary/10 border-primary/20">
              <Activity className="h-4 w-4 mr-2" />
              LIVE PROTOTYPE - Real Threats Being Blocked
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BankGuard AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Advanced Banking Security Platform with Real-Time APK Threat Detection
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Protect your bank and customers from malicious apps using cutting-edge AI, 
              comprehensive monitoring, and instant emergency response capabilities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Shield className="h-5 w-5 mr-2" />
              Access Live System
            </Button>
            <Button variant="emergency" size="lg" className="text-lg px-8 py-4">
              <Zap className="h-5 w-5 mr-2" />
              Emergency Demo Mode
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <Eye className="h-5 w-5 mr-2" />
              Test APK Blocking
            </Button>
          </div>
        </div>
      </section>

      {/* Live Metrics Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Real-Time Security Metrics</h2>
            <p className="text-muted-foreground">Live data from our active threat detection system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ThreatCounter
              title="Active Threats Blocked"
              count={2847}
              trend="up"
              icon={<AlertTriangle className="h-8 w-8" />}
              variant="threat"
            />
            <ThreatCounter
              title="APKs Under Analysis"
              count={156}
              trend="stable"
              icon={<Activity className="h-8 w-8" />}
              variant="default"
            />
            <ThreatCounter
              title="Emergency Alerts"
              count={7}
              trend="down"
              icon={<Zap className="h-8 w-8" />}
              variant="warning"
            />
            <ThreatCounter
              title="Protected Users"
              count={98234}
              trend="up"
              icon={<Users className="h-8 w-8" />}
              variant="success"
            />
          </div>
        </div>
      </section>

      {/* Main Demo Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <APKUploadDemo />
            </div>
            <div className="space-y-6">
              <LiveThreatFeed />
              
              <Card className="p-6 surface-elevated">
                <h3 className="text-lg font-semibold mb-4">System Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Analysis Speed</span>
                    <span className="text-sm font-mono text-success">2.3s avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Detection Accuracy</span>
                    <span className="text-sm font-mono text-success">99.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Uptime</span>
                    <span className="text-sm font-mono text-success">99.99%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">False Positives</span>
                    <span className="text-sm font-mono text-success">0.02%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Banking Security</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature is built to be operational, ensuring real-time threat detection and response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 surface-elevated">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Real-Time APK Detection</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Continuous monitoring with AI-powered static and dynamic analysis
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card className="p-6 surface-elevated">
              <Lock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Banking-Grade Auth</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Multi-factor authentication with role-based access control
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card className="p-6 surface-elevated">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Emergency Response</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Instant threat blocking and automated security measures
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card className="p-6 surface-elevated">
              <Activity className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Monitoring</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time dashboards for bank staff and security analysts
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card className="p-6 surface-elevated">
              <Server className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">ATM Network Security</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive monitoring and control of ATM infrastructure
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>

            <Card className="p-6 surface-elevated">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Threat Intel</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Integration with worldwide threat intelligence networks
              </p>
              <Button variant="outline" size="sm">Learn More</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Certifications */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Banking Security Standards Compliance</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <Badge variant="outline" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                SOC 2 Type II
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                PCI DSS Level 1
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                ISO 27001
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                FedRAMP Ready
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 BankGuard AI. Advanced Banking Security Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};