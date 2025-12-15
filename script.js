// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let updatesContainer;
let showMoreBtn;
let allUpdates = [];
let showingArchive = false;
let isDarkTheme = false;

// ===== ДАННЫЕ ОБНОВЛЕНИЙ =====
const updatesData = [
    {
        id: 1,
        date: "15 Декабря 2025",
        title: "Запуск беты версии 2.0.0",
        content: "🎯 Мы полностью готовы запускать нашего бота! В скором времени это сможем сделать, чтобы показать вам его",
        features: ["Нейросетевой алгоритм", "Анализ 20+ параметров", "Персонализированные рекомендации", "Динамическое обучение модели"],
        version: "v2.0.0",
        emoji: "🧠⚡"
    }
];

// Архивные обновления
const archiveUpdates = [
   
];

// ===== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ =====
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    updatesContainer = document.getElementById('updatesContainer');
    showMoreBtn = document.getElementById('showMoreUpdates');
    allUpdates = [...updatesData];
    
    // Загрузка темы из localStorage
    loadTheme();
    
    // Инициализация компонентов
    initThemeToggle();
    initParticles();
    renderUpdates(updatesData);
    initNavigation();
    initMobileMenu();
    initScrollToTop();
    initHeroAnimations();
    initScrollAnimations();
    initCounters();
    
    // Обработчики событий
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', toggleArchiveUpdates);
    }
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
});

// ===== ТЕМНАЯ/СВЕТЛАЯ ТЕМА =====
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-switch').checked = true;
        isDarkTheme = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        isDarkTheme = false;
    }
}

function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            isDarkTheme = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            isDarkTheme = false;
        }
        
        // Пересоздаем частицы для новой темы
        const particlesContainer = document.getElementById('particles');
        particlesContainer.innerHTML = '';
        initParticles();
    });
}

// ===== ПАРТИКЛЫ =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = isDarkTheme ? 30 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Случайные параметры
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Градиент для частицы
    const angle = Math.random() * 360;
    particle.style.background = `linear-gradient(${angle}deg, var(--primary-color), var(--secondary-color))`;
    
    container.appendChild(particle);
    
    // Удаление и создание новых частиц для анимации
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// ===== АНИМАЦИИ ГЕРОЙ СЕКЦИИ =====
function initHeroAnimations() {
    // Убедимся что все элементы видимы
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-features');
    heroElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'translateY(0)';
    });
}

// ===== ОБНОВЛЕНИЯ =====
function renderUpdates(updates) {
    if (!updatesContainer) return;
    
    updatesContainer.innerHTML = '';
    
    updates.forEach((update, index) => {
        const updateCard = document.createElement('div');
        updateCard.className = 'update-card';
        
        updateCard.innerHTML = `
            <div class="update-header">
                <h3 class="update-title">${update.title}</h3>
                <span class="update-date">${update.date}</span>
            </div>
            <div class="update-content">
                <p>${update.content}</p>
            </div>
            <div class="update-features">
                ${update.features.map(feature => 
                    `<span class="update-feature">${feature}</span>`
                ).join('')}
            </div>
            <div class="update-footer">
                <span class="update-version">${update.version}</span>
                <span class="update-emoji">${update.emoji}</span>
            </div>
        `;
        
        updatesContainer.appendChild(updateCard);
        
        // Добавляем анимацию с задержкой
        setTimeout(() => {
            updateCard.classList.add('animated');
        }, 100 * index);
    });
}

function toggleArchiveUpdates() {
    if (!showingArchive) {
        // Показываем архивные обновления
        allUpdates = [...updatesData, ...archiveUpdates];
        renderUpdates(allUpdates);
        showMoreBtn.innerHTML = `
            <i class="fas fa-arrow-up"></i> 
            <span>Скрыть архив</span>
            <div class="sparkle-container">
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
            </div>
        `;
        showingArchive = true;
        
        // Анимация
        showMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            showMoreBtn.style.transform = 'scale(1)';
        }, 150);
    } else {
        // Показываем только свежие обновления
        allUpdates = [...updatesData];
        renderUpdates(allUpdates);
        showMoreBtn.innerHTML = `
            <i class="fas fa-history"></i> 
            <span>Архив обновлений</span>
            <div class="sparkle-container">
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
            </div>
        `;
        showingArchive = false;
        
        // Анимация
        showMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            showMoreBtn.style.transform = 'scale(1)';
        }, 150);
    }
}

