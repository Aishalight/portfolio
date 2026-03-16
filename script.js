document.addEventListener('DOMContentLoaded', () => new PortfolioEngine());


// 1. DATA CONFIGURATION
const DATA = {
    phrases: ["Cybersecurity Enthusiast", "Full-Stack Developer", "Innovative Problem Solver"],
    focus: [
        { label: "Full-Stack Development", val: 85 },
        { label: "Vulnerability Research", val: 53 },
        { label: "Embedded Systems & IOT", val: 74 },
        { label: "Linux", val: 81 }
    ],
    projects: [
        {
            title: "Rikaab Clone",
            cat: "front-end",
            desc: "A pixel-perfect architectural study and visual reconstruction of the Rikaab official website. This project focuses on mastering complex CSS layouts, custom grid systems, and cross-browser responsiveness without the use of external UI libraries or frameworks. It demonstrates high attention to detail in typography, spacing, and asset optimization.",
            tech: ["HTML5", "Vanilla CSS3", "Responsive Design", "Flexbox/Grid"],
            image: "./rikaab.png",
            demo: "https://aishalight.github.io/Rikaab_clone-Aisha/",
            github: "https://github.com/Aishalight/Rikaab_clone-Aisha"
        }, ,
        {
            title: "Flappy Bird Game",
            cat: "games",
            desc: "A high-fidelity, retro-style recreation of the classic Flappy Bird, built entirely with HTML5 Canvas, CSS3, and Vanilla JavaScript. This version features smooth animations, persistent high scores, and responsive controls for both desktop and mobile.",
            tech: ["HTML5 Canvas", "CSS3", "JavaScript"],
            image: "./flappy-bird.png",
            demo: "https://aishalight.github.io/Flappy-Bird-Game/",
            github: "https://github.com/Aishalight/Flappy-Bird-Game"
        },
        {
            title: "Cyberpunk Snake Game",
            cat: "games",
            desc: "🐍 Cyber Snake A grid-based logic game featuring toroidal movement and procedural obstacle generation, built entirely with HTML5 Canvas, CSS3, and Vanilla JavaScript. This version features persistent high scores, and responsive controls for both desktop and mobile.",
            tech: ["HTML5 Canvas", "CSS3", "JavaScript"],
            image: "./snake.png",
            demo: "https://aishalight.github.io/Cyberpunk-Snake/",
            github: "https://github.com/Aishalight/Cyberpunk-Snake"
        },
        {
            title: "Retro Breakout Game",
            cat: "games",
            desc: "🧱 Retro Breakout A classic brick-breaking experience focused on reactive paddle physics and collision angles.n, built entirely with HTML5 Canvas, CSS3, and Vanilla JavaScript. This version features persistent high scores, and responsive controls for both desktop and mobile.",
            tech: ["HTML5 Canvas", "CSS3", "JavaScript"],
            image: "./breakout.png",
            demo: "https://aishalight.github.io/Classic-Breakout/",
            github: "https://github.com/Aishalight/Classic-Breakout"
        },
        
    ],
    skills: [
        {
            category: "Development",
            icon: "bx-code-alt",
            items: ["JavaScript (ES6+)", "Python", "Java", "PHP", "Bash Scripting", "HTML5", "CSS3", "MySQL", "SQL-server", "Oracle", "Jquery", "Git&Github"]
        },
        {
            category: "Security",
            icon: "bx-shield-quarter",
            items: ["Nmap", "Wireshark", "Bash scripting", "Metasploit", "Linux"]
        }
    ]
};

class PortfolioEngine {
    constructor() {
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.renderProjects();
        this.renderSkills();
        this.renderFocus();
        this.initTypewriter();
        this.initParticles();
        this.setupEventListeners();
        this.setupCursorGlow();
    }

