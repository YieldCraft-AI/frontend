import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Target,
  Clock,
  Activity,
  Wallet,
  ArrowRight,
  BarChart3,
  Zap,
  Shield,
  Lock,
  Coins
} from "lucide-react";
import { useWallet } from "@/hooks/useHederaWallet";

// Mock portfolio data
const portfolioData = {
  totalValue: 12450.32,
  totalChange: 8.45,
  positions: [
    {
      id: 1,
      protocol: "SaucerSwap",
      pair: "HBAR/USDC",
      type: "Liquidity Pool",
      amount: 5000,
      apy: 15.2,
      value: 5234.12,
      change: 4.68,
      rewards: 245.30,
      duration: "45 days",
      risk: "Medium",
      status: "Active"
    },
    {
      id: 2,
      protocol: "Hedera Staking",
      pair: "HBAR",
      type: "Native Staking", 
      amount: 2500,
      apy: 6.5,
      value: 2687.50,
      change: 7.5,
      rewards: 89.25,
      duration: "120 days",
      risk: "Low",
      status: "Active"
    },
    {
      id: 3,
      protocol: "Pangolin",
      pair: "AVAX/USDC",
      type: "Yield Farming",
      amount: 3000,
      apy: 12.8,
      value: 3156.90,
      change: 5.23,
      rewards: 145.67,
      duration: "30 days", 
      risk: "Medium",
      status: "Active"
    },
    {
      id: 4,
      protocol: "Compound",
      pair: "ETH",
      type: "Lending",
      amount: 1500,
      apy: 4.2,
      value: 1371.80,
      change: -8.55,
      rewards: 52.15,
      duration: "60 days",
      risk: "Low",
      status: "Active"
    }
  ],
  vaults: [
    {
      id: 1,
      name: "HBAR Yield Vault",
      protocol: "Hedera Vault",
      strategy: "Automated Yield Optimization",
      tvl: 125000,
      apy: 18.5,
      userDeposit: 3500,
      userShare: 2.8,
      autoCompound: true,
      lockPeriod: "None",
      risk: "Medium",
      performance: 12.3
    },
    {
      id: 2,
      name: "Multi-Asset Vault",
      protocol: "DeFi Vault",
      strategy: "Cross-Protocol Farming",
      tvl: 89000,
      apy: 22.1,
      userDeposit: 2100,
      userShare: 2.36,
      autoCompound: true,
      lockPeriod: "7 days",
      risk: "High",
      performance: 8.7
    },
    {
      id: 3,
      name: "Stable Yield Vault",
      protocol: "Stable Vault",
      strategy: "Stablecoin Optimization",
      tvl: 234000,
      apy: 8.9,
      userDeposit: 4200,
      userShare: 1.79,
      autoCompound: true,
      lockPeriod: "None",
      risk: "Low",
      performance: 15.2
    }
  ],
  assets: [
    {
      id: 1,
      symbol: "HBAR",
      name: "Hedera Hashgraph",
      balance: 15420.50,
      value: 6834.22,
      price: 0.443,
      change24h: 5.23,
      allocation: 54.9
    },
    {
      id: 2,
      symbol: "USDC",
      name: "USD Coin",
      balance: 2156.80,
      value: 2156.80,
      price: 1.00,
      change24h: 0.01,
      allocation: 17.3
    },
    {
      id: 3,
      symbol: "ETH",
      name: "Ethereum",
      balance: 0.89,
      value: 2134.56,
      price: 2398.84,
      change24h: -2.1,
      allocation: 17.1
    },
    {
      id: 4,
      symbol: "AVAX",
      name: "Avalanche",
      balance: 48.2,
      value: 1324.98,
      price: 27.49,
      change24h: 3.8,
      allocation: 10.6
    }
  ]
};

