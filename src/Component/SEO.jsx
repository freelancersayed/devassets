import { useEffect } from 'react';

const SITE_URL = 'https://devassets.online';
const DEFAULT_TITLE = 'DevAssets — Premium E-Books, Developer Masterclasses & Tech Blueprints';
const DEFAULT_DESC =
  'Supercharge your engineering career with DevAssets battle-tested digital masterclasses. Master Advanced JavaScript, production React patterns, and 2026 Google SEO strategies.';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function setMetaTag(name, content, isProperty = false) {
  if (!content) return;
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonical = '/',
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
}) {
  const fullTitle = title ? `${title} | DevAssets` : DEFAULT_TITLE;
  const fullUrl = canonical.startsWith('http')
    ? canonical
    : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Update Primary Meta Tags
    setMetaTag('description', description);
    setMetaTag('robots', robots);
    setMetaTag('googlebot', robots);
    setMetaTag('bingbot', robots);
    setCanonical(fullUrl);

    // 3. Update Open Graph
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', fullUrl, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);

    // 4. Update Twitter Cards
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // 5. Update or Inject Page-specific Schema (JSON-LD)
    let schemaScript = document.getElementById('route-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'route-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    // Scroll to top on page change for better UX & crawl simulation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [fullTitle, description, fullUrl, robots, ogType, ogImage, schema]);

  return null;
}
