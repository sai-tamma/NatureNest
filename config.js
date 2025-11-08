// ============================================
// SITE CONFIGURATION
// ============================================
// Update this file to customize your website
// No coding knowledge required!
// ============================================

const siteConfig = {
  business: {
    name: "Nature Nest Event Venue", // UPDATE: Your venue name
    tagline: "Celebrating All Moments That Matter",
    address: "178 Slaydon Rd, Eden, NC 27288",
    phone: "(614) 284-0189",
    email: "info@naturenestvenue.com", // UPDATE: Your email address

    // Google Maps Embed URL
    // To get your map URL:
    // 1. Go to https://www.google.com/maps
    // 2. Search for your address
    // 3. Click "Share" button
    // 4. Click "Embed a map" tab
    // 5. Copy the URL from the iframe src attribute
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.123!2d-79.1234!3d36.5678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDM0JzA0LjEiTiA3OcKwMDcnMjQuMyJX!5e0!3m2!1sen!2sus!4v1234567890" // UPDATE: Your Google Maps embed URL
  },

  social: {
    facebook: "https://facebook.com/yourpage", // UPDATE: Your Facebook page URL
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
