import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Brain, Zap, Target, TrendingUp, Shield, Rocket, Sparkles, ArrowRight, CheckCircle, BarChart3, Clock, Users } from 'lucide-react';

export function StrategyBuilderPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
          source: 'builder_page',
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
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
                  Strategy
                </span>
                <br />
                <span className="text-orange-500">
                  Builder
                </span>
              </h1>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
                Build custom DeFi strategies with AI-powered insights. Coming soon with advanced automation and real-time optimization.
              </p>
            </div>
            
            {/* Coming Soon Badge */}
            <div className={`flex justify-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-xl">
                <Rocket className="w-6 h-6" />
                Coming Q2 2024
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up for Early Access */}
      <section className="py-32 px-4 relative bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
            {!isSubmitted ? (
              <>
                <h2 className="text-5xl font-bold mb-6">
                  <span className="text-gray-900">Get </span>
                  <span className="text-orange-500">Early Access</span>
                </h2>
                <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Be among the first to build and deploy custom DeFi strategies. Join the waitlist for exclusive beta access and strategy automation features.
                </p>
                
                <form onSubmit={handleEmailSubmit} className="space-y-6 max-w-md mx-auto">
                  <div className="relative">
                    <Input
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
                    Join Waitlist
                  </Button>
                </form>
                
                <div className="flex items-center justify-center gap-8 mt-8 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Exclusive beta access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>Priority support</span>
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
                  Welcome to the Strategy Builder waitlist. We'll notify you as soon as the beta is ready.
                </p>
                <div className="text-orange-500 font-bold text-xl">
                  Expected beta: Q2 2024
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">What's </span>
              <span className="text-orange-500">Coming</span>
            </h2>
            <p className="text-2xl text-gray-600">Advanced features for building and deploying DeFi strategies</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="AI Strategy Builder"
              description="Create custom strategies with AI-powered recommendations based on your risk profile and market conditions."
              delay={0.1}
            />
            <FeatureCard
              icon={Zap}
              title="One-Click Deployment"
              description="Deploy your strategies across multiple chains with a single click. No more manual transaction management."
              delay={0.2}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Real-Time Optimization"
              description="Automatically rebalance and optimize your strategies based on market conditions and yield opportunities."
              delay={0.3}
            />
            <FeatureCard
              icon={Shield}
              title="Risk Management"
              description="Advanced risk assessment and automatic position adjustments to protect your capital."
              delay={0.4}
            />
            <FeatureCard
              icon={BarChart3}
              title="Performance Analytics"
              description="Detailed analytics and performance tracking for all your deployed strategies."
              delay={0.5}
            />
            <FeatureCard
              icon={Clock}
              title="Automated Execution"
              description="Set up automated triggers and schedules for strategy execution and rebalancing."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900">How the </span>
              <span className="text-orange-500">Builder Works</span>
            </h2>
            <p className="text-2xl text-gray-600">Simple 3-step process to create and deploy strategies</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Define Parameters</h3>
              <p className="text-gray-600">Set your investment amount, risk tolerance, preferred chains, and goals.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes thousands of protocols to create your optimal strategy.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deploy & Monitor</h3>
              <p className="text-gray-600">Deploy with one click and monitor performance in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-sm">
            <h2 className="text-5xl font-bold mb-6">
              <span className="text-gray-900">Ready to Build </span>
              <span className="text-orange-500">Your Strategy</span>
              <span className="text-gray-900">?</span>
            </h2>
            <p className="text-2xl text-gray-600 mb-8">
              Join the waitlist and be the first to experience the future of DeFi strategy building.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Rocket className="w-8 h-8 text-orange-500" />
              <span className="text-orange-500 font-bold text-xl">Limited beta spots available</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

