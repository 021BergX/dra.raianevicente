document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ROLAGEM SUAVE (Links Internos) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 2. CARROSSEL DE ESPECIALIDADES (Botões e Arrastar) ---
    const track = document.querySelector('.carousel-track');
    const btnPrev = document.querySelector('.prev-btn');
    const btnNext = document.querySelector('.next-btn');

    if (track && btnPrev && btnNext) {
        const getScrollAmount = () => {
            const card = track.querySelector('.especialidade-card');
            const gap = 30; // Espaço entre os cards
            return card ? card.offsetWidth + gap : 300;
        };

        btnNext.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        // Lógica para arrastar com o mouse
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.classList.add('dragging');
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
        track.addEventListener('mouseup', () => { isDown = false; track.classList.remove('dragging'); });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; 
            track.scrollLeft = scrollLeft - walk;
        });
    }

    // --- 3. FAQ (ACCORDION) ---
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');

            // Fecha todos os outros antes de abrir o novo
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                const content = i.querySelector('.accordion-content');
                if (content) content.style.maxHeight = null;
            });

            // Abre o atual apenas se ele não estava aberto
            if (!isOpen) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                if (content) content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 4. MENU MOBILE (SANDUÍCHE) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('ativo');
            menuToggle.innerHTML = navMenu.classList.contains('ativo') ? '✕' : '☰';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('ativo');
                menuToggle.innerHTML = '☰';
            });
        });
    }

    // --- 5. BARRA DE PROGRESSO DE LEITURA ---
    const scrollBar = document.getElementById('scrollBar');
    window.addEventListener('scroll', () => {
        if (scrollBar) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            scrollBar.style.width = scrolled + '%';
        }
    });

    // --- 6. ANIMAÇÕES DE REVEAL (Aparecer ao rolar) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.especialidade-card, .depoimento-card, .contato-card, .sobre-content, section').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});