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
const track = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');

if (track) {
    // 1. Lógica de Rolagem Infinita (Loop)
    btnNext.addEventListener('click', () => {
        // Pega o primeiro card e move para o final da fila
        const firstCard = track.firstElementChild;
        track.style.scrollBehavior = 'smooth';
        track.scrollBy({ left: 340, behavior: 'smooth' });
        
        // Espera a animação terminar e reorganiza o HTML em silêncio
        setTimeout(() => {
            track.style.scrollBehavior = 'auto'; // Tira a suavidade temporariamente
            track.appendChild(firstCard); // Move o card
            track.scrollLeft -= 340; // Reajusta a posição para o usuário não perceber o pulo
        }, 400); 
    });

    btnPrev.addEventListener('click', () => {
        // Pega o último card e move para o começo da fila
        const lastCard = track.lastElementChild;
        track.style.scrollBehavior = 'auto';
        track.prepend(lastCard);
        track.scrollLeft += 340;
        
        // Rola de volta com animação suave
        setTimeout(() => {
            track.style.scrollBehavior = 'smooth';
            track.scrollBy({ left: -340, behavior: 'smooth' });
        }, 10);
    });

    // 2. Controle por Arrasto do Mouse (Drag)
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