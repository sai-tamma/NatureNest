// ============================================
// NAVIGATION MODULE
// Handles mobile menu, scroll effects, and active links
// ============================================

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking nav links
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.closeMenu();
          }
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
          this.closeMenu();
        }
      });
    }

    // Scroll effect
    window.addEventListener('scroll', () => this.handleScroll());

    // Set active link based on current page
    this.setActiveLink();
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    this.navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === '/' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
