// components/layout/ConnectedHeader.tsx
import React from "react";
import { Brain } from "lucide-react";
import { WalletButton } from "../wallet/WalletButton";
import { NetworkSwitcher } from "../wallet/NetworkSwitcher";
import { AgentStatusIndicator } from "../agent/AgentStatusIndicator";
import { AgentStatus } from "../../hooks/useAgent";

interface ConnectedHeaderProps {
  agentStatus: AgentStatus;
  onReconnectAgent?: () => void;
}

export const ConnectedHeader: React.FC<ConnectedHeaderProps> = ({
  agentStatus,
  onReconnectAgent,
}) => {
  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-primary">
              <Brain className="h-6 w-6" />
              <a href="/" className="flex items-center space-x-2">
                <span className="text-lg font-bold">YieldCraft AI</span>
              </a>
            </div>
            <AgentStatusIndicator
              status={agentStatus}
              className="cursor-pointer"
              onClick={agentStatus.error ? onReconnectAgent : undefined}
            />
          </div>

          <div className="flex items-center space-x-3">
            <NetworkSwitcher />
            <WalletButton />
          </div>
        </div>
      </div>
    </div>
  );
};
