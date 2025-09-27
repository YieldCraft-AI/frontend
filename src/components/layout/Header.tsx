import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useWallet } from "@/hooks/useHederaWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Zap, Wallet, ChevronDown, Home, Bot, BarChart3, FileText, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";

const NavigationTab = ({ href, children, icon: Icon, isActive = false }) => {
  return (
    <a
      href={href}
      className={`
        relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl
        transition-all duration-300 ease-out
        ${isActive 
          ? 'text-primary bg-primary/10 shadow-lg shadow-primary/20 border border-primary/20' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
        }
        hover:shadow-md hover:scale-105 hover:-translate-y-0.5
        backdrop-blur-sm
      `}
    >
      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
      <span className="font-medium text-sm tracking-wide">{children}</span>
      
      {/* Animated underline */}
      <div className={`
        absolute -bottom-1 left-1/2 transform -translate-x-1/2
        h-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-full
        transition-all duration-300
        ${isActive ? 'w-3/4 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-70'}
      `} />
      
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10
        transition-opacity duration-300
        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
      `} />
    </a>
  );
};

export const Header = () => {
  const {
    isConnected,
    address,
    getShortAddress,
    getNetworkName,
    connectWallet,
    disconnect,
  } = useWallet();

  const [activeTab, setActiveTab] = useState("/");

  // Update active tab based on current location
  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  return (
    <header className="glass border-b border-primary/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/yieldCraftLogo.png"
                  alt="YieldCraft Logo"
                  width={70}
                  height={70}
                  className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text">
                  YieldCraft AI
                </span>
                <span className="text-xs text-muted-foreground/70 font-medium tracking-wider">
                  Smart DeFi Yield
                </span>
              </div>
            </div>
          </div>

          {/* Center: Elegant Navigation */}
          <nav className="hidden md:flex items-center space-x-2 bg-background/50 backdrop-blur-sm">
            <NavigationTab 
              href="/" 
              icon={Home}
              isActive={activeTab === "/"}
            >
              Home
            </NavigationTab>
            
            <NavigationTab 
              href="/yield" 
              icon={Bot}
              isActive={activeTab === "/yield"}
            >
              AI Agent
            </NavigationTab>
            
            {isConnected && (
              <>
                <NavigationTab 
                  href="/portfolio" 
                  icon={Briefcase}
                  isActive={activeTab === "/portfolio"}
                >
                  Portfolio
                </NavigationTab>
                
                <NavigationTab 
                  href="/charts" 
                  icon={BarChart3}
                  isActive={activeTab === "/charts"}
                >
                  Charts
                </NavigationTab>
              </>
            )}
            
            <NavigationTab 
              href="/docs" 
              icon={FileText}
              isActive={activeTab === "/docs"}
            >
              Docs
            </NavigationTab>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ThemeToggle />
            </div>
            
            {!isConnected ? (
              <Button 
                variant="hero" 
                size="sm" 
                className="relative overflow-hidden group shadow-lg hover:shadow-primary/25 transition-all duration-300"
                asChild
              >
                <a href="/yield" className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <span className="font-medium">Start Earning</span>
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="hero"
                    className="relative flex items-center space-x-2 shadow-lg hover:shadow-primary/25 transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500/50"></div>
                    <Wallet className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="font-medium">{getShortAddress()}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 glass border-primary/20 shadow-xl"
                >
                  <div className="px-3 py-2 bg-gradient-to-r from-primary/10 to-transparent rounded-t-md">
                    <div className="text-sm font-medium flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Connected to {getNetworkName()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground break-all font-mono mt-1 bg-background/50 rounded px-2 py-1">
                      {address}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(address)}
                    className="hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <span className="font-medium">Copy Address</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/10" />
                  <DropdownMenuItem
                    onClick={disconnect}
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer font-medium"
                  >
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};