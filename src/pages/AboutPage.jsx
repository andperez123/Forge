import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Sparkles, Target, Users, Zap, Shield, Globe, Award, Heart, Brain } from 'lucide-react';

export function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former Goldman Sachs quant with 8+ years in traditional finance. Led the development of algorithmic trading systems before diving into DeFi.',
      expertise: ['Quantitative Finance', 'Risk Management', 'Strategy Development']
    },
    {
      name: 'Sarah Kim',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer with expertise in machine learning and distributed systems. Built scalable AI systems serving millions of users.',
      expertise: ['Machine Learning', 'Blockchain', 'System Architecture']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Research',
      bio: 'DeFi researcher and protocol analyst. Previously at Messari and DeFi Pulse, tracking and analyzing the DeFi ecosystem.',
      expertise: ['DeFi Protocols', 'Market Analysis', 'Research']
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Security',
      bio: 'Cybersecurity expert with focus on smart contract security. Led security audits for major DeFi protocols.',
      expertise: ['Smart Contract Security', 'Auditing', 'Risk Assessment']
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security of user funds above all else, implementing multiple layers of protection and rigorous testing.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Innovation',
      description: 'We leverage cutting-edge AI and machine learning to create strategies that adapt and optimize in real-time.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Our platform is built for the community, with transparent governance and user feedback driving our development.'
    },
    {
      icon: Globe,
      title: 'Accessible to All',
      description: 'We believe DeFi should be accessible to everyone, regardless of technical expertise or investment size.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Forge was founded with the vision of making DeFi accessible through AI automation.'
    },
    {
      year: '2023',
      title: 'Seed Funding',
      description: 'Raised $5M in seed funding from leading crypto VCs and angel investors.'
    },
    {
      year: '2024',
      title: 'Beta Launch',
      description: 'Launched beta platform with 1,000+ early users and $10M+ in optimized strategies.'
    },
    {
      year: '2024',
      title: 'Public Launch',
      description: 'Full platform launch with AI-powered strategy generation and multi-chain support.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-accent font-semibold">About Forge</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Building the </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Future</span>
            <br />
            <span className="text-foreground">of DeFi</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize access to sophisticated DeFi strategies through AI-powered automation. 
            Our platform makes it possible for anyone to participate in the DeFi revolution with confidence and ease.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Target className="w-6 h-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To make sophisticated DeFi strategies accessible to everyone through AI-powered automation, 
                enabling users to maximize their returns while minimizing risk and complexity.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Zap className="w-6 h-6 text-accent" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where anyone can participate in DeFi with the same level of sophistication as 
                institutional investors, powered by AI that continuously optimizes for the best outcomes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-foreground">Our </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Values</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-foreground">Meet the </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Team</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-foreground">Our </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="inline-block max-w-md">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                            {milestone.year}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background flex-shrink-0 z-10" />
                  
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                  <div className="text-muted-foreground">Total Value Optimized</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">28.4%</div>
                  <div className="text-muted-foreground">Average APY</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investors & Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-foreground">Backed by </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Industry Leaders</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Andreessen Horowitz', 'Coinbase Ventures', 'Paradigm', 'Sequoia Capital'].map((investor) => (
              <Card key={investor} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground">{investor}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card/80 to-muted/80 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're always looking for talented individuals who share our passion for DeFi and AI. 
                Help us build the future of decentralized finance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-primary to-accent">
                  View Open Positions
                </Button>
                <Button variant="outline">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

