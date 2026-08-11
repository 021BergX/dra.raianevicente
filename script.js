// Script para interações básicas do site
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para links internos (caso o CSS não seja suportado em algum browser antigo)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
// LÓGICA DE CLICAR E ARRASTAR (DRAG TO SCROLL) NO CARROSSEL
/* CONTROLE DO CARROSSEL DE ESPECIALIDADES */
/* CONTROLE DO CARROSSEL DE ESPECIALIDADES COM LOOP INFINITO */
/* =========================================
   CONTROLE DO CARROSSEL DE ESPECIALIDADES
   ========================================= */
const track = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');

if (track) {
    let isAnimating = false; // Trava de segurança para não bugar com cliques rápidos

    // 1. Loop infinito (Avançar)
    btnNext.addEventListener('click', () => {
        if (isAnimating) return; // Se já estiver rodando, ignora o clique
        isAnimating = true;

        // Calcula exatamente a largura do card + o gap de 30px
        const card = track.querySelector('.especialidade-card');
        const moveDistance = card.offsetWidth + 30;

        track.style.scrollBehavior = 'smooth';
        track.scrollBy({ left: moveDistance, behavior: 'smooth' });

        // Espera a rolagem acabar (500ms) e joga o primeiro card para o final
        setTimeout(() => {
            track.style.scrollBehavior = 'auto'; // Desliga a suavidade para não piscar
            track.appendChild(track.firstElementChild); // Move fisicamente o HTML
            track.scrollLeft -= moveDistance; // Reajusta a posição invisível
            isAnimating = false; // Libera para o próximo clique
        }, 500); 
    });

    // 2. Loop infinito (Voltar)
    btnPrev.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        const card = track.querySelector('.especialidade-card');
        const moveDistance = card.offsetWidth + 30;

        // Joga o último card para o começo "escondido"
        track.style.scrollBehavior = 'auto';
        track.prepend(track.lastElementChild);
        track.scrollLeft += moveDistance;
        
        // Dá 10ms para o navegador respirar e então rola suavemente
        setTimeout(() => {
            track.style.scrollBehavior = 'smooth';
            track.scrollBy({ left: -moveDistance, behavior: 'smooth' });
        }, 10);

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    });

    // 3. Controle por Arrasto do Mouse (Drag)
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
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
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5; 
        track.scrollLeft = scrollLeft - walk;
    });
}