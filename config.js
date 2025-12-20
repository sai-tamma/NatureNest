// ============================================
// SITE CONFIGURATION
// ============================================
// Update this file to customize your website
// No coding knowledge required!
// ============================================

const siteConfig = {
  business: {
    name: "Wright Memorial Event Center", // UPDATE: Your venue name
    tagline: "Celebrating All Moments That Matter",
    address: "184 Slaydon Rd, Eden, NC 27288",
    phone: "336-612-7063",
    email: "info@wrightmemorialevents.com", // UPDATE: Your email address

    // Google Maps Embed URL
    // To get your map URL:
    // 1. Go to https://www.google.com/maps
    // 2. Search for your address
    // 3. Click "Share" button
    // 4. Click "Embed a map" tab
    // 5. Copy the URL from the iframe src attribute
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.0672817376026!2d-79.672782!3d36.48009100000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8852c0ea0ae6fbeb%3A0xa47df4e0bc4f9f44!2s184%20Slaydon%20Rd%2C%20Eden%2C%20NC%2027288!5e0!3m2!1sen!2sus!4v1766183330847!5m2!1sen!2sus" // UPDATE: Your Google Maps embed URL
  },

  social: {
    facebook: "https://www.facebook.com/p/Wright-Memorial-Event-Center-100064101759098/", // UPDATE: Your Facebook page URL
    instagram: "https://instagram.com/yourpage", // UPDATE: Your Instagram profile URL
    pinterest: "https://pinterest.com/yourpage", // UPDATE: Your Pinterest profile URL (optional)
    twitter: "https://twitter.com/yourpage" // UPDATE: Your Twitter profile URL (optional)
  },

  colors: {
    primary: "#1a2332", // Deep navy/charcoal
    secondary: "#d4af37", // Gold/champagne
    accent: "#ffffff", // White
    text: "#333333", // Dark gray for text
    lightGray: "#f8f9fa" // Light background
  },

  // Event capacity information
  venue: {
    maxCapacity: 250,
    indoorCapacity: 150,
    outdoorCapacity: 200,
    parkingSpaces: 100
  }
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.siteConfig = siteConfig;
}
