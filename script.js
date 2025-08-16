document.addEventListener('DOMContentLoaded', () => {
  const perguntas = [
    { pergunta: "1. Qual estilo de jogo você prefere?", opcoes: { cr7: "Velocidade e finalização potente", messi: "Dribles curtos e precisão", neymar: "Habilidade e criatividade", pele: "Versatilidade e liderança" } },
    { pergunta: "2. Se pudesse escolher, qual seria sua posição?", opcoes: { cr7: "Atacante de área", messi: "Meia-atacante", neymar: "Extremo habilidoso", pele: "Atacante completo" } },
    { pergunta: "3. Como reage ao pressionamento do adversário?", opcoes: { cr7: "Correr e finalizar rapidamente", messi: "Driblar com calma", neymar: "Criar jogada inesperada", pele: "Controlar e decidir" } },
    { pergunta: "4. Qual característica define seu estilo?", opcoes: { cr7: "Determinação e força", messi: "Inteligência e técnica", neymar: "Charme e improvisação", pele: "Talento e consistência" } },
    { pergunta: "5. Como prefere treinar?", opcoes: { cr7: "Exercícios físicos intensos", messi: "Treino técnico e passes", neymar: "Treino criativo e livre", pele: "Treino completo e equilibrado" } },
    { pergunta: "6. Qual tipo de gol mais gosta de marcar?", opcoes: { cr7: "Chute potente de fora da área", messi: "Gol preciso e colocado", neymar: "Driblando o goleiro", pele: "Gol completo de habilidade" } },
    { pergunta: "7. Qual é a sua motivação principal?", opcoes: { cr7: "Ganhar títulos e prêmios", messi: "Encantar torcedores", neymar: "Ser criativo e diferente", pele: "Deixar legado eterno" } },
    { pergunta: "8. Em um clássico, como age?", opcoes: { cr7: "Focado e agressivo", messi: "Calmo e inteligente", neymar: "Espontâneo e imprevisível", pele: "Inspirador e decisivo" } },
    { pergunta: "9. Qual adjetivo te representa melhor?", opcoes: { cr7: "Determinado", messi: "Preciso", neymar: "Habilidoso", pele: "Lendário" } },
    { pergunta: "10. Como prefere ser lembrado?", opcoes: { cr7: "Como artilheiro incrível", messi: "Como genial e elegante", neymar: "Como criativo e ousado", pele: "Como o melhor de todos os tempos" } }
  ];

  const mensagens = {
    cr7: "Você é Cristiano Ronaldo! Determinado, potente e sempre em busca de títulos.",
    messi: "Você é Lionel Messi! Hábil, preciso e dono de uma técnica incomparável.",
    neymar: "Você é Neymar Jr.! Criativo, habilidoso e imprevisível dentro de campo.",
    pele: "Você é Pelé! Lendário, versátil e um verdadeiro ícone do futebol mundial."
  };

  const imagens = {
    cr7: "CR7.jpg",
    messi: "Messi.jpg",
    neymar: "Neymar.jpg",
    pele: "Pele.jpg"
  };

  let indiceAtual = 0;
  let selecionada = null;
  const pontuacao = { cr7:0, messi:0, neymar:0, pele:0 };

  const progressoEl = document.getElementById('progresso');
  const perguntaEl = document.getElementById('pergunta');
  const opcoesEl = document.getElementById('opcoes');
  const btnProxima = document.getElementById('btnProxima');
  const btnReiniciarTopo = document.getElementById('btnReiniciarTopo');
  const resultadoEl = document.getElementById('resultado');
  const quizWrap = document.getElementById('quiz');

  function atualizarProgresso() {
    progressoEl.textContent = `Pergunta ${indiceAtual+1} de ${perguntas.length}`;
  }

  function mostrarPergunta() {
    atualizarProgresso();
    selecionada = null;
    btnProxima.disabled = true;
    btnReiniciarTopo.style.display = indiceAtual > 0 ? 'inline-block' : 'none';

    const q = perguntas[indiceAtual];
    perguntaEl.textContent = q.pergunta;
    opcoesEl.innerHTML = '';

    Object.keys(q.opcoes).forEach(jog => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opcao';
      btn.dataset.jog = jog;
      btn.textContent = q.opcoes[jog];
      btn.addEventListener('click', () => selecionar(btn));
      opcoesEl.appendChild(btn);
    });
  }

  function selecionar(btn) {
    [...opcoesEl.children].forEach(el => el.classList.remove('selecionada'));
    btn.classList.add('selecionada');
    selecionada = btn.dataset.jog;
    btnProxima.disabled = false;
  }

  btnProxima.addEventListener('click', () => {
    if (!selecionada) return;
    pontuacao[selecionada]++;
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
      mostrarPergunta();
    } else {
      mostrarResultado();
    }
  });

  btnReiniciarTopo.addEventListener('click', reiniciarQuiz);

  function mostrarResultado() {
    quizWrap.style.display = 'none';
    resultadoEl.style.display = 'block';

    const jogadorFinal = Object.keys(pontuacao).reduce((a,b) => pontuacao[a] >= pontuacao[b] ? a : b);

    resultadoEl.innerHTML = `
      <div class="badge ${jogadorFinal}">${jogadorFinal.toUpperCase()}</div>
      <h2>Resultado: ${jogadorFinal.toUpperCase()}</h2>
      <p>${mensagens[jogadorFinal]}</p>
      <img src="${imagens[jogadorFinal]}" alt="${jogadorFinal}">
      <div style="margin-top:12px">Pontuações: 
        <small>
          CR7 ${pontuacao.cr7} · Messi ${pontuacao.messi} · Neymar ${pontuacao.neymar} · Pelé ${pontuacao.pele}
        </small>
      </div>
      <div class="actions" style="margin-top:16px">
        <button class="primary" onclick="location.reload()">Reiniciar</button>
      </div>
    `;
  }

  function reiniciarQuiz() {
    indiceAtual = 0;
    selecionada = null;
    Object.keys(pontuacao).forEach(k => pontuacao[k] = 0);
    quizWrap.style.display = 'block';
    resultadoEl.style.display = 'none';
    mostrarPergunta();
  }

  mostrarPergunta();
});
