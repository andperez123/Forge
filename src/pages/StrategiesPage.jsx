import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Zap, ExternalLink, Star, Clock, DollarSign } from 'lucide-react';

// Hardcoded strategies data - ready for Firebase integration
const STRATEGIES_DATA = [
  {
    id: 'lido-arbitrum',
    name: 'Lido + Arbitrum Yield Strategy',
    description: 'Maximize yield by staking ETH with Lido and bridging to Arbitrum for additional DeFi opportunities.',
    apy: 31.2,
    risk: 'Low',
    tvl: 25000000,
    chains: ['Ethereum', 'Arbitrum'],
    protocols: ['Lido', 'Arbitrum Bridge', 'Curve', 'Convex'],
    category: 'Liquid Staking',
    tags: ['Liquid Staking', 'Cross-chain', 'Low Risk', 'High Yield'],
    steps: [
      'Stake ETH on Lido for stETH',
      'Bridge stETH to Arbitrum',
      'Provide liquidity on Curve stETH/ETH pool',
      'Stake LP tokens on Convex for additional rewards'
    ],
    featured: true,
    timeToSetup: '15 min',
    minInvestment: 100,
    maxInvestment: 1000,
    lastUpdated: '2024-01-15',
    performance: {
      '7d': 2.1,
      '30d': 8.7,
      '90d': 24.3
    }
  },
  {
    id: 'curve-3pool',
    name: 'Curve 3Pool + Convex Strategy',
    description: 'Earn stable yields by providing liquidity to Curve\'s 3Pool and maximizing rewards through Convex.',
    apy: 8.5,
    risk: 'Low',
    tvl: 15000000,
    chains: ['Ethereum'],
    protocols: ['Curve', 'Convex'],
    category: 'Stablecoin',
    tags: ['Stablecoin', 'Low Risk', 'Stable Yield'],
    steps: [
      'Acquire USDC, USDT, and DAI in equal amounts',
      'Provide liquidity to Curve\'s 3Pool',
      'Stake LP tokens on Convex for additional rewards'
    ],
    featured: false,
    timeToSetup: '10 min',
    minInvestment: 500,
    maxInvestment: 100000,
    lastUpdated: '2024-01-10',
    performance: {
      '7d': 0.8,
      '30d': 3.2,
      '90d': 9.8
    }
  },
  {
    id: 'btc-wrapper-strategy',
    name: 'Bitcoin Wrapper Yield',
    description: 'Earn yield on Bitcoin through wrapped tokens and lending protocols',
    apy: 18.5,
    risk: 'Medium',
    tvl: 67000000,
    chains: ['Ethereum', 'Arbitrum'],
    protocols: ['Compound', 'Aave', 'Curve'],
    category: 'Bitcoin Yield',
    tags: ['BTC', 'Wrapped', 'Conservative'],
    steps: [
      'Wrap BTC to WBTC',
      'Deposit WBTC to Compound',
      'Provide liquidity to WBTC/ETH pool',
      'Stake LP tokens for additional rewards'
    ],
    featured: true,
    timeToSetup: '7 minutes',
    minInvestment: 0.01,
    maxInvestment: 50,
    lastUpdated: '2024-01-13',
    performance: {
      '7d': 1.2,
      '30d': 4.8,
      '90d': 16.2
    }
  },
  {
    id: 'arbitrage-bot',
    name: 'Cross-Chain Arbitrage',
    description: 'Automated arbitrage opportunities across different chains and DEXs',
    apy: 52.3,
    risk: 'High',
    tvl: 34000000,
    chains: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'],
    protocols: ['1inch', 'Uniswap', 'PancakeSwap'],
    category: 'Arbitrage',
    tags: ['Arbitrage', 'Automated', 'Multi-DEX'],
    steps: [
      'Monitor price differences across DEXs',
      'Execute trades when profitable spreads appear',
      'Bridge assets between chains as needed',
      'Compound profits automatically'
    ],
    featured: false,
    timeToSetup: '15 minutes',
    minInvestment: 5000,
    maxInvestment: 500000,
    lastUpdated: '2024-01-15',
    performance: {
      '7d': 4.1,
      '30d': 15.8,
      '90d': 47.2
    }
  },
  {
    id: 'stable-trinity',
    name: 'Stablecoin Trinity',
    description: 'Diversified stablecoin strategy across USDC, USDT, and DAI',
    apy: 22.7,
    risk: 'Low',
    tvl: 156000000,
    chains: ['Ethereum', 'Polygon'],
    protocols: ['Curve', 'Yearn', 'Convex'],
    category: 'Stablecoin',
    tags: ['Stable', 'Diversified', 'Low-risk'],
    steps: [
      'Deposit equal amounts of USDC, USDT, DAI',
      'Provide liquidity to Curve 3pool',
      'Stake LP tokens on Convex',
      'Auto-compound rewards'
    ],
    featured: true,
    timeToSetup: '3 minutes',
    minInvestment: 100,
    maxInvestment: 1000000,
    lastUpdated: '2024-01-14',
    performance: {
      '7d': 1.8,
      '30d': 6.9,
      '90d': 20.1
    }
  },
  {
    id: 'defi-index-fund',
    name: 'DeFi Index Strategy',
    description: 'Diversified exposure to top DeFi tokens with automated rebalancing',
    apy: 28.9,
    risk: 'Medium',
    tvl: 78000000,
    chains: ['Ethereum', 'Polygon'],
    protocols: ['Balancer', 'Index Coop', 'Yearn'],
    category: 'Index Fund',
    tags: ['Diversified', 'DeFi', 'Rebalancing'],
    steps: [
      'Purchase DeFi index tokens (DPI, MVI)',
      'Stake index tokens for additional yield',
      'Participate in governance for extra rewards',
      'Auto-rebalance based on market conditions'
    ],
    featured: false,
    timeToSetup: '8 minutes',
    minInvestment: 500,
    maxInvestment: 250000,
    lastUpdated: '2024-01-12',
    performance: {
      '7d': 2.8,
      '30d': 9.4,
      '90d': 26.7
    }
  }
];

