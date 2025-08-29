import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, CheckCircle, AlertTriangle, Building, Fingerprint, Eye, EyeOff } from "lucide-react";

// TODO: Connect to backend for NextAuth.js authentication
// TODO: Integrate 2FA with speakeasy and authenticator apps
// TODO: Add biometric authentication with WebAuthn
// TODO: Implement SSO with OAuth providers
// TODO: Add role-based access control and permissions

export const AuthPage: React.FC = () => {
  const [authStep, setAuthStep] = useState<'login' | '2fa' | 'success'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');

  const handleLogin = () => {
    // TODO: Implement real authentication
    setAuthStep('2fa');
  };

  const handleVerification = () => {
    // TODO: Implement real 2FA verification
    setAuthStep('success');
  };

  const redirectToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-pulse"></div>
      </div>
      
      <div className="relative w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">BankGuard AI</h1>
              <p className="text-sm text-muted-foreground">Secure Authentication</p>
            </div>
          </div>
          <Badge variant="outline" className="px-3 py-1 bg-green-50 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Secure Connection Active
          </Badge>
        </div>

        {/* Login Step */}
        {authStep === "login" && (
          <Card className="shadow-lg backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Secure Login</CardTitle>
              <p className="text-muted-foreground">Banking-grade authentication required</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    type="text" 
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleLogin}>
                <Lock className="h-4 w-4 mr-2" />
                Login Securely
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Alternative Methods</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Building className="h-4 w-4 mr-2" />
                  Corporate SSO
                </Button>
                <Button variant="outline" size="sm">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Access
                </Button>
              </div>

              {/* Security Certifications */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">SOC 2</Badge>
                  <Badge variant="outline" className="text-xs">PCI DSS</Badge>
                  <Badge variant="outline" className="text-xs">ISO 27001</Badge>
                  <Badge variant="outline" className="text-xs">GDPR</Badge>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Protected by 256-bit SSL encryption
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Two-Factor Authentication Step */}
        {authStep === "2fa" && (
          <Card className="shadow-lg backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
              <p className="text-muted-foreground">Enter your verification code</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="verification">6-Digit Verification Code</Label>
                  <Input 
                    id="verification"
                    type="text" 
                    className="text-center tracking-widest text-lg"
                    placeholder="000000"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>

              <Button className="w-full" onClick={handleVerification}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify & Continue
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Fingerprint className="h-4 w-4 mr-2" />
                  Use Biometric
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Backup Code
                </Button>
              </div>

              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setAuthStep('login')}
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Success Step */}
        {authStep === "success" && (
          <Card className="shadow-lg backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Authentication Successful</CardTitle>
              <p className="text-muted-foreground">Welcome to BankGuard AI Security Platform</p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>Two-Factor Authentication Complete</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  <span>Security Protocols Activated</span>
                </div>
              </div>

              <div className="animate-pulse">
                <div className="h-2 bg-primary rounded-full"></div>
              </div>
              
              <Button className="w-full" onClick={redirectToDashboard}>
                Continue to Security Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
