// components/landing/WelcomeLanding.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WalletButton } from "../wallet/WalletButton";

export const WelcomeLanding: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 text-primary mb-4">
              <Brain className="h-8 w-8 animate-pulse" />
              <Zap className="h-6 w-6 animate-bounce" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              AI-Powered <span className="gradient-text">DeFi Advisor</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Your intelligent companion for yield optimization, risk
              management, and portfolio strategy. Powered by Hedera's AI Agent
              Kit for seamless DeFi navigation.
            </p>

            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">$2.1M+</div>
                <div className="text-sm text-muted-foreground">
                  Total Value Optimized
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-muted-foreground">
                  Protocols Analyzed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-muted-foreground">
                  AI Monitoring
                </div>
              </div>
            </div>

            <div className="mb-12">
              <WalletButton />
              <p className="text-sm text-muted-foreground mt-4">
                Connect your wallet to access the AI-powered DeFi advisor
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Yield Discovery</h3>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes 50+ protocols to find the best yield
                    opportunities across multiple networks
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Risk Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive risk assessment with real-time monitoring and
                    early warning alerts
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Auto-Optimization
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Automated portfolio rebalancing and yield compounding for
                    maximum returns
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};