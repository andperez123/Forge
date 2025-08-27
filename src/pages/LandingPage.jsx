import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, Target, TrendingUp, Shield, Play, ChevronDown, Sparkles, BarChart3, Lock } from 'lucide-react';

export function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #FF6B35 0%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out',
        }}
      />
      <div 
        className="absolute w-64 h-64 rounded-full opacity-15 blur-2xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
          left: `${100 - mousePosition.x}%`,
          top: `${100 - mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.5s ease-out',
          animationDelay: '1s',
        }}
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-accent rounded-full opacity-40 animate-float"
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

  const ModernStrategyVisualization = () => (
    <div className="relative w-full h-80 bg-gradient-to-br from-card to-muted rounded-2xl p-8 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {[...Array(48)].map((_, i) => (
            <div key={i} className="border border-accent/20" />
          ))}
        </div>
      </div>
      
      {/* DeFi Protocol Network visualization */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="relative">
          {/* Central DeFi hub */}
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-pulse-slow">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          
          {/* Orbiting protocol nodes */}
          {[
            { label: 'Lido', angle: 0, distance: 80, delay: '0s' },
            { label: 'Curve', angle: 72, distance: 80, delay: '0.5s' },
            { label: 'Aave', angle: 144, distance: 80, delay: '1s' },
            { label: 'Uniswap', angle: 216, distance: 80, delay: '1.5s' },
            { label: 'Compound', angle: 288, distance: 80, delay: '2s' },
          ].map((node, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 bg-card border-2 border-accent rounded-full flex items-center justify-center text-xs font-semibold text-accent animate-orbit"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${node.angle}deg) translateX(${node.distance}px) rotate(-${node.angle}deg)`,
                animationDelay: node.delay,
              }}
            >
              {node.label}
            </div>
          ))}
          
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={Math.cos((angle * Math.PI) / 180) * 80}
                y2={Math.sin((angle * Math.PI) / 180) * 80}
                stroke="url(#gradient)"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Performance metrics overlay */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg p-3">
        <div className="text-accent text-sm font-semibold">Strategy Network</div>
        <div className="text-white text-lg font-bold">5 Protocols</div>
        <div className="text-muted-foreground text-xs">Multi-Chain</div>
      </div>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
    <div className="group relative bg-gradient-to-br from-card/50 to-muted/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );

  const MetricCard = ({ value, label, trend }) => (
    <div className="bg-gradient-to-br from-card/80 to-muted/80 backdrop-blur-sm rounded-xl p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <TrendingUp className="w-5 h-5 text-green-400" />
      </div>
      <div className="text-muted-foreground text-sm">{label}</div>
      <div className="text-green-400 text-xs mt-1">{trend}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Logo/Brand */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold">Forge</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
                DeFi Strategies
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Decoded
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Explore and understand proven multi-chain yield strategies with detailed breakdowns. 
              <br />
              <span className="text-foreground font-semibold">Research-backed. Risk-analyzed. Step-by-step explained.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/strategies">
                <Button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-white text-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Strategies
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              
              <Button variant="outline" className="group px-8 py-4 border-2 border-border rounded-xl font-semibold text-foreground text-lg hover:border-accent hover:bg-accent/10 transition-all duration-300 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Audited Smart Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Non-Custodial</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>$50M+ Optimized</span>
              </div>
            </div>
          </div>
          
          {/* Modern Strategy Visualization */}
          <div className="max-w-4xl mx-auto">
            <ModernStrategyVisualization />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Proven </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground">Real performance from our optimized strategies</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <MetricCard value="28.4%" label="Average APY" trend="+12% vs market" />
            <MetricCard value="94%" label="Success Rate" trend="Last 30 days" />
            <MetricCard value="$50M+" label="Total Analyzed" trend="+200% growth" />
            <MetricCard value="1000+" label="Protocols Tracked" trend="Multi-chain" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">How </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Forge</span>
              <span className="text-foreground"> Works</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Target}
              title="Strategy Research"
              description="Deep analysis of investment goals, risk tolerance, and market conditions to identify optimal DeFi opportunities across chains."
              gradient="from-blue-500 to-purple-600"
            />
            <FeatureCard
              icon={BarChart3}
              title="Protocol Analysis"
              description="Comprehensive evaluation of 1000+ protocols across multiple chains to find the best yield opportunities and risk profiles."
              gradient="from-primary to-accent"
            />
            <FeatureCard
              icon={Zap}
              title="Strategy Breakdown"
              description="Detailed step-by-step explanations of how each strategy works, including risks, requirements, and expected returns."
              gradient="from-green-500 to-teal-600"
            />
          </div>
        </div>
      </section>

      {/* Strategy Example */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-card/50 to-muted/50 backdrop-blur-sm rounded-3xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-muted-foreground">Live Strategy Example</span>
            </div>
            
            <h3 className="text-3xl font-bold text-foreground mb-6">Multi-Chain ETH Maximizer</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <span className="text-foreground">Stake ETH on Lido → Liquid staking rewards</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <span className="text-foreground">Bridge stETH to Arbitrum → Lower fees</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <span className="text-foreground">Provide liquidity on Curve → Trading fees</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <span className="text-foreground">Stake LP tokens → Additional rewards</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-accent/30">
                  <div className="text-4xl font-bold text-foreground mb-2">31.2%</div>
                  <div className="text-accent font-semibold">Projected APY</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-xl font-bold text-green-400">Low</div>
                    <div className="text-muted-foreground text-sm">Risk Level</div>
                  </div>
                  <div className="text-center p-4 bg-background/50 rounded-lg">
                    <div className="text-xl font-bold text-blue-400">3</div>
                    <div className="text-muted-foreground text-sm">Chains</div>
                  </div>
                </div>
                
                <Link to="/strategies">
                  <Button className="w-full py-3 bg-gradient-to-r from-primary to-accent rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300">
                    Learn This Strategy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-card/80 to-muted/80 backdrop-blur-sm rounded-3xl p-8 border border-border">
            {!isSubmitted ? (
              <>
                <h2 className="text-4xl font-bold mb-4">
                  <span className="text-foreground">Ready to </span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Forge</span>
                  <span className="text-foreground">?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join the waitlist for early access to advanced DeFi strategies
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 bg-background/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-white text-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                  >
                    Get Early Access
                  </Button>
                </form>
                
                <p className="text-muted-foreground text-sm mt-4">
                  🔥 2,847 builders already joined • No spam, ever
                </p>
              </>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">You're In!</h3>
                <p className="text-xl text-muted-foreground">
                  We'll notify you when Forge is ready to optimize your DeFi strategies.
                </p>
                <div className="text-accent font-semibold">
                  Expected launch: Q2 2024
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

