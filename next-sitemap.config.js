/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sikasirlaundry.web.id',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/reset-password', '/admin/*', '/api/*'],
  additionalPaths: async (config) => {
    const result = [];
    
    // Tambah /blog ke sitemap
    result.push({
      loc: '/blog',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date().toISOString(),
    });

    // Tambah halaman kategori
    const categories = ['tips-bisnis', 'teknologi', 'marketing', 'manajemen', 'tutorial'];
    categories.forEach((cat) => {
      result.push({
        loc: `/blog/kategori/${cat}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    // Fetch blog slugs dari Supabase
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at&is_published=eq.true`,
          {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
          }
        );
        const posts = await res.json();
        if (Array.isArray(posts)) {
          posts.forEach((post) => {
            result.push({
              loc: `/blog/${post.slug}`,
              changefreq: 'weekly',
              priority: 0.8,
              lastmod: post.updated_at || new Date().toISOString(),
            });
          });
        }
      }
    } catch (e) {
      console.warn('Sitemap: Could not fetch blog posts', e);
    }

    return result;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/reset-password', '/admin/*', '/api/*'],
      },
    ],
  },
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (['/about', '/faq', '/contact'].includes(path)) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (['/privacy-policy', '/terms'].includes(path)) {
      return {
        loc: path,
        changefreq: 'yearly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      };
    }
    
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
