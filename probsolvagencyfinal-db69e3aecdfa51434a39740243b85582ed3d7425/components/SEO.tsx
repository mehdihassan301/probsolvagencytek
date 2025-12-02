
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "ProbSolv Tech Agency crafts high-performance websites, custom 'vibe coding' apps, and intelligent AI automations to scale your business.", 
  canonical,
  type = 'website',
  image = 'https://www.probsolvtech.agency/og-image.png'
}) => {
  const siteUrl = 'https://www.probsolvtech.agency';
  const fullCanonical = canonical ? (canonical.startsWith('https') ? canonical : `${siteUrl}${canonical}`) : siteUrl;
const fullTitle = `ProbSolv Tech Agency — ${title}`;

useEffect(() => {
  document.title = fullTitle;

  const updateTag = (selector, attribute, value, tagName = 'meta', createAttrs = {}) => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement(tagName);
      Object.entries(createAttrs).forEach(([k, v]) => element.setAttribute(k, v));
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
  };

  // Correct meta description
  updateTag('meta[name="description"]', 'content', description, 'meta', { name: 'description' });

  updateTag('link[rel="canonical"]', 'href', fullCanonical, 'link', { rel: 'canonical' });

  updateTag('meta[property="og:type"]', 'content', type, 'meta', { property: 'og:type' });
  updateTag('meta[property="og:title"]', 'content', fullTitle, 'meta', { property: 'og:title' });
  updateTag('meta[property="og:description"]', 'content', description, 'meta', { property: 'og:description' });
  updateTag('meta[property="og:url"]', 'content', fullCanonical, 'meta', { property: 'og:url' });
  updateTag('meta[property="og:image"]', 'content', image, 'meta', { property: 'og:image' });

  updateTag('meta[name="twitter:title"]', 'content', fullTitle, 'meta', { name: 'twitter:title' });
  updateTag('meta[name="twitter:description"]', 'content', description, 'meta', { name: 'twitter:description' });
  updateTag('meta[name="twitter:image"]', 'content', image, 'meta', { name: 'twitter:image' });

}, [title, description, fullCanonical, type, image, fullTitle]);


  return null;
};

export default SEO;
