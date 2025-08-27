# 🚀 Forge DeFi Platform - Quick Start

## For Your AI Developer - Fastest Setup Method

### 1. Prerequisites Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

### 2. One-Command Setup
```bash
# Create and setup the project
npx create-react-app forge-defi-platform && cd forge-defi-platform && npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-label @radix-ui/react-textarea lucide-react react-router-dom clsx tailwind-merge tailwindcss-animate class-variance-authority && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
```

### 3. Replace These Files

Replace the default files with the provided versions:

**Core Files:**
- `src/App.jsx` ← Main application
- `src/App.css` ← Styling  
- `src/index.css` ← Global styles (use src_index.css)
- `package.json` ← Dependencies
- `tailwind.config.js` ← Tailwind config

**Create New Folders/Files:**
```
src/
├── components/
│   ├── Navigation.jsx
│   └── Footer.jsx
└── pages/
    ├── LandingPage.jsx
    ├── StrategiesPage.jsx
    ├── StrategyBuilderPage.jsx
    ├── BlogPage.jsx
    ├── AboutPage.jsx
    └── ContactPage.jsx
```

### 4. Setup shadcn/ui (Optional but Recommended)
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Install required components
npx shadcn-ui@latest add button card input label select textarea badge slider
```

### 5. Start Development Server
```bash
npm start
```

The app should open at `http://localhost:3000`

## 🆘 If You Get Stuck

### Common Fixes:

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tailwind not working:**
- Make sure `tailwind.config.js` content paths include `'./src/**/*.{js,jsx}'`
- Verify `@tailwind` directives are at the top of `src/index.css`

**shadcn/ui errors:**
```bash
# Create the utils file manually
mkdir -p src/lib
echo 'import { clsx } from "clsx"; import { twMerge } from "tailwind-merge"; export function cn(...inputs) { return twMerge(clsx(inputs)); }' > src/lib/utils.js
```

### File Import Structure:
All components use these imports:
```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// ... other shadcn components
import { IconName } from 'lucide-react';
```

### Key Features Working:
- ✅ Landing page with "DeFi Strategies Decoded"
- ✅ Strategies page with "View Details" buttons
- ✅ Strategy Analyzer (not Builder)
- ✅ Blog with DeFi education content
- ✅ Responsive design with Forge branding

## 📞 Need Help?

If the setup fails:
1. Check Node.js version is 18+
2. Clear npm cache: `npm cache clean --force`
3. Try yarn instead: `yarn install`
4. Check for typos in file names/imports

The platform should look exactly like the live demo once running! 🎉

