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
    title: "The Ultimate Guide to DeFi Yield Strategies in 2024",
    slug: "defi-yield-strategies-2024",
    excerpt: "Discover the most profitable and secure DeFi yield strategies for 2024. From liquid staking to yield farming, learn how to maximize your returns while managing risk.",
    content: "# The Ultimate Guide to DeFi Yield Strategies in 2024\n\nThe DeFi landscape has evolved dramatically in 2024, offering unprecedented opportunities for yield generation. This comprehensive guide explores the most effective strategies for maximizing returns while managing risk in the current market environment.\n\n## Liquid Staking: The Foundation of Modern DeFi\n\nLiquid staking has emerged as the cornerstone of DeFi yield strategies, offering a perfect balance of security and returns. By staking ETH through protocols like Lido, users can earn staking rewards while maintaining liquidity through liquid staking tokens (LSTs).\n\n### Key Benefits:\n- Earn ETH staking rewards (~4-6% APY)\n- Maintain liquidity with stETH\n- Use LSTs as collateral in other protocols\n- Participate in DeFi while supporting network security",
    author: "Alex Chen",
    readTime: 8,
    category: "Strategy",
    tags: ["DeFi", "Yield Farming", "Liquid Staking", "Risk Management"],
    featured: true,
    status: "published"
  },
  {
    title: "Understanding Liquid Staking Protocols: A Deep Dive",
    slug: "understanding-liquid-staking",
    excerpt: "Explore the mechanics of liquid staking protocols and how they revolutionize Ethereum staking. Learn about risks, rewards, and best practices.",
    content: "# Understanding Liquid Staking Protocols: A Deep Dive\n\nLiquid staking has become one of the most important innovations in DeFi, allowing users to earn staking rewards while maintaining liquidity. This comprehensive guide explores how these protocols work and their impact on the DeFi ecosystem.\n\n## What is Liquid Staking?\n\nLiquid staking protocols allow users to stake their ETH and receive a liquid token representing their staked position. This innovation solves the liquidity problem of traditional staking.\n\n### Key Benefits:\n- Earn staking rewards without locking up assets\n- Use liquid staking tokens in other DeFi protocols\n- Maintain exposure to ETH price movements\n- Participate in network security",
    author: "Sarah Kim",
    readTime: 6,
    category: "Education",
    tags: ["Liquid Staking", "Ethereum", "DeFi", "Staking"],
    featured: true,
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
