import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ThreatCounterProps {
  title: string;
  count: number;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
  variant?: "threat" | "success" | "warning" | "default";
}

export const ThreatCounter = ({ title, count, trend, icon, variant = "default" }: ThreatCounterProps) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = Math.ceil(count / 50);
      const interval = setInterval(() => {
        setDisplayCount(prev => {
          if (prev >= count) {
            clearInterval(interval);
            return count;
          }
          return prev + increment;
        });
      }, 30);
    }, 100);

    return () => clearTimeout(timer);
  }, [count]);

  const getVariantStyles = () => {
    switch (variant) {
      case "threat":
        return "border-destructive/30 bg-destructive/5 glow-threat";
      case "success":
        return "border-success/30 bg-success/5 glow-success";
      case "warning":
        return "border-warning/30 bg-warning/5";
      default:
        return "border-primary/30 bg-primary/5 glow-primary";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-destructive";
      case "down":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`p-6 transition-smooth hover:scale-105 ${getVariantStyles()}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="space-y-1">
            <p className="text-3xl font-bold font-mono">
              {displayCount.toLocaleString()}
            </p>
            <div className={`flex items-center text-xs ${getTrendColor()}`}>
              <span>24h trend: {trend}</span>
            </div>
          </div>
        </div>
        <div className="text-primary opacity-60">
          {icon}
        </div>
      </div>
    </Card>
  );
};