import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, TrendingUp, Shield, Zap, ExternalLink, Star, Target, Clock, DollarSign, AlertTriangle } from 'lucide-react';
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


  // Generate schema markup for the strategy
  const generateSchemaMarkup = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": strategy.name,
      "category": "DeFi Strategy",
      "brand": {
        "@type": "Organization",
        "name": "Forge DeFi"
      },
      "description": strategy.description,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "APY",
          "value": `${strategy.apy || 0}%`
        },
        {
          "@type": "PropertyValue",
          "name": "Risk Level",
          "value": strategy.risk || "Unknown"
        },
        {
          "@type": "PropertyValue",
          "name": "Chains",
          "value": strategy.chains?.join(", ") || "N/A"
        },
        {
          "@type": "PropertyValue",
          "name": "Min Investment",
          "value": `$${strategy.minInvestment || 0}`
        },
        {
          "@type": "PropertyValue",
          "name": "Last Update",
          "value": strategy.lastUpdated || new Date().toISOString().split('T')[0]
        }
      ]
    };

    // Add HowTo schema if steps exist
    if (strategy.steps && strategy.steps.length > 0) {
      schema.howTo = {
        "@type": "HowTo",
        "name": `How to implement ${strategy.name}`,
        "step": strategy.steps.map((step, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "text": typeof step === 'string' ? step : step.description || step
        }))
      };
    }

    // Add FAQ schema if FAQ exists
    if (strategy.faq && strategy.faq.length > 0) {
      schema.mainEntity = {
        "@type": "FAQPage",
        "mainEntity": strategy.faq.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      };
    }

    return schema;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {strategy && (
        <>
          <SEOHead
            title={strategy.name}
            description={strategy.description}
            keywords={strategy.tags || []}
            canonicalUrl={`https://forgedefi.com/strategies/${strategy.id}`}
            ogType="article"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateSchemaMarkup())
            }}
          />
        </>
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

          {/* TL;DR Block */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                TL;DR - Quick Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="font-semibold">{strategy.apy || 0}% APY</div>
                    <div className="text-sm text-muted-foreground">Typical yield</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">{strategy.chains?.join(", ") || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">Supported chains</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <div>
                    <div className="font-semibold">{strategy.risk || "Unknown"}</div>
                    <div className="text-sm text-muted-foreground">Risk level</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  <div>
                    <div className="font-semibold">{strategy.fee || "0.25%"} fee</div>
                    <div className="text-sm text-muted-foreground">Forge fee</div>
                  </div>
                </div>
              </div>
              {strategy.lastUpdated && (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Last updated: {strategy.lastUpdated}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Summary Section */}
            <section id="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {strategy.description}
                  </p>
                  {strategy.protocols && strategy.protocols.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Protocols Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {strategy.protocols.map((protocol) => (
                          <Badge key={protocol} variant="outline">{protocol}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Strategy Explanation Section */}
            <section id="strategy-explanation">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Strategy Explanation
                  </CardTitle>
                  <CardDescription>How this strategy works and why it's effective</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {strategy.description}
                      </p>
                    </div>
                    
                    {strategy.protocols && strategy.protocols.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-foreground">Key Protocols Used:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {strategy.protocols.map((protocol) => (
                            <div key={protocol} className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="font-medium">{protocol}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold mb-3 text-blue-900">Why This Strategy Works:</h4>
                      <ul className="space-y-2 text-blue-800">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Combines multiple yield sources for enhanced returns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Leverages battle-tested protocols with strong security</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Optimized for the current DeFi landscape and market conditions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Risks Section */}
            <section id="risks">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Risks
                  </CardTitle>
                  <CardDescription>Understanding the risks involved in this strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strategy.risks && strategy.risks.length > 0 ? (
                      strategy.risks.map((risk, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                          <Badge className={getRiskColor(risk.level || risk)}>
                            {risk.level || risk}
                          </Badge>
                          <div>
                            <h4 className="font-semibold mb-1">{risk.type || 'Risk'}</h4>
                            <p className="text-muted-foreground text-sm">{risk.description || risk}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Risk analysis coming soon</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Fees Section */}
            <section id="fees">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Fees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Forge Fee</span>
                        <span className="text-lg font-bold text-primary">{strategy.fee || "0.25%"} of gross yield</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Net daily. No hidden fees or lock-up periods.
                      </p>
                    </div>
                    {strategy.protocolFees && (
                      <div>
                        <h4 className="font-semibold mb-2">Protocol Fees:</h4>
                        <div className="space-y-2">
                          {strategy.protocolFees.map((fee, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{fee.protocol}</span>
                              <span>{fee.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* How-to Section */}
            <section id="how-to">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Step-by-Step Implementation Guide
                  </CardTitle>
                  <CardDescription>Follow these detailed steps to implement this strategy successfully</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {strategy.steps && strategy.steps.length > 0 ? (
                      strategy.steps.map((step, index) => {
                        const stepData = typeof step === 'string' ? { title: step, description: '', link: null } : step;
                        return (
                          <div key={index} className="relative">
                            <div className="flex gap-6">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
                                  {index + 1}
                                </div>
                                {index < strategy.steps.length - 1 && (
                                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary/30 to-accent/30 mt-2"></div>
                                )}
                              </div>
                              <div className="flex-1 pb-8">
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-6 shadow-sm">
                                  <h4 className="font-semibold text-lg mb-3 text-foreground">
                                    {stepData.title || `Step ${index + 1}`}
                                  </h4>
                                  <p className="text-muted-foreground leading-relaxed mb-4">
                                    {stepData.description || (typeof step === 'string' ? step : step.description || step)}
                                  </p>
                                  {stepData.link && (
                                    <div className="flex items-center gap-2">
                                      <ExternalLink className="w-4 h-4 text-primary" />
                                      <a 
                                        href={stepData.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 font-medium text-sm"
                                      >
                                        Visit {stepData.link.includes('lido') ? 'Lido' : stepData.link.includes('curve') ? 'Curve' : 'Protocol'}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">Implementation Guide Coming Soon</h3>
                        <p>We're working on detailed step-by-step instructions for this strategy.</p>
                      </div>
                    )}
                    
                    {strategy.steps && strategy.steps.length > 0 && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold mb-3 text-green-900 flex items-center gap-2">
                          <Shield className="w-5 h-5" />
                          Important Notes
                        </h4>
                        <ul className="space-y-2 text-green-800 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Always verify contract addresses before interacting with protocols</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Start with small amounts to test the strategy</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Keep track of gas costs and ensure you have sufficient ETH for transactions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Monitor your positions regularly and adjust as needed</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {strategy.faq && strategy.faq.length > 0 ? (
                      strategy.faq.map((faq, index) => (
                        <div key={index} className="border-b border-muted pb-4 last:border-b-0">
                          <h4 className="font-semibold mb-2">{faq.q}</h4>
                          <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>FAQ section coming soon</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Changelog Section */}
            <section id="changelog">
              <Card>
                <CardHeader>
                  <CardTitle>Changelog</CardTitle>
                  <CardDescription>Recent updates and changes to this strategy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {strategy.changelog && strategy.changelog.length > 0 ? (
                      strategy.changelog.map((change, index) => (
                        <div key={index} className="flex gap-4 p-3 bg-muted/10 rounded">
                          <div className="text-sm text-muted-foreground min-w-[100px]">
                            {change.date}
                          </div>
                          <div className="flex-1">
                            <p>{change.change}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No recent changes</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
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
