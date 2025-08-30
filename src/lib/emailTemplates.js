// Email templates for Forge waitlist and updates

export const welcomeEmailTemplate = {
  subject: "Welcome to Forge! 🚀 You're on the waitlist",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Forge</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #D4AF37); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #FF6B35, #D4AF37); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 6px; border-left: 4px solid #FF6B35; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔥 Welcome to Forge!</h1>
        </div>
        <div class="content">
          <h2>You're officially on the waitlist!</h2>
          
          <p>Thanks for joining the Forge community. You're now among the first to know when we launch our automated DeFi strategy platform.</p>
          
          <div class="highlight">
            <strong>What to expect:</strong>
            <ul>
              <li>📈 Weekly strategy insights and market analysis</li>
              <li>🔧 Product updates and new automation features</li>
              <li>🎯 Early access to strategy launches</li>
              <li>💡 Exclusive DeFi tips and tutorials</li>
            </ul>
          </div>
          
          <p><strong>Our mission:</strong> Stop the chaos of chasing APYs across Telegram threads. We're building the future where your capital compounds automatically across the best multi-chain strategies.</p>
          
          <p>We'll be in touch soon with our first update. In the meantime, feel free to explore our current strategy research at <a href="https://forgedefi.com/strategies">forgedefi.com/strategies</a>.</p>
          
          <p>Stay sharp,<br>
          <strong>The Forge Team</strong></p>
        </div>
        <div class="footer">
          <p>You're receiving this because you signed up for Forge updates.<br>
          <a href="#">Unsubscribe</a> | <a href="https://forgedefi.com">Visit Forge</a></p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
Welcome to Forge! 🚀

You're officially on the waitlist!

Thanks for joining the Forge community. You're now among the first to know when we launch our automated DeFi strategy platform.

What to expect:
- Weekly strategy insights and market analysis
- Product updates and new automation features  
- Early access to strategy launches
- Exclusive DeFi tips and tutorials

Our mission: Stop the chaos of chasing APYs across Telegram threads. We're building the future where your capital compounds automatically across the best multi-chain strategies.

We'll be in touch soon with our first update. In the meantime, feel free to explore our current strategy research at forgedefi.com/strategies.

Stay sharp,
The Forge Team

---
You're receiving this because you signed up for Forge updates.
Unsubscribe: [link] | Visit Forge: forgedefi.com
  `
};

export const strategyUpdateTemplate = {
  subject: "🔥 New Strategy Alert: Lido + Arbitrum Maximizer (31.2% APY)",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Strategy Alert</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #D4AF37); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .strategy-card { background: white; border: 2px solid #e9ecef; border-radius: 10px; padding: 20px; margin: 20px 0; }
        .apy { font-size: 24px; font-weight: bold; color: #28a745; }
        .button { display: inline-block; background: linear-gradient(135deg, #FF6B35, #D4AF37); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Strategy Alert</h1>
        </div>
        <div class="content">
          <h2>Lido + Arbitrum Maximizer Strategy</h2>
          
          <div class="strategy-card">
            <div class="apy">31.2% APY</div>
            <p><strong>Risk Level:</strong> Low</p>
            <p><strong>Chains:</strong> Ethereum + Arbitrum</p>
            <p><strong>Protocols:</strong> Lido, Arbitrum Bridge, Curve, Convex</p>
            
            <h3>How it works:</h3>
            <ol>
              <li>Stake ETH on Lido for liquid staking rewards</li>
              <li>Bridge stETH to Arbitrum for lower fees</li>
              <li>Provide liquidity on Curve for trading fees</li>
              <li>Stake LP tokens on Convex for additional rewards</li>
            </ol>
            
            <a href="https://forgedefi.com/strategies" class="button">View Full Strategy</a>
          </div>
          
          <p>This strategy is now live and ready for deployment. Our AI has analyzed over 1,000+ protocols to identify this optimal yield opportunity.</p>
          
          <p><strong>Coming soon:</strong> Automated execution of this strategy with our platform launch.</p>
          
          <p>Stay tuned for more strategies and automation features!</p>
          
          <p>Best regards,<br>
          <strong>The Forge Team</strong></p>
        </div>
        <div class="footer">
          <p>You're receiving this because you signed up for Forge updates.<br>
          <a href="#">Unsubscribe</a> | <a href="https://forgedefi.com">Visit Forge</a></p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
🔥 New Strategy Alert

Lido + Arbitrum Maximizer Strategy

31.2% APY
Risk Level: Low
Chains: Ethereum + Arbitrum
Protocols: Lido, Arbitrum Bridge, Curve, Convex

How it works:
1. Stake ETH on Lido for liquid staking rewards
2. Bridge stETH to Arbitrum for lower fees
3. Provide liquidity on Curve for trading fees
4. Stake LP tokens on Convex for additional rewards

View Full Strategy: forgedefi.com/strategies

This strategy is now live and ready for deployment. Our AI has analyzed over 1,000+ protocols to identify this optimal yield opportunity.

Coming soon: Automated execution of this strategy with our platform launch.

Stay tuned for more strategies and automation features!

Best regards,
The Forge Team

---
You're receiving this because you signed up for Forge updates.
Unsubscribe: [link] | Visit Forge: forgedefi.com
  `
};

