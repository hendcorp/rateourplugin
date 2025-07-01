# WordPress Plugin Review Guide Generator

A Next.js application that generates branded review guides for WordPress plugins. Users can enter any WordPress.org plugin URL and get a custom review guide page.

## Features

- **Simple Input Interface**: Enter any WordPress.org plugin URL
- **Automatic Plugin Detection**: Extracts plugin slug from URLs
- **Dynamic Review Guides**: Fetches real plugin data from WordPress.org API
- **Branded Design**: Clean, professional design matching WordPress.org style
- **Responsive Layout**: Works on desktop and mobile devices
- **SEO Friendly**: Dynamic meta tags for each plugin page

## How It Works

1. **Landing Page (`/`)**: Users enter a WordPress plugin URL
2. **URL Parsing**: Extracts the plugin slug (e.g., `wp-rss-aggregator` from `https://wordpress.org/plugins/wp-rss-aggregator/`)
3. **Dynamic Page (`/[slug]`)**: Displays a custom review guide with:
   - Plugin-specific information from WordPress.org API
   - 5-star rating visual
   - Login instructions for WordPress.org
   - Direct link to leave reviews
   - Plugin details and statistics

## API Integration

Uses the WordPress.org Plugin API:
```
https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=SLUG
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rateourplugin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage Examples

### Example URLs to Test:

- https://wordpress.org/plugins/wp-rss-aggregator/
- https://wordpress.org/plugins/contact-form-7/
- https://wordpress.org/plugins/yoast-seo/
- https://wordpress.org/plugins/woocommerce/

### Generated Review Guide URLs:

- `/wp-rss-aggregator` 
- `/contact-form-7`
- `/yoast-seo`
- `/woocommerce`

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: Next.js Pages Router
- **Data Fetching**: Server-Side Rendering (SSR)
- **API**: WordPress.org Plugin Information API

## Project Structure

```
├── pages/
│   ├── _app.tsx          # App configuration and global styles
│   ├── index.tsx         # Landing page with URL input
│   └── [slug].tsx        # Dynamic plugin review guide pages
├── styles/
│   └── globals.css       # Global CSS with Tailwind
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Features Implemented

✅ Landing page with URL input and validation  
✅ Plugin slug extraction from WordPress.org URLs  
✅ Dynamic routing with `/[slug]` pattern  
✅ WordPress.org API integration  
✅ Server-side rendering for SEO  
✅ Responsive design with Tailwind CSS  
✅ Error handling for invalid plugins  
✅ 5-star rating visual  
✅ Plugin-specific review links  
✅ Login instructions with multiple options  
✅ Fallback icons for plugins without images  

## Customization

The design closely matches the reference provided and can be further customized by:

- Modifying colors in `tailwind.config.js`
- Updating the layout in `pages/[slug].tsx`
- Adding more plugin information fields
- Implementing caching for better performance

## Deployment

This Next.js app can be deployed to:

- **Vercel** (recommended): Zero-config deployment
- **Netlify**: With Next.js build plugin
- **AWS/DigitalOcean**: Using Docker or traditional hosting

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple plugins
5. Submit a pull request

## License

MIT License - feel free to use this project for your own WordPress plugins!
