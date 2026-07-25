// ===== SCROLL ANIMATION OBSERVER =====
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in / slide animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate skill bars when softwares section is visible
        if (entry.target.closest('#softwares') || entry.target.closest('.softwares-section')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  animatedElements.forEach(el => observer.observe(el));

  // ===== SKILL BAR ANIMATION =====
  let barsAnimated = false;

  function animateSkillBars() {
    if (barsAnimated) return;
    barsAnimated = true;

    const bars = document.querySelectorAll('.software-bar-fill');
    bars.forEach((bar, index) => {
      const targetWidth = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = targetWidth + '%';
      }, index * 150);
    });
  }

  // ===== HERO PARALLAX EFFECT =====
  const heroSection = document.querySelector('.hero-section');
  const heroImage = document.querySelector('.hero-image-container');
  const clouds = document.querySelectorAll('.cloud');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection?.offsetHeight || 480;

    if (scrollY < heroHeight) {
      // Parallax on hero image
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.15}px)`;
      }

      // Parallax on clouds
      clouds.forEach((cloud, i) => {
        const speed = 0.05 + (i * 0.03);
        cloud.style.transform = `translateX(${scrollY * speed}px)`;
      });
    }
  });

  // ===== SOFTWARE ICON HOVER GLOW =====
  const softwareIcons = document.querySelectorAll('.software-icon-box');
  softwareIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
    });
  });

  // ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== TYPING EFFECT ON HERO (subtle) =====
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.opacity = '0';
    heroName.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
      heroName.style.opacity = '1';
    }, 300);
  }

  // ===== PROFILE IMAGE SUBTLE FLOAT =====
  const profileWrapper = document.querySelector('.profile-image-wrapper');
  if (profileWrapper) {
    let floatY = 0;
    let direction = 1;
    
    function floatAnimation() {
      floatY += 0.03 * direction;
      if (floatY > 3) direction = -1;
      if (floatY < -3) direction = 1;
      profileWrapper.style.transform = `translateY(${floatY}px)`;
      requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
  }

  console.log('✨ Leticia Valdez Portfolio - Loaded successfully');
});
