import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, TrendingUp, Shield, Zap, ExternalLink, Star, Target } from 'lucide-react';
import { useStrategies } from '../lib/hooks/useFirebase';
import { SEOHead } from '../components/SEOHead';

export function StrategyDetailPage() {
  const { id } = useParams();
  const { strategies, loading: isLoading, error } = useStrategies();
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    if (strategies && strategies.length > 0) {
      const foundStrategy = strategies.find(s => s.id === id);
      setStrategy(foundStrategy);
    }
  }, [strategies, id]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Error Loading Strategy</h1>
            <p className="text-muted-foreground mb-8">There was an error loading the strategy: {error}</p>
            <Link to="/strategies">
              <Button>Back to Strategies</Button>
            </Link>
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
    switch (risk?.toLowerCase()) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatTVL = (tvl) => {
    if (!tvl) return '$0';
    if (tvl >= 1000000) {
      return `$${(tvl / 1000000).toFixed(1)}M`;
    }
    return `$${(tvl / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {strategy && (
        <SEOHead
          title={strategy.name}
          description={strategy.description}
          keywords={strategy.tags || []}
          canonicalUrl={`https://forgedefi.com/strategies/${strategy.id}`}
          ogType="article"
        />
      )}
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
                {strategy.category && (
                  <Badge variant="secondary">{strategy.category}</Badge>
                )}
                <Badge className={getRiskColor(strategy.risk)}>
                  {strategy.risk || 'Unknown'} Risk
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
              <div className="text-3xl font-bold text-primary mb-1">{strategy.apy || 0}%</div>
              <div className="text-sm text-muted-foreground">APY</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">{formatTVL(strategy.tvl)}</div>
              <div className="text-sm text-muted-foreground">TVL</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">${strategy.minInvestment || 0}</div>
              <div className="text-sm text-muted-foreground">Min Investment</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-foreground mb-1">{strategy.timeToSetup || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Performance Chart */}
            {strategy.performance && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Performance History
                  </CardTitle>
                  <CardDescription>APY performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Performance chart coming soon</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step-by-Step Guide */}
            {strategy.steps && strategy.steps.length > 0 && (
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
                    {strategy.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-muted-foreground">{typeof step === 'string' ? step : step.description || step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Risk Analysis */}
            {strategy.risks && strategy.risks.length > 0 && (
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
                        <Badge className={getRiskColor(risk.level || risk)}>
                          {risk.level || risk}
                        </Badge>
                        <div>
                          <h4 className="font-semibold mb-1">{risk.type || 'Risk'}</h4>
                          <p className="text-muted-foreground text-sm">{risk.description || risk}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
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
                {strategy.chains && strategy.chains.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Supported Chains</h4>
                    <div className="flex flex-wrap gap-2">
                      {strategy.chains.map((chain) => (
                        <Badge key={chain} variant="outline">{chain}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {strategy.protocols && strategy.protocols.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Protocols Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {strategy.protocols.map((protocol) => (
                        <Badge key={protocol} variant="outline">{protocol}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {strategy.tags && strategy.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {strategy.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
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
                  <span className="font-semibold">${strategy.minInvestment || 0}</span>
                </div>
                {strategy.maxInvestment && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maximum Investment:</span>
                    <span className="font-semibold">${strategy.maxInvestment}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Setup Time:</span>
                  <span className="font-semibold">{strategy.timeToSetup || 'N/A'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Strategy Meta */}
            <Card>
              <CardHeader>
                <CardTitle>Strategy Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {strategy.author && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Author:</span>
                    <span>{strategy.author}</span>
                  </div>
                )}
                {strategy.lastUpdated && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{strategy.lastUpdated}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
