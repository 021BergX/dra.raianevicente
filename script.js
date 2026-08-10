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
