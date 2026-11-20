import { useEffect } from 'react';

/**
 * Universal SEO & Open Graph Social Share Updater
 * Dynamically updates document title and Open Graph / Twitter Card meta tags
 * Ensures crisp link preview thumbnails when shared on WhatsApp, Facebook, Twitter, LinkedIn
 */
export function useDocumentSEO({
  title,
  description,
  image,
  url,
  type = 'article'
}) {
  useEffect(() => {
    const siteTitle = 'Lagos State Ministry of the Environment and Water Resources';
    const defaultDesc = 'Official portal of the Lagos State Ministry of the Environment and Water Resources. Securing a cleaner, greener, healthier, and flood-resilient megacity.';
    const defaultImage = 'https://moelagos.gov.ng/wp-content/uploads/2025/02/DSC_0126-scaled.jpg';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://moelagos.gov.ng';

    const fullTitle = title ? `${title} | MOE&WR Lagos` : siteTitle;
    const finalDesc = description || defaultDesc;
    const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);

    // Resolve image to absolute URL required by WhatsApp and social crawlers
    let finalImage = defaultImage;
    if (image) {
      if (image.startsWith('http://') || image.startsWith('https://')) {
        finalImage = image;
      } else if (image.startsWith('/')) {
        finalImage = `${baseUrl}${image}`;
      } else {
        finalImage = `${baseUrl}/${image}`;
      }
    }

    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (selector, attributeName, attributeValue, contentValue) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', finalDesc);
    setMetaTag('meta[name="title"]', 'name', 'title', fullTitle);

    // Open Graph Meta Tags (WhatsApp, Facebook, LinkedIn)
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDesc);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', finalImage);
    setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', finalImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', finalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteTitle);
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');

    // Twitter / X Cards
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', finalDesc);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', finalImage);
    setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', finalUrl);

  }, [title, description, image, url, type]);
}

export default function SEO(props) {
  useDocumentSEO(props);
  return null;
}
