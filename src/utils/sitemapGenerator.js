// Utility to generate dynamic sitemap data
export const generateSitemapData = (strategies = [], blogPosts = []) => {
  const baseUrl = 'https://forgedefi.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Helper function to safely convert Firebase timestamps
  const getSafeDate = (timestamp) => {
    if (!timestamp) return currentDate;
    
    try {
      // Handle Firebase Timestamp objects
      if (timestamp && typeof timestamp.toDate === 'function') {
        return timestamp.toDate().toISOString().split('T')[0];
      }
      
      // Handle regular Date objects or date strings
      if (timestamp instanceof Date) {
        return timestamp.toISOString().split('T')[0];
      }
      
      // Handle string dates
      if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
      
      // Handle timestamp numbers
      if (typeof timestamp === 'number') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
      
      return currentDate;
    } catch (error) {
      console.warn('Error converting timestamp:', timestamp, error);
      return currentDate;
    }
  };
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/strategies`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }
  ];

  // Strategy pages
  const strategyPages = strategies.map(strategy => ({
    url: `${baseUrl}/strategies/${strategy.id}`,
    lastmod: getSafeDate(strategy.updatedAt || strategy.createdAt),
    changefreq: 'weekly',
    priority: '0.8'
  }));

  // Blog post pages
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: getSafeDate(post.updatedAt || post.publishedAt || post.createdAt),
    changefreq: 'monthly',
    priority: '0.7'
  }));

  return [...staticPages, ...strategyPages, ...blogPages];
};

// Generate XML sitemap
export const generateSitemapXML = (sitemapData) => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlEntries = sitemapData.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `${xmlHeader}${urlsetOpen}${urlEntries}${urlsetClose}`;
};