export const productUpdateTemplate = {
  subject: "🎯 Forge Update: Automation Features Coming Soon",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Update</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #D4AF37); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature { background: white; border-left: 4px solid #FF6B35; padding: 15px; margin: 15px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #FF6B35, #D4AF37); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Forge Product Update</h1>
        </div>
        <div class="content">
          <h2>Automation Features Coming Soon</h2>
          
          <p>We're excited to share that our automated strategy execution platform is in final development. Here's what's coming:</p>
          
          <div class="feature">
            <h3>🤖 One-Click Strategy Deployment</h3>
            <p>Deploy any of our vetted strategies with a single click. No more manual steps across multiple protocols.</p>
          </div>
          
          <div class="feature">
            <h3>📊 Real-Time Performance Tracking</h3>
            <p>Monitor your strategy performance, APY, and risk metrics in real-time with our dashboard.</p>
          </div>
          
          <div class="feature">
            <h3>⚡ Automated Rebalancing</h3>
            <p>Our AI automatically rebalances your positions to maintain optimal yields and risk levels.</p>
          </div>
          
          <div class="feature">
            <h3>🛡️ Smart Risk Management</h3>
            <p>Built-in safeguards and automatic position adjustments based on market conditions.</p>
          </div>
          
          <p><strong>Launch Timeline:</strong> Q2 2024</p>
          
          <p>As a waitlist member, you'll get early access and exclusive beta testing opportunities.</p>
          
          <a href="https://forgedefi.com/strategies" class="button">Explore Current Strategies</a>
          
          <p>Stay tuned for more updates!</p>
          
          <p>Best regards,<br>
          <strong>The Forge Team</strong></p>
        </div>
        <div class="footer">
          <p>You're receiving this because you signed up for Forge updates.<br>
          <a href="#">Unsubscribe</a> | <a href="https://forgedefi.com">Visit Forge</a></p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
🎯 Forge Product Update

Automation Features Coming Soon

We're excited to share that our automated strategy execution platform is in final development. Here's what's coming:

🤖 One-Click Strategy Deployment
Deploy any of our vetted strategies with a single click. No more manual steps across multiple protocols.

📊 Real-Time Performance Tracking
Monitor your strategy performance, APY, and risk metrics in real-time with our dashboard.

⚡ Automated Rebalancing
Our AI automatically rebalances your positions to maintain optimal yields and risk levels.

🛡️ Smart Risk Management
Built-in safeguards and automatic position adjustments based on market conditions.

Launch Timeline: Q2 2024

As a waitlist member, you'll get early access and exclusive beta testing opportunities.

Explore Current Strategies: forgedefi.com/strategies

Stay tuned for more updates!

Best regards,
The Forge Team

---
You're receiving this because you signed up for Forge updates.
Unsubscribe: [link] | Visit Forge: forgedefi.com
  `
};
