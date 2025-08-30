import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, Target, TrendingUp, Shield, Play, ChevronDown, Sparkles, Brain, BarChart3, Lock, Star, Users, Globe, Award } from 'lucide-react';
import { populateSampleData } from '../lib/sampleData';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Animation on scroll
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #FF6B35 0%, #FF8E53 20%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.5s ease-out',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-2xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #FFD700 20%, transparent 70%)',
          left: `${100 - mousePosition.x}%`,
          top: `${100 - mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.7s ease-out',
          animationDelay: '1s',
        }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
      </div>
      
      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );

  const FloatingCard = ({ children, delay = 0, className = "" }) => (
    <div 
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );

  const StrategyCard = ({ title, apy, risk, chains, protocols, featured = false }) => (
    <div className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105 ${featured ? 'ring-2 ring-orange-500/30' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">{apy}%</div>
          <div className="text-sm text-gray-400">APY</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${risk === 'Low' ? 'bg-green-400' : risk === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'}`} />
          <span className="text-gray-300 text-sm">{risk} Risk</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="text-gray-300 text-sm">{chains} Chains</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {protocols.slice(0, 3).map((protocol, i) => (
            <span key={i} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
              {protocol}
            </span>
          ))}
          {protocols.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
              +{protocols.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10">
        <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold transition-all duration-300 group">
          <span>View Strategy</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }) => (
    <FloatingCard delay={delay}>
      <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-orange-500/50 transition-all duration-500 hover:transform hover:scale-105">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </FloatingCard>
  );

  const MetricCard = ({ value, label, trend, icon: Icon, delay = 0 }) => (
    <FloatingCard delay={delay}>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <div className="text-gray-300 text-sm mb-1">{label}</div>
        <div className="text-green-400 text-xs">{trend}</div>
      </div>
    </FloatingCard>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* Logo/Brand */}
            <FloatingCard delay={0.2}>
              <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">Forge</span>
              </div>
            </FloatingCard>
            
            {/* Main headline */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  DeFi Strategies
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Automated
                </span>
              </h1>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Stop chasing APYs across Telegram threads. Forge builds, vets, and automates optimized multi-chain strategies so your capital compounds—without the chaos.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link to="/strategies">
                <Button className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-white text-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    Explore Strategies
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              
              <Button variant="outline" className="group px-10 py-5 border-2 border-white/30 rounded-2xl font-bold text-white text-xl hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 flex items-center gap-3 backdrop-blur-xl">
                <Play className="w-6 h-6" />
                Learn How It Works
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className={`flex flex-wrap justify-center items-center gap-8 text-gray-400 text-lg transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Audited Smart Contracts</span>
              </div>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>Non-Custodial</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-orange-400" />
                <span>$50M+ Optimized</span>
              </div>
            </div>
          </div>
          
          {/* Strategy Cards Grid */}
          <div className={`grid md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StrategyCard
              title="Lido + Arbitrum Maximizer"
              apy="31.2"
              risk="Low"
              chains="3"
              protocols={["Lido", "Arbitrum", "Curve", "Convex"]}
              featured={true}
            />
            <StrategyCard
              title="Curve 3Pool Optimizer"
              apy="8.5"
              risk="Low"
              chains="1"
              protocols={["Curve", "Convex", "USDC", "USDT"]}
            />
            <StrategyCard
              title="Cross-Chain Yield Hunter"
              apy="24.7"
              risk="Medium"
              chains="5"
              protocols={["Aave", "Uniswap", "Compound", "Sushi"]}
            />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Sign Up for Updates Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            {!isSubmitted ? (
              <>
                <h2 className="text-5xl font-bold mb-6">
                  <span className="text-white">Be the </span>
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">First</span>
                  <span className="text-white"> to Know</span>
                </h2>
                <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                  We're rolling out new strategies, product updates, and automation features every month. Join the Forge waitlist and get updates straight to your inbox.
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-6 max-w-md mx-auto">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-8 py-6 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-lg backdrop-blur-xl"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-white text-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                  >
                    Sign Up
                  </Button>
                </form>
                
                <div className="flex items-center justify-center gap-8 mt-8 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>No spam. Just DeFi insights, new strategies, and early access.</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-white">You're In!</h3>
                <p className="text-2xl text-gray-300">
                  Welcome to the Forge community. We'll keep you updated on new strategies, automation features, and exclusive insights.
                </p>
                <div className="text-orange-400 font-bold text-xl">
                  Next update: Coming soon
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Proven </span>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-2xl text-gray-300">Real performance from our AI-optimized strategies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <MetricCard value="28.4%" label="Average APY" trend="+12% vs market" icon={TrendingUp} delay={0.1} />
            <MetricCard value="94%" label="Success Rate" trend="Last 30 days" icon={Award} delay={0.2} />
            <MetricCard value="$50M+" label="Total Analyzed" trend="+200% growth" icon={BarChart3} delay={0.3} />
            <MetricCard value="1000+" label="Protocols Tracked" trend="Multi-chain" icon={Globe} delay={0.4} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Why </span>
              <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Forge</span>
              <span className="text-white"> Exists</span>
            </h2>
            <p className="text-2xl text-gray-300">AI-powered strategy analysis and execution</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={Brain}
              title="AI Strategy Analysis"
              description="Our advanced AI analyzes thousands of DeFi protocols across multiple chains to identify the most profitable and secure yield opportunities."
              gradient="from-blue-500 to-purple-600"
              delay={0.1}
            />
            <FeatureCard
              icon={Target}
              title="Risk Assessment"
              description="Comprehensive risk analysis including smart contract audits, impermanent loss calculations, and market volatility assessment."
              gradient="from-orange-500 to-yellow-500"
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="Step-by-Step Execution"
              description="Detailed walkthroughs with exact amounts, gas optimization, and real-time monitoring to ensure successful strategy execution."
              gradient="from-green-500 to-teal-600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Strategy Example */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              <span className="text-orange-400 font-semibold text-lg">Live Strategy Example</span>
            </div>
            
            <h3 className="text-4xl font-bold text-white mb-8">Multi-Chain ETH Maximizer</h3>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <span className="text-white text-lg">Stake ETH on Lido → Liquid staking rewards</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <span className="text-white text-lg">Bridge stETH to Arbitrum → Lower fees</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <span className="text-white text-lg">Provide liquidity on Curve → Trading fees</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <span className="text-white text-lg">Stake LP tokens → Additional rewards</span>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="text-center p-8 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl border border-orange-500/30">
                  <div className="text-6xl font-bold text-white mb-4">31.2%</div>
                  <div className="text-orange-400 font-semibold text-xl">Projected APY</div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20">
                    <div className="text-2xl font-bold text-green-400 mb-2">Low</div>
                    <div className="text-gray-300">Risk Level</div>
                  </div>
                  <div className="text-center p-6 bg-white/10 rounded-xl border border-white/20">
                    <div className="text-2xl font-bold text-blue-400 mb-2">3</div>
                    <div className="text-gray-300">Chains</div>
                  </div>
                </div>
                
                <Link to="/strategies">
                  <Button className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl font-bold text-white text-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
                    Learn This Strategy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