// Функция для добавления нового обновления
function addNewUpdate(update) {
    // Добавляем в начало массива
    updatesData.unshift({
        id: updatesData.length + 1,
        date: new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }),
        ...update
    });
    
    // Перерисовываем
    if (showingArchive) {
        allUpdates = [...updatesData, ...archiveUpdates];
        renderUpdates(allUpdates);
    } else {
        renderUpdates(updatesData);
    }
    
    // Показываем уведомление
    showNotification(`✨ Добавлено новое обновление: ${update.title}`);
}

// ===== НАВИГАЦИЯ =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function updateActiveNavLink(targetId) {
        // Обновляем десктопные ссылки
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
        
        // Обновляем мобильные ссылки
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // Следим за скроллом
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveNavLink(currentSection);
        }
    });
    
    // Инициализация начального состояния
    updateActiveNavLink('#hero');
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Закрытие меню при клике на ссылку
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его области
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Закрываем мобильное меню если оно открыто
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.querySelector('.mobile-menu-btn').classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Плавная прокрутка
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== КНОПКА "НАВЕРХ" =====
function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.about-card, .service-card, .contact-card, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Для карточек статистики запускаем счетчики
                if (entry.target.classList.contains('stat-card')) {
                    const numberElement = entry.target.querySelector('.stat-number');
                    if (numberElement) {
                        animateCounter(numberElement);
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Анимация для карточек обновлений
    const updateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.update-card').forEach(card => {
        updateObserver.observe(card);
    });
}

// ===== СЧЕТЧИКИ =====
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== УВЕДОМЛЕНИЯ =====
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-bell"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-gradient);
        color: white;
        padding: 20px 30px;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(150%) translateY(0) scale(0.8);
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 350px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0) translateY(0) scale(1)';
    }, 10);
    
    // Скрываем через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateX(150%) translateY(0) scale(0.8)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// ===== ДОБАВЛЕНИЕ СВОЕЙ ФОТКИ =====
function addYourPhoto() {
    const avatarImg = document.querySelector('.profile-avatar-img');
    if (avatarImg) {
        // Заменяем иконку на твою фотку
        avatarImg.innerHTML = '';
        avatarImg.style.backgroundImage = "url('images/avatar.jpg')";
        avatarImg.style.backgroundSize = 'cover';
        avatarImg.style.backgroundPosition = 'center';
    }
}

// ===== ПРИМЕР ДОБАВЛЕНИЯ НОВОГО ОБНОВЛЕНИЯ =====
// Раскомментируй для теста:

/*
setTimeout(() => {
    addNewUpdate({
        title: "Пример нового обновления",
        content: "Это демонстрация добавления нового обновления через JavaScript. Просто вызови функцию addNewUpdate() с объектом обновления.",
        features: ["Новая фича 1", "Новая фича 2", "Улучшения"],
        version: "v2.5.0",
        emoji: "🎉✨"
    });
}, 3000);
*/

// ===== ДОПОЛНИТЕЛЬНЫЕ АНИМАЦИИ =====
// Анимация волны для emoji в хедере
function initEmojiAnimations() {
    const emojis = document.querySelectorAll('.emoji');
    
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', () => {
            emoji.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        emoji.addEventListener('mouseleave', () => {
            emoji.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Инициализация анимаций emoji
setTimeout(initEmojiAnimations, 1000);

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg, .iphone-frame');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('iphone-frame') ? 0.3 : 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Инициализация параллакса (только для десктопа)
if (window.innerWidth > 768) {
    initParallax();
}

// Чтобы добавить свою фотку в iPhone, раскомментируй строку ниже:
// addYourPhoto();