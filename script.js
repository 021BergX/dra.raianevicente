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
const track = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');

if (track) {
    // 1. Controle por Botões Laterais
    // Avança a largura de um card (aproximadamente 340px considerando o gap)
    btnNext.addEventListener('click', () => {
        track.scrollBy({ left: 340, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -340, behavior: 'smooth' });
    });

    // 2. Controle por Arrasto do Mouse (Drag)
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.classList.add('dragging');
        // Registra onde o clique começou
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
        if (!isDown) return; // Só executa se o mouse estiver pressionado
        e.preventDefault();
        // Calcula a distância que o mouse moveu
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiplicador para a velocidade do scroll
        track.scrollLeft = scrollLeft - walk;
    });
}