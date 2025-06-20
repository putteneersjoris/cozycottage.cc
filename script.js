document.addEventListener('DOMContentLoaded', function() {
    initScrollHeader();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initGalleryLightbox();
    initLoadingScreen();
    initLanguageToggle();
});

function initScrollHeader() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .gallery-item, .location-content > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.className = 'mobile-menu-btn';
    
    document.querySelector('nav').appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        const menu = document.querySelector('nav ul');
        menu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        const menu = document.querySelector('nav ul');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 768 && menu.classList.contains('active')) {
            if (!menu.contains(e.target) && !mobileBtn.contains(e.target)) {
                menu.classList.remove('active');
                mobileBtn.classList.remove('active');
            }
        }
    });
    
    document.querySelectorAll('nav ul a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const menu = document.querySelector('nav ul');
                const mobileBtn = document.querySelector('.mobile-menu-btn');
                menu.classList.remove('active');
                mobileBtn.classList.remove('active');
            }
        });
    });
}

function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                cursor: pointer;
            `;
            
            const img = document.createElement('img');
            img.src = item.querySelector('img').src;
            img.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            
            overlay.appendChild(img);
            overlay.addEventListener('click', () => overlay.remove());
            document.body.appendChild(overlay);
        });
    });
}

function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<h2>THE COZY COTTAGE</h2>';
    document.body.appendChild(loadingScreen);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.remove(), 500);
        }, 1000);
    });
}

function initLanguageToggle() {
    const langBtn = document.querySelector('.lang-toggle');
    let currentLang = localStorage.getItem('language') || 'en';
    
    langBtn.textContent = currentLang.toUpperCase();
    if (currentLang === 'nl') {
        switchLanguage('nl');
    }
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'nl' : 'en';
        langBtn.textContent = currentLang.toUpperCase();
        localStorage.setItem('language', currentLang);
        switchLanguage(currentLang);
    });
}

function switchLanguage(lang) {
    document.querySelectorAll('[data-en][data-nl]').forEach(el => {
        if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            el.textContent = el.getAttribute(`data-${lang}`);
        } else {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        }
    });
    
    document.documentElement.lang = lang;
}
