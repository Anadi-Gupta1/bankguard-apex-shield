import { Button } from "@/components/ui/button";
import { Shield, Activity, AlertTriangle, Users, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isLive, setIsLive] = useState(true);

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">BankGuard AI</h1>
                <p className="text-xs text-muted-foreground">Advanced Security Platform</p>
              </div>
            </div>
            
            {isLive && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-success/20 border border-success/30 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full pulse-live"></div>
                <span className="text-xs font-medium text-success">LIVE SYSTEM</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Activity className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <AlertTriangle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};