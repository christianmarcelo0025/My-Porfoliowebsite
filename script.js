/**
 * MARCELO — MINIMALIST MONOCHROME PORTFOLIO
 * Core Interactions, Animations & Dynamic Data Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // Project Database for Inspection Modal
  // -------------------------------------------------------------------------
  const projectDatabase = {
    monolith: {
      id: '01',
      title: 'Monolith OS',
      tagline: 'Minimalist workspace kernel and developer environment engineered for friction-free focus.',
      client: 'Open Source / Self-Initiated',
      role: 'Lead Architect & UI Designer',
      year: '2026',
      stack: ['TypeScript', 'Rust / Wasm', 'Electron', 'CSS Architecture'],
      overview: 'Monolith OS was born out of frustration with over-stimulating modern operating environments. We engineered a radically stripped-back workstation interface emphasizing command palette execution, zero distraction buffers, and typography-first information density.',
      challenge: 'Balancing raw technical throughput with humane, calm computing principles. The interface needed to render syntax-highlighted code and real-time process statistics while maintaining under 16ms frame times on ultra-dense monitors.',
      outcome: 'Achieved 0.12ms execution latency for common commands, 60fps canvas rendering, and adopted by over 14,000 developers seeking quiet computing.',
      links: [
        { label: 'VIEW REPOSITORY ↗', url: 'https://github.com' },
        { label: 'RELEASE MANIFESTO ↗', url: '#writing' }
      ]
    },
    aethelgard: {
      id: '02',
      title: 'Aethelgard Studio',
      tagline: 'Monochrome editorial archival catalogue for an avant-garde brutalist architecture firm in Zurich.',
      client: 'Aethelgard Architekten',
      role: 'Digital Art Director & Frontend Engineer',
      year: '2025',
      stack: ['Next.js', 'WebGL', 'CSS Grid', 'Custom Typography'],
      overview: 'A digital monograph and spatial gallery for a Zurich-based architecture studio. The visual language mirrors the firm’s physical structures: unadorned concrete geometry, rigorous Swiss grids, and generous void spaces.',
      challenge: 'Translating tactile photographic architectural plates into a responsive digital viewport without losing monumentality or typographic precision.',
      outcome: 'Awwwards Site of the Day, featured in Tokyo Type Directors Club Annual, and a 65% increase in international monograph commissions.',
      links: [
        { label: 'LIVE ARCHIVE ↗', url: 'https://example.com' },
        { label: 'CASE DOCUMENTATION ↗', url: '#writing' }
      ]
    },
    kroma: {
      id: '03',
      title: 'Kroma Liquidity Terminal',
      tagline: 'High-throughput institutional trading dashboard with sub-millisecond chart rendering and dark canvas styling.',
      client: 'Kroma Capital Group',
      role: 'Staff UI Engineer & System Designer',
      year: '2025',
      stack: ['React', 'WebSockets', 'Canvas API', 'Design Tokens'],
      overview: 'Designed and built the core user interface for an institutional liquidity aggregator. Replacing chaotic multi-color charts with high-contrast monochrome depth cues and instant telemetry.',
      challenge: 'Processing upwards of 50,000 state mutations per second during peak market volatility while keeping UI interaction latency under 5ms.',
      outcome: 'Zero dropped frames under peak stress tests, reducing operator fatigue through disciplined tonal contrast ratios.',
      links: [
        { label: 'TERMINAL SPECS ↗', url: 'https://example.com' }
      ]
    },
    forma: {
      id: '04',
      title: 'Studio Forma',
      tagline: 'Interactive tactile configurator and identity for high-precision physical computing hardware.',
      client: 'Studio Forma Instruments',
      role: 'Creative Technologist',
      year: '2024',
      stack: ['Three.js', 'Shader programming', 'Vue 3', 'Web Audio API'],
      overview: 'Studio Forma crafts milled aluminum synthesizers and tactile controllers. We designed a web-based 3D configurator with acoustic simulation that lets creators test dial resistance and sonic response before fabrication.',
      challenge: 'Photorealistic material rendering of bead-blasted anodized black aluminum in real-time WebGL with minimal asset load times.',
      outcome: 'Achieved sub-1.2MB bundle size with procedural shaders, resulting in complete pre-order allocation in under 72 hours.',
      links: [
        { label: 'INTERACTIVE CONFIGURATOR ↗', url: 'https://example.com' }
      ]
    },
    vesper: {
      id: '05',
      title: 'Vesper Journal',
      tagline: 'Digital publishing platform exploring the philosophy of software, cybernetics, and typography.',
      client: 'Vesper Foundation',
      role: 'Art Director & Solo Developer',
      year: '2024',
      stack: ['Vanilla JavaScript', 'Hugo SSG', 'Variable Fonts', 'PWA'],
      overview: 'An independent quarterly publication dedicated to essays on software ergonomics, ethics, and typography. Built with zero runtime frameworks for instant reader page loads.',
      challenge: 'Creating a reading experience that rivals the tactile serenity of printed paperbacks across mobile and desktop displays.',
      outcome: 'Lighthouse score of 100/100 across Performance, Accessibility, and Best Practices with median page load under 120ms.',
      links: [
        { label: 'READ QUARTERLY ↗', url: '#writing' }
      ]
    },
    nullobject: {
      id: '06',
      title: 'Null Object Protocol',
      tagline: 'Open-source distributed state machine library designed for offline-first resilient architectures.',
      client: 'Open Source Initiative',
      role: 'Author & Core Maintainer',
      year: '2024',
      stack: ['Rust', 'WebAssembly', 'CRDTs', 'Node.js'],
      overview: 'A zero-dependency CRDT (Conflict-Free Replicated Data Type) engine written in Rust and compiled to WebAssembly for seamless cross-platform synchronization.',
      challenge: 'Guaranteeing strong eventual consistency across asymmetric network conditions with minimal memory footprint.',
      outcome: 'Adopted across decentralized notes and canvas apps with over 250,000 downloads and 4.2k GitHub stars.',
      links: [
        { label: 'SOURCE CODE ↗', url: 'https://github.com' }
      ]
    }
  };

  // -------------------------------------------------------------------------
  // 1. Monochrome Theme Management
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('marcelo-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('marcelo-theme', theme);
  };

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`MONOCHROME THEME: ${newTheme.toUpperCase()}`);
    });
  }

  // -------------------------------------------------------------------------
  // 2. Real-Time UTC / Local Clock Ticker
  // -------------------------------------------------------------------------
  const heroClock = document.getElementById('heroClock');
  const mobileClock = document.getElementById('mobileClock');

  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `LOCAL // ${hours}:${minutes}:${seconds}`;

    if (heroClock) heroClock.textContent = timeString;
    if (mobileClock) mobileClock.textContent = `TIME: ${hours}:${minutes}:${seconds}`;
  };

  updateClock();
  setInterval(updateClock, 1000);

  // -------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = (forceState) => {
    const isOpen = forceState !== undefined ? forceState : mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileMenu.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => toggleMobileMenu());
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(true));
    });
  }

  // -------------------------------------------------------------------------
  // 4. Custom Cursor Interaction
  // -------------------------------------------------------------------------
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const loop = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(loop);
    };
    loop();

    const interactiveSelectors = 'a, button, input, textarea, .project-card, .article-card, .table-row, .filter-btn';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
  }

  // -------------------------------------------------------------------------
  // 5. Work Filter & Category Tabs
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 6. View Switcher (Grid vs Table)
  // -------------------------------------------------------------------------
  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewListBtn = document.getElementById('viewListBtn');
  const projectsGrid = document.getElementById('projectsGrid');
  const projectsTable = document.getElementById('projectsTable');

  if (viewGridBtn && viewListBtn && projectsGrid && projectsTable) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      projectsGrid.style.display = 'grid';
      projectsTable.style.display = 'none';
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      projectsGrid.style.display = 'none';
      projectsTable.style.display = 'block';
    });
  }

  // -------------------------------------------------------------------------
  // 7. Project Modal / Detail Drawer
  // -------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalProjectIndex = document.getElementById('modalProjectIndex');
  const modalBody = document.getElementById('modalBody');

  const openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data) return;

    modalProjectIndex.textContent = `PROJECT SPECIFICATION // #${data.id}`;

    const stackBadgesHtml = data.stack
      .map(tech => `<span class="badge">${tech}</span>`)
      .join('');

    const actionLinksHtml = data.links
      .map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${link.label}</a>`)
      .join('');

    modalBody.innerHTML = `
      <h3 class="modal-project-title">${data.title}</h3>
      <p class="modal-project-tagline">${data.tagline}</p>

      <div class="modal-meta-grid">
        <div class="modal-meta-item">
          <span class="meta-label">CLIENT / INITIATIVE</span>
          <span class="meta-value">${data.client}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">ROLE & DISCIPLINE</span>
          <span class="meta-value">${data.role}</span>
        </div>
        <div class="modal-meta-item">
          <span class="meta-label">PERIOD / YEAR</span>
          <span class="meta-value">${data.year}</span>
        </div>
      </div>

      <div class="modal-content-section">
        <h4>01 // PROJECT OVERVIEW</h4>
        <p>${data.overview}</p>
      </div>

      <div class="modal-content-section">
        <h4>02 // TECHNICAL & DESIGN CHALLENGE</h4>
        <p>${data.challenge}</p>
      </div>

      <div class="modal-content-section">
        <h4>03 // OUTCOME & IMPACT</h4>
        <p>${data.outcome}</p>
      </div>

      <div class="modal-content-section">
        <h4>04 // TECHNOLOGIES & ARTIFACTS</h4>
        <div class="project-badges">
          ${stackBadgesHtml}
        </div>
      </div>

      <div class="modal-actions">
        ${actionLinksHtml}
        <button class="btn btn-secondary" id="modalDismissBtn">CLOSE INSPECTION</button>
      </div>
    `;

    document.getElementById('modalDismissBtn')?.addEventListener('click', closeProjectModal);

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Card triggers
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) openProjectModal(id);
    });
  });

  // Table row triggers
  document.querySelectorAll('.table-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      if (id) openProjectModal(id);
    });
  });

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        toggleMobileMenu(true);
      }
    }
  });

  // -------------------------------------------------------------------------
  // 8. Copy Email to Clipboard
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailToCopy = document.getElementById('emailToCopy');

  if (copyEmailBtn && emailToCopy) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailToCopy.textContent.trim();
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast(`COPIED TO CLIPBOARD: ${email.toUpperCase()}`);
        })
        .catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`COPIED: ${email.toUpperCase()}`);
        });
    });
  }

  // -------------------------------------------------------------------------
  // 9. Interactive Contact Form with Validation
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      // Clear errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      let hasError = false;

      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name or entity identifier required.';
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Contact email required.';
        hasError = true;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Project message or brief required.';
        hasError = true;
      }

      if (hasError) return;

      // Simulated Transmission
      submitBtn.disabled = true;
      const originalText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.querySelector('.btn-text').textContent = 'TRANSMITTING INQUIRY...';
      formStatus.textContent = 'DISPATCHING PACKET...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalText;
        contactForm.reset();
        formStatus.textContent = '✓ TRANSMISSION RECEIVED. WILL REPLY WITHIN 24H.';
        showToast('INQUIRY TRANSMITTED SUCCESSFULLY');
        
        setTimeout(() => {
          formStatus.textContent = '';
        }, 6000);
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 10. Toast Notification System
  // -------------------------------------------------------------------------
  let toastTimeout;
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // -------------------------------------------------------------------------
  // 11. Smooth Active Navigation Observer
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('main > section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text-primary)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // Console Easter Egg for Engineers
  console.log(
    '%c MARCELO // ARCHITECT & CREATIVE DEVELOPER \n%c Built with intentional restraint. No bloat. Pure clarity. \n Contact: hello@marcelo.design',
    'background: #000; color: #fff; font-family: monospace; font-size: 13px; padding: 6px 10px; font-weight: bold;',
    'background: #111; color: #888; font-family: monospace; font-size: 11px; padding: 4px 10px;'
  );
});
