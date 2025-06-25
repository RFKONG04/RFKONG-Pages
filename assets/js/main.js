document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    initNavigation();
    initContactForm();
    initSmartVideoBackground();
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        initLoadingAnimation(loadingScreen);
    } else {
        initPageEntryAnimations();
        initScrollTriggeredAnimations();
    }
});
function initLoadingAnimation(screenElement) {
    const loadingTimeline = gsap.timeline();
    loadingTimeline
        .to('.loading-logo', { duration: 1.2, scale: 1.05, opacity: 1, ease: 'power2.out' })
        .to('.loading-logo', { delay: 1, duration: 0.6, scale: 0.8, opacity: 0, ease: 'power2.in' })
        .to(screenElement, {
            duration: 0.8, opacity: 0, ease: 'cubic-bezier(0.7, 0, 0.3, 1)',
            onComplete: () => {
                screenElement.remove();
                initPageEntryAnimations();
                initScrollTriggeredAnimations();
            }
        }, "-=0.2");
}
function initPageEntryAnimations() {
    const entryTimeline = gsap.timeline({ delay: 0.2 });
    if (document.querySelector('.hero')) {
        entryTimeline
            .from('.hero-title .title-line', { duration: 1, y: 100, opacity: 0, stagger: 0.2, ease: 'power3.out' })
            .from('.hero-subtitle', { duration: 0.8, y: 50, opacity: 0, ease: 'power3.out' }, "-=0.7")
            .from('.hero-visual', { duration: 1.2, opacity: 0, scale: 0.95, ease: 'power3.out' }, "-=0.8")
            .from('.scroll-indicator', { duration: 1, opacity: 0, y: -30, ease: 'power3.out' }, "-=0.5");
    }
    if (document.querySelector('body > #about.about')) {
        entryTimeline
            .from('#about .section-header > *', { duration: 0.8, y: 40, opacity: 0, stagger: 0.2, ease: 'power2.out' })
            .from('.about-content > .about-text', { duration: 1, x: -50, opacity: 0, ease: 'power3.out' }, "-=0.5")
            .from('.about-content > .about-stats', { duration: 1, x: 50, opacity: 0, ease: 'power3.out' }, "<");
    }
}
function initScrollTriggeredAnimations() {
    gsap.utils.toArray('section:not(:first-of-type) .section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
            y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out'
        });
    });
    gsap.utils.toArray('.service-card, .project-card, .contact-item, .team-member').forEach(element => {
        gsap.from(element, {
            scrollTrigger: { trigger: element, start: 'top 90%', toggleActions: 'play none none none' },
            y: 60, opacity: 0, duration: 1, ease: 'power3.out'
        });
    });
    gsap.utils.toArray('.stat-number, #about .about-stats .stat-item h4').forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\+|%/g, ''));
        if (isNaN(target)) return;
        const suffix = counter.textContent.includes('%') ? '%' : '+';
        const stat = { val: 0 };
        gsap.to(stat, {
            val: target,
            scrollTrigger: { trigger: counter, start: 'top 90%', toggleActions: 'play none none none' },
            duration: 2, ease: 'power2.out',
            onUpdate: () => { counter.textContent = Math.ceil(stat.val) + suffix; }
        });
    });
}
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll', isActive);
    });
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: targetSection, offsetY: 70 },
                        ease: 'power2.inOut'
                    });
                }
            }
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
    gsap.utils.toArray('section[id]').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href$="#${section.id}"]`);
                if (self.isActive && activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    });
}
function initSmartVideoBackground() {
    const video = document.getElementById('hero-video');
    const heroBackground = document.querySelector('.hero-background');
    const heroContainer = document.querySelector('.hero-container');
    if (!video || !heroBackground || !heroContainer) {
        if (heroBackground) {
            heroBackground.classList.add('fallback-aurora');
        }
        return;
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = 10;
    canvas.height = 10;
    function analyzeVideoColor() {
        if (video.paused || video.ended) {
            return;
        }
        try {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            let r = 0, g = 0, b = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
            }
            const pixelCount = imageData.length / 4;
            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            if (luminance < 0.5) {
                heroContainer.classList.add('light-text');
            } else {
                heroContainer.classList.remove('light-text');
            }
        } catch (error) {
            console.error("Could not analyze video color:", error);
            heroContainer.classList.add('light-text');
        }
    }
    const videoCanPlay = new Promise((resolve) => {
        video.addEventListener('canplay', () => resolve(true), { once: true });
        video.addEventListener('error', () => resolve(false), { once: true });
    });
    const timeout = new Promise((resolve) => setTimeout(() => resolve(false), 3000));
    Promise.race([videoCanPlay, timeout]).then((canPlay) => {
        if (canPlay) {
            console.log('Video background loaded.');
            const analysisInterval = setInterval(analyzeVideoColor, 250);
            video.addEventListener('ended', () => {
                console.log('Video has ended, pausing on the last frame.超凡如风科技');
                clearInterval(analysisInterval);
                analyzeVideoColor();
            }, { once: true });
        } else {
            console.log('Video background failed. Activating fallback.');
            heroBackground.classList.add('fallback-aurora');
            const overlay = document.querySelector('.hero-video-overlay');
            if (video) video.remove();
            if (overlay) overlay.remove();
            if (heroContainer)
                heroContainer.style.setProperty('--dynamic-subtitle-color', 'rgba(255, 255, 255, 0.8)');
            heroContainer.style.setProperty('--dynamic-button-color', 'var(--white-color)');
            heroContainer.style.setProperty('--dynamic-button-border', 'var(--white-color)');
        }
    });
}
function initContactForm() {
}
function showNotification(message, type = 'info') {
}
//@RFKONG 2025 JS