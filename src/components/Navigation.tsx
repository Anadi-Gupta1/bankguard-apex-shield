import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  BarChart3,
  Smartphone,
  CreditCard,
  FileSearch,
  AlertCircle,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isLive, setIsLive] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: Activity },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/apk-analysis", label: "APK Analysis", icon: Smartphone },
    { path: "/atm", label: "ATM Security", icon: CreditCard },
    { path: "/emergency", label: "Emergency", icon: AlertCircle },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">BankGuard AI</h1>
                <p className="text-xs text-muted-foreground">Advanced Security Platform</p>
              </div>
            </div>
            
            {isLive && (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">LIVE SYSTEM</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActiveRoute(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Threat Level Indicator */}
            <Badge variant="outline" className="hidden md:flex bg-orange-50 border-orange-200 text-orange-700">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Moderate Risk
            </Badge>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="icon"
                title="System Activity"
                onClick={() => handleNavigation("/analytics")}
              >
                <Activity className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                title="Threat Alerts"
                onClick={() => handleNavigation("/emergency")}
              >
                <AlertTriangle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                title="User Management"
              >
                <Users className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                title="Logout"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 mt-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isActiveRoute(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              
              {/* Mobile Action Buttons */}
              <div className="border-t border-border pt-2 mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleNavigation("/analytics")}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Activity
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleNavigation("/emergency")}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Alerts
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
                
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Mobile Live Status */}
              {isLive && (
                <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">LIVE SYSTEM</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};