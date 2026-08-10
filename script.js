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
const slider = document.querySelector('.cards-grid');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active'); // Muda o cursor para "agarrando"
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active'); // Solta se o mouse sair da área
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active'); // Solta o clique
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Se não estiver clicando, não faz nada
    e.preventDefault(); // Evita comportamentos indesejados do navegador
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador de velocidade (1.5x)
    slider.scrollLeft = scrollLeft - walk;
});

/* CONTROLE DE ACESSIBILIDADE: TAMANHO DA FONTE */
let tamanhoFonteAtual = 100; // Porcentagem inicial (100%)

function mudarTamanhoTexto(step) {
    // Cada clique altera 5% para cima ou para baixo
    tamanhoFonteAtual += (step * 5);
    
    // Limites de segurança para não quebrar o layout (entre 90% e 120%)
    if(tamanhoFonteAtual > 120) tamanhoFonteAtual = 120;
    if(tamanhoFonteAtual < 90) tamanhoFonteAtual = 90;
    
    // Aplica o novo tamanho no corpo do site
    document.body.style.fontSize = tamanhoFonteAtual + '%';
}