# Wright Memorial Event Center Website

A professional, responsive event venue website built with modern HTML5, CSS3, and vanilla JavaScript. This website showcases your event venue with beautiful design, smooth animations, and easy customization for non-technical users.

## 🌟 Features

- **5 Fully Responsive Pages**
  - Homepage with hero video, event types, testimonials
  - Weddings page with venue highlights and gallery
  - Private Events page for corporate and social gatherings
  - Gallery with filterable categories and lightbox
  - Contact page with validated form and Google Maps

- **Modern Design**
  - Elegant color scheme (navy, gold, white)
  - Beautiful typography (Playfair Display + Montserrat)
  - Smooth scroll animations
  - Mobile-first responsive design
  - Professional hover effects

- **Interactive Features**
  - Mobile hamburger navigation
  - Testimonials carousel
  - Filterable photo gallery
  - Image lightbox with keyboard navigation
  - Contact form with validation
  - Lazy loading images

- **SEO & Accessibility**
  - Semantic HTML5 markup
  - Meta tags and Open Graph
  - Schema.org structured data
  - ARIA labels for screen readers
  - Keyboard navigation support
  - Lighthouse score optimized

## 📁 Project Structure

```
NatureNestWebsite/
├── index.html              # Homepage
├── weddings.html           # Weddings page
├── private-events.html     # Private events page
├── gallery.html            # Photo gallery with filters
├── contact.html            # Contact form and info
├── config.js               # Site configuration (CUSTOMIZE THIS!)
├── README.md               # This file
├── css/
│   └── main.css           # All styles
├── js/
│   ├── main.js            # Animations, carousel, utilities
│   ├── navigation.js      # Mobile menu and nav effects
│   ├── gallery.js         # Gallery filtering and lightbox
│   └── form-validation.js # Contact form validation
├── images/
│   ├── homepage/          # Homepage images
│   ├── weddings/          # Wedding photos
│   ├── events/            # Event photos
│   └── gallery/           # Gallery images
└── videos/
    └── hero-background.mp4 # Homepage hero video
```

## 🚀 Quick Start

### 1. **Download/Clone the Project**

   All files are ready to use as-is. No build process required!

### 2. **Customize Your Information**

   Open `config.js` and update:
   ```javascript
   const siteConfig = {
     business: {
       name: "Your Venue Name",        // Change this
       address: "178 Slaydon Rd, Eden, NC 27288",
       phone: "(614) 284-0189",
       email: "your@email.com",         // Change this
       mapEmbedUrl: "YOUR_GOOGLE_MAPS_URL"  // See instructions below
     },
     social: {
       facebook: "https://facebook.com/yourpage",   // Change this
       instagram: "https://instagram.com/yourpage", // Change this
       pinterest: "https://pinterest.com/yourpage"  // Optional
     }
   };
   ```

### 3. **Add Your Images**

   Replace placeholder images with your own:
   - Use high-quality photos (1920px width minimum for hero images)
   - Recommended dimensions:
     - Hero images: 1920x1080px
     - Gallery images: 800x600px minimum
     - Card images: 600x400px
   - Optimize images before uploading (use tinypng.com or squoosh.app)
   - Use WebP format when possible for better performance

