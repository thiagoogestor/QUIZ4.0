// --- Declaração de Variáveis ---
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn"); // ADICIONE ESTA LINHA

let currentQuestionIndex = 0;
let score = 0;

// --- Dados das Perguntas (por enquanto, direto no código) ---
const questions = [
  {
    question: "Qual é a capital do Brasil?",
    answers: [
      { text: "Rio de Janeiro", correct: false },
      { text: "São Paulo", correct: false },
      { text: "Brasília", correct: true },
      { text: "Salvador", correct: false },
    ]
  },
  {
    question: "Qual a cor do cavalo branco de Napoleão?",
    answers: [
      { text: "Preto", correct: false },
      { text: "Marrom", correct: false },
      { text: "Branco", correct: true },
      { text: "Amarelo", correct: false },
    ]
  },
  {
    question: "Quem pintou a 'Mona Lisa'?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false },
      { text: "Rafael", correct: false },
      { text: "Donatello", correct: false },
    ]
  }
];

// --- Funções do Jogo ---

// Inicia o quiz, resetando a pontuação e o índice da pergunta
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próxima";
  showQuestion();
}

// Exibe a pergunta e as opções
function showQuestion() {
  resetState(); // Limpa botões anteriores
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

// Reseta o estado (limpa botões) antes de exibir uma nova pergunta
function resetState() {
  nextButton.style.display = "none";
    homeButton.style.display = "none"; // ADICIONE ESTA LINHA
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Lida com a seleção de uma resposta
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
 // --- NOSSA LINHA DE DIAGNÓSTICO ---
console.log("Tentando mostrar o botão Próxima:", nextButton);
 nextButton.style.setProperty("display", "block", "important");
}

// Exibe a pontuação final
function showScore() {
  resetState();
  questionElement.innerHTML = `Você pontuou ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";
  homeButton.style.display = "block"; // ADICIONE ESTA LINHA
}

// Lida com o clique no botão "Próxima"
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Adiciona um "ouvinte" de eventos para o botão "Próxima"
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Inicia o jogo
startQuiz();



