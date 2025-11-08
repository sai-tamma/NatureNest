# 🚀 Quick Start Guide

Get your event venue website up and running in 15 minutes!

## Step 1: Update Your Business Information (5 minutes)

Open **`config.js`** and change these values:

```javascript
business: {
  name: "Your Venue Name Here",           // ← CHANGE THIS
  email: "youremail@yourdomain.com",      // ← CHANGE THIS
  // Keep the rest as-is for now
}

social: {
  facebook: "https://facebook.com/yourpage",    // ← CHANGE THIS
  instagram: "https://instagram.com/yourpage",  // ← CHANGE THIS
}
```

**That's it!** Your business name, phone, address, and social links will update across the entire website automatically.

## Step 2: View Your Website (2 minutes)

### Option A: Double-click `index.html`
Simply double-click the `index.html` file to open it in your browser.

### Option B: Use a Local Server (Recommended)
If you have Python installed:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

Or use VS Code's "Live Server" extension for auto-refresh.

## Step 3: Add Your Images (5 minutes)

### Priority Images to Replace:

1. **Homepage Hero Video** (optional)
   - Download from [Pexels](https://www.pexels.com/search/videos/wedding%20venue/)
   - Save as: `videos/hero-background.mp4`
   - Or skip video and use an image instead

2. **Gallery Photos** (important)
   - Add 10-30 photos to `images/gallery/`
   - Update `gallery.html` to reference your images
   - See `images/IMAGE-GUIDE.txt` for details

## Step 4: Deploy Your Website (3 minutes)

### Easiest Method: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag and drop your entire project folder
4. Done! Your site is live with free hosting + SSL

### Alternative: GitHub Pages

1. Create GitHub account
2. Create new repository
3. Upload all files
4. Enable GitHub Pages in settings
5. Your site is live!

## ✅ You're Done!

Your professional event venue website is now live.

## Next Steps (When You Have Time)

- [ ] Replace all gallery images with your venue photos
- [ ] Update testimonials with real client reviews
- [ ] Set up Google Maps (see README for instructions)
- [ ] Add your favicon/logo
- [ ] Set up contact form to receive emails (see README)
- [ ] Optimize your images (use tinypng.com)
- [ ] Test on mobile devices
- [ ] Add Google Analytics (optional)

## 🆘 Need Help?

- **Full Documentation**: See `README.md`
- **Image Guide**: See `images/IMAGE-GUIDE.txt`
- **Video Guide**: See `videos/VIDEO-INSTRUCTIONS.txt`

## 🎯 Most Common Questions

**Q: How do I change the colors?**
A: Edit the CSS variables at the top of `css/main.css`

**Q: How do I add more gallery images?**
A: Add images to `images/gallery/` and update `gallery.html` (copy existing gallery-item div)

**Q: How do I receive contact form emails?**
A: Sign up for [Formspree](https://formspree.io) (free) and update the form action in `contact.html`

**Q: Can I change the venue name?**
A: Yes! Just update `config.js` and it changes everywhere automatically

**Q: Do I need to know coding?**
A: No! All customizations can be done by editing simple values in `config.js` and replacing images

---

**That's it! Your website is ready to attract clients! 🎉**