### 4. **Test Locally**

   Open `index.html` in your web browser. Most features will work locally, but for best results:
   - Use a local server (like VS Code's Live Server extension)
   - Or use Python: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

### 5. **Deploy Your Site**

   See the [Deployment](#-deployment) section below.

## 🎨 Customization Guide

### Updating Business Information

All business information is centralized in `config.js`:

1. **Business Name**: Automatically updates across all pages
2. **Contact Info**: Updates in footer, contact page, and nav
3. **Social Media**: Links update in footer and contact page
4. **Google Maps**: Follow the instructions below

### Getting Your Google Maps Embed URL

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for: `178 Slaydon Rd, Eden, NC 27288`
3. Click the **"Share"** button
4. Click the **"Embed a map"** tab
5. Copy the URL from the `<iframe src="...">`
6. Paste it into `config.js` as the `mapEmbedUrl` value

### Changing Colors

Edit the CSS variables in `css/main.css` (lines 15-22):

```css
:root {
  --color-primary: #1a2332;      /* Main dark color */
  --color-secondary: #d4af37;    /* Gold accent */
  --color-accent: #ffffff;       /* White */
  --color-text: #333333;         /* Text color */
  --color-light-gray: #f8f9fa;   /* Light backgrounds */
}
```

Use a color picker tool like [Coolors.co](https://coolors.co/) to find your perfect palette.

### Changing Fonts

The site uses Google Fonts. To change fonts:

1. Go to [Google Fonts](https://fonts.google.com/)
2. Select your fonts
3. Update the import URL in `css/main.css` (line 6)
4. Update the font variables (lines 24-25)

```css
@import url('https://fonts.googleapis.com/...');

:root {
  --font-heading: 'Your Heading Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Adding/Replacing Images

#### Homepage Hero Video
1. Download a free video from [Pexels](https://www.pexels.com/search/videos/wedding%20venue/) or [Pixabay](https://pixabay.com/videos/)
2. Save as `videos/hero-background.mp4`
3. Keep file size under 10MB for faster loading
4. Recommended: 1920x1080, 10-30 seconds long

#### Gallery Images
1. Add images to `images/gallery/`
2. Open `gallery.html`
3. Add new gallery items:
```html
<div class="gallery-item" data-category="weddings">
  <img src="images/gallery/your-image.jpg" alt="Description">
  <div class="gallery-item-overlay">
    <i class="fas fa-search-plus"></i>
  </div>
</div>
```
4. Use `data-category` values: `weddings`, `corporate`, `social`, `venue`
5. Multiple categories: `data-category="weddings venue"`

### Updating Testimonials

Open `index.html` and find the testimonials section (around line 260). Modify the testimonial slides:

```html
<div class="testimonial-slide">
  <div class="testimonial">
    <p class="testimonial-text">
      "Your testimonial text here..."
    </p>
    <div class="testimonial-author">Client Name</div>
    <div class="testimonial-role">Event Type, Date</div>
  </div>
</div>
```

Add or remove slides as needed. The carousel adjusts automatically.

### Contact Form Integration

The form currently shows a success message. To receive actual submissions:

**Option 1: Formspree (Easiest)**
1. Sign up at [Formspree.io](https://formspree.io/)
2. In `contact.html`, update the form tag:
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: Netlify Forms**
1. Add `netlify` attribute to form tag:
```html
<form id="contact-form" netlify>
```
2. Deploy to Netlify (see deployment section)

**Option 3: Custom Backend**
- Modify `js/form-validation.js` to send data to your server
- Update the `submitForm()` method (line 85)

## 📱 Mobile Responsiveness

The site is fully responsive with breakpoints at:
- **640px** - Small phones
- **768px** - Tablets (mobile menu activates)
- **1024px** - Small laptops
- **1280px** - Large screens

Test on multiple devices using browser DevTools (F12).

## 🌐 Deployment

### Deploy to Netlify (Recommended)

1. Create account at [Netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your entire project folder
4. Your site is live! Get a free `.netlify.app` domain
5. Optional: Add custom domain in site settings

### Deploy to GitHub Pages

1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select branch `main` and folder `/ (root)`
5. Save and wait a few minutes
6. Your site will be live at `https://yourusername.github.io/repository-name`

### Deploy to Vercel

1. Create account at [Vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from Git or upload manually
4. Deploy with one click
5. Get automatic HTTPS and global CDN

### Traditional Web Hosting

1. Use FTP client (FileZilla, Cyberduck)
2. Upload all files to your web hosting `public_html` or `www` folder
3. Ensure `index.html` is in the root directory
4. Your site will be live at your domain

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- Alt text on all images
- Color contrast WCAG AA compliant
- Focus indicators for keyboard users
- Reduced motion support

## 🎯 Performance Optimizations

- Lazy loading images
- Optimized CSS (single file, minimal)
- Vanilla JavaScript (no heavy frameworks)
- Mobile video disabled to save bandwidth
- Compressed images recommended
- Efficient animations using CSS transforms
- Minimal external dependencies

## 📸 Royalty-Free Image Sources

All placeholder images are from these sources:

1. **[Unsplash.com](https://unsplash.com/)** - Free high-quality photos
   - Search: "wedding venue", "event space", "corporate event"

2. **[Pexels.com](https://pexels.com/)** - Free photos and videos
   - Great for hero videos and event photos

3. **[Pixabay.com](https://pixabay.com/)** - Free images and videos
   - Wide variety of event-related content

### Image Usage Guidelines
- All images must be replaced with your own or properly licensed photos
- Current placeholder images are for demonstration only
- Always check license requirements before using stock photos
- Credit photographers when required

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths are correct (case-sensitive on some servers)
- Ensure images are in the correct folders
- Verify image formats are supported (.jpg, .png, .webp)

### Video Not Playing
- Ensure video is in MP4 format
- Check file size (should be under 10MB)
- Video must be in `videos/` folder
- On mobile, video is hidden by default (performance)

### Form Not Submitting
- Check browser console for errors (F12)
- Ensure all required fields are filled
- Verify form validation is working
- See "Contact Form Integration" section above

### Mobile Menu Not Working
- Check that `js/navigation.js` is loaded
- Clear browser cache
- Verify no JavaScript errors in console

### Gallery Filter Not Working
- Ensure `js/gallery.js` is loaded
- Check `data-category` attributes match filter buttons
- Verify all gallery items have the `gallery-item` class

### Animations Not Smooth
- Check if "reduced motion" is enabled in OS settings
- Ensure browser is up to date
- Try different browser for comparison

## 📄 License

This website template is provided as-is for your event venue. You are free to:
- Use it for your commercial venue
- Modify and customize it
- Remove attribution (optional)

Please replace all placeholder images with your own licensed photos.

## 🆘 Support

Need help? Here are some resources:

1. **HTML/CSS Questions**: [MDN Web Docs](https://developer.mozilla.org/)
2. **JavaScript Help**: [JavaScript.info](https://javascript.info/)
3. **Web Hosting**: Most hosts have 24/7 support
4. **Image Optimization**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
5. **Google Fonts**: [fonts.google.com](https://fonts.google.com/)

## ✅ Pre-Launch Checklist

Before going live, make sure you:

- [ ] Updated all information in `config.js`
- [ ] Replaced all placeholder images with your photos
- [ ] Added your Google Maps embed URL
- [ ] Updated social media links
- [ ] Changed email address for contact form
- [ ] Tested contact form submission
- [ ] Verified all links work
- [ ] Tested on mobile devices
- [ ] Checked all pages load correctly
- [ ] Optimized images for web
- [ ] Added your own logo/favicon
- [ ] Tested gallery filtering
- [ ] Reviewed all text content for accuracy
- [ ] Set up form submission (Formspree/Netlify/custom)
- [ ] Tested on multiple browsers
- [ ] Checked accessibility with Lighthouse
- [ ] Added SSL certificate (HTTPS)
- [ ] Set up Google Analytics (optional)

## 🎉 You're All Set!

Your professional event venue website is ready to attract clients and showcase your beautiful space. Remember to:

- Keep content updated regularly
- Add new photos from events (with permission)
- Update testimonials with recent reviews
- Monitor contact form submissions
- Keep software/plugins updated if using CMS

**Good luck with your event venue business!** 🎊

---

**Built with ❤️ for event venues everywhere**

*Last updated: November 2024*
