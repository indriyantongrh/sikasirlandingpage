/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sikasirlaundry.web.id',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/reset-password'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/reset-password', '/api/*'],
      },
    ],
    additionalSitemaps: [
      'https://sikasirlaundry.web.id/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Homepage - prioritas tertinggi
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Blog listing - prioritas tinggi untuk SEO
    if (path === '/blog') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Artikel blog - prioritas tinggi
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Halaman penting
    if (['/about', '/faq', '/contact'].includes(path)) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Legal pages
    if (['/privacy-policy', '/terms'].includes(path)) {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Status page - tidak perlu index tinggi
    if (path === '/status') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.4,
        lastmod: new Date().toISOString(),
      };
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
