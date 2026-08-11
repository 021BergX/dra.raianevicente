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
/* =========================================
   CONTROLE DO CARROSSEL COM LOOP INFINITO REAL
   ========================================= */
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

        // 1. Rola suavemente para o próximo
        track.scrollBy({ left: moveDistance, behavior: 'smooth' });

        // 2. Aguarda a animação terminar (aprox 400ms)
        setTimeout(() => {
            // Tira a suavidade temporariamente
            track.style.scrollBehavior = 'auto';
            
            // Move o primeiro card para o final da fila
            track.appendChild(firstCard);
            
            // Puxa a barra de rolagem para trás para compensar o card que saiu
            track.scrollLeft -= moveDistance;
            
            // Devolve a suavidade e libera para o próximo clique
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

        // 1. Tira a suavidade e prepara o truque
        track.style.scrollBehavior = 'auto';
        
        // 2. Move o último card para o começo
        track.prepend(lastCard);
        
        // 3. Empurra a rolagem para frente instantaneamente para o usuário não ver o pulo
        track.scrollLeft += moveDistance;

        // 4. No próximo milissegundo, ativa a suavidade e rola para trás
        requestAnimationFrame(() => {
            track.style.scrollBehavior = 'smooth';
            track.scrollBy({ left: -moveDistance, behavior: 'smooth' });
            
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        });
    });

    // CONTROLE POR ARRASTO DO MOUSE
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