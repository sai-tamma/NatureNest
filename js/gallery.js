// ============================================
// GALLERY MODULE
// Handles gallery filtering, lightbox, and lazy loading
// ============================================

class Gallery {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.galleryItems = document.querySelectorAll('.gallery-item');
    this.lightbox = document.querySelector('.lightbox');
    this.lightboxImg = document.querySelector('.lightbox-content img');
    this.lightboxClose = document.querySelector('.lightbox-close');
    this.lightboxPrev = document.querySelector('.lightbox-prev');
    this.lightboxNext = document.querySelector('.lightbox-next');
    this.currentImageIndex = 0;
    this.currentFilter = 'all';

    this.init();
  }

  init() {
    // Filter functionality
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => this.filterGallery(e));
    });

    // Lightbox functionality
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });

    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    }

    if (this.lightboxPrev) {
      this.lightboxPrev.addEventListener('click', () => this.prevImage());
    }

    if (this.lightboxNext) {
      this.lightboxNext.addEventListener('click', () => this.nextImage());
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Close lightbox when clicking outside image
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    }

    // Lazy loading
    this.setupLazyLoading();
  }

  filterGallery(e) {
    const filter = e.target.getAttribute('data-filter');
    this.currentFilter = filter;

    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filter items
    this.galleryItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');

      if (filter === 'all' || categories.includes(filter)) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  openLightbox(index) {
    const visibleItems = this.getVisibleItems();
    this.currentImageIndex = visibleItems.indexOf(this.galleryItems[index]);

    if (this.currentImageIndex === -1) {
      this.currentImageIndex = index;
    }

    const imgSrc = this.galleryItems[index].querySelector('img').src;

    if (this.lightboxImg && this.lightbox) {
      this.lightboxImg.src = imgSrc;
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  prevImage() {
    const visibleItems = this.getVisibleItems();
    this.currentImageIndex = (this.currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
    const imgSrc = visibleItems[this.currentImageIndex].querySelector('img').src;
    if (this.lightboxImg) {
      this.lightboxImg.src = imgSrc;
    }
  }

  nextImage() {
    const visibleItems = this.getVisibleItems();
    this.currentImageIndex = (this.currentImageIndex + 1) % visibleItems.length;
    const imgSrc = visibleItems[this.currentImageIndex].querySelector('img').src;
    if (this.lightboxImg) {
      this.lightboxImg.src = imgSrc;
    }
  }

  getVisibleItems() {
    return Array.from(this.galleryItems).filter(item => {
      return item.style.display !== 'none' && item.offsetParent !== null;
    });
  }

  handleKeyboard(e) {
    if (!this.lightbox || !this.lightbox.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
    }
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.gallery-grid')) {
    new Gallery();
  }
});
