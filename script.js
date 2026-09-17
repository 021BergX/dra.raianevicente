// =====================================================
// 1. BARRA DE LEITURA (SCROLL PROGRESS) NO CABEÇALHO
// =====================================================
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollBar');
    if (scrollBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = scrollPercentage + '%';
    }
});

// =====================================================
// 2. MENU MOBILE E SCROLL SUAVE INTELIGENTE
// =====================================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Lógica de abrir e fechar o menu no celular
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('ativo');
        menuToggle.innerHTML = navMenu.classList.contains('ativo') ? '✕' : '☰';
    });
}

// Scroll Suave ao clicar nos links do menu
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        let href = this.getAttribute('href');
        
        // Se o link contiver '#' e apontar para a página atual
        if (href.includes('#')) {
            let targetId = href.split('#')[1];
            let targetElement = document.getElementById(targetId);

            // Só faz o scroll suave se a seção existir na página atual!
            if (targetElement) {
                e.preventDefault();
                let headerHeight = document.querySelector('header').offsetHeight;
                let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fecha o menu mobile automaticamente ao clicar
                if (navMenu && navMenu.classList.contains('ativo')) {
                    navMenu.classList.remove('ativo');
                    if (menuToggle) menuToggle.innerHTML = '☰';
                }
            }
        }
    });
});

// =====================================================
// 3. SCROLL REVEAL AUTOMÁTICO (ANIMAÇÕES)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Revela um pouco antes de aparecer no meio da tela
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    const elementosParaAnimar = document.querySelectorAll(`
        section:not(#inicio):not(.hero), 
        .especialidade-card, 
        .depoimento-card, 
        .contato-card, 
        .sobre-content, 
        .sobre-image, 
        .accordion-item,
        .footer-info
    `);

    // Trava de segurança: só roda se houver itens para animar na tela
    if (elementosParaAnimar.length > 0) {
        elementosParaAnimar.forEach((el, index) => {
            el.classList.add('reveal');
            
            // Efeito cascata para cartões
            if (el.classList.contains('especialidade-card') || el.classList.contains('depoimento-card') || el.classList.contains('contato-card')) {
                let delayClass = 'delay-' + ((index % 3) + 1);
                el.classList.add(delayClass);
            }
            observer.observe(el);
        });
    }
});

// =====================================================
// 4. FAQ DINÂMICO (ACCORDION)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');

    if (accordions.length > 0) {
        accordions.forEach(accordion => {
            accordion.addEventListener('click', function() {
                const isActive = this.classList.contains('active');

                // Fecha os outros
                accordions.forEach(acc => {
                    acc.classList.remove('active');
                    if(acc.nextElementSibling) {
                        acc.nextElementSibling.style.maxHeight = null;
                    }
                });

                // Abre o clicado
                if (!isActive) {
                    this.classList.add('active');
                    if(this.nextElementSibling) {
                        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
                    }
                }
            });
        });
    }
});

// =====================================================
// 5. CARROSSEL DE ESPECIALIDADES (DRAG E BOTÕES)
// =====================================================
const track = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');

if (track) {
    let isAnimating = false;

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            const firstCard = track.firstElementChild;
            const moveDistance = firstCard.offsetWidth + 30;
            
            track.scrollBy({ left: moveDistance, behavior: 'smooth' });
            
            setTimeout(() => {
                track.style.scrollBehavior = 'auto';
                track.appendChild(firstCard);
                track.scrollLeft -= moveDistance;
                requestAnimationFrame(() => {
                    track.style.scrollBehavior = 'smooth';
                    isAnimating = false;
                });
            }, 400);
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;
            const lastCard = track.lastElementChild;
            const moveDistance = lastCard.offsetWidth + 30;
            
            track.style.scrollBehavior = 'auto';
            track.prepend(lastCard);
            track.scrollLeft += moveDistance;
            
            requestAnimationFrame(() => {
                track.style.scrollBehavior = 'smooth';
                track.scrollBy({ left: -moveDistance, behavior: 'smooth' });
                setTimeout(() => {
                    isAnimating = false;
                }, 400);
            });
        });
    }

    // Controle de Arrasto (Mouse)
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        track.classList.add('dragging');
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.classList.remove('dragging');
    });

    track.addEventListener('mouseup', () => {
        isDown = false;
        track.classList.remove('dragging');
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        isDragging = true;
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// =====================================================
// 6. TRANSIÇÃO DE PÁGINA (FADE OUT) E COOKIES
// =====================================================
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const destino = this.getAttribute('href');
        
        if (!destino || this.target === '_blank' || destino.startsWith('#') || destino.startsWith('http') || destino.startsWith('mailto') || destino.startsWith('tel')) {
            return;
        }

        e.preventDefault();
        const url = this.href;
        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = url;
        }, 200);
    });
});

window.addEventListener('pageshow', function (event) {
    if (event.persisted || document.body.classList.contains('fade-out')) {
        document.body.classList.remove('fade-out');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const btnAceitar = document.getElementById("aceitar-cookies");

    if (cookieBanner) {
        if (!localStorage.getItem("cookiesAceitos")) {
            setTimeout(() => {
                cookieBanner.classList.add("show");
            }, 1000);
        }
    }

    if (btnAceitar && cookieBanner) {
        btnAceitar.addEventListener("click", function() {
            cookieBanner.classList.remove("show");
            localStorage.setItem("cookiesAceitos", "true");
        });
    }
});