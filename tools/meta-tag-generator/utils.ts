export interface MetaTagParams {
  title: string;
  description: string;
  image: string;
  url: string;
  author: string;
  keywords: string;
  allowRobots: boolean;
  themeColor: string;
}

export function generateMetaTags(params: MetaTagParams): string {
  const { title, description, image, url, author, keywords, allowRobots, themeColor } = params;
  
  const tags: string[] = [];

  // Basic HTML Meta Tags
  tags.push('<!-- Primary Meta Tags -->');
  if (title) tags.push(`<title>${title}</title>`);
  if (title) tags.push(`<meta name="title" content="${title}" />`);
  if (description) tags.push(`<meta name="description" content="${description}" />`);
  if (keywords) tags.push(`<meta name="keywords" content="${keywords}" />`);
  if (author) tags.push(`<meta name="author" content="${author}" />`);
  if (themeColor) tags.push(`<meta name="theme-color" content="${themeColor}" />`);
  
  tags.push(`<meta name="robots" content="${allowRobots ? 'index, follow' : 'noindex, nofollow'}" />`);
  tags.push(`<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />`);
  tags.push(`<meta name="language" content="English" />`);
  
  tags.push('');

  // Open Graph / Facebook
  tags.push('<!-- Open Graph / Facebook -->');
  tags.push(`<meta property="og:type" content="website" />`);
  if (url) tags.push(`<meta property="og:url" content="${url}" />`);
  if (title) tags.push(`<meta property="og:title" content="${title}" />`);
  if (description) tags.push(`<meta property="og:description" content="${description}" />`);
  if (image) tags.push(`<meta property="og:image" content="${image}" />`);

  tags.push('');

  // Twitter
  tags.push('<!-- Twitter -->');
  tags.push(`<meta property="twitter:card" content="summary_large_image" />`);
  if (url) tags.push(`<meta property="twitter:url" content="${url}" />`);
  if (title) tags.push(`<meta property="twitter:title" content="${title}" />`);
  if (description) tags.push(`<meta property="twitter:description" content="${description}" />`);
  if (image) tags.push(`<meta property="twitter:image" content="${image}" />`);

  return tags.join('\n');
}
