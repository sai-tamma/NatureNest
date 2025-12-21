// ============================================
// VIDEO LOADER - SIMPLIFIED FOR MOBILE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-video');

  if (!video) return;

  // Force muted state (critical for autoplay)
  video.muted = true;
  video.defaultMuted = true;

  // Simple play attempt
  setTimeout(() => {
    video.play().catch(() => {
      // If autoplay fails, video will show poster image
      console.log('Video autoplay blocked - showing poster image');
    });
  }, 100);
});
