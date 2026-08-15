// =========================================
// ROLAGEM SUAVE (SMOOTH SCROLL)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// =========================================
// CONTROLE DO CARROSSEL DE ESPECIALIDADES
// =========================================
const track = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');

if (track) {
    let isAnimating = false; 

    // AVANÇAR (Seta Direita)
    btnNext.addEventListener('click', () => {
        if (isAnimating) return; 
        isAnimating = true;

        const firstCard = track.firstElementChild;
        const moveDistance = firstCard.offsetWidth + 30; // Largura do card + gap

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

    // VOLTAR (Seta Esquerda)
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

    // =========================================
    // CONTROLE POR ARRASTO DO MOUSE
    // =========================================
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

    // Cancela o clique em links dentro do carrossel se estiver arrastando
    track.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });
}

// =========================================
// ACESSIBILIDADE (ZOOM E ALTO CONTRASTE)
// =========================================
let nivelZoom = 1;

function aumentarZoom() {
    nivelZoom += 0.1;
    if(nivelZoom > 1.4) nivelZoom = 1.4; 
    document.body.style.zoom = nivelZoom;
}

function diminuirZoom() {
    nivelZoom -= 0.1;
    if(nivelZoom < 0.9) nivelZoom = 0.9; 
    document.body.style.zoom = nivelZoom;
}

function toggleAltoContraste() {
    document.body.classList.toggle('alto-contraste');
}

function toggleDestacarLinks() {
    document.body.classList.toggle('destacar-links');
}

// =========================================
// TRANSIÇÃO SUAVE ENTRE PÁGINAS (FADE OUT)
// =========================================
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

// =========================================
// CORREÇÃO DO BOTÃO VOLTAR DO NAVEGADOR
// =========================================
window.addEventListener('pageshow', function (event) {
    if (event.persisted || document.body.classList.contains('fade-out')) {
        document.body.classList.remove('fade-out');
    }
});

// =========================================
// CONTROLE DO AVISO DE COOKIES (LGPD)
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    // Usamos os IDs exatos que você tinha (com hífen)
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