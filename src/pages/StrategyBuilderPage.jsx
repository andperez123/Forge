import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Brain, Zap, Target, TrendingUp, Shield, AlertTriangle, CheckCircle, Loader2, Clock, BarChart3 } from 'lucide-react';

export function StrategyBuilderPage() {
  const [searchParams] = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState(null);
  const [formData, setFormData] = useState({
    investmentAmount: 10000,
    riskTolerance: 'medium',
    timeHorizon: '6months',
    preferredChains: [],
    assetTypes: [],
    goals: '',
    excludeProtocols: ''
  });

  // Pre-fill form if coming from a strategy template
  useEffect(() => {
    const strategyId = searchParams.get('strategy');
    if (strategyId) {
      // In a real app, this would fetch the strategy details
      // For now, we'll just set some defaults
      setFormData(prev => ({
        ...prev,
        goals: `Optimize the ${strategyId} strategy for my portfolio`
      }));
    }
  }, [searchParams]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const generateStrategy = async () => {
    setIsGenerating(true);
    
    // Simulate strategy analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analyzed strategy based on form data
    const mockStrategy = {
      name: `Custom ${formData.riskTolerance.charAt(0).toUpperCase() + formData.riskTolerance.slice(1)}-Risk Strategy`,
      description: `Optimized strategy tailored to your ${formData.riskTolerance} risk tolerance and $${formData.investmentAmount.toLocaleString()} investment`,
      estimatedAPY: formData.riskTolerance === 'low' ? 15.2 : formData.riskTolerance === 'medium' ? 28.7 : 42.3,
      riskScore: formData.riskTolerance === 'low' ? 3 : formData.riskTolerance === 'medium' ? 6 : 8,
      timeToSetup: '8 minutes',
      chains: formData.preferredChains.length > 0 ? formData.preferredChains : ['Ethereum', 'Arbitrum'],
      steps: [
        {
          id: 1,
          action: 'Initial Deposit',
          description: `Deposit ${formData.assetTypes.includes('stablecoins') ? 'USDC' : 'ETH'} to primary protocol`,
          protocol: formData.riskTolerance === 'low' ? 'Aave' : 'Compound',
          estimatedGas: '$12-25',
          timeRequired: '2 minutes'
        },
        {
          id: 2,
          action: 'Yield Optimization',
          description: 'Stake deposited assets for base yield generation',
          protocol: 'Yearn Finance',
          estimatedGas: '$8-18',
          timeRequired: '1 minute'
        },
        {
          id: 3,
          action: 'Liquidity Provision',
          description: 'Provide liquidity to high-yield pools for additional rewards',
          protocol: 'Curve Finance',
          estimatedGas: '$15-30',
          timeRequired: '3 minutes'
        },
        {
          id: 4,
          action: 'Reward Compounding',
          description: 'Auto-compound rewards for maximum yield efficiency',
          protocol: 'Convex Finance',
          estimatedGas: '$5-12',
          timeRequired: '2 minutes'
        }
      ],
      risks: [
        {
          type: 'Smart Contract Risk',
          level: formData.riskTolerance === 'low' ? 'Low' : 'Medium',
          description: 'Risk of bugs or exploits in protocol smart contracts'
        },
        {
          type: 'Impermanent Loss',
          level: formData.riskTolerance === 'high' ? 'High' : 'Low',
          description: 'Potential loss from providing liquidity to volatile pairs'
        },
        {
          type: 'Market Risk',
          level: formData.riskTolerance === 'low' ? 'Low' : formData.riskTolerance === 'medium' ? 'Medium' : 'High',
          description: 'Risk from overall market volatility and price movements'
        }
      ],
      expectedReturns: {
        conservative: (formData.investmentAmount * 0.12).toLocaleString(),
        realistic: (formData.investmentAmount * (formData.riskTolerance === 'low' ? 0.152 : formData.riskTolerance === 'medium' ? 0.287 : 0.423)).toLocaleString(),
        optimistic: (formData.investmentAmount * (formData.riskTolerance === 'low' ? 0.18 : formData.riskTolerance === 'medium' ? 0.35 : 0.52)).toLocaleString()
      }
    };
    
    setGeneratedStrategy(mockStrategy);
    setIsGenerating(false);
  };

  const deployStrategy = () => {
    // In a real app, this would integrate with wallet and execute transactions
    alert('Strategy deployment would integrate with your wallet here!');
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Strategy </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Analyzer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Analyze and understand DeFi strategies based on your preferences. Input your parameters to see how different strategies would perform for your portfolio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Strategy Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Investment Parameters
                </CardTitle>
                <CardDescription>
                  Configure your investment amount and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.investmentAmount}
                    onChange={(e) => handleInputChange('investmentAmount', parseInt(e.target.value) || 0)}
                    placeholder="10000"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum: $100 • Recommended: $1,000+
                  </p>
                </div>

                {/* Risk Tolerance */}
                <div className="space-y-2">
                  <Label>Risk Tolerance</Label>
                  <Select value={formData.riskTolerance} onValueChange={(value) => handleInputChange('riskTolerance', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk (5-20% APY)</SelectItem>
                      <SelectItem value="medium">Medium Risk (20-40% APY)</SelectItem>
                      <SelectItem value="high">High Risk (40%+ APY)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Horizon */}
                <div className="space-y-2">
                  <Label>Investment Time Horizon</Label>
                  <Select value={formData.timeHorizon} onValueChange={(value) => handleInputChange('timeHorizon', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="longterm">Long Term (1+ Years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Chain & Asset Preferences
                </CardTitle>
                <CardDescription>
                  Select your preferred blockchains and asset types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preferred Chains */}
                <div className="space-y-3">
                  <Label>Preferred Blockchains</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Avalanche', 'BSC'].map((chain) => (
                      <label key={chain} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.preferredChains.includes(chain)}
                          onChange={(e) => handleArrayChange('preferredChains', chain, e.target.checked)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{chain}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Asset Types */}
                <div className="space-y-3">
                  <Label>Asset Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['ETH', 'BTC', 'Stablecoins', 'DeFi Tokens', 'Alt Coins', 'LP Tokens'].map((asset) => (
                      <label key={asset} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.assetTypes.includes(asset.toLowerCase())}
                          onChange={(e) => handleArrayChange('assetTypes', asset.toLowerCase(), e.target.checked)}
                          className="rounded border-border"
                        />
                        <span className="text-sm">{asset}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Strategy Analysis
                </CardTitle>
                <CardDescription>
                  Describe your specific goals and any constraints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goals">Investment Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="e.g., Maximize yield while maintaining low risk, focus on stablecoin strategies, avoid impermanent loss..."
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exclude">Protocols to Exclude (Optional)</Label>
                  <Input
                    id="exclude"
                    placeholder="e.g., Compound, Aave..."
                    value={formData.excludeProtocols}
                    onChange={(e) => handleInputChange('excludeProtocols', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={generateStrategy} 
              disabled={isGenerating}
              className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Strategy...
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analyze Strategy
                </>
              )}
            </Button>
          </div>

          {/* Generated Strategy */}
          <div className="space-y-6">
            {isGenerating ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-pulse">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Analyzing your strategy...</h3>
                  <p className="text-muted-foreground mb-4">
                    Evaluating 1000+ protocols across multiple chains
                  </p>
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">Processing market data and calculating yields...</p>
                  </div>
                </CardContent>
              </Card>
            ) : generatedStrategy ? (
              <div className="space-y-6">
                {/* Strategy Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      {generatedStrategy.name}
                    </CardTitle>
                    <CardDescription>
                      {generatedStrategy.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
                        <div className="text-3xl font-bold text-primary">{generatedStrategy.estimatedAPY}%</div>
                        <div className="text-sm text-muted-foreground">Estimated APY</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-foreground">{generatedStrategy.riskScore}/10</div>
                        <div className="text-sm text-muted-foreground">Risk Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{generatedStrategy.timeToSetup} setup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />
                        <span>{generatedStrategy.chains.length} chains</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expected Returns */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Expected Returns (1 Year)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Conservative:</span>
                        <span className="font-semibold text-green-400">${generatedStrategy.expectedReturns.conservative}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Realistic:</span>
                        <span className="font-semibold text-primary">${generatedStrategy.expectedReturns.realistic}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Optimistic:</span>
                        <span className="font-semibold text-accent">${generatedStrategy.expectedReturns.optimistic}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategy Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {generatedStrategy.steps.map((step, index) => (
                        <div key={step.id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {step.id}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{step.action}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>Protocol: {step.protocol}</span>
                              <span>Gas: {step.estimatedGas}</span>
                              <span>Time: {step.timeRequired}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {generatedStrategy.risks.map((risk, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div>
                            <div className="font-medium text-foreground">{risk.type}</div>
                            <div className="text-sm text-muted-foreground">{risk.description}</div>
                          </div>
                          <Badge className={`${getRiskColor(risk.level)} border-current`}>
                            {risk.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Deploy Button */}
                <Button 
                  onClick={deployStrategy}
                  className="w-full py-6 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Deploy Strategy
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                  <p className="text-muted-foreground">
                    Configure your preferences and click "Generate AI Strategy" to create your custom DeFi strategy.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

