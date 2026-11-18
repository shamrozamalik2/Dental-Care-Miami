import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Routes included in the generated sitemap. Keep in sync with src/App.jsx.
const ROUTES = ['/', '/services', '/about', '/book-appointment', '/reviews', '/contact']

/**
 * Emits sitemap.xml and robots.txt at build time using VITE_SITE_URL
 * (set it in .env.production to the clinic's real domain before deploying).
 */
function seoFiles(siteUrl) {
  const base = siteUrl.replace(/\/$/, '')
  return {
    name: 'seo-files',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (r) =>
          `  <url>\n    <loc>${base}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://www.your-domain.com'
  return {
    plugins: [
      react(),
      seoFiles(siteUrl),
      {
        name: 'html-site-url',
        transformIndexHtml: {
          order: 'pre',
          handler: (html) => html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')),
        },
      },
    ],
  }
})
