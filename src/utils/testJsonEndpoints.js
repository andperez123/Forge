// Test utility for JSON endpoints
export const testJsonEndpoints = async () => {
  const baseUrl = window.location.origin;
  
  try {
    // Test AI sitemap
    console.log('Testing AI sitemap...');
    const sitemapResponse = await fetch(`${baseUrl}/ai/sitemap.json`);
    const sitemapData = await sitemapResponse.json();
    console.log('AI Sitemap:', sitemapData);
    
    // Test individual strategy JSON (if we have strategies)
    if (sitemapData && sitemapData.length > 0) {
      const firstStrategy = sitemapData[0];
      const strategySlug = firstStrategy.url.split('/').pop().replace('.json', '');
      
      console.log('Testing strategy JSON...');
      const strategyResponse = await fetch(`${baseUrl}/ai/${strategySlug}.json`);
      const strategyData = await strategyResponse.json();
      console.log('Strategy JSON:', strategyData);
      
      // Validate structure
      const requiredFields = [
        'slug', 'title', 'updated', 'summary', 'numbers', 
        'chains', 'protocols', 'how_it_works', 'risks', 
        'fees', 'faq', 'changelog', 'source'
      ];
      
      const missingFields = requiredFields.filter(field => !(field in strategyData));
      
      if (missingFields.length > 0) {
        console.warn('Missing required fields:', missingFields);
      } else {
        console.log('✅ All required fields present');
      }
      
      // Validate numbers structure
      if (strategyData.numbers && typeof strategyData.numbers.apy_typical === 'string') {
        console.log('✅ APY format correct');
      } else {
        console.warn('⚠️ APY format should be string like "24-32%"');
      }
      
      // Validate arrays
      const arrayFields = ['chains', 'protocols', 'how_it_works', 'risks', 'faq', 'changelog'];
      arrayFields.forEach(field => {
        if (Array.isArray(strategyData[field])) {
          console.log(`✅ ${field} is array with ${strategyData[field].length} items`);
        } else {
          console.warn(`⚠️ ${field} should be an array`);
        }
      });
      
    }
    
  } catch (error) {
    console.error('Error testing JSON endpoints:', error);
  }
};

// Function to validate schema markup
export const validateSchemaMarkup = () => {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  
  scripts.forEach((script, index) => {
    try {
      const schema = JSON.parse(script.textContent);
      console.log(`Schema ${index + 1}:`, schema);
      
      // Check for required Product schema fields
      if (schema['@type'] === 'Product') {
        const requiredFields = ['name', 'description'];
        const missingFields = requiredFields.filter(field => !schema[field]);
        
        if (missingFields.length > 0) {
          console.warn('Missing Product schema fields:', missingFields);
        } else {
          console.log('✅ Product schema complete');
        }
      }
      
      // Check for HowTo schema
      if (schema.howTo && schema.howTo['@type'] === 'HowTo') {
        console.log('✅ HowTo schema present');
      }
      
      // Check for FAQ schema
      if (schema.mainEntity && schema.mainEntity['@type'] === 'FAQPage') {
        console.log('✅ FAQ schema present');
      }
      
    } catch (error) {
      console.error('Error parsing schema markup:', error);
    }
  });
};

// Function to test section IDs
export const validateSectionIds = () => {
  const requiredSections = ['summary', 'apy-method', 'risks', 'fees', 'how-to', 'changelog', 'faq'];
  
  requiredSections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      console.log(`✅ Section #${sectionId} found`);
    } else {
      console.warn(`⚠️ Section #${sectionId} missing`);
    }
  });
};

// Run all tests
export const runAllTests = () => {
  console.log('🧪 Running AI-SEO Tests...');
  
  // Test JSON endpoints
  testJsonEndpoints();
  
  // Test schema markup (if on strategy page)
  if (window.location.pathname.includes('/strategies/')) {
    setTimeout(() => {
      validateSchemaMarkup();
      validateSectionIds();
    }, 1000);
  }
  
  console.log('✅ Tests completed. Check console for results.');
};