export function StrategiesPage() {
  const [strategies] = useState(STRATEGIES_DATA);
  const [filteredStrategies, setFilteredStrategies] = useState(STRATEGIES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('apy');
  const [isLoading] = useState(false);

  // Filter and search logic
  useEffect(() => {
    let filtered = strategies;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(strategy =>
        strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Risk filter
    if (selectedRisk !== 'all') {
      filtered = filtered.filter(strategy => strategy.risk.toLowerCase() === selectedRisk);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(strategy => strategy.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'apy':
          return b.apy - a.apy;
        case 'tvl':
          return b.tvl - a.tvl;
        case 'risk':
          const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return riskOrder[a.risk] - riskOrder[b.risk];
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredStrategies(filtered);
  }, [strategies, searchTerm, selectedRisk, selectedCategory, sortBy]);

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTVL = (tvl) => {
    if (tvl >= 1000000) {
      return `$${(tvl / 1000000).toFixed(1)}M`;
    }
    return `$${(tvl / 1000).toFixed(0)}K`;
  };

  const StrategyCard = ({ strategy }) => (
    <Card className="strategy-card group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {strategy.name}
            </CardTitle>
            {strategy.featured && (
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            )}
          </div>
          <Badge className={getRiskColor(strategy.risk)}>
            {strategy.risk} Risk
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          {strategy.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{strategy.apy}%</div>
            <div className="text-xs text-muted-foreground">APY</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground">{formatTVL(strategy.tvl)}</div>
            <div className="text-xs text-muted-foreground">TVL</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold text-foreground">{strategy.chains.length}</div>
            <div className="text-xs text-muted-foreground">Chains</div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">7d Performance:</span>
            <span className="text-green-400">+{strategy.performance['7d']}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">30d Performance:</span>
            <span className="text-green-400">+{strategy.performance['30d']}%</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {strategy.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Protocols */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Protocols:</div>
          <div className="flex flex-wrap gap-2">
            {strategy.protocols.map((protocol) => (
              <Badge key={protocol} variant="outline" className="text-xs">
                {protocol}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Link to={`/strategies/${strategy.id}`} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300">
              <Zap className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="px-3">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {strategy.timeToSetup}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            Min: ${strategy.minInvestment}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">DeFi </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Strategies</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover and understand proven DeFi strategies. From conservative stablecoin yields to aggressive arbitrage opportunities.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search strategies, protocols, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Liquid Staking">Liquid Staking</SelectItem>
                  <SelectItem value="Yield Farming">Yield Farming</SelectItem>
                  <SelectItem value="Stablecoin">Stablecoin</SelectItem>
                  <SelectItem value="Arbitrage">Arbitrage</SelectItem>
                  <SelectItem value="Index Fund">Index Fund</SelectItem>
                  <SelectItem value="Bitcoin Yield">Bitcoin Yield</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apy">APY</SelectItem>
                  <SelectItem value="tvl">TVL</SelectItem>
                  <SelectItem value="risk">Risk</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredStrategies.length} of {strategies.length} strategies
            </p>
            <Link to="/strategy-builder">
              <Button variant="outline" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Build Strategy
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Strategies */}
        {filteredStrategies.some(s => s.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Featured Strategies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStrategies.filter(s => s.featured).map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
            </div>
          </div>
        )}

        {/* All Strategies */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Strategies</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-16 bg-muted rounded" />
                        ))}
                      </div>
                      <div className="h-20 bg-muted rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredStrategies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStrategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No strategies found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedRisk('all');
                setSelectedCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

