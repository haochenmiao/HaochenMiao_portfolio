/**
* Template Name: Personal
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash);
    if (section) {
      e.preventDefault();

      let navbar = select('#navbar');
      let header = select('#header');
      let sections = select('section', true);
      let navlinks = select('#navbar .nav-link', true);

      navlinks.forEach((item) => {
        item.classList.remove('active');
      });

      this.classList.add('active');

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top');
        sections.forEach((item) => {
          item.classList.remove('section-show');
        });
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          section.classList.add('section-show');
        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show');
        });
        section.classList.add('section-show');
      }

      scrollto(this.hash);
    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select('#header');
        let navlinks = select('#navbar .nav-link', true);

        header.classList.add('header-top');

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        setTimeout(function() {
          initial_nav.classList.add('section-show');
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let roleFilter = '*';
      let typeFilter = '*';

      // Role and type filters combine with AND: ".role-ds" + ".type-dashboard" -> ".role-ds.type-dashboard"
      const combinedFilter = () => {
        if (roleFilter === '*') return typeFilter;
        if (typeFilter === '*') return roleFilter;
        return roleFilter + typeFilter;
      };

      const setActive = (row, item) => {
        select(row + ' li', true).forEach(function(el) {
          el.classList.remove('filter-active');
        });
        item.classList.add('filter-active');
      };

      on('click', '#portfolio-roles li', function(e) {
        e.preventDefault();
        setActive('#portfolio-roles', this);
        roleFilter = this.getAttribute('data-filter');
        portfolioIsotope.arrange({
          filter: combinedFilter()
        });
      }, true);

      on('click', '#portfolio-types li', function(e) {
        e.preventDefault();
        setActive('#portfolio-types', this);
        typeFilter = this.getAttribute('data-filter');
        portfolioIsotope.arrange({
          filter: combinedFilter()
        });
      }, true);
    }

  });



  /**
   * Portfolio card slideshows: cycle .slide/.dot every 3.2s, staggered start, pause on hover
   */
  window.addEventListener('load', () => {
    select('.portfolio-slides', true).forEach((deck) => {
      let slides = deck.querySelectorAll('.slide');
      let dots = deck.querySelectorAll('.dot');
      if (slides.length < 2) return;

      let current = 0;
      let paused = false;
      let card = deck.closest('.portfolio-wrap') || deck;
      card.addEventListener('mouseenter', () => paused = true);
      card.addEventListener('mouseleave', () => paused = false);

      const advance = () => {
        if (paused) return;
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
      };

      setTimeout(() => setInterval(advance, 3200), Math.random() * 2000);
    });
  });

  /**
   * Portfolio-details tabs: scoped to .portfolio-details, with deep-link + lazy iframes
   */
  window.addEventListener('load', () => {
    let detail = select('.portfolio-details');
    if (!detail) return;
    let tabs = detail.querySelectorAll('.st-tab');
    let panels = detail.querySelectorAll('.st-panel');
    if (!tabs.length) return;

    const activate = (name, updateHash) => {
      let panel = detail.querySelector('.st-panel[data-panel="' + name + '"]');
      let tab = detail.querySelector('.st-tab[data-tab="' + name + '"]');
      if (!panel || !tab) return false;

      tabs.forEach((el) => el.classList.remove('active'));
      panels.forEach((el) => el.classList.remove('active'));
      tab.classList.add('active');
      panel.classList.add('active');

      // Lazy-load iframes the first time their tab is opened
      panel.querySelectorAll('iframe[data-src]').forEach((frame) => {
        frame.src = frame.getAttribute('data-src');
        frame.removeAttribute('data-src');
      });

      if (updateHash) {
        history.replaceState(null, '', '#' + name);
      }
      return true;
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        activate(tab.getAttribute('data-tab'), true);
      });
    });

    // Deep-link: activate the tab named by the hash on load, if any
    if (location.hash) {
      activate(location.hash.slice(1), false);
    }
  });

  /**
   * Florida Flood (Cape Coral) detail: 2D/3D view switch with lazy iframe loading
   */
  window.addEventListener('load', () => {
    let detail = select('.ff-detail');
    if (!detail) return;

    let shells = {
      '2d': detail.querySelector('.ff-iframe-shell[data-view="2d"]'),
      '3d': detail.querySelector('.ff-iframe-shell[data-view="3d"]')
    };
    if (!shells['2d'] || !shells['3d']) return;

    let urls = {
      '2d': shells['2d'].querySelector('iframe').getAttribute('data-src'),
      '3d': shells['3d'].querySelector('iframe').getAttribute('data-src')
    };

    // Guard: refuse to wire up anything if the live URLs are still placeholders
    let placeholder = (u) => !u || /REPLACE_WITH_LIVE/.test(u);
    if (placeholder(urls['2d']) || placeholder(urls['3d'])) {
      console.warn('ff-detail: live URL(s) not filled in — disabling view switch and live links');
      detail.querySelectorAll('.ff-view, .btn-ff[data-live]').forEach((el) => {
        el.setAttribute('disabled', '');
        if (el.tagName === 'A') { el.style.pointerEvents = 'none'; el.style.opacity = '0.5'; }
      });
      return;
    }

    // Keep the "Open live map" buttons pointed at the single source of truth
    detail.querySelectorAll('.btn-ff[data-live]').forEach((btn) => {
      let view = btn.getAttribute('data-live');
      if (urls[view]) btn.setAttribute('href', urls[view]);
    });

    // Load the 2D iframe straight away so it's warm when the user looks at the map
    const loadInto = (shell) => {
      let frame = shell.querySelector('iframe');
      if (frame && !frame.getAttribute('src')) {
        frame.setAttribute('src', frame.getAttribute('data-src'));
      }
    };
    loadInto(shells['2d']);

    detail.querySelectorAll('.ff-view').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let view = btn.getAttribute('data-view');
        if (!shells[view]) return;

        detail.querySelectorAll('.ff-view').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        Object.keys(shells).forEach((k) => {
          if (k === view) shells[k].removeAttribute('hidden');
          else shells[k].setAttribute('hidden', '');
        });

        loadInto(shells[view]);
      });
    });
  });

  /**
   * Portfolio slider
   */
  document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.portfolio-slider', {
      loop: true, // Enable infinite looping
      autoplay: {
        delay: 3000, // Auto-slide every 3 seconds
        disableOnInteraction: false, // Keep autoplay after interaction
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });


  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()