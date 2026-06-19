/* ==========================================================================
   FUTURISTIC 3D PORTFOLIO LOGIC ENGINE // SCRIPT.JS
   ========================================================================== */

// ==========================================================================
// WEB3FORMS CONFIGURATION
// ==========================================================================
const WEB3FORMS_ACCESS_KEY = '68f0e9e9-74f4-4550-8e85-4db300d53ac9';

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Web3Forms Check
    if (WEB3FORMS_ACCESS_KEY) {
        SystemLog("> WEB3FORMS: ACCESS KEY CONFIGURED", "success");
    } else {
        SystemLog("> WEB3FORMS: ACCESS KEY MISSING", "warning");
    }
    
    // ==========================================================================
    // 1. TERMINAL PRELOADER SEQUENCER
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    const loaderLogs = document.getElementById('loaderLogs');
    const loaderBar = document.getElementById('loaderBar');
    const loaderPercent = document.getElementById('loaderPercent');

    const systemLogs = [
        { text: "> INITIALIZING RUNTIME PLATFORM...", delay: 200, type: 'info' },
        { text: "> RESOLVING STYLING SYSTEM MODULES... DONE", delay: 150, type: 'success' },
        { text: "> COMPILING 3D GLSL CORE SHADERS... SUCCESS", delay: 250, type: 'success' },
        { text: "> RENDERING INTERACTIVE WEBGL GEOMETRIC ELEMENTS...", delay: 200, type: 'info' },
        { text: "> ALLOCATING AMBIENT AUDIO CHANNELS... SUCCESS", delay: 300, type: 'success' },
        { text: "> ESTABLISHING GRAPHICS HARDWARE HANDSHAKE... ACTIVE", delay: 200, type: 'success' },
        { text: "> BINDING GSAP INTERACTION TIMELINES... SUCCESS", delay: 300, type: 'success' },
        { text: "> LOADING INTERACTIVE PORTS... OK", delay: 200, type: 'success' },
        { text: "> PLATFORM READY // RESOLVING 60 FPS INTERACTIVE VIEWPORT", delay: 100, type: 'success' }
    ];

    let currentLogIndex = 0;
    let progressVal = 0;

    function runPreloader() {
        if (currentLogIndex < systemLogs.length) {
            const logItem = systemLogs[currentLogIndex];
            
            // Create and append log line
            const logLine = document.createElement('p');
            logLine.className = `log-line ${logItem.type}`;
            logLine.innerText = logItem.text;
            loaderLogs.appendChild(logLine);
            loaderLogs.scrollTop = loaderLogs.scrollHeight; // Auto-scroll

            // Progress bar mapping
            currentLogIndex++;
            progressVal = Math.floor((currentLogIndex / systemLogs.length) * 100);
            
            // Set style and percentages
            loaderBar.style.width = `${progressVal}%`;
            loaderPercent.innerText = `${progressVal}%`;

            setTimeout(runPreloader, logItem.delay);
        } else {
            // Loader completed, trigger page reveal
            setTimeout(revealPage, 600);
        }
    }

    function revealPage() {
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
                preloader.style.display = 'none';
                triggerPageRevealAnimations();
            }
        });
    }

    // Start boot sequence
    runPreloader();

    // GSAP page reveal micro-animations
    function triggerPageRevealAnimations() {
        gsap.from('.hud-header', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' });
        gsap.from('.cyber-badge-wrapper', { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.2, ease: 'back.out(1.7)' });
        gsap.from('.hero-title', { y: 30, opacity: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
        gsap.from('.hero-subtitle-static', { y: 20, opacity: 0, duration: 1, delay: 0.6, ease: 'power3.out' });
        gsap.from('.hero-desc', { y: 20, opacity: 0, duration: 1, delay: 0.8, ease: 'power3.out' });
        gsap.from('.hero-ctas', { y: 20, opacity: 0, duration: 1, delay: 1, ease: 'power3.out' });
        gsap.from('.hero-avatar-wrapper', { scale: 0.9, opacity: 0, duration: 1.2, delay: 0.8, ease: 'power3.out' });
        gsap.from('.scroll-down-hud', { opacity: 0, y: -10, duration: 1, delay: 1.2, repeat: -1, yoyo: true });
        
        // Coordinates HUD display
        gsap.from('.hud-widget', { opacity: 0, duration: 1, delay: 0.8, stagger: 0.2 });

        // Start keyboard typing engine
        initTypingEngine();
    }

    // ==========================================================================
    // 2. AUDIO ENGINE MODULE REMOVED
    // ==========================================================================

    // ==========================================================================
    // 3. PERFORMANCE TELEMETRY TRACKING (FPS INDICATION)
    // ==========================================================================
    let lastTime = performance.now();
    let frameCount = 0;
    const fpsIndicator = document.getElementById('footerFps');

    function calculateFps() {
        requestAnimationFrame(calculateFps);
        frameCount++;
        const currTime = performance.now();
        if (currTime >= lastTime + 1000) {
            const calculatedFps = (frameCount * 1000) / (currTime - lastTime);
            if (fpsIndicator) {
                fpsIndicator.innerText = calculatedFps.toFixed(2);
            }
            frameCount = 0;
            lastTime = currTime;
        }
    }
    calculateFps();

    // ==========================================================================
    // 3.5 FUTURISTIC DARK/LIGHT THEME SHIFT
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Load cached theme protocol from local memory
    const activeTheme = localStorage.getItem('theme-protocol') || 'dark';
    if (activeTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        
        if (isLight) {
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme-protocol', 'light');
            SystemLog("> ACTIVE_PROTOCOL: LIGHT_THEME // CORES STABILIZED", "success");
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme-protocol', 'dark');
            SystemLog("> ACTIVE_PROTOCOL: DARK_THEME // VOID CORE ENGAGED", "info");
        }
    });

    function SystemLog(text, type) {
        console.log(`[SYSTEM] ${text}`);
    }

    // ==========================================================================
    // 4. CUSTOM CURSOR physics removed (restored native system cursors)
    // ==========================================================================

    // ==========================================================================
    // 5. GSAP KEYBOARD TYPING ENGINE
    // ==========================================================================
    const typingSpan = document.getElementById('typing-text');
    const roles = ["CREATIVE 3D ENGINEER", "FULL-STACK DEVELOPER", "UI/UX INNOVATOR", "SHADERS MASTER"];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function initTypingEngine() {
        if (!typingSpan) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting char
            typingSpan.innerText = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            // Typing char
            typingSpan.innerText = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Full role typed. Hold, then delete.
            isDeleting = true;
            typingSpeed = 2200; // Hold delay
        } else if (isDeleting && charIndex === 0) {
            // Role completely cleared. Cycle next.
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Delay before typing next role
        }

        setTimeout(initTypingEngine, typingSpeed);
    }

    // ==========================================================================
    // 6. GSAP SCROLL & SKILLS INTERACTION
    // ==========================================================================
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Progress bar percentage logic
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('progressBar').style.width = `${scrollPercent}%`;
    });

    // Generic scroll reveals for high visual fidelity
    const reveals = document.querySelectorAll('.scroll-reveal');
    reveals.forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Dynamic Skill linear progress bar loaders
    const barFills = document.querySelectorAll('.bar-fill');
    
    barFills.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 95%",
            },
            width: targetWidth,
            duration: 1.8,
            ease: "power3.out"
        });
    });

    // Experience Timeline Circuit drawer
    gsap.to('.timeline-line-glow', {
        scrollTrigger: {
            trigger: '.timeline-container',
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
        },
        height: "100%",
        ease: "none"
    });

    // Toggle active timeline items when centered in scroll window
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => item.classList.add('active'),
            onLeaveBack: () => item.classList.remove('active'),
            onEnterBack: () => item.classList.add('active'),
            onLeave: () => item.classList.remove('active')
        });
    });

    // ==========================================================================
    // 6.5 DYNAMIC PROJECT FILTERING SYSTEM
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status on filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    // Reveal matching cards with high-fidelity scale & fade animation
                    card.classList.remove('hide');
                    gsap.fromTo(card, 
                        { opacity: 0, scale: 0.94, y: 15 }, 
                        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                } else {
                    // Hide non-matching cards with scale & fade transition
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.96,
                        y: -10,
                        duration: 0.35,
                        ease: "power2.in",
                        onComplete: () => {
                            card.classList.add('hide');
                        }
                    });
                }
            });
            
            // Re-bind Vanilla Tilt dynamics to visible items
            setTimeout(() => {
                if (window.VanillaTilt) {
                    const visibleCards = document.querySelectorAll('.project-card:not(.hide)');
                    visibleCards.forEach(card => {
                        if (card.vanillaTilt) card.vanillaTilt.destroy();
                        window.VanillaTilt.init(card, {
                            max: 10,
                            speed: 400,
                            glare: true,
                            "max-glare": 0.15
                        });
                    });
                }
            }, 600);
        });
    });

    // ==========================================================================
    // 6.6 GLITCHY DECRYPTION COUNTER
    // ==========================================================================
    const statVals = document.querySelectorAll('.stat-val');
    
    statVals.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.getAttribute('data-suffix') || '';
        
        let hasRun = false;
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 90%",
            onEnter: () => {
                if (hasRun) return;
                hasRun = true;
                
                let current = 0;
                const duration = 1800; // 1.8 seconds
                const intervalTime = 30; // 30ms step
                const totalSteps = duration / intervalTime;
                const stepVal = target / totalSteps;
                
                const randomChars = "01$#@!%&?*XYZ";
                
                const timer = setInterval(() => {
                    current += stepVal;
                    if (current >= target) {
                        clearInterval(timer);
                        stat.innerText = `${target}${suffix}`;
                    } else {
                        // Generate dynamic cyber decryption frame
                        const glitchChar = randomChars[Math.floor(Math.random() * randomChars.length)];
                        stat.innerText = `${Math.floor(current)}${glitchChar}`;
                    }
                }, intervalTime);
            }
        });
    });

    // ==========================================================================
    // 6.7 SCROLL-SPY ACTIVE NAVIGATION TRACKER
    // ==========================================================================
    const spySections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -25% 0px", // Trigger when section occupies center 50% viewport
        threshold: 0.1
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update header active links
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Update mobile active links
                mobileNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    spySections.forEach(section => spyObserver.observe(section));

    // ==========================================================================
    // 7. RESPONSIVE MOBILE NAVIGATION MENU
    // ==========================================================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu() {
        menuToggle.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    }

    menuToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu if resized back to wide screen
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileOverlay.classList.contains('open')) {
            toggleMobileMenu();
        }
    });

    // ==========================================================================
    // 8. INTERACTIVE CONTACT FORM HANDSHAKE
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const feedbackClose = document.querySelector('.feedback-close');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('.truck-button');
        if (!button || button.classList.contains('animation')) return;
        
        const nameVal = document.getElementById('formName').value;
        const emailVal = document.getElementById('formEmail').value;
        const messageVal = document.getElementById('formMessage').value;

        // Trigger Web3Forms Email Sending
        if (WEB3FORMS_ACCESS_KEY) {
            SystemLog("> WEB3FORMS: TRANSMITTING PACKET...", "info");
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: nameVal,
                    email: emailVal,
                    message: messageVal
                })
            })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    SystemLog("> WEB3FORMS: PACKET TRANSMITTED SUCCESSFULLY", "success");
                } else {
                    SystemLog(`> WEB3FORMS: TRANSMISSION FAILED (${data.message})`, "error");
                }
            })
            .catch((error) => {
                SystemLog(`> WEB3FORMS: TRANSMISSION FAILED (${error})`, "error");
            });
        } else {
            SystemLog("> WEB3FORMS: SIMULATED SEND (Access key missing)", "info");
        }
        
        button.classList.add('animation');
        
        const box = button.querySelector('.box');
        const truck = button.querySelector('.truck');
        
        // Disable form inputs during transmission
        const inputs = contactForm.querySelectorAll('.cyber-input');
        inputs.forEach(input => input.disabled = true);
        
        // Play GSAP Animation Timeline
        gsap.to(button, {
            '--box-s': 1,
            '--box-o': 1,
            duration: 0.3,
            delay: 0.5
        });
        
        gsap.to(box, {
            x: 0,
            duration: 0.4,
            delay: 0.7
        });
        
        gsap.to(button, {
            '--hx': -5,
            '--bx': 50,
            duration: 0.18,
            delay: 0.92
        });
        
        gsap.to(box, {
            y: 0,
            duration: 0.1,
            delay: 1.15
        });
        
        gsap.set(button, {
            '--truck-y': 0,
            '--truck-y-n': -26
        });
        
        gsap.to(button, {
            '--truck-y': 1,
            '--truck-y-n': -25,
            duration: 0.2,
            delay: 1.25,
            onComplete() {
                gsap.timeline({
                    onComplete() {
                        button.classList.add('done');
                        
                        // Wait 3.5 seconds, then reset the button and form automatically
                        setTimeout(() => {
                            // Re-enable form inputs
                            inputs.forEach(input => input.disabled = false);
                            
                            // Reset button to initial state
                            button.classList.remove('animation', 'done');
                            gsap.set(truck, { x: 4 });
                            gsap.set(button, {
                                '--progress': 0,
                                '--hx': 0,
                                '--bx': 0,
                                '--box-s': 0.5,
                                '--box-o': 0,
                                '--truck-y': 0,
                                '--truck-y-n': -26
                            });
                            gsap.set(box, { x: -24, y: -6 });
                            
                            // Reset form fields
                            contactForm.reset();
                        }, 3500);
                    }
                }).to(truck, {
                    x: 0,
                    duration: 0.4
                }).to(truck, {
                    x: 40,
                    duration: 1
                }).to(truck, {
                    x: 20,
                    duration: 0.6
                }).to(truck, {
                    x: 96,
                    duration: 0.4
                });
                
                gsap.to(button, {
                    '--progress': 1,
                    duration: 2.4,
                    ease: "power2.in"
                });
            }
        });
    });

    // ==========================================================================
    // 9. GITHUB SERVER API UPLINK
    // ==========================================================================
    async function fetchGithubStats() {
        try {
            console.log(">> [HTTP] Querying port 8080 API for GitHub stats...");
            const response = await fetch('/api/github-stats');
            if (response.ok) {
                const data = await response.json();
                console.log(">> [GITHUB API] Dynamic statistics synchronized successfully:", data);
                
                const reposEl = document.getElementById('github-repos');
                const starsEl = document.getElementById('github-stars');
                
                if (reposEl && data.total_repos) reposEl.innerText = `${data.total_repos}`;
                if (starsEl && data.stars) starsEl.innerText = `${data.stars}`;
            }
        } catch (err) {
            console.log(">> [GITHUB API] Uplink offline. Fallback active-sim enabled.");
        }
    }
    
    fetchGithubStats();

    // ==========================================================================
    // 10. CODEPEN DEPLOY ENGINE
    // ==========================================================================
    const codepenDeployBtn = document.getElementById('codepen-deploy');
    if (codepenDeployBtn) {
        codepenDeployBtn.addEventListener('click', deployToCodePen);
    }

    async function deployToCodePen() {
        try {
            console.log(">> [CODEPEN] Bundling local source files for CodePen deployment...");
            
            // 1. Fetch source files from local Java server
            const htmlRaw = await fetch('index.html').then(r => r.text());
            const cssRaw = await fetch('style.css').then(r => r.text());
            const avatarJs = await fetch('avatar-3d.js').then(r => r.text());
            const scriptJs = await fetch('script.js').then(r => r.text());
            
            // 2. Parse HTML and strip script and link references
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlRaw, 'text/html');
            
            // Remove style.css link
            const styleLink = doc.querySelector('link[href="style.css"]');
            if (styleLink) styleLink.remove();
            
            // Remove all local and script CDN scripts
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(s => {
                const src = s.getAttribute('src') || '';
                if (src.includes('three.js') || 
                    src.includes('GLTFLoader.js') || 
                    src.includes('MeshLine.js') || 
                    src.includes('gsap.min.js') || 
                    src.includes('ScrollTrigger.min.js') || 
                    src.includes('vanilla-tilt.min.js') || 
                    src.includes('avatar-3d.js') || 
                    src.includes('script.js')) {
                    s.remove();
                }
            });
            
            const cleanBody = doc.body.innerHTML;
            
            // 3. Setup external resources
            const externalJS = [
                "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
                "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js",
                "https://unpkg.com/three.meshline@1.4.0/src/THREE.MeshLine.js",
                "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js"
            ].join(";");
            
            const headHTML = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            `.trim();
            
            // 4. Combine JS and inject comments on asset hosting
            const combinedJS = `
/* ==========================================================================
   CODEPEN UPLINK AUTOMATION // SOHAM NESWANKAR PORTFOLIO
   ========================================================================== */

/* 
 * NOTE: CodePen does not host binary assets (images or 3D models) on the free tier.
 * To enable custom photos and 3D lanyard models:
 * 1. Push your project to GitHub (github.com/SOHAM5128/portfolio).
 * 2. Enable GitHub Pages to host your files.
 * 3. Update the URLs in this JS tab pointing 'assets/kartu.glb' and 
 *    'assets/soham_avatar.png' to your raw github.io URLs!
 * 
 * If URLs are not updated, the 3D card fallback mesh and silhouette is enabled.
 */

${avatarJs}

${scriptJs}
            `;
            
            // 5. Build Pen config JSON
            const penConfig = {
                title: "Soham Neswankar - Futuristic 3D Portfolio",
                description: "Futuristic 3D Developer Portfolio featuring glassmorphic HUD design and physics-simulated swinging lanyard.",
                html: cleanBody,
                css: cssRaw,
                js: combinedJS,
                js_external: externalJS,
                head: headHTML
            };
            
            // 6. Generate and submit dynamic form
            const form = document.createElement('form');
            form.action = 'https://codepen.io/pen/define';
            form.method = 'POST';
            form.target = '_blank';
            
            const dataInput = document.createElement('input');
            dataInput.type = 'hidden';
            dataInput.name = 'data';
            dataInput.value = JSON.stringify(penConfig);
            
            form.appendChild(dataInput);
            document.body.appendChild(form);
            form.submit();
            
            console.log(">> [CODEPEN] Project compiled and transmitted to CodePen prefill gateway.");
            setTimeout(() => form.remove(), 1000);
            
        } catch (e) {
            console.error("CodePen Deploy Fail:", e);
            alert("UPLINK FAILED: Could not compile files for CodePen. " + e.message);
        }
    }

});
