import React, { useEffect, useState } from 'react';
import { useStrategies } from '../lib/hooks/useFirebase';
import { useBlogPosts } from '../lib/hooks/useFirebase';
import { generateSitemapData, generateSitemapXML } from '../utils/sitemapGenerator';

export function SitemapPage() {
  const { strategies } = useStrategies();
  const { blogPosts } = useBlogPosts();
  const [sitemapXML, setSitemapXML] = useState('');

  useEffect(() => {
    if (strategies && blogPosts) {
      const sitemapData = generateSitemapData(strategies, blogPosts);
      const xml = generateSitemapXML(sitemapData);
      setSitemapXML(xml);
    }
  }, [strategies, blogPosts]);

  // This component should be used as an API endpoint
  // For now, we'll just return the XML content
  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      {sitemapXML}
    </pre>
  );
}
