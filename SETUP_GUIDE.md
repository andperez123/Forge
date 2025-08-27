# Forge DeFi Platform - Complete Setup Guide

This guide will help you set up the Forge DeFi education platform locally on your computer.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for version control)
- A code editor like **VS Code**

## 🚀 Quick Setup Instructions

### Step 1: Create New React Project

```bash
# Create a new React project
npx create-react-app forge-defi-platform
cd forge-defi-platform
```

### Step 2: Install Required Dependencies

```bash
# Install all required packages
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-label @radix-ui/react-textarea lucide-react react-router-dom clsx tailwind-merge

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Configure Tailwind CSS

Create or update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Step 4: Install Additional Dependencies

```bash
# Install the animation plugin
npm install tailwindcss-animate

# Install shadcn/ui components (optional but recommended)
npx shadcn-ui@latest init
```

When prompted by shadcn-ui init, choose:
- Would you like to use TypeScript? → No
- Which style would you like to use? → Default
- Which color would you like to use as base color? → Slate
- Where is your global CSS file? → src/index.css
- Would you like to use CSS variables for colors? → Yes
- Where is your tailwind.config.js located? → tailwind.config.js
- Configure the import alias for components? → src/components
- Configure the import alias for utils? → src/lib/utils

### Step 5: Install shadcn/ui Components

```bash
# Install the UI components we need
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add slider
```

### Step 6: Replace Files

Replace the following files with the provided versions:

1. **src/App.jsx** - Main application component
2. **src/App.css** - Styling and animations
3. **src/index.css** - Global styles (update with Tailwind)
4. **public/index.html** - HTML template

Create these new directories and files:
- **src/components/Navigation.jsx**
- **src/components/Footer.jsx**
- **src/pages/LandingPage.jsx**
- **src/pages/StrategiesPage.jsx**
- **src/pages/StrategyBuilderPage.jsx**
- **src/pages/BlogPage.jsx**
- **src/pages/AboutPage.jsx**
- **src/pages/ContactPage.jsx**

### Step 7: Update src/index.css

Add this to the top of your `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
    --radius: 0.5rem;
  }
}

/* Custom Forge theme colors */
:root {
  --primary: 18 85% 60%; /* Molten Orange #FF6B35 */
  --accent: 45 85% 55%; /* Gold/Brass #D4AF37 */
}
```

## 🎨 Key Features

The platform includes:

- **Landing Page** - "DeFi Strategies Decoded" with protocol network visualization
- **Strategies Page** - Browse and understand DeFi strategies
- **Strategy Analyzer** - Analyze strategies based on user preferences
- **Blog** - Educational content about DeFi
- **About & Contact** - Company information and contact forms

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Test the application
npm test
```

## 🚨 Troubleshooting

### Common Issues:

1. **Module not found errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Tailwind styles not working**
   - Ensure `tailwind.config.js` content paths are correct
   - Check that `@tailwind` directives are in `src/index.css`

3. **shadcn/ui components not found**
   ```bash
   # Reinstall shadcn/ui
   npx shadcn-ui@latest init
   ```

4. **React Router errors**
   - Ensure `react-router-dom` is installed
   - Check that all route paths are correct

### File Structure Should Look Like:

```
forge-defi-platform/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── StrategiesPage.jsx
│   │   ├── StrategyBuilderPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Ensure all dependencies are installed correctly
3. Verify file paths and imports
4. Make sure Node.js version is 18+

The application should run on `http://localhost:3000` once started successfully.

## 🎯 Next Steps

Once running locally, you can:

- Customize the Forge branding colors
- Add Firebase integration for dynamic data
- Deploy to production (Vercel, Netlify, etc.)
- Add more DeFi strategies and content

Good luck with the setup! 🚀

