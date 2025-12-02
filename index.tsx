import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { inject } from '@vercel/analytics';
import App from './probsolvagencyfinal-db69e3aecdfa51434a39740243b85582ed3d7425/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Helper to determine the base URL for the router
// This fixes the "No routes matched location" error in preview environments
const getBasename = () => {
  const { pathname, hostname } = window.location;

  // Specific check for AI Studio / Cloud Shell preview domains
  if (hostname.includes('scf.usercontent.goog') || hostname.includes('webcontainer.io')) {
    // These environments host the app in a subdirectory (the first segment of the path)
    // e.g., /0239ccae-481b-4578-aba7-271567da84e5/
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      // Return the first segment as the base (e.g., /0239ccae-...)
      return `/${pathSegments[0]}`;
    }
  }
  
  // Regex fallback for generic UUID patterns
  const previewPathMatch = pathname.match(/^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (previewPathMatch) {
    return previewPathMatch[0];
  }
  
  // Default to root for production (probsolvtech.agency)
  return '/';
};

// Initialize Vercel Web Analytics
inject();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);