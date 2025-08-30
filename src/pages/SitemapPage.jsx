import React, { useEffect, useState } from 'react';
import { useStrategies } from '../lib/hooks/useFirebase';
import { useBlogPosts } from '../lib/hooks/useFirebase';
import { generateSitemapData, generateSitemapXML } from '../utils/sitemapGenerator';

export function SitemapPage() {
  const { strategies, loading: strategiesLoading } = useStrategies();
  const { blogPosts, loading: blogLoading } = useBlogPosts();
  const [sitemapXML, setSitemapXML] = useState('');

  useEffect(() => {
    if (!strategiesLoading && !blogLoading && strategies && blogPosts) {
      console.log('Generating sitemap with:', { 
        strategiesCount: strategies.length, 
        blogPostsCount: blogPosts.length 
      });
      
      // Debug: Log sample data to see structure
      if (strategies.length > 0) {
        console.log('Sample strategy:', strategies[0]);
      }
      if (blogPosts.length > 0) {
        console.log('Sample blog post:', blogPosts[0]);
      }
      
      try {
        const sitemapData = generateSitemapData(strategies, blogPosts);
        console.log('Generated sitemap data:', sitemapData);
        
        const xml = generateSitemapXML(sitemapData);
        setSitemapXML(xml);
        
        // Set content type header for XML
        document.title = 'Sitemap';
      } catch (error) {
        console.error('Error generating sitemap:', error);
        setSitemapXML('Error generating sitemap: ' + error.message);
      }
    }
  }, [strategies, blogPosts, strategiesLoading, blogLoading]);

  // Show loading state
  if (strategiesLoading || blogLoading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        Loading sitemap...
      </div>
    );
  }

  // Show error if no data
  if (!strategies || !blogPosts) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        Error: Could not load sitemap data
      </div>
    );
  }

  // Return XML content
  return (
    <pre style={{ 
      whiteSpace: 'pre-wrap', 
      wordWrap: 'break-word',
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '4px'
    }}>
      {sitemapXML || 'Generating sitemap...'}
    </pre>
  );
}
