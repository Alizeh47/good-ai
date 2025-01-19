interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface SitemapConfig {
  baseUrl: string;
  excludePaths?: string[];
  additionalPaths?: string[];
  defaultChangeFrequency?: SitemapUrl['changeFrequency'];
  defaultPriority?: number;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function generateUrlEntry(url: string, config: Partial<SitemapUrl> = {}): string {
  const { lastModified, changeFrequency, priority } = config;
  
  let entry = `  <url>\n    <loc>${url}</loc>\n`;
  
  if (lastModified) {
    entry += `    <lastmod>${lastModified}</lastmod>\n`;
  }
  
  if (changeFrequency) {
    entry += `    <changefreq>${changeFrequency}</changefreq>\n`;
  }
  
  if (priority !== undefined) {
    entry += `    <priority>${priority.toFixed(1)}</priority>\n`;
  }
  
  entry += '  </url>';
  return entry;
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const sitemapHeader = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const sitemapFooter = '</urlset>';
  
  const urlEntries = urls.map(({ url, ...config }) => generateUrlEntry(url, config));
  
  return xmlHeader + sitemapHeader + urlEntries.join('\n') + '\n' + sitemapFooter;
}

export async function generateProductSitemap(products: any[], baseUrl: string): Promise<SitemapUrl[]> {
  return products.map(product => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: formatDate(new Date(product.updatedAt)),
    changeFrequency: 'daily',
    priority: 0.8,
  }));
}

export async function generateCollectionSitemap(collections: any[], baseUrl: string): Promise<SitemapUrl[]> {
  return collections.map(collection => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: formatDate(new Date(collection.updatedAt)),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}

export async function generateBlogSitemap(posts: any[], baseUrl: string): Promise<SitemapUrl[]> {
  return posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: formatDate(new Date(post.updatedAt)),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
}

export async function generateStaticPagesSitemap(config: SitemapConfig): Promise<SitemapUrl[]> {
  const { baseUrl, excludePaths = [], additionalPaths = [], defaultChangeFrequency = 'monthly', defaultPriority = 0.5 } = config;
  
  // Default static pages
  const staticPages: Array<{ path: string; priority?: number; changeFrequency?: SitemapUrl['changeFrequency'] }> = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: 'about', priority: 0.5, changeFrequency: 'monthly' },
    { path: 'contact', priority: 0.5, changeFrequency: 'monthly' },
    { path: 'faq', priority: 0.5, changeFrequency: 'monthly' },
    { path: 'privacy-policy', priority: 0.3, changeFrequency: 'monthly' },
    { path: 'terms-of-service', priority: 0.3, changeFrequency: 'monthly' },
  ];
  
  // Filter out excluded paths and add additional paths
  const allPaths = [
    ...staticPages.filter(page => !excludePaths.includes(page.path)),
    ...additionalPaths.map(path => ({ path, priority: defaultPriority, changeFrequency: defaultChangeFrequency })),
  ];
  
  return allPaths.map(({ path, priority = defaultPriority, changeFrequency = defaultChangeFrequency }) => ({
    url: `${baseUrl}/${path}`,
    lastModified: formatDate(new Date()),
    changeFrequency,
    priority,
  }));
}

export async function generateSitemapIndex(sitemaps: string[], baseUrl: string): Promise<string> {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const indexHeader = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const indexFooter = '</sitemapindex>';
  
  const sitemapEntries = sitemaps.map(sitemap => `  <sitemap>
    <loc>${baseUrl}/${sitemap}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
  </sitemap>`);
  
  return xmlHeader + indexHeader + sitemapEntries.join('\n') + '\n' + indexFooter;
} 