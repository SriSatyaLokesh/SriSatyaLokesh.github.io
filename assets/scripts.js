/* ============================================
   Satya K - Lead Engineer
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Prevent auto-scroll/jump on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // ============================================
    // -1. TOUCH DETECTION
    // ============================================
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    if (isTouch) {
        document.body.classList.add('is-touch');
    }

    // ============================================
    // 0. LOGO NUMBER COUNTER REVOLVE EFFECT
    // ============================================
    const logoLink = document.querySelector('.nav-logo a');
    if (logoLink) {
        const originalText = "I'M  SATYA  K";
        const digits = "0123456789";
        let logoInterval = null;

        logoLink.addEventListener('mouseenter', () => {
            if (logoInterval) clearInterval(logoInterval);
            let iterations = 0;
            logoInterval = setInterval(() => {
                logoLink.innerHTML = originalText.split("")
                    .map((char, index) => {
                        if (index < iterations || char === " ") return char;
                        const randomDigit = digits[Math.floor(Math.random() * 10)];
                        return `<span class="logo-digit">${randomDigit}</span>`;
                    })
                    .join("");

                if (iterations >= originalText.length) {
                    clearInterval(logoInterval);
                    logoLink.innerText = originalText;
                }
                iterations += 1 / 3;
            }, 30);
        });

        logoLink.addEventListener('mouseleave', () => {
            if (logoInterval) clearInterval(logoInterval);
            logoLink.innerText = originalText;
        });
    }


    // ============================================
    // 0b. VANTA FOG BACKGROUND
    // ============================================
    let vantaEffect = null;
    function initVanta(theme = 'dark') {
        if (typeof VANTA !== 'undefined') {
            if (vantaEffect) vantaEffect.destroy();

            if (theme === 'dark') {
                vantaEffect = VANTA.FOG({
                    el: '#home',
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x3a1200,
                    midtoneColor: 0x1a0800,
                    lowlightColor: 0x000000,
                    baseColor: 0x000000,
                    blurFactor: 0.95,
                    speed: 2.90,
                    zoom: 1.60,
                });
            } else {
                vantaEffect = VANTA.FOG({
                    el: '#home',
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0xe88a2d,
                    midtoneColor: 0xffffff,
                    lowlightColor: 0xea9300,
                    baseColor: 0xffebeb,
                    blurFactor: 0.56,
                    speed: 1.7,
                    zoom: 0.8,
                });
            }
        }
    }

    // ============================================
    // 0c. THEME MANAGEMENT (LIGHT/DARK MODE)
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        initVanta('light');
    } else {
        initVanta('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.toggle('light-mode');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            initVanta(newTheme);
        });
    }

    // ============================================
    // 1. LENIS SMOOTH SCROLL INITIALIZATION
    // ============================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical',
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { duration: 1.5 });
            }
        });
    });

    // ============================================
    // 2. CUSTOM CURSOR WITH LAG (GSAP)
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    const heroText = document.querySelector('.massive-text');

    // QuickSetter for performance
    const xTo = gsap.quickTo(cursor, "left", { duration: 0.1, ease: "power3" }),
        yTo = gsap.quickTo(cursor, "top", { duration: 0.1, ease: "power3" });

    const blurXTo = gsap.quickTo(cursorBlur, "left", { duration: 0.4, ease: "power2" }),
        blurYTo = gsap.quickTo(cursorBlur, "top", { duration: 0.4, ease: "power2" });

    window.addEventListener("mousemove", e => {
        if (isTouch) return;
        xTo(e.clientX);
        yTo(e.clientY);
        blurXTo(e.clientX);
        blurYTo(e.clientY);

        // Update Hero Reveal Mask
        if (heroText) {
            const rect = heroText.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * 100;
            const relY = ((e.clientY - rect.top) / rect.height) * 100;

            // Set CSS Variable for clip-path or update property directly
            heroText.style.setProperty('--mask-x', `${relX}%`);
            heroText.style.setProperty('--mask-y', `${relY}%`);
        }
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, .timeline-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!el.classList.contains('resume-no-expand')) {
                gsap.to(cursor, { scale: 4, backgroundColor: 'rgba(255, 92, 0, 0.2)', duration: 0.3 });
                gsap.to(cursorBlur, { scale: 1.5, opacity: 0.3, duration: 0.3 });
            }
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: '#FF5C00', duration: 0.3 });
            gsap.to(cursorBlur, { scale: 1, opacity: 1, duration: 0.3 });
        });
    });

    // ============================================
    // 3. HERO REVEAL MOUSE INTERACTION
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroLayers = document.querySelector('.hero-layers-wrapper');
    const revealLayer = document.querySelector('.reveal-layer');
    const mainLayer = document.querySelector('.main-layer');

    if (heroSection && heroLayers && revealLayer && mainLayer) {
        heroSection.addEventListener('mousemove', (e) => {
            if (isTouch) return;
            const rect = heroLayers.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            // Updated selectors to new layer-based structure (200px circle)
            [revealLayer, mainLayer].forEach(layer => {
                layer.style.setProperty('--mask-size', '200px');
                layer.style.setProperty('--mask-pos-x', relX + 'px');
                layer.style.setProperty('--mask-pos-y', relY + 'px');
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            [revealLayer, mainLayer].forEach(el => {
                el.style.setProperty('--mask-size', '0px');
            });
        });

        // Initialize mask-size for touch (hidden)
        if (isTouch) {
            heroReveal.style.setProperty('--mask-size', '0px');
            heroMain.style.setProperty('--mask-size', '0px');
            heroMain.style.setProperty('-webkit-mask-image', 'none');
            heroMain.style.setProperty('mask-image', 'none');
        }
    }

    // ============================================
    // 0.5 MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('nav-open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('nav-open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('nav-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // 4. SCROLL ANIMATIONS (GSAP + ScrollTrigger)
    // ============================================
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // About pillars stagger
    gsap.from('.about-pillar', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 70%'
        }
    });

    // Timeline items reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        gsap.from(item, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            }
        });
    });

    // ============================================
    // 5. EXPERIENCE SECTION (Expand/Collapse + Scroll Reveal)
    // ============================================

    // Expand/Collapse toggle for experience details (GSAP animated)
    window.toggleExp = function (btn) {
        const details = btn.previousElementSibling;
        const isExpanded = btn.classList.contains('active');

        if (isExpanded) {
            // Collapse: fade out items then shrink
            const items = details.querySelectorAll('li, .exp-env');
            gsap.to(items, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                stagger: 0.03,
                onComplete: () => {
                    gsap.to(details, {
                        height: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
            });
            btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            btn.classList.remove('active');
        } else {
            // Expand: grow height then stagger-reveal items
            const items = details.querySelectorAll('li, .exp-env');
            gsap.set(items, { opacity: 0, y: 15 });

            gsap.to(details, {
                height: 'auto',
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.to(items, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out'
                    });
                }
            });
            btn.innerHTML = 'Show Less <i class="fas fa-chevron-down"></i>';
            btn.classList.add('active');
        }
    };

    // Animate experience cards on scroll
    gsap.utils.toArray('.exp-entry').forEach((entry, i) => {
        gsap.from(entry, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: entry,
                start: 'top 85%',
            }
        });
    });

    // Counter scramble effect for company names (same as hero name)
    function scrambleText(element) {
        const originalText = element.dataset.text || element.innerText;
        element.dataset.text = originalText;
        const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iterations = 0;

        const interval = setInterval(() => {
            element.innerHTML = originalText.split("")
                .map((char, index) => {
                    if (index < iterations || char === " ") return char;
                    const randomChar = digits[Math.floor(Math.random() * digits.length)];
                    return `<span style="color:var(--accent);opacity:0.6">${randomChar}</span>`;
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.innerText = originalText;
            }
            iterations += 1 / 2;
        }, 35);
    }

    // Trigger on scroll + hover for company names
    document.querySelectorAll('.company-name').forEach(name => {
        // On scroll into view
        ScrollTrigger.create({
            trigger: name,
            start: 'top 85%',
            onEnter: () => scrambleText(name),
            once: true
        });

        // On hover
        name.addEventListener('mouseenter', () => scrambleText(name));
    });

    // ============================================
    // 6. SKEWMORPHIC TILT FOR PROJECTS
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // 7. SKILLS REVEAL (Removed per user request - staying static for visibility)

    // Recommendations Carousel Logic
    const recommendationsData = [
        {
            name: "Chad Baumann",
            role: "Systems Project Manager @ Ziply Fiber",
            quote: "I have worked with Sri Satya on Commercial NDS project at Ziply. His knowledge and expertise have been key to our progress and development. He is a great asset to the team.",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&mouth=variant05,variant25,variant28&hair=short01,short02&hairColor=2c1b18",
            linkedin: "https://www.linkedin.com/in/chadbaumann/"
        },
        {
            name: "Manisha Safaya",
            role: "Technical Specialist @ Tech Mahindra | Backend Lead Architect",
            quote: "I had the pleasure of working with Satya while supporting the same client engagement. He is a highly skilled and dependable engineer with deep expertise in Node.js, Python, and scalable systems. Satya consistently delivers high-quality solutions, documents robust architecture, and produces clear design/flow diagrams that make complex systems easy to understand.",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ariel&mouth=variant01,variant30&hair=long01,long05&hairColor=2c1b18",
            linkedin: "https://www.linkedin.com/in/manishasafaya/"
        },
        {
            name: "Manjunath S",
            role: "Senior Engineer @ Ziply",
            quote: "Satya was a key member for several application developments at Ziply that were directly enhancing and impacting customer experience. I strongly recommend Satya.",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Caleb&mouth=variant25,variant28&hair=short10&hairColor=2c1b18",
            linkedin: "https://www.linkedin.com/in/manjunath-s-2a36737/"
        },
        {
            name: "Ananthkumar Tirumalasetti",
            role: "Software Engineer",
            quote: "I had the privilege of working with Satya and I can confidently say he is one of the kindest and most supportive professionals I’ve met. He has a remarkable ability to explain complex concepts in a simple and understandable way. He genuinely encourages new talent and ensures that everyone feels supported.",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jace&mouth=variant05,variant01&hair=short05&hairColor=2c1b18",
            linkedin: "#"
        },
        {
            name: "Katie McKay",
            role: "Director, IT Operations @ Ziply Fiber",
            quote: "Satya is extremely knowledgeable and helpful in all avenues. He makes projects easier to complete and ensures that the project is done correctly and on time. Highly recommended!",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sasha&mouth=variant30,variant25&hair=long11&hairColor=4b3832",
            linkedin: "https://www.linkedin.com/in/katie-mckay-0baa3920b/"
        },
        {
            name: "Tendai Makasi, PhD",
            role: "Business Analyst @ Western Health",
            quote: "I had the pleasure of collaborating with Satya on a research project about chatbots. I was highly impressed by his technical expertise on chatbot development as well as his broad awareness on issues that affect deployment... I would not hesitate to recommend Satya to any team.",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Silas&mouth=variant28,variant05&hair=short19&hairColor=2c1b18",
            linkedin: "https://www.linkedin.com/in/tendai-m-9a38a7149/"
        },
        {
            name: "Riya Punjabi",
            role: "Agentic AI Manager @ Synopsys | Multi-Agent LLM Systems",
            quote: "Lokesh is very hard-working and dedicated to his work. He is self-motivated, talented and good at Software Development. He is a quick-learner and an inspiring team player. I would highly recommend him.",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Jade&mouth=variant01,variant25&hair=long19&hairColor=2c1b18",
            linkedin: "https://www.linkedin.com/in/riyapunjabi/"
        }
    ];

    const recoQuote = document.getElementById('active-reco-quote');
    const recoName = document.getElementById('active-reco-name');
    const recoRole = document.getElementById('active-reco-role');
    const recoNav = document.getElementById('reco-nav');

    if (recoQuote && recoNav) {
        let currentRecoIndex = 0;

        function updateRecommendation(index) {
            // Validate bounds
            if (index < 0) index = recommendationsData.length - 1;
            if (index >= recommendationsData.length) index = 0;

            currentRecoIndex = index;
            const data = recommendationsData[index];
            const recoMain = document.querySelector('.reco-main');
            const itemsToAnimate = recoMain.querySelectorAll('.quote-icon, .active-quote, .active-info');
            const activeQuote = document.getElementById('active-reco-quote');

            // GSAP Transition
            gsap.to(itemsToAnimate, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    activeQuote.innerText = `"${data.quote}"`;
                    recoName.innerHTML = `<a href="${data.linkedin}" target="_blank" class="reco-link">${data.name}</a>`;
                    recoRole.innerText = data.role;

                    gsap.fromTo(itemsToAnimate,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "expo.out"
                        }
                    );
                }
            });

            // Update Nav Avatars
            document.querySelectorAll('.avatar-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        }

        // Add Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'reco-arrow-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateRecommendation(currentRecoIndex - 1);
        });
        recoNav.appendChild(prevBtn);

        // Initialize Avatar Nav
        recommendationsData.forEach((reco, i) => {
            const btn = document.createElement('div');
            btn.className = `reco-btn avatar-btn ${i === 0 ? 'active' : ''}`;
            btn.innerHTML = `<img src="${reco.avatar}" alt="${reco.name}" class="reco-avatar">`;
            btn.addEventListener('click', () => updateRecommendation(i));
            recoNav.appendChild(btn);
        });

        // Add Next Button
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'reco-arrow-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateRecommendation(currentRecoIndex + 1);
        });
        recoNav.appendChild(nextBtn);

        // Set Initial Content
        const initialData = recommendationsData[0];
        recoQuote.innerText = `"${initialData.quote}"`;
        recoName.innerHTML = `<a href="${initialData.linkedin}" target="_blank" class="reco-link">${initialData.name}</a>`;
        recoRole.innerText = initialData.role;
    }

    // Contact Section Glow Effect
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.addEventListener('mousemove', (e) => {
            const rect = contactSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            contactSection.style.setProperty('--contact-x', `${x}%`);
            contactSection.style.setProperty('--contact-y', `${y}%`);
        });
    }

    // Experience Section Metric Counters
    const counters = document.querySelectorAll('.counter');
    const counterObserverOptions = {
        threshold: 0.5
    };

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function: easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const current = Math.floor(ease * target);
            counter.innerText = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, counterObserverOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Magnetic Tilt for Interactive Cards (Bento, Projects, Experience, Recommendations)
    const interactiveCards = document.querySelectorAll('.bento-item, .proj-card, .exp-card, .reco-main');
    interactiveCards.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            if (document.body.classList.contains('is-touch')) return;
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(item, {
                duration: 0.5,
                rotateY: x * 10,
                rotateX: -y * 10,
                transformPerspective: 1000,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.5,
                rotateY: 0,
                rotateX: 0,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
    });

    // Magnetic Interaction for Buttons & Links
    const magneticElements = document.querySelectorAll('.resume-btn, .hero-resume-link, .exp-toggle');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (document.body.classList.contains('is-touch')) return;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - (left + width / 2)) * 0.35;
            const y = (e.clientY - (top + height / 2)) * 0.35;

            gsap.to(el, {
                duration: 0.4,
                x: x,
                y: y,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                duration: 0.4,
                x: 0,
                y: 0,
                ease: 'power2.out'
            });
        });
    });

    console.log('%c✓ Portfolio Motion System Initialized', 'color: #FF5C00; font-weight: bold;');
});
