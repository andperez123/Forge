import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, TrendingUp, Shield, Zap, ExternalLink, Star, Target } from 'lucide-react';

// Fake strategy data
const STRATEGY_DATA = {
  'lido-arbitrum': {
    id: 'lido-arbitrum',
    name: 'Lido + Arbitrum Yield Strategy',
    description: 'Maximize yield by staking ETH with Lido and bridging to Arbitrum for additional DeFi opportunities.',
    category: 'Liquid Staking',
    risk: 'Low',
    apy: 31.2,
    tvl: 25000000,
    minInvestment: 100,
    timeToSetup: '15 min',
    featured: true,
    chains: ['Ethereum', 'Arbitrum'],
    protocols: ['Lido', 'Arbitrum Bridge', 'Curve', 'Convex'],
    tags: ['Liquid Staking', 'Cross-chain', 'Low Risk', 'High Yield'],
    author: 'Forge Team',
    lastUpdated: '2024-01-15',
    status: 'Active',
    performance: {
      historical: [28.1, 29.3, 30.1, 31.2, 32.0, 31.8, 31.2],
      months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    },
    steps: [
      {
        step: 1,
        title: 'Stake ETH with Lido',
        description: 'Stake your ETH to receive stETH tokens with ~4.2% APY',
        protocol: 'Lido',
        estimatedTime: '5 min',
        gasCost: '$15-25'
      },
      {
        step: 2,
        title: 'Bridge stETH to Arbitrum',
        description: 'Use Arbitrum Bridge to transfer stETH to Arbitrum network',
        protocol: 'Arbitrum Bridge',
        estimatedTime: '10 min',
        gasCost: '$5-10'
      },
      {
        step: 3,
        title: 'Provide Liquidity on Curve',
        description: 'Add stETH to Curve pool for trading fees and CRV rewards',
        protocol: 'Curve',
        estimatedTime: '5 min',
        gasCost: '$20-30'
      },
      {
        step: 4,
        title: 'Stake LP Tokens',
        description: 'Stake LP tokens on Convex for additional CVX rewards',
        protocol: 'Convex',
        estimatedTime: '5 min',
        gasCost: '$10-15'
      }
    ],
    risks: [
      {
        type: 'Smart Contract Risk',
        level: 'Low',
        description: 'Lido and Curve are well-audited protocols with billions in TVL'
      },
      {
        type: 'Bridge Risk',
        level: 'Medium',
        description: 'Arbitrum Bridge has been secure but carries inherent bridge risks'
      },
      {
        type: 'Impermanent Loss',
        level: 'Low',
        description: 'Minimal IL risk due to stable asset pairing'
      },
      {
        type: 'Regulatory Risk',
        level: 'Low',
        description: 'Staking and DeFi activities are generally compliant'
      }
    ],
    requirements: {
      minimum: '$100',
      recommended: '$1000',
      gasFees: '$50-80 total',
      timeCommitment: '15 minutes setup, 5 minutes monthly maintenance'
    }
  },
  'curve-3pool': {
    id: 'curve-3pool',
    name: 'Curve 3Pool + Convex Strategy',
    description: 'Earn stable yields by providing liquidity to Curve\'s 3Pool and maximizing rewards through Convex.',
    category: 'Stablecoin',
    risk: 'Low',
    apy: 8.5,
    tvl: 15000000,
    minInvestment: 500,
    timeToSetup: '10 min',
    featured: false,
    chains: ['Ethereum'],
    protocols: ['Curve', 'Convex'],
    tags: ['Stablecoin', 'Low Risk', 'Stable Yield'],
    author: 'Forge Team',
    lastUpdated: '2024-01-10',
    status: 'Active',
    performance: {
      historical: [7.8, 8.1, 8.3, 8.5, 8.4, 8.6, 8.5],
      months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    },
    steps: [
      {
        step: 1,
        title: 'Acquire Stablecoins',
        description: 'Ensure you have USDC, USDT, and DAI in equal amounts',
        protocol: 'Various',
        estimatedTime: '5 min',
        gasCost: '$10-20'
      },
      {
        step: 2,
        title: 'Add to 3Pool',
        description: 'Provide liquidity to Curve\'s 3Pool for trading fees',
        protocol: 'Curve',
        estimatedTime: '5 min',
        gasCost: '$30-50'
      }
    ],
    risks: [
      {
        type: 'Smart Contract Risk',
        level: 'Low',
        description: 'Curve and Convex are battle-tested protocols'
      },
      {
        type: 'Stablecoin Depeg Risk',
        level: 'Medium',
        description: 'Risk of USDC, USDT, or DAI losing their peg'
      }
    ],
    requirements: {
      minimum: '$500',
      recommended: '$5000',
      gasFees: '$40-70 total',
      timeCommitment: '10 minutes setup, 5 minutes monthly maintenance'
    }
  }
};

