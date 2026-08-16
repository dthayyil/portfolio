# Portfolio - AI-Native Engineering Leader

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Showcasing expertise in Platform Engineering, AI-DLC, Cloud-Native Architecture, and DevOps governance.

## Features

- ⚡ **Next.js 15+** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📝 **MDX Blog** - Content-driven blog with dynamic routing
- 🌙 **Dark/Light Theme** - System preference support with toggle
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- 🔍 **SEO Optimized** - Metadata, sitemap, robots.txt
- 📊 **Google Analytics** - Built-in analytics integration
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🚀 **Performance Optimized** - Image optimization, code splitting

## Tech Stack

- **Framework:** Next.js 15+
- **Language:** TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **Content:** MDX (Markdown + JSX)
- **Fonts:** Google Fonts (Inter, JetBrains Mono)
- **Analytics:** Google Analytics (GA4)
- **Deployment:** GitHub Pages + GitHub Actions

## Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- npm or yarn package manager
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
   ```
   
   Replace `G-XXXXXXXXXX` with your Google Analytics tracking ID.

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Build the optimized production bundle:

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── blog/              # Blog routes
│   ├── globals.css        # Global styles
│   ├── robots.ts          # SEO robots file
│   └── sitemap.ts         # SEO sitemap
├── components/            # React components
│   ├── layout/            # Layout components (navbar, footer)
│   ├── sections/          # Page sections (hero, about, etc.)
│   ├── ui/                # Reusable UI components
│   └── visuals/           # Visual components (diagrams)
├── content/               # Content configuration
│   └── site.ts           # Site metadata
└── lib/                   # Utility functions
    ├── blog.ts           # Blog utilities
    ├── motion.ts         # Animation utilities
    └── utils.ts          # General utilities

content/blog/             # MDX blog posts
```

## Environment Variables

### Development & Local

Create `.env.local`:
```
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### Deployment (GitHub Pages)

Add a GitHub repository secret:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `GA_TRACKING_ID`
4. Value: Your Google Analytics ID
5. The GitHub Actions workflow will automatically inject this during build

## Deployment

### GitHub Pages (Recommended)

The portfolio is automatically deployed via GitHub Actions workflow (`.github/workflows/nextjs.yml`) on every push to the `master` branch.

**Setup:**
1. Ensure your repository is public (for free GitHub Pages)
2. Add the `GA_TRACKING_ID` secret to your repository
3. Push to `master` branch - deployment happens automatically

### Other Platforms

- **Vercel:** Push to connected repo → auto-deploy
- **Netlify:** Connect repository → auto-deploy
- **Docker:** `npm run build` → run in container
- **Cloud Run:** Deploy with environment variables

## Adding Blog Posts

Create `.mdx` files in the `content/blog/` directory:

```mdx
---
title: "Your Post Title"
date: "2026-08-16"
description: "Post description"
---

Your content here with **markdown** and <JSX />
```

Posts are automatically picked up and routed based on filename (slug).

## Customization

### Site Configuration

Edit `src/content/site.ts` to update:
- Your name and title
- Social links
- Keywords and description
- URL and metadata

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Theme colors defined in CSS variables

### Components

All components are located in `src/components/` and can be easily modified.

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run type-check # Check TypeScript
```

## Performance

- **Image Optimization:** Next.js Image component with automatic optimization
- **Code Splitting:** Route-based and component-based splitting
- **Font Optimization:** Preloaded Google Fonts with display swap
- **SEO:** Metadata, sitemap, robots.txt, structured data (JSON-LD)

## Analytics

Google Analytics is conditionally loaded only when `NEXT_PUBLIC_GOOGLE_ANALYTICS` environment variable is set. Tracks page views and custom events.

## License

MIT License - feel free to use this portfolio as a template for your own.

## Support

For questions or issues, please open a GitHub issue in the repository.
