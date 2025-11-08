// ============================================
// MAIN JAVASCRIPT
// Handles animations, scroll effects, testimonials carousel
// ============================================

// Initialize site configuration
function initSiteConfig() {
  if (typeof siteConfig === 'undefined') {
    console.warn('Site configuration not loaded');
    return;
  }

  // Update dynamic content
  updateBusinessInfo();
  updateSocialLinks();
}

// Update business information throughout the site
function updateBusinessInfo() {
  const config = window.siteConfig;

  // Update business name
  const businessNames = document.querySelectorAll('[data-business-name]');
  businessNames.forEach(el => {
    el.textContent = config.business.name;
  });

  // Update phone
  const phones = document.querySelectorAll('[data-business-phone]');
  phones.forEach(el => {
    el.textContent = config.business.phone;
    if (el.tagName === 'A') {
      el.href = `tel:${config.business.phone.replace(/\D/g, '')}`;
    }
  });

  // Update email
  const emails = document.querySelectorAll('[data-business-email]');
  emails.forEach(el => {
    el.textContent = config.business.email;
    if (el.tagName === 'A') {
      el.href = `mailto:${config.business.email}`;
    }
  });

  // Update address
  const addresses = document.querySelectorAll('[data-business-address]');
  addresses.forEach(el => {
    el.textContent = config.business.address;
  });
}

// Update social media links
function updateSocialLinks() {
  const config = window.siteConfig;

  const socialLinks = {
    facebook: document.querySelectorAll('[data-social="facebook"]'),
    instagram: document.querySelectorAll('[data-social="instagram"]'),
    pinterest: document.querySelectorAll('[data-social="pinterest"]'),
    twitter: document.querySelectorAll('[data-social="twitter"]')
  };

  Object.keys(socialLinks).forEach(platform => {
    socialLinks[platform].forEach(link => {
      if (config.social[platform]) {
        link.href = config.social[platform];
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.fade-in-up');
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.animatedElements.forEach(el => observer.observe(el));
  }
}

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================
class TestimonialsCarousel {
  constructor() {
    this.carousel = document.querySelector('.testimonials-carousel');
    if (!this.carousel) return;

    this.track = this.carousel.querySelector('.testimonials-track');
    this.slides = this.carousel.querySelectorAll('.testimonial-slide');
    this.dots = this.carousel.querySelectorAll('.carousel-dot');
    this.currentSlide = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Auto play
    this.startAutoPlay();

    // Pause on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());

    // Touch/swipe support
    this.setupTouchSupport();
  }

  goToSlide(index) {
    this.currentSlide = index;
    const offset = -index * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Update dots
    this.dots.forEach(dot => dot.classList.remove('active'));
    this.dots[index].classList.add('active');
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(this.currentSlide);
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(this.currentSlide);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  setupTouchSupport() {
    let startX = 0;
    let endX = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    this.carousel.addEventListener('touchend', () => {
      const diff = startX - endX;

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });
  }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default for # only links (like social placeholders)
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// LAZY LOAD IMAGES
// ============================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// VIDEO BACKGROUND OPTIMIZATION
// ============================================
function initVideoBackground() {
  const heroVideo = document.querySelector('.hero-video');

  if (heroVideo && window.innerWidth < 768) {
    // Pause video on mobile to save bandwidth
    heroVideo.pause();
    heroVideo.style.display = 'none';
  }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize site config
  initSiteConfig();

  // Initialize scroll animations
  new ScrollAnimations();

  // Initialize testimonials carousel
  new TestimonialsCarousel();

  // Initialize smooth scroll
  initSmoothScroll();

  // Initialize lazy loading
  initLazyLoading();

  // Initialize video background
  initVideoBackground();

  // Initialize back to top button
  initBackToTop();

  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initVideoBackground();
  }, 250);
});
