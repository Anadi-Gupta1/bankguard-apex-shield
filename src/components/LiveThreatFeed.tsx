import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Clock, MapPin } from "lucide-react";

interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: "malware" | "phishing" | "trojan" | "adware";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  description: string;
  status: "detected" | "blocked" | "quarantined";
}

export const LiveThreatFeed = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>([]);

  useEffect(() => {
    // Simulate live threat feed
    const generateThreat = (): ThreatEvent => {
      const types: ThreatEvent["type"][] = ["malware", "phishing", "trojan", "adware"];
      const severities: ThreatEvent["severity"][] = ["low", "medium", "high", "critical"];
      const locations = ["New York, US", "London, UK", "Tokyo, JP", "Sydney, AU", "Berlin, DE", "São Paulo, BR"];
      const statuses: ThreatEvent["status"][] = ["detected", "blocked", "quarantined"];
      
      const descriptions = {
        malware: "Malicious APK attempting to access banking credentials",
        phishing: "Fake banking app requesting sensitive user data",
        trojan: "Banking trojan detected with keylogging capabilities",
        adware: "Aggressive adware with potential data collection"
      };

      const type = types[Math.floor(Math.random() * types.length)];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type,
        severity: severities[Math.floor(Math.random() * severities.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        description: descriptions[type],
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    };

    // Initial threats
    const initialThreats = Array.from({ length: 5 }, generateThreat);
    setThreats(initialThreats);

    // Add new threats periodically
    const interval = setInterval(() => {
      const newThreat = generateThreat();
      setThreats(prev => [newThreat, ...prev.slice(0, 9)]); // Keep only 10 most recent
    }, 3000 + Math.random() * 7000); // Random interval between 3-10 seconds

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: ThreatEvent["severity"]) => {
    switch (severity) {
      case "critical": return "text-destructive";
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getStatusColor = (status: ThreatEvent["status"]) => {
    switch (status) {
      case "blocked": return "bg-destructive/20 text-destructive border-destructive/30";
      case "quarantined": return "bg-warning/20 text-warning border-warning/30";
      case "detected": return "bg-primary/20 text-primary border-primary/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getTypeIcon = (type: ThreatEvent["type"]) => {
    switch (type) {
      case "malware":
      case "trojan":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6 surface-elevated h-full max-h-96 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Threat Intelligence</h3>
        <div className="flex items-center space-x-2 text-success">
          <div className="w-2 h-2 bg-success rounded-full pulse-live"></div>
          <span className="text-xs font-medium">LIVE</span>
        </div>
      </div>
      
      <div className="space-y-3 overflow-y-auto max-h-80">
        {threats.map((threat, index) => (
          <div 
            key={threat.id}
            className={`p-3 border border-border rounded-lg transition-smooth hover:border-primary/30 ${
              index === 0 ? 'animate-fade-in bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start justify-between space-x-3">
              <div className="flex items-start space-x-2 flex-1">
                <div className={getSeverityColor(threat.severity)}>
                  {getTypeIcon(threat.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium capitalize">{threat.type}</span>
                    <Badge variant="outline" className={getStatusColor(threat.status)}>
                      {threat.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {threat.description}
                  </p>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{threat.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{threat.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(threat.severity)}`}>
                {threat.severity.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};