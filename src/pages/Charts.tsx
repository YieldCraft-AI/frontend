import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Maximize2,
  Activity,
  Target,
  Wallet
} from "lucide-react";
import { useWallet } from "@/hooks/useHederaWallet";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock chart data
const performanceData = [
  { date: '2025-01', value: 10000, apy: 5.2 },
  { date: '2025-02', value: 10520, apy: 6.1 },
  { date: '2025-03', value: 11200, apy: 7.8 },
  { date: '2025-04', value: 11850, apy: 8.5 },
  { date: '2025-05', value: 12150, apy: 9.2 },
  { date: '2025-06', value: 12450, apy: 10.1 }
];

const protocolDistribution = [
  { name: 'SaucerSwap', value: 42, color: '#8b5cf6' },
  { name: 'Hedera Staking', value: 22, color: '#06d6a0' },
  { name: 'Pangolin', value: 25, color: '#f72585' },
  { name: 'Compound', value: 11, color: '#ffd60a' }
];

const yieldHistory = [
  { date: '2025-01', saucerswap: 14.2, hedera: 6.5, pangolin: 11.8, compound: 3.9 },
  { date: '2025-02', saucerswap: 15.1, hedera: 6.5, pangolin: 12.2, compound: 4.1 },
  { date: '2025-03', saucerswap: 15.8, hedera: 6.5, pangolin: 12.8, compound: 4.3 },
  { date: '2025-04', saucerswap: 14.9, hedera: 6.5, pangolin: 13.1, compound: 4.2 },
  { date: '2025-05', saucerswap: 15.2, hedera: 6.5, pangolin: 12.6, compound: 4.0 },
  { date: '2025-06', saucerswap: 15.2, hedera: 6.5, pangolin: 12.8, compound: 4.2 }
];

const Charts = () => {
  const { isConnected, address, getShortAddress, connectWallet } = useWallet();
  const [selectedChart, setSelectedChart] = useState("performance");
  const [timeframe, setTimeframe] = useState("6m");

  const chartTypes = [
    { key: "performance", label: "Portfolio Performance", icon: TrendingUp },
    { key: "distribution", label: "Protocol Distribution", icon: BarChart3 },
    { key: "yield", label: "Yield Comparison", icon: Activity },
    { key: "rewards", label: "Rewards History", icon: Target }
  ];

  const timeframes = [
    { key: "1m", label: "1M" },
    { key: "3m", label: "3M" },
    { key: "6m", label: "6M" },
    { key: "1y", label: "1Y" },
    { key: "all", label: "All" }
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to view detailed charts and analytics for your DeFi positions.
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

  const renderChart = () => {
    switch (selectedChart) {
      case "performance":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(263, 70%, 50%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(263, 70%, 50%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
              <XAxis dataKey="date" stroke="hsl(240, 5%, 64.9%)" />
              <YAxis stroke="hsl(240, 5%, 64.9%)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240, 10%, 3.9%)', 
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(263, 70%, 50%)" 
                fill="url(#valueGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case "distribution":
        return (
          <div className="flex items-center justify-center h-[400px]">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={protocolDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {protocolDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="ml-8 space-y-3">
              {protocolDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "yield":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={yieldHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 3.7%, 15.9%)" />
              <XAxis dataKey="date" stroke="hsl(240, 5%, 64.9%)" />
              <YAxis stroke="hsl(240, 5%, 64.9%)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240, 10%, 3.9%)', 
                  border: '1px solid hsl(240, 3.7%, 15.9%)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="saucerswap" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="hedera" stroke="#06d6a0" strokeWidth={2} />
              <Line type="monotone" dataKey="pangolin" stroke="#f72585" strokeWidth={2} />
              <Line type="monotone" dataKey="compound" stroke="#ffd60a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Chart data will be available soon</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Portfolio Analytics</h1>
                <p className="text-muted-foreground">
                  Detailed charts and insights for {getShortAddress(address)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Chart Type Selection */}
            <div className="flex flex-wrap gap-2 mb-4">
              {chartTypes.map((chart) => {
                const Icon = chart.icon;
                return (
                  <Button
                    key={chart.key}
                    variant={selectedChart === chart.key ? "default" : "outline"}
                    onClick={() => setSelectedChart(chart.key)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{chart.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Timeframe Selection */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {timeframes.map((tf) => (
                <Button
                  key={tf.key}
                  variant={timeframe === tf.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(tf.key)}
                >
                  {tf.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Chart */}
          <Card className="glass border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {chartTypes.find(c => c.key === selectedChart)?.label || "Chart"}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-primary/20">
                    {timeframe.toUpperCase()}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderChart()}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Performing</p>
                    <p className="text-lg font-bold">SaucerSwap</p>
                    <p className="text-sm text-green-400">+15.2% APY</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Most Stable</p>
                    <p className="text-lg font-bold">Hedera Staking</p>
                    <p className="text-sm text-blue-400">6.5% APY</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Growth</p>
                    <p className="text-lg font-bold">+24.5%</p>
                    <p className="text-sm text-purple-400">Last 6 months</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Charts;