// config/agentConfig.ts

export const AGENT_CONFIG = {
  // Server configuration
  SERVER_URL: process.env.REACT_APP_AGENT_SERVER_URL || 'http://localhost:3001',
  
  // Connection settings
  CONNECTION_TIMEOUT: 10000, // 10 seconds
  RESPONSE_TIMEOUT: 45000, // 45 seconds
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY: 1000, // 1 second
  
  // Message settings
  MAX_MESSAGE_LENGTH: 2000,
  MAX_MESSAGES_HISTORY: 100,
  
  // Feature flags
  ENABLE_WEBSOCKET: true,
  ENABLE_HTTP_FALLBACK: true,
  ENABLE_AUTO_RECONNECT: true,
  ENABLE_AGENT_FORMATTING: true,
  
  // DeFi specific settings
  SUPPORTED_NETWORKS: ['Hedera Testnet', 'Hedera Mainnet'],
  SUPPORTED_TOKENS: ['HBAR', 'USDC', 'SAUCE'],
  ORDER_LIMITS: {
    MIN_HBAR: 0.01,
    MAX_HBAR: 180,
  },
  
  // Agent capabilities
  AGENT_FEATURES: [
    'balance_check',
    'token_transfer',
    'limit_orders',
    'order_monitoring',
    'portfolio_analysis',
    'risk_assessment',
    'transaction_history',
  ] as const,
  
  // UI settings
  TYPING_DELAY: 1500, // Simulated typing delay
  MESSAGE_ANIMATION_DURATION: 300,
  STATUS_UPDATE_INTERVAL: 5000, // 5 seconds
} as const;

export type AgentFeature = typeof AGENT_CONFIG.AGENT_FEATURES[number];

// Validation functions
export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.length <= AGENT_CONFIG.MAX_MESSAGE_LENGTH;
};

export const getServerUrl = (): string => {
  return AGENT_CONFIG.SERVER_URL;
};

// DeFi command patterns for enhanced parsing
export const DEFI_COMMAND_PATTERNS = {
  BALANCE_CHECK: /\b(balance|check.*balance|show.*balance|my.*balance)\b/i,
  CREATE_ORDER: /\b(create.*order|limit.*order|swap|new.*order|place.*order)\b/i,
  MONITOR_ORDERS: /\b(monitor|check.*orders|my.*orders|order.*status|show.*orders)\b/i,
  CANCEL_ORDER: /\b(cancel.*order|remove.*order|delete.*order)\b/i,
  PORTFOLIO: /\b(portfolio|analyze|analysis|optimization|optimize)\b/i,
  TRANSFER: /\b(transfer|send|pay|payment)\b/i,
  HELP: /\b(help|commands|what.*can.*you.*do|capabilities)\b/i,
} as const;