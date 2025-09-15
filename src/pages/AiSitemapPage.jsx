import React, { useEffect, useState } from 'react';
import { useStrategies } from '../lib/hooks/useFirebase';

export function AiSitemapPage() {
  const { strategies, loading, error } = useStrategies();
  const [sitemapData, setSitemapData] = useState(null);

  useEffect(() => {
    if (strategies && strategies.length > 0) {
      // Transform strategies to sitemap format
      const sitemapEntries = strategies.map(strategy => ({
        title: strategy.name,
        url: `https://forge.finance/ai/${strategy.id}.json`,
        updated: strategy.lastUpdated || strategy.updatedAt?.toDate?.()?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0]
      }));
      
      setSitemapData(sitemapEntries);
    }
  }, [strategies]);

  useEffect(() => {
    if (sitemapData) {
      // Set content type to JSON
      document.contentType = 'application/json';
    }
  }, [sitemapData]);

  if (loading) {
    return null; // Don't render anything while loading
  }

  if (error) {
    return (
      <pre>
        {JSON.stringify({
          error: "Failed to load sitemap",
          message: error
        }, null, 2)}
      </pre>
    );
  }

  if (!sitemapData) {
    return (
      <pre>
        {JSON.stringify([], null, 2)}
      </pre>
    );
  }

  // Return sitemap data
  return (
    <pre>
      {JSON.stringify(sitemapData, null, 2)}
    </pre>
  );
}

