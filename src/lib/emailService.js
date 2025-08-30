// Email service for handling waitlist signups
// Supports multiple email providers

// Option 1: Mailchimp Integration
export const addToMailchimp = async (email) => {
  try {
    const response = await fetch('/api/mailchimp/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to Mailchimp');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Mailchimp error:', error);
    throw error;
  }
};

// Option 2: ConvertKit Integration
export const addToConvertKit = async (email) => {
  try {
    const response = await fetch('/api/convertkit/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to ConvertKit');
    }
    
    return await response.json();
  } catch (error) {
    console.error('ConvertKit error:', error);
    throw error;
  }
};

// Option 3: Simple API endpoint (for your own backend)
export const addToWaitlist = async (email) => {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        source: 'landing_page',
        timestamp: new Date().toISOString()
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to waitlist');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Waitlist API error:', error);
    throw error;
  }
};

// Option 4: Google Sheets (for simple tracking)
export const addToGoogleSheets = async (email) => {
  try {
    const response = await fetch('/api/sheets/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        date: new Date().toISOString(),
        source: 'forge_landing_page'
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add to Google Sheets');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Google Sheets error:', error);
    throw error;
  }
};

// Default function that tries multiple services
export const subscribeToWaitlist = async (email, service = 'firebase') => {
  try {
    switch (service) {
      case 'mailchimp':
        return await addToMailchimp(email);
      case 'convertkit':
        return await addToConvertKit(email);
      case 'api':
        return await addToWaitlist(email);
      case 'sheets':
        return await addToGoogleSheets(email);
      case 'firebase':
      default:
        // Firebase is handled in the component
        return { success: true, service: 'firebase' };
    }
  } catch (error) {
    console.error('Email subscription error:', error);
    throw error;
  }
};
