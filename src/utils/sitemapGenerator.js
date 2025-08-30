// Utility to generate dynamic sitemap data
export const generateSitemapData = (strategies = [], blogPosts = []) => {
  const baseUrl = 'https://forgedefi.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
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
    lastmod: strategy.updatedAt ? new Date(strategy.updatedAt).toISOString().split('T')[0] : currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  }));

  // Blog post pages
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] : currentDate,
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
