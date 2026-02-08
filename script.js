/* ============================================================
   AIGUISE TON ESPRIT — Script
   Language switcher (FR/DE), navbar, scroll reveal, form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Language Switcher --------------------------------
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'fr';

    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        // Update all elements with data-fr / data-de
        document.querySelectorAll('[data-fr]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text !== null) {
                el.innerHTML = text;
            }
        });

        // Update select options
        document.querySelectorAll('select option[data-fr]').forEach(opt => {
            const text = opt.getAttribute(`data-${lang}`);
            if (text !== null) {
                opt.textContent = text;
            }
        });

        // Update page title
        const titles = {
            fr: 'Aiguise ton Esprit — Anthony Erdevik | Psychologue du sport en Allemagne',
            de: 'Schärfe deinen Geist — Anthony Erdevik | Sportpsychologe in Deutschland'
        };
        document.title = titles[lang] || titles.fr;

        // Update active button
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update logo text
        const logoName = {
            fr: 'Aiguise ton Esprit',
            de: 'Schärfe deinen Geist'
        };
        document.querySelectorAll('.nav-logo').forEach(logo => {
            logo.innerHTML = `<img src="logo.png" alt="${logoName[lang]}" class="logo-img"> <span class="logo-text">${logoName[lang]}</span>`;
        });

        // Update footer brand
        document.querySelectorAll('.footer-col--brand .footer-brand').forEach(brand => {
            brand.innerHTML = `<img src="logo.png" alt="${logoName[lang]}" class="footer-logo-img"> <span>${logoName[lang]}</span>`;
        });

        // Update page title for SEO
        const metaDesc = {
            fr: 'Anthony Erdevik, psychologue spécialisé en performance sportive en Allemagne. Préparation mentale pour sportifs et entraîneurs : confiance, gestion du stress, leadership. Séances en français et allemand.',
            de: 'Anthony Erdevik, Sportpsychologe in Deutschland. Mentale Vorbereitung für Sportler und Trainer: Selbstvertrauen, Stressmanagement, Führung. Sitzungen auf Französisch und Deutsch.'
        };
        const descMeta = document.querySelector('meta[name=\"description\"]');
        if (descMeta) descMeta.setAttribute('content', metaDesc[lang] || metaDesc.fr);
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    // ---- Navbar scroll effect ----------------------------
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Mobile menu toggle ------------------------------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Animate hamburger icon
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // ---- Smooth scrolling for anchor links ----------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ---- Scroll Reveal Animation -------------------------
    const revealElements = document.querySelectorAll(
        '.service-card, .facet-card, .contact-item, .intro-text, ' +
        '.service-header, .service-method, .about-intro, .about-conclusion'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Active nav link on scroll -----------------------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---- Contact Form (basic front-end handler) ----------
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple validation visual
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;

        btn.textContent = currentLang === 'fr' ? 'Envoyé ✓' : 'Gesendet ✓';
        btn.style.background = 'linear-gradient(135deg, var(--blue), var(--blue-light))';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            form.reset();
        }, 2500);

        console.log('Form submitted:', data);
    });

    // ---- Hamburger animation CSS inject ------------------
    const style = document.createElement('style');
    style.textContent = `
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        .nav-link.active-link {
            color: var(--orange) !important;
        }
    `;
    document.head.appendChild(style);
});
