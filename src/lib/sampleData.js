import { createStrategy } from './strategiesService';
import { createBlogPost } from './blogService';

// Sample strategies data
export const sampleStrategies = [
  {
    name: "Lido + Arbitrum Yield Strategy",
    description: "Maximize yield by staking ETH with Lido and bridging to Arbitrum for additional DeFi opportunities.",
    apy: 31.2,
    risk: "Low",
    tvl: 25000000,
    chains: ["Ethereum", "Arbitrum"],
    protocols: ["Lido", "Arbitrum Bridge", "Curve", "Convex"],
    category: "Liquid Staking",
    tags: ["Liquid Staking", "Cross-chain", "Low Risk", "High Yield"],
    steps: [
      "Stake ETH on Lido for stETH",
      "Bridge stETH to Arbitrum",
      "Provide liquidity on Curve stETH/ETH pool",
      "Stake LP tokens on Convex for additional rewards"
    ],
    featured: true,
    timeToSetup: "15 min",
    minInvestment: 100,
    maxInvestment: 1000,
    performance: {
      '7d': 2.1,
      '30d': 8.7,
      '90d': 24.3
    }
  },
  {
    name: "Curve 3Pool + Convex Strategy",
    description: "Earn stable yields by providing liquidity to Curve's 3Pool and maximizing rewards through Convex.",
    apy: 8.5,
    risk: "Low",
    tvl: 15000000,
    chains: ["Ethereum"],
    protocols: ["Curve", "Convex"],
    category: "Stablecoin",
    tags: ["Stablecoin", "Low Risk", "Stable Yield"],
    steps: [
      "Acquire USDC, USDT, and DAI in equal amounts",
      "Provide liquidity to Curve's 3Pool",
      "Stake LP tokens on Convex for additional rewards"
    ],
    featured: false,
    timeToSetup: "10 min",
    minInvestment: 500,
    maxInvestment: 100000,
    performance: {
      '7d': 0.8,
      '30d': 3.2,
      '90d': 9.8
    }
  }
];

