import React from 'react';
import { Helmet } from 'react-helmet';

export function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  canonicalUrl, 
  ogImage, 
  ogType = 'website',
  structuredData,
  noIndex = false
}) {
  const fullTitle = title ? `${title} | Forge DeFi Platform` : 'Forge - AI-Powered DeFi Strategy Automation Platform';
  const fullDescription = description || 'Generate optimized multi-chain DeFi yield strategies in seconds with AI. Risk-managed, profit-maximized DeFi automation for builders and traders.';
  const fullKeywords = ['DeFi', 'AI', 'yield farming', 'strategy automation', 'blockchain', 'crypto', 'multi-chain', 'yield optimization', ...keywords].join(', ');
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content="Forge DeFi Platform" />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Forge DeFi Platform" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:url" content={canonicalUrl || window.location.href} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
}

// Blog post specific SEO component
export function BlogPostSEO({ post }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Forge DeFi Platform",
      "logo": {
        "@type": "ImageObject",
        "url": "https://forge.ai/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://forge.ai/blog/${post.slug}`
    },
    "image": post.imageUrl ? `https://forge.ai${post.imageUrl}` : "https://forge.ai/og-image.jpg",
    "keywords": post.tags?.join(', ') || 'DeFi, cryptocurrency, blockchain',
    "articleSection": post.category,
    "wordCount": post.content?.length || 0
  };

  return (
    <SEOHead
      title={post.title}
      description={post.excerpt}
      keywords={post.tags || []}
      canonicalUrl={`https://forge.ai/blog/${post.slug}`}
      ogImage={post.imageUrl ? `https://forge.ai${post.imageUrl}` : "https://forge.ai/og-image.jpg"}
      ogType="article"
      structuredData={structuredData}
    />
  );
}

// Blog listing page SEO
export function BlogListingSEO({ posts = [] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Forge DeFi Platform Blog",
    "description": "Latest insights, strategies, and guides for DeFi yield optimization and blockchain technology.",
    "url": "https://forge.ai/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Forge DeFi Platform",
      "logo": {
        "@type": "ImageObject",
        "url": "https://forge.ai/logo.png"
      }
    },
    "blogPost": posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishedAt,
      "url": `https://forge.ai/blog/${post.slug}`
    }))
  };

  return (
    <SEOHead
      title="Blog - DeFi Strategies & Insights"
      description="Discover the latest DeFi strategies, yield farming techniques, and blockchain insights. Expert analysis and guides for maximizing your crypto returns."
      keywords={['DeFi blog', 'cryptocurrency strategies', 'yield farming guides', 'blockchain insights', 'DeFi education']}
      canonicalUrl="https://forge.ai/blog"
      ogImage="https://forge.ai/blog-og-image.jpg"
      structuredData={structuredData}
    />
  );
}