const Portfolio = () => {
  const { isConnected, address, getShortAddress, connectWallet } = useWallet();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [activeTab, setActiveTab] = useState("positions");

  const timeframes = [
    { key: "24h", label: "24H" },
    { key: "7d", label: "7D" },
    { key: "30d", label: "30D" },
    { key: "90d", label: "90D" },
    { key: "1y", label: "1Y" }
  ];

  const tabs = [
    { key: "positions", label: "Positions", icon: Activity },
    { key: "vaults", label: "Vaults", icon: Shield },
    { key: "assets", label: "Assets", icon: Coins }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to view your portfolio and track your DeFi positions across all protocols.
            </p>
            <Button onClick={connectWallet} className="bg-primary hover:bg-primary/90">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderPositionsContent = () => (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Positions</span>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Charts
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Protocol</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Value</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">APY</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rewards</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Risk</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Duration</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.positions.map((position) => (
                <tr key={position.id} className="border-b border-border/30 hover:bg-primary/5">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{position.protocol}</p>
                      <p className="text-sm text-muted-foreground">{position.pair}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="border-primary/20">
                      {position.type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">${position.value.toLocaleString()}</p>
                      <div className="flex items-center">
                        {position.change > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                        )}
                        <span className={`text-xs ${position.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {position.change > 0 ? '+' : ''}{position.change}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-green-400">{position.apy}%</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">${position.rewards.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Claimable</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getRiskColor(position.risk)}>
                      {position.risk}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-sm">{position.duration}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Claim
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderVaultsContent = () => (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Vault Positions</span>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            Explore Vaults
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vault</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Strategy</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">TVL</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">APY</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Your Deposit</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Performance</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Risk</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.vaults.map((vault) => (
                <tr key={vault.id} className="border-b border-border/30 hover:bg-primary/5">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{vault.name}</p>
                      <p className="text-sm text-muted-foreground">{vault.protocol}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm">{vault.strategy}</p>
                      <div className="flex items-center mt-1">
                        {vault.autoCompound && (
                          <Badge variant="outline" className="text-xs mr-2 border-green-500/30 text-green-400">
                            Auto-compound
                          </Badge>
                        )}
                        {vault.lockPeriod !== "None" && (
                          <div className="flex items-center">
                            <Lock className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-xs text-yellow-400">{vault.lockPeriod}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">${vault.tvl.toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-green-400">{vault.apy}%</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">${vault.userDeposit.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{vault.userShare}% of vault</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+{vault.performance}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={getRiskColor(vault.risk)}>
                      {vault.risk}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Deposit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Withdraw
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderAssetsContent = () => (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Asset Holdings</span>
          <Button variant="outline" size="sm">
            <Coins className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Asset</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Balance</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">24h Change</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Value</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Allocation</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.assets.map((asset) => (
                <tr key={asset.id} className="border-b border-border/30 hover:bg-primary/5">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold">{asset.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{asset.symbol}</p>
                        <p className="text-sm text-muted-foreground">{asset.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{asset.balance.toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">${asset.price.toFixed(4)}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {asset.change24h > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
                      )}
                      <span className={`text-sm ${asset.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">${asset.value.toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-12 h-2 bg-gray-700 rounded-full mr-2">
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ width: `${asset.allocation}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{asset.allocation}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        Send
                      </Button>
                      <Button variant="ghost" size="sm">
                        Swap
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Portfolio Overview</h1>
                <p className="text-muted-foreground">
                  Connected: {getShortAddress(address)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.key}
                    variant={selectedTimeframe === timeframe.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe.key)}
                    className="text-xs"
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                    <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+{portfolioData.totalChange}%</span>
                  <span className="text-muted-foreground text-sm ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Positions</p>
                    <p className="text-2xl font-bold">{portfolioData.positions.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <Activity className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-sm">All Active</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rewards</p>
                    <p className="text-2xl font-bold">
                      ${portfolioData.positions.reduce((sum, pos) => sum + pos.rewards, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-sm">Ready to claim</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg APY</p>
                    <p className="text-2xl font-bold">
                      {(portfolioData.positions.reduce((sum, pos) => sum + pos.apy, 0) / portfolioData.positions.length).toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">Above market avg</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-card/50 p-1 rounded-lg w-fit">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "positions" && renderPositionsContent()}
          {activeTab === "vaults" && renderVaultsContent()}
          {activeTab === "assets" && renderAssetsContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;