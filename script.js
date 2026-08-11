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

// =========================================
    // CONTROLE POR ARRASTO DO MOUSE (ATUALIZADO)
    // =========================================
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false; // Nova variável para identificar o arrasto

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false; // Reseta sempre que clica
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
        isDragging = true; // Se o mouse se moveu enquanto pressionado, é um arrasto
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5; 
        track.scrollLeft = scrollLeft - walk;
    });

    // PROTEÇÃO DOS LINKS: Cancela o clique APENAS se o usuário estiver arrastando
    track.addEventListener('click', (e) => {
        if (isDragging) {
            e.preventDefault();
        }
    });
}
let nivelZoom = 1;

// 1. Aumentar e Diminuir TODO o site de verdade (Zoom Real)
function aumentarZoom() {
    nivelZoom += 0.1;
    if(nivelZoom > 1.4) nivelZoom = 1.4; // Limite máximo para não quebrar a tela
    document.body.style.zoom = nivelZoom;
}

function diminuirZoom() {
    nivelZoom -= 0.1;
    if(nivelZoom < 0.9) nivelZoom = 0.9; // Limite mínimo
    document.body.style.zoom = nivelZoom;
}

// 2. Ligar/Desligar Alto Contraste
function toggleAltoContraste() {
    document.body.classList.toggle('alto-contraste');
}

// 3. Ligar/Desligar Destaque de Links
function toggleDestacarLinks() {
    document.body.classList.toggle('destacar-links');
}
/* =========================================
   TRANSIÇÃO SUAVE ENTRE PÁGINAS (FADE OUT)
   ========================================= */
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const destino = this.getAttribute('href');
        
        // Ignora links que abrem no WhatsApp (target="_blank"), links internos (como #inicio) ou botões sem destino
        if (!destino || this.target === '_blank' || destino.startsWith('#') || destino.startsWith('http')) {
            return;
        }

        // Segura a navegação padrão
        e.preventDefault(); 
        const url = this.href;

        // Adiciona a classe que faz a página "apagar"
        document.body.classList.add('fade-out');

        // Espera 200ms (o tempo exato da animação do CSS) e então libera a troca de página
        setTimeout(() => {
            window.location.href = url;
        }, 200); 
    });
});
/* =========================================
   CORREÇÃO DO BOTÃO VOLTAR DO NAVEGADOR (BFCACHE)
   ========================================= */
window.addEventListener('pageshow', function (event) {
    // Verifica se a página está sendo restaurada do histórico (botão voltar)
    if (event.persisted || document.body.classList.contains('fade-out')) {
        // Remove a invisibilidade para a tela voltar ao normal
        document.body.classList.remove('fade-out');
    }
});
/* =========================================
   CONTROLE DO AVISO DE COOKIES (LGPD)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");
    const btnAceitar = document.getElementById("aceitar-cookies");

    // Verifica no navegador se o usuário já aceitou os termos no passado
    if (!localStorage.getItem("cookiesAceitos")) {
        // Se não aceitou, espera 1 segundo após o site carregar e sobe a barra suavemente
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 1000);
    }

    // Quando o usuário clica em "Estou ciente"
    btnAceitar.addEventListener("click", function() {
        // Desce a barra de volta
        cookieBanner.classList.remove("show");
        // Grava no navegador que ele já aceitou, para não incomodar nas próximas visitas
        localStorage.setItem("cookiesAceitos", "true");
    });
});