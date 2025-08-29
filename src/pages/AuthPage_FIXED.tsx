import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, MessageSquare, Fingerprint, Building, AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react";

export const AuthPage = () => {
  const [authStep, setAuthStep] = useState<'login' | '2fa' | 'success'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement real authentication
    setAuthStep('2fa');
  };

  const handle2FA = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement real 2FA verification
    setAuthStep('success');
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0">
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

        {authStep === "login" && (
          <Card className="p-6">
            <div className="text-center space-y-4 mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <div>
                <h2 className="text-xl font-semibold">Secure Login</h2>
                <p className="text-sm text-muted-foreground">
                  Banking-grade authentication required
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Continue to 2FA
              </Button>
            </form>

            <div className="mt-6 space-y-4">
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
            </div>
          </Card>
        )}

        {authStep === "2fa" && (
          <Card className="p-6">
            <div className="text-center space-y-4 mb-6">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <div>
                <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred verification method
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <Smartphone className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-xs text-muted-foreground">Google Authenticator, Authy, etc.</p>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <MessageSquare className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">SMS Code</p>
                  <p className="text-xs text-muted-foreground">Text message to +1 (555) xxx-1234</p>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start h-auto p-4">
                <Fingerprint className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Biometric</p>
                  <p className="text-xs text-muted-foreground">Fingerprint or Face ID</p>
                </div>
              </Button>
            </div>

            <form onSubmit={handle2FA} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="2fa-code">Enter 6-digit code</Label>
                <Input
                  id="2fa-code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-lg tracking-widest font-mono"
                />
              </div>
              
              <Button type="submit" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify & Access System
              </Button>
            </form>
          </Card>
        )}

        {authStep === "success" && (
          <Card className="p-6 text-center">
            <div className="space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <div>
                <h2 className="text-xl font-semibold text-green-500">Authentication Successful</h2>
                <p className="text-sm text-muted-foreground">
                  Redirecting to your security dashboard...
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </Card>
        )}

        {/* Security Certifications */}
        <div className="text-center space-y-4">
          <p className="text-xs text-muted-foreground">Protected by banking-grade security</p>
          <div className="flex justify-center space-x-4 opacity-60">
            <Badge variant="outline" className="text-xs">SOC 2</Badge>
            <Badge variant="outline" className="text-xs">PCI DSS</Badge>
            <Badge variant="outline" className="text-xs">ISO 27001</Badge>
            <Badge variant="outline" className="text-xs">GDPR</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