// Sample blog posts data
export const sampleBlogPosts = [
  {
    title: "Understanding DeFi Risks: A Complete Guide",
    slug: "understanding-defi-risks",
    excerpt: "Decentralized Finance is exciting, fast-moving, and full of opportunity. But like any new frontier, it comes with real risks. Learn what you need to know before diving deeper.",
    content: `# Understanding DeFi Risks: A Complete Guide

Decentralized Finance is exciting, fast-moving, and full of opportunity. But like any new frontier, it comes with real risks. At Forge, we believe in transparency—so here's what you need to know before diving deeper.

## 1. Smart Contract Risk

Most DeFi protocols run on open-source smart contracts. If there's a bug or vulnerability, hackers can exploit it.

**Protect yourself:** Stick to audited protocols with strong track records.

## 2. Market Volatility

Crypto prices can swing wildly. Yields look great in bull markets but can collapse when token values drop.

**Protect yourself:** Use stablecoins for lower-risk strategies and diversify across assets.

## 3. Rug Pulls & Scams

Some projects launch, attract liquidity, then vanish. It happens more than newcomers realize.

**Protect yourself:** DYOR (do your own research). Check the team, code audits, and community presence.

## 4. Regulatory Uncertainty

Governments are still figuring out how to regulate DeFi. This could affect availability or tax treatment.

**Protect yourself:** Stay informed on regulations in your country and treat yields as taxable income.

## 5. Over-Leverage

Platforms allow borrowing against collateral—but liquidation risk is high when prices drop.

**Protect yourself:** Avoid excessive leverage unless you fully understand the mechanics.

---

## Key Takeaway

DeFi isn't about chasing the highest yield at all costs—it's about balancing opportunity with risk management. By choosing safer strategies, spreading risk, and using Forge to automate decisions, you can capture upside while protecting your downside.

### Risk Management Checklist

- [ ] Research protocol audits and track records
- [ ] Diversify across multiple strategies
- [ ] Use stablecoins for lower-risk positions
- [ ] Stay informed about regulatory changes
- [ ] Avoid excessive leverage
- [ ] Monitor positions regularly

### Recommended Safe Strategies

1. **Stablecoin Lending** - Earn yield on USDC, USDT, DAI
2. **Liquid Staking** - Stake ETH while maintaining liquidity
3. **Index Funds** - Diversified exposure to DeFi tokens
4. **Yield Aggregation** - Automated yield optimization

---

*This guide is for educational purposes only. Always conduct your own research and consider consulting with a financial advisor before making investment decisions.*`,
    author: "Forge Team",
    readTime: 8,
    category: "Risk Management",
    tags: ["DeFi", "Risk Management", "Security", "Education"],
    featured: true,
    status: "published"
  },
  {
    title: "The Ultimate Guide to DeFi Yield Strategies in 2024",
    slug: "defi-yield-strategies-2024",
    excerpt: "Discover the most profitable and secure DeFi yield strategies for 2024. From liquid staking to yield farming, learn how to maximize your returns while managing risk.",
    content: `# The Ultimate Guide to DeFi Yield Strategies in 2024

The DeFi landscape has evolved dramatically in 2024, offering unprecedented opportunities for yield generation. This comprehensive guide explores the most effective strategies for maximizing returns while managing risk in the current market environment.

## Liquid Staking: The Foundation of Modern DeFi

Liquid staking has emerged as the cornerstone of DeFi yield strategies, offering a perfect balance of security and returns. By staking ETH through protocols like Lido, users can earn staking rewards while maintaining liquidity through liquid staking tokens (LSTs).

### Key Benefits:
- Earn ETH staking rewards (~4-6% APY)
- Maintain liquidity with stETH
- Use LSTs as collateral in other protocols
- Participate in DeFi while supporting network security

## Yield Farming Strategies

### 1. **Stablecoin Farming**
Stablecoin farming remains one of the safest yield strategies:

\`\`\`javascript
// Example stablecoin farming strategy
const strategy = {
  deposit: "USDC",
  protocol: "Compound",
  rewards: ["COMP", "USDC"],
  apy: 8.5
};
\`\`\`

### 2. **Liquidity Provision**
Providing liquidity to AMMs can generate significant returns:

- **Uniswap V3** - Concentrated liquidity for higher efficiency
- **Curve Finance** - Stablecoin pools with low impermanent loss
- **Balancer** - Custom pool weights for optimal yields

## Risk Management Framework

| Strategy Type | Risk Level | Expected APY | Liquidity |
|---------------|------------|--------------|-----------|
| Stablecoin Lending | Low | 5-10% | High |
| Liquid Staking | Low | 4-6% | High |
| Yield Farming | Medium | 15-30% | Medium |
| Liquidity Provision | Medium-High | 20-50% | Low |

## Implementation Checklist

- [ ] Assess your risk tolerance
- [ ] Research protocol audits and track records
- [ ] Calculate expected returns vs. gas costs
- [ ] Set up proper wallet security
- [ ] Start with small amounts
- [ ] Monitor positions regularly

---

*This guide is for educational purposes only. Always conduct your own research before making investment decisions.*`,
    author: "Alex Chen",
    readTime: 10,
    category: "Strategy",
    tags: ["DeFi", "Yield Farming", "Liquid Staking", "Risk Management"],
    featured: true,
    status: "published"
  },
  {
    title: "Understanding Liquid Staking Protocols: A Deep Dive",
    slug: "understanding-liquid-staking",
    excerpt: "Explore the mechanics of liquid staking protocols and how they revolutionize Ethereum staking. Learn about risks, rewards, and best practices.",
    content: `# Understanding Liquid Staking Protocols: A Deep Dive

Liquid staking has become one of the most important innovations in DeFi, allowing users to earn staking rewards while maintaining liquidity. This comprehensive guide explores how these protocols work and their impact on the DeFi ecosystem.

## What is Liquid Staking?

Liquid staking protocols allow users to stake their ETH and receive a liquid token representing their staked position. This innovation solves the liquidity problem of traditional staking.

### Key Benefits:
- Earn staking rewards without locking up assets
- Use liquid staking tokens in other DeFi protocols
- Maintain exposure to ETH price movements
- Participate in network security

## Popular Liquid Staking Protocols

### 1. **Lido Finance**
- **Market Leader**: Controls ~30% of staked ETH
- **Token**: stETH (staked ETH)
- **APY**: ~4-6%
- **Security**: Multiple audits, battle-tested

### 2. **Rocket Pool**
- **Decentralized**: Community-operated validators
- **Token**: rETH (rocket pool ETH)
- **APY**: ~4-6%
- **Security**: Decentralized validator network

### 3. **Frax Finance**
- **Hybrid Model**: Combines staking with stablecoin features
- **Token**: frxETH
- **APY**: ~4-6%
- **Security**: Audited smart contracts

## Risk Considerations

### Smart Contract Risk
- **Mitigation**: Use audited protocols with strong track records
- **Monitoring**: Follow protocol updates and security reports

### Slashing Risk
- **Mitigation**: Choose protocols with insurance mechanisms
- **Understanding**: Learn about validator penalties and protection

### Liquidity Risk
- **Mitigation**: Ensure sufficient liquidity in secondary markets
- **Planning**: Consider exit strategies and time horizons

## Best Practices

1. **Research Protocols**: Understand the staking mechanism and risks
2. **Diversify**: Don't put all your ETH in one protocol
3. **Monitor**: Track your staking rewards and protocol updates
4. **Plan**: Consider tax implications and long-term strategy

---

*This guide is for educational purposes only. Always conduct your own research before making investment decisions.*`,
    author: "Sarah Kim",
    readTime: 7,
    category: "Education",
    tags: ["Liquid Staking", "Ethereum", "DeFi", "Staking"],
    featured: false,
    status: "published"
  }
];

// Function to populate Firebase with sample data
export const populateSampleData = async () => {
  try {
    console.log('Adding sample strategies...');
    for (const strategy of sampleStrategies) {
      await createStrategy(strategy);
      console.log(`Added strategy: ${strategy.name}`);
    }

    console.log('Adding sample blog posts...');
    for (const post of sampleBlogPosts) {
      await createBlogPost(post);
      console.log(`Added blog post: ${post.title}`);
    }

    console.log('Sample data added successfully!');
    return true;
  } catch (error) {
    console.error('Error adding sample data:', error);
    throw error;
  }
};
