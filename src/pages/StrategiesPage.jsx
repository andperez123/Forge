import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Zap, ExternalLink, Star, Clock, DollarSign } from 'lucide-react';
import { useStrategies } from '../lib/hooks/useFirebase';
import { SEOHead } from '../components/SEOHead';

export function StrategiesPage() {
  const { strategies, loading: isLoading, error } = useStrategies();
  const [filteredStrategies, setFilteredStrategies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('apy');
  const navigate = useNavigate();

  // Filter and search logic
  useEffect(() => {
    if (!strategies || strategies.length === 0) {
      setFilteredStrategies([]);
      return;
    }

    let filtered = strategies;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(strategy =>
        strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strategy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (strategy.tags && strategy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Risk filter
    if (selectedRisk !== 'all') {
      filtered = filtered.filter(strategy => strategy.risk && strategy.risk.toLowerCase() === selectedRisk);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(strategy => strategy.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'apy':
          return (b.apy || 0) - (a.apy || 0);
        case 'tvl':
          return (b.tvl || 0) - (a.tvl || 0);
        case 'risk':
          const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return (riskOrder[a.risk] || 0) - (riskOrder[b.risk] || 0);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

    setFilteredStrategies(filtered);
  }, [strategies, searchTerm, selectedRisk, selectedCategory, sortBy]);

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };


  const handleStrategyClick = (strategyId) => {
    navigate(`/strategies/${strategyId}`);
  };

  const StrategyCard = ({ strategy }) => (
    <Card 
      className="strategy-card group cursor-pointer hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
      onClick={() => handleStrategyClick(strategy.id)}
    >
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
            {strategy.risk || 'Unknown'} Risk
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          {strategy.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Strategy Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Category:</span>
            <Badge variant="outline">{strategy.category || 'DeFi Strategy'}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Chains:</span>
            <span>{strategy.chains?.join(", ") || "Multiple"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">Setup Time:</span>
            <span>{strategy.timeToSetup || 'N/A'}</span>
          </div>
        </div>

        {/* Tags */}
        {strategy.tags && strategy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {strategy.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Protocols */}
        {strategy.protocols && strategy.protocols.length > 0 && (
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
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleStrategyClick(strategy.id);
            }}
          >
            <Zap className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="px-3"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {strategy.timeToSetup || 'N/A'}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            Min: ${strategy.minInvestment || 0}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <SEOHead 
        title="DeFi Strategies - Discover Proven DeFi Strategies" 
        description="Explore a wide range of DeFi strategies, from stablecoin yields to arbitrage opportunities. Find the perfect strategy for your needs." 
        keywords="DeFi strategies, yield farming, stablecoin yields, arbitrage, index funds, Bitcoin yield" 
      />
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

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">Error loading strategies: {error}</p>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredStrategies.length} of {strategies?.length || 0} strategies
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

