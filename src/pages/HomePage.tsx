import React from "react";
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
      {/* Hero Section - Full Black with Neon Effects */}
      <section className="relative min-h-screen py-16 px-4 overflow-hidden flex items-center">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-neon-cyan/20 rounded-full blur-xl float-animation"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-neon-blue/20 rounded-full blur-lg float-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-neon-green/20 rounded-full blur-md float-animation" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-32 right-1/4 w-20 h-20 bg-neon-purple/20 rounded-full blur-lg float-animation" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative container mx-auto text-center space-y-8 z-10">
          <div className="space-y-6">
            <Badge variant="outline" className="px-6 py-3 text-sm glass-elevated border-neon-cyan glow-cyan pulse-glow">
              <Activity className="h-4 w-4 mr-2 text-neon-cyan" />
              <span className="text-glow-cyan font-semibold">LIVE SYSTEM - Real Threats Being Blocked</span>
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gradient-neon leading-tight">
              BankGuard AI
            </h1>
            
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-glow-cyan max-w-4xl mx-auto font-medium">
                Advanced Banking Security Platform with Real-Time APK Threat Detection
              </p>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Protect your bank and customers from malicious apps using cutting-edge AI, 
                comprehensive monitoring, and instant emergency response capabilities.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button variant="hero" size="lg" className="text-lg px-10 py-5 font-semibold">
              <Shield className="h-6 w-6 mr-3" />
              Access Live System
            </Button>
            <Button variant="emergency" size="lg" className="text-lg px-10 py-5 font-semibold">
              <Zap className="h-6 w-6 mr-3" />
              Emergency Demo Mode
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-5 font-semibold">
              <Eye className="h-6 w-6 mr-3" />
              Test APK Blocking
            </Button>
          </div>
        </div>
      </section>

      {/* 3D Model Showcase Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-glow-cyan">Interactive Banking Security</h2>
            <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
              Experience our advanced security platform through interactive 3D visualization
            </p>
          </div>

          <div className="flex justify-center">
            {/* Credit/Debit Card Security Visualization */}
            <div className="max-w-4xl w-full">
              <div className="glass-elevated p-8">
                <h3 className="text-2xl font-semibold mb-4 text-glow-blue text-center">Card Security Analysis</h3>
                <p className="text-foreground/70 mb-6 text-center max-w-2xl mx-auto">
                  Real-time monitoring and protection of credit and debit card transactions with advanced fraud detection algorithms.
                </p>
                <div className="h-96 w-full rounded-lg overflow-hidden border border-neon-blue/30 hover:border-neon-cyan/50 transition-colors">
                  <iframe 
                    src='https://my.spline.design/creditdebitcard3ddesignwithanimationforweb-VoBj2BMkofCmN2mTipZyVXbL/' 
                    frameBorder='0' 
                    width='100%' 
                    height='100%'
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Metrics Section - Neon Glass Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-glow-cyan">Real-Time Security Metrics</h2>
            <p className="text-foreground/70 text-lg">Live data from our active threat detection system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ThreatCounter
              title="Active Threats Blocked"
              count={2847}
              trend="up"
              icon={<AlertTriangle className="h-10 w-10" />}
              variant="threat"
            />
            <ThreatCounter
              title="APKs Under Analysis"
              count={156}
              trend="stable"
              icon={<Activity className="h-10 w-10" />}
              variant="default"
            />
            <ThreatCounter
              title="Emergency Alerts"
              count={7}
              trend="down"
              icon={<Zap className="h-10 w-10" />}
              variant="warning"
            />
            <ThreatCounter
              title="Protected Users"
              count={98234}
              trend="up"
              icon={<Users className="h-10 w-10" />}
              variant="success"
            />
          </div>
        </div>
      </section>

      {/* Main Demo Section - Interactive Glass Panels */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <APKUploadDemo />
            </div>
            <div className="space-y-8">
              <LiveThreatFeed />
              
              <div className="glass-elevated p-8 hover-glow transition-glow">
                <h3 className="text-xl font-semibold mb-6 text-glow-cyan">System Performance</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80">Analysis Speed</span>
                    <span className="text-lg font-mono text-glow-green font-bold">2.3s avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80">Detection Accuracy</span>
                    <span className="text-lg font-mono text-glow-green font-bold">99.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80">System Uptime</span>
                    <span className="text-lg font-mono text-glow-green font-bold">99.99%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/80">False Positives</span>
                    <span className="text-lg font-mono text-glow-green font-bold">0.02%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Glass Morphism Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-glow-cyan">Comprehensive Banking Security</h2>
            <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
              Every feature is built to be operational, ensuring real-time threat detection and response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="glass-elevated p-8 hover-glow transition-all duration-300 group">
              <Shield className="h-12 w-12 text-neon-blue mb-6 glow-blue group-hover:text-neon-cyan group-hover:glow-cyan transition-all" />
              <h3 className="text-xl font-semibold mb-4 text-glow-blue group-hover:text-glow-cyan transition-colors">Real-Time APK Detection</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Continuous monitoring with AI-powered static and dynamic analysis
              </p>
              <Button variant="outline" size="sm" className="group-hover:glow-cyan">Learn More</Button>
            </div>

            <div className="glass-elevated p-8 hover-glow transition-all duration-300 group">
              <Lock className="h-12 w-12 text-neon-green mb-6 glow-green group-hover:text-neon-cyan group-hover:glow-cyan transition-all" />
              <h3 className="text-xl font-semibold mb-4 text-glow-green group-hover:text-glow-cyan transition-colors">Banking-Grade Auth</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Multi-factor authentication with role-based access control
              </p>
              <Button variant="outline" size="sm" className="group-hover:glow-cyan">Learn More</Button>
            </div>

            <div className="glass-elevated p-8 hover-glow transition-all duration-300 group">
              <Zap className="h-12 w-12 text-neon-purple mb-6 glow-purple group-hover:text-neon-cyan group-hover:glow-cyan transition-all" />
              <h3 className="text-xl font-semibold mb-4 text-glow-purple group-hover:text-glow-cyan transition-colors">Emergency Response</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Instant threat blocking and automated security measures
              </p>
              <Button variant="outline" size="sm" className="group-hover:glow-cyan">Learn More</Button>
            </div>

            <div className="glass-elevated p-8 hover-glow transition-all duration-300 group">
              <Activity className="h-12 w-12 text-neon-cyan mb-6 glow-cyan group-hover:text-neon-blue group-hover:glow-blue transition-all" />
              <h3 className="text-xl font-semibold mb-4 text-glow-cyan group-hover:text-glow-blue transition-colors">Live Monitoring</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Real-time dashboards for bank staff and security analysts
              </p>
              <Button variant="outline" size="sm" className="group-hover:glow-blue">Learn More</Button>
            </div>

            <div className="glass-elevated p-8 hover-glow transition-all duration-300 group">
              <Server className="h-12 w-12 text-neon-blue mb-6 glow-blue group-hover:text-neon-green group-hover:glow-green transition-all" />
              <h3 className="text-xl font-semibold mb-4 text-glow-blue group-hover:text-glow-green transition-colors">ATM Network Security</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Comprehensive monitoring and control of ATM infrastructure
              </p>
              <Button variant="outline" size="sm" className="group-hover:glow-green">Learn More</Button>
            </div>

            <div className="glass-elevated p-8 hover-glow transition-all duration-300 group">
              <Globe className="h-12 w-12 text-neon-green mb-6 glow-green group-hover:text-neon-purple group-hover:glow-purple transition-all" />
              <h3 className="text-xl font-semibold mb-4 text-glow-green group-hover:text-glow-purple transition-colors">Global Threat Intel</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Integration with worldwide threat intelligence networks
              </p>
              <Button variant="outline" size="sm" className="group-hover:glow-purple">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Certifications - Neon Badges */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-glow-cyan">Banking Security Standards Compliance</h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Badge variant="outline" className="px-6 py-3 glass-card border-neon-green glow-green hover:glow-cyan transition-glow">
                <CheckCircle className="h-5 w-5 mr-3 text-neon-green" />
                <span className="text-glow-green font-semibold">SOC 2 Type II</span>
              </Badge>
              <Badge variant="outline" className="px-6 py-3 glass-card border-neon-blue glow-blue hover:glow-cyan transition-glow">
                <CheckCircle className="h-5 w-5 mr-3 text-neon-blue" />
                <span className="text-glow-blue font-semibold">PCI DSS Level 1</span>
              </Badge>
              <Badge variant="outline" className="px-6 py-3 glass-card border-neon-cyan glow-cyan hover:glow-green transition-glow">
                <CheckCircle className="h-5 w-5 mr-3 text-neon-cyan" />
                <span className="text-glow-cyan font-semibold">ISO 27001</span>
              </Badge>
              <Badge variant="outline" className="px-6 py-3 glass-card border-neon-purple glow-purple hover:glow-blue transition-glow">
                <CheckCircle className="h-5 w-5 mr-3 text-neon-purple" />
                <span className="text-glow-purple font-semibold">GDPR Compliant</span>
              </Badge>
              <Badge variant="outline" className="px-6 py-3 glass-card border-neon-green glow-green hover:glow-purple transition-glow">
                <CheckCircle className="h-5 w-5 mr-3 text-neon-green" />
                <span className="text-glow-green font-semibold">FedRAMP Ready</span>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal Neon */}
      <footer className="border-t border-neon-cyan/20 py-12 px-4 glass-card">
        <div className="container mx-auto text-center">
          <p className="text-foreground/60 text-sm">
            © 2024 <span className="text-glow-cyan font-semibold">BankGuard AI</span>. Advanced Banking Security Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};