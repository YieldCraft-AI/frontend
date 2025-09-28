// components/agent/AgentStatusIndicator.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Bot, Wifi, WifiOff, AlertTriangle, Loader2 } from "lucide-react";
import { AgentStatus } from "../../hooks/useAgent";

interface AgentStatusIndicatorProps {
  status: AgentStatus;
  showText?: boolean;
  className?: string;
}

export const AgentStatusIndicator: React.FC<AgentStatusIndicatorProps> = ({
  status,
  showText = true,
  className = "",
}) => {
  const getStatusConfig = () => {
    if (status.error) {
      return {
        variant: "destructive" as const,
        icon: <AlertTriangle className="h-3 w-3" />,
        text: "Error",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
      };
    }

    if (status.isProcessing) {
      return {
        variant: "secondary" as const,
        icon: <Loader2 className="h-3 w-3 animate-spin" />,
        text: "Processing",
        color: "text-amber-400",
        bgColor: "bg-amber-500/20",
        borderColor: "border-amber-500/30",
      };
    }

    if (status.isConnected && status.isHealthy) {
      return {
        variant: "secondary" as const,
        icon: (
          <img
            src="/yieldCraftLogo.png"
            alt="YieldCraft Logo"
            width={35}
            height={35}
          />
        ),
        text: "Online",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
      };
    }

    if (status.isConnected && !status.isHealthy) {
      return {
        variant: "secondary" as const,
        icon: <Wifi className="h-3 w-3" />,
        text: "Connected",
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
      };
    }

    return {
      variant: "outline" as const,
      icon: <WifiOff className="h-3 w-3" />,
      text: "Offline",
      color: "text-muted-foreground",
      bgColor: "bg-muted/20",
      borderColor: "border-muted/30",
    };
  };

  const config = getStatusConfig();

  return (
    <Badge
      variant={config.variant}
      className={`flex items-center space-x-1 ${config.bgColor} ${config.borderColor} ${config.color} ${className}`}
    >
      {config.icon}
      {showText && <span>{config.text}</span>}
    </Badge>
  );
};
