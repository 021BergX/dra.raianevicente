let respostasUsuario = {};

function nextStep(stepAtual, resposta) {
  // Salva a resposta da pergunta atual
  respostasUsuario['pergunta' + stepAtual] = resposta;

  // Seleciona o card atual e o próximo passo
  const card = document.getElementById('quizCard');
  
  // Efeito visual leve de "flip" ao mudar
  card.style.transform = 'rotateX(15deg)';
  
  setTimeout(() => {
    document.querySelector(`.quiz-step[data-step="${stepAtual}"]`).classList.remove('active');
    
    let proximoPasso = stepAtual + 1;
    let elementoProximo = document.querySelector(`.quiz-step[data-step="${proximoPasso}"]`);
    
    if (elementoProximo) {
      elementoProximo.classList.add('active');
    } else {
      // Se acabou as perguntas, mostra o resultado
      document.querySelector('.quiz-step[data-step="resultado"]').classList.add('active');
      gerarDiagnostico();
    }
    
    card.style.transform = 'rotateX(0deg)';
  }, 300);
}

function gerarDiagnostico() {
  const textoRes = document.getElementById('resultadoTexto');
  
  // Exemplo simples de lógica baseada nas respostas
  if (respostasUsuario.pergunta1 === 'preocupante') {
    textoRes.innerHTML = "Notamos relatos que merecem atenção especializada. Recomendamos agendar uma avaliação geriátrica detalhada para rastreio cognitivo preventivo.";
  } else {
    textoRes.innerHTML = "Seu estilo de vida e respostas indicam uma manutenção saudável das funções. Mantenha os hábitos preventivos e exames de rotina em dia!";
  }
}

function resetQuiz() {
  respostasUsuario = {};
  document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
  document.querySelector('.quiz-step[data-step="1"]').classList.add('active');
}