import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Plus, X, Save, FileText, Zap } from 'lucide-react';
import { createStrategy } from '../lib/strategiesService';
import { createBlogPost } from '../lib/blogService';
import { AdminAuth } from '../components/AdminAuth';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('strategy');
  const [loading, setLoading] = useState(false);

  // Strategy form state
  const [strategyForm, setStrategyForm] = useState({
    name: '',
    description: '',
    apy: '',
    risk: 'Low',
    tvl: '',
    category: 'Liquid Staking',
    timeToSetup: '',
    minInvestment: '',
    maxInvestment: '',
    tags: [],
    protocols: [],
    chains: [],
    steps: [],
    featured: false
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Strategy',
    tags: [],
    readTime: '',
    featured: false
  });

  // Temporary inputs
  const [newTag, setNewTag] = useState('');
  const [newProtocol, setNewProtocol] = useState('');
  const [newChain, setNewChain] = useState('');
  const [newStep, setNewStep] = useState('');

  const handleStrategySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const strategyData = {
        ...strategyForm,
        apy: parseFloat(strategyForm.apy),
        tvl: parseInt(strategyForm.tvl),
        minInvestment: parseFloat(strategyForm.minInvestment),
        maxInvestment: parseFloat(strategyForm.maxInvestment),
        readTime: parseInt(strategyForm.readTime),
        performance: {
          '7d': 0,
          '30d': 0,
          '90d': 0
        }
      };
      
      await createStrategy(strategyData);
      alert('Strategy created successfully!');
      
      // Reset form
      setStrategyForm({
        name: '',
        description: '',
        apy: '',
        risk: 'Low',
        tvl: '',
        category: 'Liquid Staking',
        timeToSetup: '',
        minInvestment: '',
        maxInvestment: '',
        tags: [],
        protocols: [],
        chains: [],
        steps: [],
        featured: false
      });
    } catch (error) {
      alert('Error creating strategy: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blogData = {
        ...blogForm,
        readTime: parseInt(blogForm.readTime),
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await createBlogPost(blogData);
      alert('Blog post created successfully!');
      
      // Reset form
      setBlogForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Strategy',
        tags: [],
        readTime: '',
        featured: false
      });
    } catch (error) {
      alert('Error creating blog post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = (type) => {
    if (newTag.trim()) {
      if (type === 'strategy') {
        setStrategyForm(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      } else {
        setBlogForm(prev => ({
          ...prev,
          tags: [...prev.tags, newTag.trim()]
        }));
      }
      setNewTag('');
    }
  };

  const removeTag = (tag, type) => {
    if (type === 'strategy') {
      setStrategyForm(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tag)
      }));
    } else {
      setBlogForm(prev => ({
        ...prev,
        tags: prev.tags.filter(t => t !== tag)
      }));
    }
  };

  const addProtocol = () => {
    if (newProtocol.trim()) {
      setStrategyForm(prev => ({
        ...prev,
        protocols: [...prev.protocols, newProtocol.trim()]
      }));
      setNewProtocol('');
    }
  };

  const removeProtocol = (protocol) => {
    setStrategyForm(prev => ({
      ...prev,
      protocols: prev.protocols.filter(p => p !== protocol)
    }));
  };

  const addChain = () => {
    if (newChain.trim()) {
      setStrategyForm(prev => ({
        ...prev,
        chains: [...prev.chains, newChain.trim()]
      }));
      setNewChain('');
    }
  };

  const removeChain = (chain) => {
    setStrategyForm(prev => ({
      ...prev,
      chains: prev.chains.filter(c => c !== chain)
    }));
  };

  const addStep = () => {
    if (newStep.trim()) {
      setStrategyForm(prev => ({
        ...prev,
        steps: [...prev.steps, newStep.trim()]
      }));
      setNewStep('');
    }
  };

  const removeStep = (step) => {
    setStrategyForm(prev => ({
      ...prev,
      steps: prev.steps.filter(s => s !== step)
    }));
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-foreground">Admin </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create and manage strategies and blog posts
            </p>
          </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'strategy' ? 'default' : 'outline'}
            onClick={() => setActiveTab('strategy')}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Add Strategy
          </Button>
          <Button
            variant={activeTab === 'blog' ? 'default' : 'outline'}
            onClick={() => setActiveTab('blog')}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Add Blog Post
          </Button>
        </div>

        {/* Strategy Form */}
        {activeTab === 'strategy' && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Strategy</CardTitle>
              <CardDescription>
                Add a new DeFi strategy to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStrategySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Strategy Name</Label>
                    <Input
                      id="name"
                      value={strategyForm.name}
                      onChange={(e) => setStrategyForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={strategyForm.category} onValueChange={(value) => setStrategyForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Liquid Staking">Liquid Staking</SelectItem>
                        <SelectItem value="Stablecoin">Stablecoin</SelectItem>
                        <SelectItem value="Yield Farming">Yield Farming</SelectItem>
                        <SelectItem value="Arbitrage">Arbitrage</SelectItem>
                        <SelectItem value="Index Fund">Index Fund</SelectItem>
                        <SelectItem value="Bitcoin Yield">Bitcoin Yield</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={strategyForm.description}
                    onChange={(e) => setStrategyForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="apy">APY (%)</Label>
                    <Input
                      id="apy"
                      type="number"
                      step="0.1"
                      value={strategyForm.apy}
                      onChange={(e) => setStrategyForm(prev => ({ ...prev, apy: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="risk">Risk Level</Label>
                    <Select value={strategyForm.risk} onValueChange={(value) => setStrategyForm(prev => ({ ...prev, risk: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="tvl">TVL ($)</Label>
                    <Input
                      id="tvl"
                      type="number"
                      value={strategyForm.tvl}
                      onChange={(e) => setStrategyForm(prev => ({ ...prev, tvl: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeToSetup">Setup Time</Label>
                    <Input
                      id="timeToSetup"
                      value={strategyForm.timeToSetup}
                      onChange={(e) => setStrategyForm(prev => ({ ...prev, timeToSetup: e.target.value }))}
                      placeholder="e.g., 15 min"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minInvestment">Min Investment ($)</Label>
                    <Input
                      id="minInvestment"
                      type="number"
                      value={strategyForm.minInvestment}
                      onChange={(e) => setStrategyForm(prev => ({ ...prev, minInvestment: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxInvestment">Max Investment ($)</Label>
                    <Input
                      id="maxInvestment"
                      type="number"
                      value={strategyForm.maxInvestment}
                      onChange={(e) => setStrategyForm(prev => ({ ...prev, maxInvestment: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('strategy'))}
                    />
                    <Button type="button" onClick={() => addTag('strategy')} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strategyForm.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag, 'strategy')} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Protocols */}
                <div>
                  <Label>Protocols</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newProtocol}
                      onChange={(e) => setNewProtocol(e.target.value)}
                      placeholder="Add a protocol"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProtocol())}
                    />
                    <Button type="button" onClick={addProtocol} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strategyForm.protocols.map((protocol, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {protocol}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeProtocol(protocol)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Chains */}
                <div>
                  <Label>Chains</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newChain}
                      onChange={(e) => setNewChain(e.target.value)}
                      placeholder="Add a chain"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChain())}
                    />
                    <Button type="button" onClick={addChain} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strategyForm.chains.map((chain, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {chain}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeChain(chain)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div>
                  <Label>Steps</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      placeholder="Add a step"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
                    />
                    <Button type="button" onClick={addStep} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {strategyForm.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-sm font-medium">{index + 1}.</span>
                        <span className="flex-1">{step}</span>
                        <X className="w-4 h-4 cursor-pointer" onClick={() => removeStep(step)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={strategyForm.featured}
                    onChange={(e) => setStrategyForm(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                  <Label htmlFor="featured">Featured Strategy</Label>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Creating...' : <><Save className="w-4 h-4 mr-2" />Create Strategy</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Blog Form */}
        {activeTab === 'blog' && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>
                Add a new blog post to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="blog-post-slug"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                    required
                    rows={10}
                    placeholder="# Your blog post content here...

## Section 1

Your content goes here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={blogForm.category} onValueChange={(value) => setBlogForm(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Strategy">Strategy</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="News">News</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="readTime">Read Time (minutes)</Label>
                    <Input
                      id="readTime"
                      type="number"
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm(prev => ({ ...prev, readTime: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('blog'))}
                    />
                    <Button type="button" onClick={() => addTag('blog')} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blogForm.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag, 'blog')} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured-blog"
                    checked={blogForm.featured}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                  <Label htmlFor="featured-blog">Featured Post</Label>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Creating...' : <><Save className="w-4 h-4 mr-2" />Create Blog Post</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