export function StrategyDetailPage() {
  const { id } = useParams();
  const [strategy, setStrategy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundStrategy = STRATEGY_DATA[id];
      setStrategy(foundStrategy);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Strategy Not Found</h1>
            <p className="text-muted-foreground mb-8">The strategy you're looking for doesn't exist.</p>
            <Link to="/strategies">
              <Button>Back to Strategies</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/strategies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Strategies
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary">{strategy.category}</Badge>
                <Badge className={getRiskColor(strategy.risk)}>
                  {strategy.risk} Risk
                </Badge>
                {strategy.featured && (
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{strategy.name}</h1>
              <p className="text-xl text-muted-foreground max-w-4xl">{strategy.description}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4">
              <div className="text-3xl font-bold text-primary mb-1">{strategy.apy}%</div>
              <div className="text-sm text-muted-foreground">APY</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">{formatTVL(strategy.tvl)}</div>
              <div className="text-sm text-muted-foreground">TVL</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">${strategy.minInvestment}</div>
              <div className="text-sm text-muted-foreground">Min Investment</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">{strategy.timeToSetup}</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Performance History
                </CardTitle>
                <CardDescription>APY performance over the last 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-end justify-between p-4">
                  {strategy.performance.historical.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-gradient-to-t from-primary to-accent rounded-t"
                        style={{ height: `${(value / 35) * 200}px` }}
                      ></div>
                      <div className="text-xs text-muted-foreground mt-2">{strategy.performance.months[index]}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step-by-Step Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Step-by-Step Guide
                </CardTitle>
                <CardDescription>Follow these steps to implement this strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {strategy.steps.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-muted-foreground mb-2">{step.description}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-primary">Protocol: {step.protocol}</span>
                          <span className="text-muted-foreground">Time: {step.estimatedTime}</span>
                          <span className="text-muted-foreground">Gas: {step.gasCost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Risk Analysis
                </CardTitle>
                <CardDescription>Understanding the risks involved in this strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategy.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                      <Badge className={getRiskColor(risk.level)}>
                        {risk.level}
                      </Badge>
                      <div>
                        <h4 className="font-semibold mb-1">{risk.type}</h4>
                        <p className="text-muted-foreground text-sm">{risk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  <Zap className="w-4 h-4 mr-2" />
                  Implement Strategy
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Dune
                </Button>
                <Button variant="outline" className="w-full">
                  <Star className="w-4 h-4 mr-2" />
                  Save Strategy
                </Button>
              </CardContent>
            </Card>

            {/* Strategy Info */}
            <Card>
              <CardHeader>
                <CardTitle>Strategy Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Supported Chains</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.chains.map((chain) => (
                      <Badge key={chain} variant="outline">{chain}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Protocols Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.protocols.map((protocol) => (
                      <Badge key={protocol} variant="outline">{protocol}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum Investment:</span>
                  <span className="font-semibold">{strategy.requirements.minimum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recommended:</span>
                  <span className="font-semibold">{strategy.requirements.recommended}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Fees:</span>
                  <span className="font-semibold">{strategy.requirements.gasFees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Commitment:</span>
                  <span className="font-semibold text-sm">{strategy.requirements.timeCommitment}</span>
                </div>
              </CardContent>
            </Card>

            {/* Strategy Meta */}
            <Card>
              <CardHeader>
                <CardTitle>Strategy Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span>{strategy.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{strategy.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">{strategy.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
