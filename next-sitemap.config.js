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
    // Prioritas tinggi untuk homepage
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
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
