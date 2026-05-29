/**
 * ============================================================
 *  Healthcare Data Analyst — Portfolio Website
 *  Production-ready Vanilla JavaScript
 *  Author: AlchymedSolutions
 * ============================================================
 *
 *  Modules (in initialization order):
 *   1.  Preloader
 *   2.  Theme Toggle (Dark / Light)
 *   3.  Navigation (hamburger, scroll class, active link)
 *   4.  Scroll Progress Bar
 *   5.  Typing Animation
 *   6.  Animated Counters
 *   7.  Skill Bar Animations
 *   8.  Scroll Reveal Animations
 *   9.  Project Filtering
 *  10.  GitHub API Integration
 *  11.  Back-to-Top Button
 *  12.  Contact Form Handling
 *  13.  Smooth Scroll for Anchor Links
 *  14.  Navbar Active State (Intersection Observer)
 *  15.  Particles / Floating Elements (Hero)
 *  16.  Visitor Counter
 *  17.  Download CV
 *  18.  Lazy Loading Images
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================
   *  1. PRELOADER
   * ========================================================== */
  const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    const dismiss = () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove();
      }, 500);
    };

    // If the window is already loaded (cached page), dismiss immediately
    if (document.readyState === 'complete') {
      setTimeout(dismiss, 1500);
    } else {
      window.addEventListener('load', () => {
        setTimeout(dismiss, 1500);
      });
    }
  };

  /* ==========================================================
   *  2. THEME TOGGLE (Dark / Light Mode)
   * ========================================================== */
  const initThemeToggle = () => {
    const toggleBtn = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    // Retrieve stored preference or default to 'dark'
    const storedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', storedTheme);
    updateToggleIcon(toggleBtn, storedTheme);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        // Smooth body transition for theme change
        document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';

        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateToggleIcon(toggleBtn, next);
      });
    }
  };

  /**
   * Update the toggle button icon based on the active theme.
   * Dark mode → show ☀️  (click to switch to light)
   * Light mode → show 🌙 (click to switch to dark)
   */
  function updateToggleIcon(btn, theme) {
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ==========================================================
   *  3. NAVIGATION
   * ========================================================== */
  const initNavigation = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.nav-links a');

    // --- Hamburger toggle ---
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }

    // --- Close mobile menu on link click ---
    links.forEach((link) => {
      link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
      });
    });

    // --- Navbar "scrolled" class ---
    if (navbar) {
      const onScroll = () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // evaluate on init
    }
  };

  /* ==========================================================
   *  4. SCROLL PROGRESS BAR
   * ========================================================== */
  const initScrollProgress = () => {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${percent}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  };

  /* ==========================================================
   *  5. TYPING ANIMATION
   * ========================================================== */
  const initTypingAnimation = () => {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const texts = [
      'Healthcare Data Analyst',
      'Data Scientist',
      'Healthcare Operations Specialist',
      'Business Intelligence Analyst',
      'Machine Learning Practitioner',
    ];

    const TYPE_SPEED = 100;   // ms per character
    const DELETE_SPEED = 50;  // ms per character
    const PAUSE = 2000;       // ms between words

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const current = texts[textIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = current.substring(0, charIndex);
      } else {
        charIndex++;
        el.textContent = current.substring(0, charIndex);
      }

      let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

      if (!isDeleting && charIndex === current.length) {
        // Finished typing — pause then delete
        delay = PAUSE;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting — move to next word
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 400; // small pause before typing next word
      }

      setTimeout(tick, delay);
    };

    tick();
  };

  /* ==========================================================
   *  6. ANIMATED COUNTERS
   * ========================================================== */
  const initCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    let animated = false;

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out deceleration: 1 - (1 - t)^3
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value + '+';

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + '+';
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            counters.forEach(animateCounter);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((c) => observer.observe(c));
  };

  /* ==========================================================
   *  7. SKILL BAR ANIMATIONS
   * ========================================================== */
  const initSkillBars = () => {
    const skillsSection = document.querySelector('.skills-categories');
    if (!skillsSection) return;

    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            const bars = skillsSection.querySelectorAll('.skill-progress');
            bars.forEach((bar) => bar.classList.add('animate'));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(skillsSection);
  };

  /* ==========================================================
   *  8. SCROLL REVEAL ANIMATIONS
   * ========================================================== */
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  };

  /* ==========================================================
   *  9. PROJECT FILTERING
   * ========================================================== */
  const initProjectFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn, [data-filter]');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const isMatch = filter === 'all' || category === filter;

          if (!isMatch) {
            // Hide non-matching
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          } else {
            // Show matching
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          }
        });
      });
    });
  };

  /* ==========================================================
   *  10. GITHUB API INTEGRATION
   * ========================================================== */
  const initGitHub = async () => {
    const GITHUB_USERNAME = 'AlchymedSolutions';
    const reposContainer = document.querySelector('.github-repos');
    const searchInput = document.querySelector('.github-search, #github-search');

    const LANGUAGE_COLORS = {
      HTML: '#e34c26',
      Python: '#3572A5',
      JavaScript: '#f1e05a',
      R: '#198CE7',
      'Jupyter Notebook': '#DA5B0B',
      CSS: '#563d7c',
      null: '#8b8b8b',
    };

    /**
     * Render a single repository card.
     */
    const createRepoCard = (repo) => {
      const card = document.createElement('div');
      card.className = 'repo-card';

      const langColor = LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS['null'];
      const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      card.innerHTML = `
        <h3 class="repo-name">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        </h3>
        <p class="repo-description">${repo.description || 'No description available.'}</p>
        <div class="repo-meta">
          <span class="repo-language">
            <span class="language-dot" style="background-color:${langColor}"></span>
            ${repo.language || 'Unknown'}
          </span>
          <span class="repo-stars">⭐ ${repo.stargazers_count}</span>
          <span class="repo-forks">🍴 ${repo.forks_count}</span>
          <span class="repo-updated">📅 ${updatedDate}</span>
        </div>
      `;

      return card;
    };

    try {
      // Fetch user data and repos in parallel
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error('GitHub API responded with an error');
      }

      const userData = await userRes.json();
      const repos = await reposRes.json();

      // --- Update profile stats ---
      const reposCountEl = document.querySelector('.github-repos-count, #github-repos');
      const followersEl = document.querySelector('.github-followers, #github-followers');
      const followingEl = document.querySelector('.github-following, #github-following');
      const starsEl = document.querySelector('.github-stars, #github-stars');

      if (reposCountEl) reposCountEl.textContent = userData.public_repos;
      if (followersEl) followersEl.textContent = userData.followers;
      if (followingEl) followingEl.textContent = userData.following;

      // Calculate total stars
      const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
      if (starsEl) starsEl.textContent = totalStars;

      // --- Render repo cards ---
      if (reposContainer) {
        reposContainer.innerHTML = '';
        repos.forEach((repo) => {
          reposContainer.appendChild(createRepoCard(repo));
        });
      }

      // --- Search / filter repos ---
      if (searchInput && reposContainer) {
        searchInput.addEventListener('input', (e) => {
          const query = e.target.value.toLowerCase().trim();
          const cards = reposContainer.querySelectorAll('.repo-card');

          cards.forEach((card) => {
            const name = card.querySelector('.repo-name')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.repo-description')?.textContent.toLowerCase() || '';
            const lang = card.querySelector('.repo-language')?.textContent.toLowerCase() || '';
            const matches = name.includes(query) || desc.includes(query) || lang.includes(query);
            card.style.display = matches ? '' : 'none';
          });
        });
      }
    } catch (err) {
      console.error('GitHub API Error:', err);
      if (reposContainer) {
        reposContainer.innerHTML = `
          <div class="github-error">
            <p>⚠️ Unable to load GitHub repositories at this time.</p>
            <p>Please visit <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">my GitHub profile</a> directly.</p>
          </div>
        `;
      }
    }
  };

  /* ==========================================================
   *  11. BACK TO TOP BUTTON
   * ========================================================== */
  const initBackToTop = () => {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  /* ==========================================================
   *  12. CONTACT FORM HANDLING
   * ========================================================== */
  const initContactForm = () => {
    const form = document.querySelector('.contact-form, #contact-form');
    if (!form) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameField = form.querySelector('[name="name"], #name');
      const emailField = form.querySelector('[name="email"], #email');
      const subjectField = form.querySelector('[name="subject"], #subject');
      const messageField = form.querySelector('[name="message"], #message');
      const submitBtn = form.querySelector('[type="submit"], .submit-btn');
      const formStatus = form.querySelector('.form-status') || document.querySelector('.form-status');

      const name = nameField?.value.trim() ?? '';
      const email = emailField?.value.trim() ?? '';
      const subject = subjectField?.value.trim() ?? '';
      const message = messageField?.value.trim() ?? '';

      // Clear previous status
      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }

      // --- Validation ---
      if (!name || !email || !subject || !message) {
        showFormStatus(formStatus, 'Please fill in all required fields.', 'error');
        return;
      }

      if (!emailRegex.test(email)) {
        showFormStatus(formStatus, 'Please enter a valid email address.', 'error');
        return;
      }

      // --- Loading state ---
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
      }

      // Simulate submission (no backend)
      setTimeout(() => {
        showFormStatus(formStatus, '✅ Message sent successfully! I will get back to you soon.', 'success');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Send Message';
        }

        // Reset form after 3s
        setTimeout(() => {
          form.reset();
          if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }
        }, 3000);
      }, 1500);
    });
  };

  /**
   * Helper: display form status message.
   */
  function showFormStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `form-status ${type}`;
  }

  /* ==========================================================
   *  13. SMOOTH SCROLL FOR ANCHOR LINKS
   * ========================================================== */
  const initSmoothScroll = () => {
    const navbar = document.querySelector('.navbar');

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      });
    });
  };

  /* ==========================================================
   *  14. NAVBAR ACTIVE STATE (Intersection Observer)
   * ========================================================== */
  const initNavbarActiveState = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length === 0 || navLinks.length === 0) return;

    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      {
        rootMargin: `-${navbarHeight}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  /* ==========================================================
   *  15. PARTICLES / FLOATING ELEMENTS (Hero Section)
   * ========================================================== */
  const initParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const PARTICLE_COUNT = 30;

    // Inject keyframes once
    if (!document.getElementById('particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes floatParticle {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(var(--drift)); opacity: 0; }
        }
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: currentColor;
          opacity: 0;
          animation: floatParticle var(--duration) var(--delay) infinite ease-in-out;
          z-index: 0;
        }
      `;
      document.head.appendChild(style);
    }

    // Ensure hero has relative/absolute positioning for particles
    const heroPosition = getComputedStyle(hero).position;
    if (heroPosition === 'static') {
      hero.style.position = 'relative';
    }
    hero.style.overflow = 'hidden';

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const dot = document.createElement('span');
      dot.className = 'hero-particle';

      const size = Math.random() * 4 + 2; // 2–6px
      const left = Math.random() * 100;    // 0–100%
      const top = Math.random() * 100;     // start position
      const duration = Math.random() * 8 + 4; // 4–12s
      const delay = Math.random() * 6;    // stagger
      const drift = (Math.random() - 0.5) * 80; // horizontal drift

      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: ${top}%;
        --duration: ${duration}s;
        --delay: ${delay}s;
        --drift: ${drift}px;
      `;

      hero.appendChild(dot);
    }
  };

  /* ==========================================================
   *  16. VISITOR COUNTER
   * ========================================================== */
  const initVisitorCounter = () => {
    const KEY = 'portfolio_visit_count';
    let count = parseInt(localStorage.getItem(KEY), 10) || 0;
    count++;
    localStorage.setItem(KEY, count);

    // Render in a dedicated element if present
    const counterEl = document.querySelector('.visitor-count, #visitor-count');
    if (counterEl) {
      counterEl.textContent = count;
    }
  };

  /* ==========================================================
   *  17. DOWNLOAD CV
   * ========================================================== */
  const initDownloadCV = () => {
    const btn = document.getElementById('downloadCV');
    if (!btn) return;

    btn.addEventListener('click', () => {
      console.log('CV download triggered.');
    });
  };

  /* ==========================================================
   *  18. LAZY LOADING IMAGES
   * ========================================================== */
  const initLazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');

            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });

            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '100px' }
    );

    images.forEach((img) => observer.observe(img));
  };

  /* ==========================================================
   *  INITIALIZATION — launch every module
   * ========================================================== */
  initPreloader();
  initThemeToggle();
  initNavigation();
  initScrollProgress();
  initTypingAnimation();
  initCounters();
  initSkillBars();
  initScrollReveal();
  initProjectFilters();
  initBackToTop();
  initContactForm();
  initSmoothScroll();
  initNavbarActiveState();
  initParticles();
  initVisitorCounter();
  initDownloadCV();
  initLazyLoad();

  // GitHub API call wrapped in try/catch
  try {
    initGitHub();
  } catch (err) {
    console.error('GitHub initialization failed:', err);
  }
});
