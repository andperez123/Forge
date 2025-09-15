import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStrategies } from '../lib/hooks/useFirebase';

export function StrategyJsonPage() {
  const { slug } = useParams();
  const { strategies, loading, error } = useStrategies();
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (strategies && strategies.length > 0) {
      // Find strategy by slug (using id as slug for now)
      const foundStrategy = strategies.find(s => s.id === slug);
      
      if (foundStrategy) {
        // Transform strategy data to match the required JSON structure
        const transformedData = {
          slug: foundStrategy.id,
          title: foundStrategy.name,
          updated: foundStrategy.lastUpdated || foundStrategy.updatedAt?.toDate?.()?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          summary: foundStrategy.description,
          numbers: {
            apy_typical: `${foundStrategy.apy || 0}%`,
            fee_gross_yield_pct: foundStrategy.fee ? parseFloat(foundStrategy.fee.replace('%', '')) / 100 : 0.0025
          },
          chains: foundStrategy.chains || [],
          protocols: foundStrategy.protocols || [],
          how_it_works: foundStrategy.steps ? foundStrategy.steps.map(step => 
            typeof step === 'string' ? step : step.description || step
          ) : [],
          risks: foundStrategy.risks ? foundStrategy.risks.map(risk => 
            typeof risk === 'string' ? risk : risk.type || risk.description || 'Risk'
          ) : [],
          fees: `Forge fee = ${foundStrategy.fee || '0.25%'} of gross yield, net daily.`,
          faq: foundStrategy.faq || [],
          changelog: foundStrategy.changelog || [],
          source: `https://forge.finance/strategies/${foundStrategy.id}`
        };
        
        setJsonData(transformedData);
      }
    }
  }, [strategies, slug]);

  useEffect(() => {
    if (jsonData) {
      // Set content type to JSON
      document.contentType = 'application/json';
    }
  }, [jsonData]);

  if (loading) {
    return null; // Don't render anything while loading
  }

  if (error) {
    return (
      <pre>
        {JSON.stringify({
          error: "Strategy not found",
          message: error
        }, null, 2)}
      </pre>
    );
  }

  if (!jsonData) {
    return (
      <pre>
        {JSON.stringify({
          error: "Strategy not found",
          slug: slug
        }, null, 2)}
      </pre>
    );
  }

  // Return JSON data
  return (
    <pre>
      {JSON.stringify(jsonData, null, 2)}
    </pre>
  );
}

