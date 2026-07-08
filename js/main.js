document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '2340000000000'; // placeholder — replace with real number

  /* ===== NAV TOGGLE ===== */
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');

  navToggle.addEventListener('click', () => {
    const isOpen = navOverlay.classList.toggle('active');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  /* ===== HERO BG FADE-IN ===== */
  const heroBg = document.getElementById('heroBg');
  setTimeout(() => heroBg.classList.add('visible'), 800);

  /* ===== CURSOR PREVIEW (Selected Works hover) ===== */
  const cursorPreview = document.getElementById('cursorPreview');
  const cursorPreviewImg = document.getElementById('cursorPreviewImg');
  const worksItems = document.querySelectorAll('.works-item');
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (!isTouch) {
    worksItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        cursorPreviewImg.src = item.dataset.preview;
        cursorPreview.classList.add('active');
      });
      item.addEventListener('mousemove', (e) => {
        cursorPreview.style.left = (e.clientX + 24) + 'px';
        cursorPreview.style.top = (e.clientY - 60) + 'px';
      });
      item.addEventListener('mouseleave', () => {
        cursorPreview.classList.remove('active');
      });
    });
  }

  /* ===== SCROLL REVEAL ===== */
  const revealTargets = document.querySelectorAll(
    '.works-item, .material-item, .faq-item, .philosophy-text, .philosophy-scroll img'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ===== STEPPER (Process) ===== */
  const steps = document.querySelectorAll('.step');
  const stepperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const stepEl = entry.target;
      if (entry.isIntersecting) {
        steps.forEach(s => s.classList.remove('active'));
        stepEl.classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  steps.forEach(step => stepperObserver.observe(step));

  /* ===== TESTIMONIAL CARD STACK ===== */
  const voiceCards = document.querySelectorAll('.voice-card');
  const voicePrev = document.getElementById('voicePrev');
  const voiceNext = document.getElementById('voiceNext');
  let currentVoice = 0;

  function showVoice(index) {
    voiceCards.forEach(c => c.classList.remove('active'));
    currentVoice = (index + voiceCards.length) % voiceCards.length;
    voiceCards[currentVoice].classList.add('active');
  }

  voiceNext.addEventListener('click', () => showVoice(currentVoice + 1));
  voicePrev.addEventListener('click', () => showVoice(currentVoice - 1));

  // Swipe support
  const voicesStack = document.getElementById('voicesStack');
  let touchStartX = 0;

  voicesStack.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  voicesStack.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? showVoice(currentVoice + 1) : showVoice(currentVoice - 1);
    }
  }, { passive: true });

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ===== ENQUIRY FORM → WHATSAPP ===== */
  const enquireForm = document.getElementById('enquireForm');
  enquireForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fName').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const type = document.getElementById('fType').value;
    const budget = document.getElementById('fBudget').value;
    const message = document.getElementById('fMessage').value.trim();

    const text =
      `New Enquiry — Monolith Studio%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      (email ? `Email: ${encodeURIComponent(email)}%0A` : '') +
      `Project Type: ${encodeURIComponent(type)}%0A` +
      `Budget: ${encodeURIComponent(budget)}%0A` +
      (message ? `Message: ${encodeURIComponent(message)}` : '');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  });

});