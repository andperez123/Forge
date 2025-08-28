import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Search, Calendar, Clock, User, TrendingUp, BookOpen, ArrowRight, Tag } from 'lucide-react';
import { useBlogPosts } from '../lib/hooks/useFirebase';
import { BlogListingSEO } from '../components/SEOHead';

// Hardcoded blog posts data - ready for Firebase integration
const BLOG_POSTS = [
  {
    id: 'defi-yield-strategies-2024',
    title: 'The Ultimate Guide to DeFi Yield Strategies in 2024',
    slug: 'defi-yield-strategies-2024',
    excerpt: 'Discover the most profitable and secure DeFi yield strategies for 2024. From liquid staking to yield farming, learn how to maximize your returns while managing risk.',
    content: `# The Ultimate Guide to DeFi Yield Strategies in 2024

The DeFi landscape has evolved dramatically in 2024, offering unprecedented opportunities for yield generation. This comprehensive guide explores the most effective strategies for maximizing returns while managing risk in the current market environment.

## Liquid Staking: The Foundation of Modern DeFi

Liquid staking has emerged as the cornerstone of DeFi yield strategies, offering a perfect balance of security and returns. By staking ETH through protocols like Lido, users can earn staking rewards while maintaining liquidity through liquid staking tokens (LSTs).

### Key Benefits:
- Earn ETH staking rewards (~4-6% APY)
- Maintain liquidity with stETH
- Use LSTs as collateral in other protocols
- Participate in DeFi while supporting network security

## Advanced Yield Farming Techniques

Modern yield farming goes beyond simple liquidity provision. Today's strategies involve sophisticated approaches like:

### 1. Leveraged Yield Farming
Using borrowed capital to amplify returns while carefully managing liquidation risks.

### 2. Cross-Chain Arbitrage
Exploiting yield differences across different blockchains and protocols.

### 3. Automated Rebalancing
Using protocols like Yearn Finance to automatically optimize yield across multiple strategies.

## Risk Management in DeFi

Successful DeFi investing requires robust risk management:

- **Smart Contract Risk**: Only use audited protocols with proven track records
- **Impermanent Loss**: Understand the risks of providing liquidity to volatile pairs
- **Market Risk**: Diversify across different assets and strategies
- **Regulatory Risk**: Stay informed about evolving regulations

## Conclusion

The DeFi yield landscape in 2024 offers exciting opportunities for informed investors. By combining liquid staking, strategic yield farming, and proper risk management, investors can achieve sustainable returns in this dynamic ecosystem.`,
    author: 'Alex Chen',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    category: 'Strategy',
    tags: ['DeFi', 'Yield Farming', 'Liquid Staking', 'Risk Management'],
    featured: true,
    imageUrl: '/blog/defi-strategies-2024.jpg',
    seo: {
      metaTitle: 'Ultimate DeFi Yield Strategies Guide 2024 | Forge',
      metaDescription: 'Discover profitable DeFi yield strategies for 2024. Learn liquid staking, yield farming, and risk management techniques to maximize returns.',
      keywords: ['DeFi yield strategies', 'liquid staking', 'yield farming', 'DeFi 2024', 'cryptocurrency investing'],
      canonicalUrl: '/blog/defi-yield-strategies-2024'
    }
  },
  {
    id: 'understanding-liquid-staking',
    title: 'Understanding Liquid Staking Protocols: A Deep Dive',
    slug: 'understanding-liquid-staking',
    excerpt: 'Explore the mechanics of liquid staking protocols and how they revolutionize Ethereum staking. Learn about risks, rewards, and best practices.',
    content: `# Understanding Liquid Staking Protocols: A Deep Dive

Liquid staking has become one of the most important innovations in DeFi, allowing users to earn staking rewards while maintaining liquidity. This comprehensive guide explores how these protocols work and their impact on the DeFi ecosystem.

## What is Liquid Staking?

Liquid staking protocols allow users to stake their ETH and receive a liquid token representing their staked position. This innovation solves the liquidity problem of traditional staking.

### Key Benefits:
- Earn staking rewards without locking up assets
- Use liquid staking tokens in other DeFi protocols
- Maintain exposure to ETH price movements
- Participate in network security

## How Liquid Staking Works

The process involves several key steps:

1. **Deposit ETH**: Users deposit ETH into the liquid staking protocol
2. **Receive LST**: Protocol issues liquid staking tokens (like stETH)
3. **Validator Operations**: Protocol stakes ETH with validators
4. **Reward Distribution**: Staking rewards are distributed to token holders

## Major Liquid Staking Protocols

### Lido Finance
- Largest liquid staking protocol by TVL
- Issues stETH tokens
- Distributed validator set
- Strong DeFi integration

### Rocket Pool
- Decentralized protocol design
- Issues rETH tokens
- Permissionless node operators
- Lower minimum staking requirements

### Frax Ether
- Part of the Frax ecosystem
- Issues frxETH and sfrxETH
- Innovative dual-token model
- Competitive yields

## Risks and Considerations

Liquid staking involves several risks:

- **Smart Contract Risk**: Protocol vulnerabilities
- **Validator Risk**: Slashing and performance issues
- **Liquidity Risk**: Potential depeg of liquid tokens
- **Centralization Risk**: Concentration of staked ETH

## Using Liquid Staking Tokens in DeFi

LSTs can be used across DeFi:

- **Lending**: Use as collateral on Aave, Compound
- **DEX Trading**: Provide liquidity on Curve, Uniswap
- **Yield Farming**: Stake in various farming protocols
- **Leveraged Strategies**: Borrow against LSTs for leverage

## Conclusion

Liquid staking represents a fundamental shift in how we think about staking and DeFi composability. Understanding these protocols is essential for modern DeFi participation.`,
    author: 'Sarah Kim',
    publishedAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    readTime: 6,
    category: 'Education',
    tags: ['Liquid Staking', 'Ethereum', 'DeFi', 'Staking'],
    featured: true,
    imageUrl: '/blog/liquid-staking-guide.jpg',
    seo: {
      metaTitle: 'Understanding Liquid Staking Protocols: Complete Guide | Forge',
      metaDescription: 'Learn how liquid staking protocols work. Comprehensive guide to Lido, Rocket Pool, and other liquid staking solutions.',
      keywords: ['liquid staking', 'Ethereum staking', 'stETH', 'DeFi staking', 'liquid staking tokens'],
      canonicalUrl: '/blog/understanding-liquid-staking'
    }
  },
  {
    id: 'cross-chain-yield-opportunities',
    title: 'Cross-Chain Yield Opportunities: Maximizing Returns Across Blockchains',
    slug: 'cross-chain-yield-opportunities',
    excerpt: 'Learn how to leverage yield opportunities across multiple blockchains. Discover the best cross-chain protocols and strategies for 2024.',
    content: `# Cross-Chain Yield Opportunities: Maximizing Returns Across Blockchains

The multi-chain future of DeFi is here, and with it comes unprecedented opportunities for yield generation across different blockchain ecosystems.

## Why Cross-Chain Matters

Different blockchains offer unique advantages:

- **Ethereum**: Highest TVL and most mature protocols
- **Arbitrum**: Lower fees with Ethereum security
- **Polygon**: Fast transactions and growing ecosystem
- **Avalanche**: High throughput and innovative protocols

## Top Cross-Chain Strategies

### 1. Arbitrage Opportunities
Price differences between chains create profitable arbitrage opportunities for sophisticated traders.

### 2. Yield Rate Shopping
Different chains often offer varying yields for similar strategies, allowing for optimization.

### 3. Diversified Exposure
Spreading investments across chains reduces single-chain risk while maximizing opportunities.

## Cross-Chain Protocols to Watch

- **Stargate Finance**: Cross-chain liquidity protocol
- **Multichain**: Bridge protocol for asset transfers
- **LayerZero**: Omnichain interoperability protocol

## Risks and Considerations

Cross-chain strategies come with additional risks:

- Bridge security risks
- Cross-chain transaction complexity
- Varying gas costs
- Regulatory differences

## Conclusion

Cross-chain yield strategies represent the future of DeFi investing, offering enhanced returns and diversification for sophisticated investors.`,
    author: 'Michael Rodriguez',
    publishedAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
    readTime: 7,
    category: 'Strategy',
    tags: ['Cross-Chain', 'Multi-Chain', 'Arbitrage', 'Yield Optimization'],
    featured: false,
    imageUrl: '/blog/cross-chain-yield.jpg',
    seo: {
      metaTitle: 'Cross-Chain Yield Opportunities 2024 | Multi-Chain DeFi Strategies',
      metaDescription: 'Maximize returns with cross-chain yield strategies. Learn about multi-chain DeFi opportunities and best practices for 2024.',
      keywords: ['cross-chain DeFi', 'multi-chain yield', 'cross-chain arbitrage', 'blockchain yield farming', 'DeFi bridges'],
      canonicalUrl: '/blog/cross-chain-yield-opportunities'
    }
  },
  {
    id: 'defi-security-best-practices',
    title: 'DeFi Security Best Practices: Protecting Your Investments',
    slug: 'defi-security-best-practices',
    excerpt: 'Essential security practices for DeFi investors. Learn how to protect your funds from smart contract risks, scams, and other threats.',
    content: `# DeFi Security Best Practices: Protecting Your Investments

Security is paramount in DeFi. This guide covers essential practices to protect your investments from the various risks present in decentralized finance.

## Understanding DeFi Risks

### Smart Contract Risk
- Code vulnerabilities
- Unaudited protocols
- Economic exploits

### Operational Risk
- Private key management
- Phishing attacks
- Social engineering

### Market Risk
- Impermanent loss
- Liquidation risk
- Market volatility

## Security Best Practices

### 1. Use Hardware Wallets
Store significant funds in hardware wallets like Ledger or Trezor.

### 2. Verify Contract Addresses
Always verify contract addresses before interacting with protocols.

### 3. Start Small
Test new protocols with small amounts before committing larger funds.

### 4. Use Audited Protocols
Prioritize protocols that have been audited by reputable firms.

### 5. Diversify Risk
Don't put all funds in a single protocol or strategy.

## Red Flags to Avoid

- Unaudited protocols
- Anonymous teams
- Unrealistic yield promises
- Lack of documentation
- No community presence

## Emergency Procedures

Know how to:
- Quickly exit positions
- Revoke token approvals
- Contact protocol teams
- Report security issues

## Conclusion

DeFi offers incredible opportunities, but security must always be your top priority. By following these best practices, you can significantly reduce your risk while participating in the DeFi ecosystem.`,
    author: 'Emma Thompson',
    publishedAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
    readTime: 9,
    category: 'Security',
    tags: ['Security', 'Risk Management', 'Best Practices', 'Wallet Security'],
    featured: false,
    imageUrl: '/blog/defi-security.jpg',
    seo: {
      metaTitle: 'DeFi Security Best Practices 2024 | Protect Your Crypto Investments',
      metaDescription: 'Learn essential DeFi security practices to protect your investments. Comprehensive guide to smart contract risks and wallet security.',
      keywords: ['DeFi security', 'crypto security', 'smart contract risks', 'wallet security', 'DeFi best practices'],
      canonicalUrl: '/blog/defi-security-best-practices'
    }
  },
  {
    id: 'liquid-staking-guide',
    title: 'Liquid Staking Explained: Earn While Staying Liquid',
    slug: 'liquid-staking-guide',
    excerpt: 'Complete guide to liquid staking protocols. Learn how to earn staking rewards while maintaining liquidity with liquid staking tokens.',
    content: `# Liquid Staking Explained: Earn While Staying Liquid

Liquid staking has revolutionized how we think about staking rewards, offering the best of both worlds: earning staking yields while maintaining liquidity.

## What is Liquid Staking?

Liquid staking allows users to stake their tokens while receiving liquid staking tokens (LSTs) that represent their staked position. These LSTs can be used in DeFi while the underlying tokens earn staking rewards.

## How Liquid Staking Works

1. **Deposit**: Stake your tokens with a liquid staking protocol
2. **Receive**: Get liquid staking tokens (e.g., stETH for ETH)
3. **Earn**: Accrue staking rewards automatically
4. **Use**: Deploy LSTs in DeFi for additional yield

## Top Liquid Staking Protocols

### Lido Finance
- Largest liquid staking protocol
- Supports ETH, SOL, MATIC, and more
- Strong security track record

### Rocket Pool
- Decentralized ETH liquid staking
- Community-governed protocol
- Lower minimum requirements

### Frax Finance
- Innovative frxETH mechanism
- Dual token system
- High capital efficiency

## Benefits of Liquid Staking

- **Liquidity**: Use staked assets in DeFi
- **Composability**: Build complex strategies
- **No Lock-up**: Exit anytime (subject to liquidity)
- **Automatic Compounding**: Rewards compound automatically

## Risks to Consider

- **Smart Contract Risk**: Protocol vulnerabilities
- **Slashing Risk**: Validator penalties
- **Depeg Risk**: LST trading below underlying asset
- **Centralization Risk**: Validator concentration

## Liquid Staking Strategies

### Basic Strategy
Simply hold LSTs to earn staking rewards with liquidity.

### DeFi Integration
Use LSTs as collateral for borrowing or in liquidity pools.

### Yield Stacking
Combine staking rewards with DeFi yields for enhanced returns.

## The Future of Liquid Staking

Liquid staking is becoming the default way to stake, with innovations like:
- Multi-asset liquid staking
- Cross-chain liquid staking
- Restaking protocols
- Enhanced yield strategies

## Conclusion

Liquid staking represents a fundamental shift in how we approach staking, offering unprecedented flexibility and yield opportunities for modern DeFi investors.`,
    author: 'David Park',
    publishedAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-05T11:20:00Z',
    readTime: 10,
    category: 'Education',
    tags: ['Liquid Staking', 'ETH Staking', 'LST', 'Lido', 'Staking Rewards'],
    featured: true,
    imageUrl: '/blog/liquid-staking-guide.jpg',
    seo: {
      metaTitle: 'Liquid Staking Guide 2024 | How to Earn Staking Rewards with Liquidity',
      metaDescription: 'Complete guide to liquid staking. Learn how to earn ETH staking rewards while maintaining liquidity with liquid staking tokens (LSTs).',
      keywords: ['liquid staking', 'ETH staking', 'liquid staking tokens', 'LST', 'Lido staking', 'staking rewards'],
      canonicalUrl: '/blog/liquid-staking-guide'
    }
  }
];

