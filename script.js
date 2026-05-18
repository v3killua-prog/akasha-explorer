document.addEventListener('DOMContentLoaded', function () {
  // ===============================================
  // SATELLITE POPUP FUNCTIONALITY
  // ===============================================
  const popup = document.getElementById('satPopup');
  const close = document.getElementById('satClose');
  const nameEl = document.getElementById('satName');
  const typeEl = document.getElementById('satType');
  const yearEl = document.getElementById('satYear');
  const descEl = document.getElementById('satDesc');

  if (popup) {
    document.querySelectorAll('.satellite').forEach(function (sat) {
      sat.addEventListener('click', function () {
        const { name, type, year, desc } = sat.dataset;
        nameEl.textContent = name || 'Unknown Satellite';
        typeEl.textContent = type || 'Type unknown';
        yearEl.textContent = year || 'Year unknown';
        descEl.textContent = desc || 'No description available.';
        popup.classList.add('visible');
      });
    });

    if (close) {
      close.addEventListener('click', function (e) {
        e.stopPropagation();
        popup.classList.remove('visible');
      });
    }

    popup.addEventListener('click', function (event) {
      if (event.target === popup) {
        popup.classList.remove('visible');
      }
    });
  }

  // ===============================================
  // SATELLITE FILTER FUNCTIONALITY
  // ===============================================
  const filterInputs = document.querySelectorAll('input[name="satellite-filter"]');
  
  if (filterInputs.length > 0) {
    filterInputs.forEach(input => {
      input.addEventListener('change', function () {
        const selectedFilter = this.value;
        const satellites = document.querySelectorAll('.satellite.isro-sat');

        satellites.forEach(sat => {
          const satFilter = sat.dataset.filter;
          
          if (selectedFilter === 'all' || satFilter === selectedFilter) {
            sat.classList.remove('hidden');
            sat.style.opacity = '1';
            sat.style.pointerEvents = 'auto';
          } else {
            sat.classList.add('hidden');
            sat.style.opacity = '0.1';
            sat.style.pointerEvents = 'none';
          }
        });
      });
    });
  }

  // ===============================================
  // STARFIELD BACKGROUND (for satellites page)
  // ===============================================
  const starfield = document.getElementById('starfield');
  if (starfield) {
    generateStars(starfield);
  }

  function generateStars(container) {
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = Math.random() * 2 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.backgroundColor = '#fff';
      star.style.borderRadius = '50%';
      star.style.opacity = Math.random() * 0.7 + 0.3;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.pointerEvents = 'none';
      
      // Optional: add twinkle animation to some stars
      if (Math.random() > 0.7) {
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
      }
      
      container.appendChild(star);
    }
  }

  // ===============================================
  // SMOOTH SCROLL BEHAVIOR
  // ===============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===============================================
  // ADD TWINKLE ANIMATION KEYFRAMES
  // ===============================================
  if (!document.querySelector('style[data-twinkle]')) {
    const style = document.createElement('style');
    style.setAttribute('data-twinkle', 'true');
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // ===============================================
  // INTERSECTION OBSERVER FOR LAZY ANIMATIONS
  // ===============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe mission cards for fade-in animation
  document.querySelectorAll('.mission-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});