    // Dynamic Rendering
    renderProjects(filter = 'all') {
        const grid = document.getElementById('projects-grid');
        const filtered = DATA.projects.filter(p => filter === 'all' || p.cat === filter);
        document.getElementById('project-count').innerText = filtered.length;

        grid.innerHTML = filtered.map(p => `
            <div class="project-card glass">
                <span class="p-status">${p.demo === '#' ? 'Developing' : 'Live'}</span>
                <div class="p-img-wrapper">
                    <img src="${p.image}" alt="${p.title}">
                </div>
                <div class="p-content">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <div class="p-tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
                </div>
                <div class="p-links">
                    <a href="${p.demo}" target="_blank" ${p.demo === '#' ? 'style="opacity:0.3;pointer-events:none"' : ''}><i class='bx bx-play-circle'></i> Demo</a>
                    <a href="${p.github}" target="_blank"><i class='bx bxl-github'></i> Github</a>
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const container = document.getElementById('skills-container');
        container.innerHTML = DATA.skills.map(group => `
            <div class="skill-category">
                <h3><i class='bx ${group.icon}'></i> ${group.category}</h3>
                <div class="skill-items">
                    ${group.items.map(s => `<div class="skill-cube">${s}</div>`).join('')}
                </div>
            </div>
        `).join('');
    }

    renderFocus() {
        const container = document.getElementById('focus-container');
        // Add a class for enhanced styling
        container.classList.add('enhanced-focus');

        container.innerHTML = `<h4 class="focus-title"><i class='bx bx-target-lock'></i> Current Focus</h4>` +
            DATA.focus.map(f => `
            <div class="focus-item">
                <div class="focus-info">
                    <span class="focus-label">${f.label}</span>
                    <span class="focus-val">${f.val}%</span>
                </div>
                <div class="progress-bg"><div class="bar" data-val="${f.val}"></div></div>
            </div>
        `).join('');

        // Animate bars on scroll
        const obs = new IntersectionObserver(ents => ents.forEach(e => {
            if (e.isIntersecting) {
                const b = e.target.querySelector('.bar');
                if (b) b.style.width = b.dataset.val + '%';
            }
        }), { threshold: 0.5 });
        document.querySelectorAll('.focus-item').forEach(i => obs.observe(i));
    }

    // Animations
    async initTypewriter() {
        const target = document.getElementById('typing-text');
        let i = 0;
        while (true) {
            let word = DATA.phrases[i];
            for (let l = 0; l <= word.length; l++) { target.innerText = word.substring(0, l); await new Promise(r => setTimeout(r, 70)); }
            await new Promise(r => setTimeout(r, 2000));
            for (let l = word.length; l >= 0; l--) { target.innerText = word.substring(0, l); await new Promise(r => setTimeout(r, 40)); }
            i = (i + 1) % DATA.phrases.length;
        }
    }

    setupCursorGlow() {
        const glow = document.querySelector('.cursor-glow');
        const dot = document.querySelector('.cursor-dot');
        let curX = window.innerWidth / 2, curY = window.innerHeight / 2;
        let tgX = curX, tgY = curY;

        window.addEventListener('mousemove', e => {
            tgX = e.clientX;
            tgY = e.clientY;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Instantly move the dot
            if (dot) {
                dot.style.left = `${e.clientX}px`;
                dot.style.top = `${e.clientY}px`;
            }
        });

        // Smoothly move the glow
        const lerp = () => {
            curX += (tgX - curX) * 0.15;
            curY += (tgY - curY) * 0.15;
            if (glow) {
                glow.style.left = `${curX}px`;
                glow.style.top = `${curY}px`;
            }
            requestAnimationFrame(lerp);
        };
        lerp();

        // Hover effect for interactive elements
        const iteractives = document.querySelectorAll('a, button, .project-card, .cmd-item, .skill-cube');
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                dot.style.transform = 'translate(-50%, -50%) scale(2)';
                dot.style.background = 'transparent';
                dot.style.border = '1px solid var(--accent)';
                glow.style.width = '300px';
                glow.style.height = '300px';
            });
            el.addEventListener('mouseleave', () => {
                dot.style.transform = 'translate(-50%, -50%) scale(1)';
                dot.style.background = 'var(--accent)';
                dot.style.border = 'none';
                glow.style.width = '500px';
                glow.style.height = '500px';
            });
        });
    }

    initParticles() {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let pts = [];
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.onresize = resize;
        resize();

        // Increase particle count slightly for "network" feel
        for (let i = 0; i < 100; i++) {
            pts.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        const anim = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pts.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Repel from mouse
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);
                if (distToMouse < 150) {
                    p.x -= dx / distToMouse * 1.5;
                    p.y -= dy / distToMouse * 1.5;
                }

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw particle
                const isDark = document.body.getAttribute('data-theme') === 'dark';
                const particleColor = isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(79, 70, 229, 0.3)';

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Draw connecting lines
                for (let j = i + 1; j < pts.length; j++) {
                    const p2 = pts[j];
                    const ddx = p.x - p2.x;
                    const ddy = p.y - p2.y;
                    const dist = Math.sqrt(ddx * ddx + ddy * ddy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const alpha = 1 - (dist / 100);
                        ctx.strokeStyle = isDark ? `rgba(99, 102, 241, ${alpha * 0.2})` : `rgba(79, 70, 229, ${alpha * 0.15})`;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(anim);
        };
        anim();
    }

    setupEventListeners() {
        // Theme Toggle
        document.querySelector('.theme-toggle').onclick = () => {
            const dark = document.body.getAttribute('data-theme') === 'dark';
            document.body.setAttribute('data-theme', dark ? 'light' : 'dark');
            document.querySelector('.theme-toggle i').className = dark ? 'bx bx-moon' : 'bx bx-sun';
        };

        // Filter Tabs
        document.querySelectorAll('.tab').forEach(t => {
            t.onclick = () => {
                document.querySelector('.tab.active').classList.remove('active');
                t.classList.add('active');
                this.renderProjects(t.dataset.filter);
            }
        });

        // Command Palette Logic
        const cmdModal = document.getElementById('cmd-palette');
        const cmdInput = document.getElementById('cmd-input');
        const cmdResults = document.getElementById('cmd-results');

        const commands = [
            { id: 'projects', icon: 'bx-folder', text: 'View Projects', action: () => window.location.href = '#projects' },
            { id: 'skills', icon: 'bx-code', text: 'View Skills', action: () => window.location.href = '#skills' },
            { id: 'contact', icon: 'bx-envelope', text: 'Contact Me', action: () => window.location.href = '#contact' },
            { id: 'theme', icon: 'bx-moon', text: 'Toggle Theme', action: () => document.querySelector('.theme-toggle').click() },
            { id: 'cv', icon: 'bx-download', text: 'Download CV', action: () => document.querySelector('.btn-cv').click() }
        ];

        let activeCmdIndex = 0;

        const renderCmds = (filter = '') => {
            const hits = commands.filter(c => c.text.toLowerCase().includes(filter.toLowerCase()) || c.id.includes(filter.toLowerCase()));
            cmdResults.innerHTML = hits.map((c, i) => `
                <div class="cmd-item ${i === activeCmdIndex ? 'active' : ''}" data-index="${i}">
                    <i class='bx ${c.icon}'></i> ${c.text}
                    <kbd>Enter</kbd>
                </div>
            `).join('');

            // Re-bind clicks
            document.querySelectorAll('.cmd-item').forEach(item => {
                item.addEventListener('click', () => {
                    const idx = item.getAttribute('data-index');
                    hits[idx].action();
                    cmdModal.classList.remove('active');
                });
                item.addEventListener('mouseenter', () => {
                    activeCmdIndex = parseInt(item.getAttribute('data-index'));
                    renderCmds(filter);
                });
            });
        };

        window.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 'j') {
                e.preventDefault();
                cmdModal.classList.add('active');
                cmdInput.focus();
                cmdInput.value = '';
                activeCmdIndex = 0;
                renderCmds();
            }
            if (e.key === 'Escape') cmdModal.classList.remove('active');

            if (cmdModal.classList.contains('active')) {
                const hits = commands.filter(c => c.text.toLowerCase().includes(cmdInput.value.toLowerCase()) || c.id.includes(cmdInput.value.toLowerCase()));
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    activeCmdIndex = (activeCmdIndex + 1) % hits.length;
                    renderCmds(cmdInput.value);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    activeCmdIndex = (activeCmdIndex - 1 + hits.length) % hits.length;
                    renderCmds(cmdInput.value);
                } else if (e.key === 'Enter' && hits[activeCmdIndex]) {
                    e.preventDefault();
                    hits[activeCmdIndex].action();
                    cmdModal.classList.remove('active');
                }
            }
        });

        cmdInput.addEventListener('input', e => {
            activeCmdIndex = 0;
            renderCmds(e.target.value);
        });

        // Click outside to close cmd palette
        cmdModal.addEventListener('click', e => {
            if (e.target === cmdModal) cmdModal.classList.remove('active');
        });

        // 3D Card Tilt (Smoother implementation)
        document.addEventListener('mousemove', e => {
            document.querySelectorAll('.project-card, .skill-category').forEach(card => {
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;

                if (x > 0 && x < r.width && y > 0 && y < r.height) {
                    const rotateX = ((r.height / 2 - y) / 20).toFixed(2);
                    const rotateY = ((x - r.width / 2) / 20).toFixed(2);
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                }
            });
        });

        // Scroll Reveal Animation
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-header, .project-card, .skill-category, .contact-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
}

