/**
 * MUHAMMAD FAZARULLAH - PORTFOLIO INTERACTION SCRIPT
 * Handles Typewriter animation, scroll interactions, project filtering,
 * navigation scroll spy, and WhatsApp form integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. Typewriter Animation in Hero Section
     -------------------------------------------------------------------------- */
  const typeTextElement = document.getElementById('type-text');
  const roles = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Data Analysis',
    'Data Visualization'

  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseDuration = 1800;

  function typeEffect() {
    if (!typeTextElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typeTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, pauseDuration);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }

    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(typeEffect, currentSpeed);
  }

  typeEffect();

  /* --------------------------------------------------------------------------
     2. Navigation Menu & Mobile Drawer
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileMenu = () => {
    navMenu?.classList.add('open');
    navOverlay?.classList.add('active');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    navMenu?.classList.remove('open');
    navOverlay?.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  // Toggle mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', openMobileMenu);
  }

  // Close mobile menu
  if (navClose) {
    navClose.addEventListener('click', closeMobileMenu);
  }

  // Close on overlay backdrop tap
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on nav-link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     3. Scroll Spy, Progress Bar & Header Shadow
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header Background on Scroll
    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Progress Bar
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Back to Top Visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Scroll Spy for active navigation link
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        targetNavLink?.classList.add('active');
      }
    });
  });

  // Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Animated Counter for Stats
     -------------------------------------------------------------------------- */
  let statsCounted = false;
  const statNumbers = document.querySelectorAll('.stat-number');

  function runStatsCounter() {
    if (statsCounted) return;

    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-count');
      let current = 0;
      const increment = target > 500 ? 25 : 1;
      const stepTime = target > 500 ? 15 : 60;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = current;
        }
      }, stepTime);
    });

    statsCounted = true;
  }

  // Trigger stats counter on initial load
  setTimeout(runStatsCounter, 500);

  /* --------------------------------------------------------------------------
     5. Projects Filtering
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     6. Contact Form & WhatsApp Integration
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    const btnSubmit = document.getElementById('btn-submit');
    const btnSendWa = document.getElementById('btn-send-wa');

    // Handle Direct Email Submission via PHP
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        showToast('Harap lengkapi semua kolom yang wajib diisi.', false);
        return;
      }

      // Set Loading State on Submit Button
      const originalBtnHTML = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim pesan...</span>';

      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('message', message);

        const response = await fetch('send_mail.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.status === 'success') {
          showToast(data.message || 'Pesan Anda berhasil dikirim ke email kami!', true);
          contactForm.reset();
        } else {
          showToast(data.message || 'Gagal mengirim email.', false);
        }
      } catch (err) {
        console.error('Error sending message:', err);
        showToast('Terjadi kesalahan koneksi saat mengirim email.', false);
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnHTML;
      }
    });

    // Handle Send via WhatsApp Option
    if (btnSendWa) {
      btnSendWa.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
          showToast('Harap isi Nama, Email, dan Pesan terlebih dahulu.', false);
          return;
        }

        const waPhoneNumber = '6281271329220';
        const formattedText =
`*Pesan Baru dari Website Portofolio:*
━━━━━━━━━━━━━━━━━━━━
*Nama:* ${name}
*Email:* ${email}
*Subjek:* ${subject || 'Inquiry'}
━━━━━━━━━━━━━━━━━━━━
*Pesan:*
${message}
━━━━━━━━━━━━━━━━━━━━`;

        const encodedUrl = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(formattedText)}`;
        showToast('Membuka WhatsApp dengan pesan Anda...', true);
        window.open(encodedUrl, '_blank');
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. Dynamic Certificate Lightbox Modal Controller
     -------------------------------------------------------------------------- */
  const certModal = document.getElementById('cert-modal');
  const certModalBackdrop = document.getElementById('cert-modal-backdrop');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalImg = document.getElementById('modal-cert-img');
  const certModalTitle = document.getElementById('modal-cert-title');
  const certModalIssuer = document.getElementById('modal-cert-issuer');
  const certModalDownload = document.getElementById('modal-cert-download');

  const openCertModal = (trigger) => {
    if (!certModal) return;
    const imgUrl = trigger.getAttribute('data-cert-img');
    const title = trigger.getAttribute('data-cert-title');
    const issuer = trigger.getAttribute('data-cert-issuer');
    const pdfUrl = trigger.getAttribute('data-cert-pdf');

    if (certModalImg && imgUrl) certModalImg.src = imgUrl;
    if (certModalTitle && title) certModalTitle.textContent = title;
    if (certModalIssuer && issuer) certModalIssuer.textContent = issuer;
    if (certModalDownload) {
      if (pdfUrl) {
        certModalDownload.href = pdfUrl;
        certModalDownload.style.display = 'inline-flex';
      } else {
        certModalDownload.style.display = 'none';
      }
    }

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Event Delegation: Any certificate preview button triggers modal automatically
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-view-cert');
    if (trigger) {
      e.preventDefault();
      openCertModal(trigger);
    }
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal?.classList.contains('open')) {
      closeCertModal();
    }
  });
});

