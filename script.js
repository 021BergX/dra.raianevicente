// =========================================
// INICIALIZAÇÃO GLOBAL DO SISTEMA
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initCarousel();
    initPageTransitions();
    initCookieBanner();
    initFAQ();
    initMobileMenu();
});

// =========================================
// 1. ROLAGEM SUAVE (SMOOTH SCROLL)
// =========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// =========================================
// 2. CONTROLE DO CARROSSEL DE ESPECIALIDADES
// =========================================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const btnPrev = document.querySelector('.prev-btn');
    const btnNext = document.querySelector('.next-btn');

    if (!track) return;

    let isAnimating = false;

    // Função auxiliar para calcular a distância do card + gap
    const getMoveDistance = () => {
        const firstCard = track.firstElementChild;
        return firstCard ? firstCard.offsetWidth + 30 : 300;
    };

    // AVANÇAR (Seta Direita)
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            const firstCard = track.firstElementChild;
            const moveDistance = getMoveDistance();

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

    // VOLTAR (Seta Esquerda)
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            const lastCard = track.lastElementChild;
            const moveDistance = getMoveDistance();

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

    // CONTROLE POR ARRASTO DO MOUSE (DRAG AND DROP)
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

    // Cancela o clique em links dentro do carrossel se o usuário estiver arrastando
    track.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// =========================================
// 3. ACESSIBILIDADE (ZOOM E ALTO CONTRASTE)
// =========================================
let nivelZoom = 1;

function aumentarZoom() {
    nivelZoom = Math.min(nivelZoom + 0.1, 1.4);
    document.body.style.zoom = nivelZoom;
}

function diminuirZoom() {
    nivelZoom = Math.max(nivelZoom - 0.1, 0.9);
    document.body.style.zoom = nivelZoom;
}

function toggleAltoContraste() {
    document.body.classList.toggle('alto-contraste');
}

function toggleDestacarLinks() {
    document.body.classList.toggle('destacar-links');
}

// =========================================
// 4. TRANSIÇÃO SUAVE ENTRE PÁGINAS (FADE OUT/IN)
// =========================================
function initPageTransitions() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const destino = this.getAttribute('href');
            
            if (!destino || this.target === '_blank' || destino.startsWith('#') || destino.startsWith('http')) {
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
}

// Correção para o botão "Voltar" do navegador
window.addEventListener('pageshow', (event) => {
    if (event.persisted || document.body.classList.contains('fade-out')) {
        document.body.classList.remove('fade-out');
    }
});

// =========================================
// 5. CONTROLE DO AVISO DE COOKIES (LGPD)
// =========================================
function initCookieBanner() {
    const cookieBanner = document.getElementById("cookie-banner");
    const btnAceitar = document.getElementById("aceitar-cookies");

    if (cookieBanner && !localStorage.getItem("cookiesAceitos")) {
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 1000);
    }

    if (btnAceitar && cookieBanner) {
        btnAceitar.addEventListener("click", () => {
            cookieBanner.classList.remove("show");
            localStorage.setItem("cookiesAceitos", "true");
        });
    }
}

// =========================================
// 6. UX: LÓGICA DO FAQ DINÂMICO (ACCORDION)
// =========================================
function initFAQ() {
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function() {
            const isActive = this.classList.contains('active');

            // Fecha todos os outros itens
            accordions.forEach(acc => {
                acc.classList.remove('active');
                acc.nextElementSibling.style.maxHeight = null;
            });

            // Abre o clicado se não estivesse ativo
            if (!isActive) {
                this.classList.add('active');
                const content = this.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// =========================================
// 7. LÓGICA DO MENU SANDUÍCHE (MOBILE)
// =========================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('ativo');
        
        // Alterna entre ☰ e ✕
        if (navMenu.classList.contains('ativo')) {
            menuToggle.innerHTML = '✕';
        } else {
            menuToggle.innerHTML = '☰';
        }
    });

    // Fecha o menu automaticamente ao clicar em um link interno
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('ativo');
            menuToggle.innerHTML = '☰';
        });
    });
}