export function BlogPage() {
  const { blogPosts: posts, loading: isLoading, error } = useBlogPosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get unique categories and tags
  const categories = ['all', ...new Set(posts?.map(post => post.category) || [])];
  const allTags = posts?.flatMap(post => post.tags || []) || [];
  const uniqueTags = ['all', ...new Set(allTags)];

  // Filter and search logic
  useEffect(() => {
    if (!posts || posts.length === 0) {
      setFilteredPosts([]);
      return;
    }

    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(post => post.tags && post.tags.includes(selectedTag));
    }

    // Sort by publish date (newest first)
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, selectedTag]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogPostCard = ({ post, featured = false }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <div className={`${featured ? 'md:flex' : ''}`}>
        {/* Image placeholder */}
        <div className={`bg-gradient-to-br from-primary/20 to-accent/20 ${featured ? 'md:w-1/2' : 'h-48'} flex items-center justify-center`}>
          <BookOpen className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} text-primary`} />
        </div>
        
        <div className={`${featured ? 'md:w-1/2' : ''}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              {post.featured && <Badge className="bg-gradient-to-r from-primary to-accent text-white">Featured</Badge>}
            </div>
            <CardTitle className={`group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className={`${featured ? 'text-base' : 'text-sm'}`}>
              {post.excerpt}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>

            {/* Meta info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Read more link */}
            <Link 
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <BlogListingSEO posts={posts || []} />
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Forge </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, strategies, and updates from the world of DeFi. Stay ahead with expert analysis and practical guides.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag === 'all' ? 'All Tags' : tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">Error loading blog posts: {error}</p>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredPosts.length} of {posts?.length || 0} articles
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Updated weekly</span>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {filteredPosts.some(post => post.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Featured Articles
            </h2>
            <div className="grid gap-6">
              {filteredPosts.filter(post => post.featured).map((post) => (
                <BlogPostCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.filter(post => !post.featured).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Stay Updated
              </CardTitle>
              <CardDescription>
                Get the latest DeFi insights and strategies delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input placeholder="Enter your email address" className="flex-1" />
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}

