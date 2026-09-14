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

// ACESSIBILIDADE (REMOVIDO - PORÉM SALVO CASO RESOLVA REUTILIZAR)

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

// =========================================

// UX: LÓGICA DO FAQ DINÂMICO (ACCORDION)

// =========================================

document.addEventListener('DOMContentLoaded', () => {

    const accordions = document.querySelectorAll('.accordion-header');



    accordions.forEach(accordion => {

        accordion.addEventListener('click', function() {

            // Verifica se o item clicado já está aberto

            const isActive = this.classList.contains('active');



            // 1. Fecha todos os outros itens primeiro

            accordions.forEach(acc => {

                acc.classList.remove('active');

                acc.nextElementSibling.style.maxHeight = null;

            });



            // 2. Se não estava aberto, nós abrimos ele agora

            if (!isActive) {

                this.classList.add('active');

                const content = this.nextElementSibling;


                content.style.maxHeight = content.scrollHeight + "px";

            }

        });

    });

});

/* =========================================

   LÓGICA DO MENU SANDUÍCHE (MOBILE)

   ========================================= */

const menuToggle = document.querySelector('.menu-toggle');

const navMenu = document.querySelector('.nav-menu');



if (menuToggle && navMenu) {

    menuToggle.addEventListener('click', () => {

        // Liga/Desliga o menu

        navMenu.classList.toggle('ativo');

       

        // Troca o ícone de ☰ para X quando está aberto

        if (navMenu.classList.contains('ativo')) {

            menuToggle.innerHTML = '✕';

        } else {

            menuToggle.innerHTML = '☰';

        }

    });



    // Fecha o menu automaticamente quando a pessoa clica em um link

    const links = document.querySelectorAll('.nav-links li a');

    links.forEach(link => {

        link.addEventListener('click', () => {

            navMenu.classList.remove('ativo');

            menuToggle.innerHTML = '☰';

        });

    });

}

// -----------------------------------------------------
// SCROLL REVEAL AUTOMÁTICO (PÁGINA INTEIRA) - CORRIGIDO
// -----------------------------------------------------
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Ajustado para ativar a animação um pouco mais rápido
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // MUDANÇA AQUI: Usando reveal-visible para não conflitar com o FAQ!
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

// Trava de segurança: só executa se achar elementos na página
if (elementosParaAnimar.length > 0) {
    elementosParaAnimar.forEach((el, index) => {
        el.classList.add('reveal');
        
        if (el.classList.contains('especialidade-card') || el.classList.contains('depoimento-card') || el.classList.contains('contato-card')) {
            let delayClass = 'delay-' + ((index % 3) + 1);
            el.classList.add(delayClass);
        }

        observer.observe(el);
    });
}
// -----------------------------------------------------
// BARRA DE LEITURA (SCROLL PROGRESS)
// -----------------------------------------------------
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollBar');
    if (scrollBar) {
        // Calcula quanto o usuário já desceu e quanto falta
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Transforma em porcentagem (0 a 100)
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = scrollPercentage + '%';
    }
});

// -----------------------------------------------------
// FAQ ACCORDION (Mantém o clique funcionando)
// -----------------------------------------------------
const faqItems = document.querySelectorAll('.accordion-item');
faqItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
        header.addEventListener('click', () => {
            // Fecha as outras
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Abre a que foi clicada
            item.classList.toggle('active');
        });
    }
});
/* Garante que o título NÃO tenha animação */
.quiz-pergunta-titulo {
    animation: none !important;
    transform: none !important;
    color: #1b2a47;
    margin-bottom: 20px;
}

/* A Barra visual do Quiz */
.quiz-progress-track {
    width: 100%;
    height: 6px;
    background-color: #e2e8f0; /* Fundo cinza claro */
    border-radius: 10px;
    margin-bottom: 30px;
    overflow: hidden;
}

.quiz-progress-fill {
    height: 100%;
    background-color: #c5a059; /* Dourado */
    border-radius: 10px;
    transition: width 0.4s ease-in-out;
}

/* O Pulsar APENAS nos botões */
.quiz-option-btn:hover {
    transform: scale(1.02); /* Faz o botão crescer 2% */
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
// =====================================================
// 1. BARRA DE LEITURA (SCROLL PROGRESS) NO CABEÇALHO
// =====================================================
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollBar');
    // A trava de segurança: só faz o cálculo se a barra existir na página
    if (scrollBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = scrollPercentage + '%';
    }
});

// =====================================================
// 2. SCROLL REVEAL AUTOMÁTICO (ANIMAÇÕES)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
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

    if (elementosParaAnimar.length > 0) {
        elementosParaAnimar.forEach((el, index) => {
            el.classList.add('reveal');
            
            // Cascata para os cartões
            if (el.classList.contains('especialidade-card') || el.classList.contains('depoimento-card') || el.classList.contains('contato-card')) {
                let delayClass = 'delay-' + ((index % 3) + 1);
                el.classList.add(delayClass);
            }
            observer.observe(el);
        });
    }
});

// =====================================================
// 3. FAQ DINÂMICO (ACCORDION)
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
