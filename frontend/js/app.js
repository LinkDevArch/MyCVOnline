// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation to skill items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe skill items and project cards
document.querySelectorAll('.skill-item, .project-card, .stat-item').forEach(item => {
    observer.observe(item);
});

// Add hover effect to profile image
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });

    profileImg.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    return new Promise(resolve => {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Initialize typing effect when page loads
window.addEventListener('load', async function () {
    document.querySelector('.hero-title2').style.visibility = 'hidden';
    const heroTitle1 = document.querySelector('.hero-title1');
    const heroTitle2 = document.querySelector('.hero-title2');
    if (heroTitle1 && heroTitle2) {
        const originalText1 = heroTitle1.textContent;
        const originalText2 = heroTitle2.textContent;
        await typeWriter(heroTitle1, originalText1, 70);
        document.querySelector('.hero-title2').style.visibility = 'visible';
        await typeWriter(heroTitle2, originalText2, 70);
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Verificar si hay una preferencia guardada
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Guardar preferencia
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', null);
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});