import { useEffect } from 'react';

/**
 * Reusable SEO Component for Wizzo.One
 * Dynamically updates document title, standard meta tags, canonical link,
 * and Open Graph / Twitter Card social metadata.
 */
export default function SEO({
  title = 'Wizzo.One | One Business · Connected Workflows',
  description = 'Wizzo.One provides a unified business management platform connecting accounts, inventory, CRM, HRMS, production, and custom industry workflows with clarity and precision.',
  canonical = '/',
  keywords = 'Wizzo.One, business management software, cloud ERP, accounts software, inventory management, CRM, HRMS, workflow automation, SME software',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  robots = 'index, follow',
}) {
  const siteUrl = 'https://wizzo.one';
  const fullCanonicalUrl = canonical.startsWith('http')
    ? canonical
    : `${siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to create or update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // Helper to create or update link tags
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href || '');
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', robots);
    setMetaTag('name', 'author', 'Wizzo.One');

    // 3. Canonical Link
    setLinkTag('canonical', fullCanonicalUrl);

    // 4. Open Graph Metadata
    setMetaTag('property', 'og:site_name', 'Wizzo.One');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:locale', 'en_US');

    // 5. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullOgImage);
  }, [title, description, fullCanonicalUrl, fullOgImage, ogType, robots, keywords]);

  return null;
}
