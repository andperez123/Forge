import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowRight, Zap, Shield, TrendingUp, Users, Clock, CheckCircle, Rocket, Sparkles, Star, Target, BarChart3, Brain, ArrowUpRight, BookOpen, Globe, Play, Lock, ChevronDown, Award } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { populateSampleData } from '../lib/sampleData';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // Animation on scroll
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // Store email in Firebase Firestore
        const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
        const { db } = await import('../lib/firebase');
        
        await addDoc(collection(db, 'waitlist'), {
          email: email,
          createdAt: serverTimestamp(),
          source: 'landing_page',
          status: 'active'
        });
        
        setIsSubmitted(true);
        setEmail(''); // Clear the input
        console.log('Email added to waitlist:', email);
      } catch (error) {
        console.error('Error adding email to waitlist:', error);
        // Still show success to user even if Firebase fails
        setIsSubmitted(true);
      }
    }
  };

  const StepCard = ({ number, title, description, icon: Icon, delay = 0 }) => (
    <div 
      className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl">
          {number}
        </div>
        <Icon className="w-8 h-8 text-orange-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
    <div 
      className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  const StrategyCard = ({ title, apy, risk, chains, protocols, featured = false, learningMode = false }) => (
    <div className={`group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 ${featured ? 'ring-2 ring-orange-500/30' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}
      
      {learningMode && (
        <div className="absolute -top-3 right-4">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Learning Mode
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">{apy}%</div>
          <div className="text-sm text-gray-500">APY</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${risk === 'Low' ? 'bg-green-500' : risk === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`} />
          <span className="text-gray-600 text-sm">{risk} Risk</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" />
          <span className="text-gray-600 text-sm">{chains} Chains</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {protocols.slice(0, 3).map((protocol, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              {protocol}
            </span>
          ))}
          {protocols.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              +{protocols.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold transition-all duration-300 group">
          <span>{learningMode ? 'Start Learning' : 'View Strategy'}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );

  const MetricCard = ({ value, label, trend, icon: Icon, delay = 0 }) => (
    <div 
      className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-12 h-12 mx-auto mb-4 bg-black text-white rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-gray-600 text-sm mb-1">{label}</div>
      <div className="text-green-600 text-xs">{trend}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead 
        title="Forge - DeFi Strategies Simplified" 
        description="One platform to learn, launch, and automate yield across chains. No jargon. No 12-step guides. Just strategies that work." 
        keywords="DeFi, yield farming, staking, automation, strategies, crypto, blockchain" 
      />
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Logo/Brand */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gray-100 rounded-full border border-gray-200">
                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-gray-900 font-bold text-lg">Forge</span>
              </div>
            </div>
            
            {/* Main headline */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
                <span className="text-gray-900">
                  DeFi Strategies,
                </span>
                <br />
                <span className="text-orange-500">
                  Simplified
                </span>
              </h1>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                One platform to learn, launch, and automate yield across chains. No jargon. No 12-step guides. Just strategies that work.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/strategies">
                <Button className="group relative px-10 py-5 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold text-white text-xl transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    Explore Strategies
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              
              <Button variant="outline" className="group px-10 py-5 border-2 border-gray-300 rounded-2xl font-bold text-gray-900 text-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 flex items-center gap-3">
                <Play className="w-6 h-6" />
                Learn How It Works
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className={`flex flex-wrap justify-center items-center gap-8 text-gray-500 text-lg transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Audited Protocols Only</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-500" />
                <span>Non-Custodial</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <span>Risk Labels That Matter</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Sign Up for Updates Section - Right after hero */}
      <section className="py-32 px-4 relative bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
            {!isSubmitted ? (
              <>
                <h2 className="text-5xl font-bold mb-6">
                  <span className="text-gray-900">Be the </span>
                  <span className="text-orange-500">First</span>
                  <span className="text-gray-900"> to Know</span>
                </h2>
                <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  We're rolling out new strategies, product updates, and automation features every month. Join the Forge waitlist and get updates straight to your inbox.
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-6 max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-8 py-6 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-black hover:bg-gray-800 rounded-2xl font-bold text-white text-xl transition-all duration-300 hover:scale-105"
                  >
                    Sign Up
                  </Button>
                </form>
                
                <div className="flex items-center justify-center gap-8 mt-8 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>No spam. Just DeFi insights, new strategies, and early access.</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="w-24 h-24 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center">
                  <Shield className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900">You're In!</h3>
                <p className="text-2xl text-gray-600">
                  Welcome to the Forge community. We'll keep you updated on new strategies, automation features, and exclusive insights.
                </p>
                <div className="text-orange-500 font-bold text-xl">
                  Next update: Coming soon
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">How </span>
              <span className="text-orange-500">It Works</span>
            </h2>
            <p className="text-2xl text-gray-600">Three simple steps to DeFi success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              title="Pick a Strategy"
              description="Browse curated, risk-labeled options: Staking, Stablecoins, Yield Farming."
              icon={Target}
              delay={0.1}
            />
            <StepCard
              number="2"
              title="Follow Simple Steps"
              description="Clear, guided instructions replace confusing DeFi docs."
              icon={BookOpen}
              delay={0.2}
            />
            <StepCard
              number="3"
              title="Automate & Track"
              description="Forge monitors APYs, gas, and risks in real time so you don't have to babysit positions."
              icon={TrendingUp}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Why Forge Is Safe & Different */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Why Forge Is </span>
              <span className="text-orange-500">Safe & Different</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Shield}
              title="Audited Protocols Only"
              description="Every protocol we recommend has been thoroughly vetted and audited."
              delay={0.1}
            />
            <FeatureCard
              icon={Lock}
              title="Non-Custodial"
              description="You hold your keys. We never have access to your funds."
              delay={0.2}
            />
            <FeatureCard
              icon={Target}
              title="Risk Labels That Matter"
              description="Clear, actionable risk assessments, not generic warnings."
              delay={0.3}
            />
            <FeatureCard
              icon={Globe}
              title="Seamless Multi-Chain"
              description="Execute strategies across multiple chains without the complexity."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Strategy Library Preview */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Strategy </span>
              <span className="text-orange-500">Library</span>
            </h2>
            <p className="text-2xl text-gray-600">Curated strategies for every risk profile</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StrategyCard
              title="Stablecoin Lending"
              apy="8.5"
              risk="Low"
              chains="1"
              protocols={["Aave", "Compound", "USDC", "USDT"]}
              featured={true}
            />
            <StrategyCard
              title="Liquid Staking ETH"
              apy="31.2"
              risk="Low"
              chains="3"
              protocols={["Lido", "Arbitrum", "Curve", "Convex"]}
              learningMode={true}
            />
            <StrategyCard
              title="Cross-Chain Yield"
              apy="24.7"
              risk="Medium"
              chains="5"
              protocols={["Uniswap", "Sushi", "PancakeSwap", "TraderJoe"]}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/strategies">
              <Button className="px-10 py-5 bg-black hover:bg-gray-800 rounded-2xl font-bold text-white text-xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  View All Strategies
                  <ArrowRight className="w-6 h-6" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Mode Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-gray-900">New to </span>
                <span className="text-orange-500">DeFi</span>
                <span className="text-gray-900">? Start Here</span>
              </h2>
              <p className="text-2xl text-gray-600">Toggle "Learning Mode" on strategy cards to see full tutorials</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-orange-500/50 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Beginner's Guide to DeFi</h3>
                <p className="text-gray-600 text-sm">Learn the basics of decentralized finance</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-orange-500/50 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">What Is Liquid Staking?</h3>
                <p className="text-gray-600 text-sm">Understanding the future of ETH staking</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-orange-500/50 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Stablecoins: The Backbone</h3>
                <p className="text-gray-600 text-sm">Why stablecoins are essential to DeFi</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-orange-500/50 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">How to Spot a Rug Pull</h3>
                <p className="text-gray-600 text-sm">Protect yourself from DeFi scams</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Credibility Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">Proven </span>
              <span className="text-orange-500">Results</span>
            </h2>
            <p className="text-2xl text-gray-600">Real performance from our optimized strategies</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MetricCard value="28.4%" label="Average APY" trend="+12% vs market" icon={TrendingUp} delay={0.1} />
            <MetricCard value="94%" label="Success Rate" trend="Last 30 days" icon={Award} delay={0.2} />
            <MetricCard value="$50M+" label="Strategies Analyzed" trend="+200% growth" icon={BarChart3} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gray-900">From First Deposit to </span>
              <span className="text-orange-500">Full Autopilot</span>
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Today, Forge guides you through strategies step by step. Tomorrow, it becomes your DeFi autopilot: you set your goals, and Forge executes intelligently.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Rocket className="w-8 h-8 text-orange-500" />
              <span className="text-orange-500 font-bold text-xl">Coming Q2 2024</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

