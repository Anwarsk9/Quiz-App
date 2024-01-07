const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { option: "A) Madrid", type: false },
      { option: "B) Berlin", type: false },
      { option: "C) Paris", type: true },
      { option: "D) Rome", type: false },
    ],
  },
  {
    question: "Who is the author of the Harry Potter book series?",
    answers: [
      { option: "A) J.R.R. Tolkien", type: false },
      { option: "B) J.K. Rowling", type: true },
      { option: "C) George Orwell", type: false },
      { option: "D) Charles Dickens", type: false },
    ],
  },

  {
    question: " What is the chemical symbol for gold?",
    answers: [
      { option: "A) Go", type: false },
      { option: "B) Gd", type: false },
      { option: "C) Au", type: true },
      { option: "D) Ag", type: false },
    ],
  },

  {
    question: "Which planet is known as the 'Red Planet'?",
    answers: [
      { option: "A) Venus", type: false },
      { option: "B) Mars", type: true },
      { option: "C) Jupitar", type: false },
      { option: "D) Saturn", type: false },
    ],
  },
];

const question = document.getElementById("question");
const answerElements = document.getElementById("answer-elements");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  question.innerHTML =
    currentQuestionIndex + 1 + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((options) => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerHTML = options.option;
    answerElements.append(btn);

    if (options.type) {
      btn.dataset.correct = options.type;
    }
    btn.addEventListener("click", checkAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerElements.firstChild) {
    answerElements.removeChild(answerElements.firstChild);
  }
}

function checkAnswer(el) {
  const targetEl = el.target;
  const isCorrect = targetEl.dataset.correct == "true";
  if (isCorrect) {
    targetEl.classList.add("correct");
    score++;
  } else {
    targetEl.classList.add("incorrect");
  }

  Array.from(answerElements.children).forEach(findAnswer=>{
    if(findAnswer.dataset.correct){
        findAnswer.classList.add("correct");
    }
    findAnswer.disabled = "true";
    nextBtn.style.display = "block";
  });
}

function showScore(){
    resetState();
    question.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleElement(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleElement();
    }else{
        startQuiz();
    }
})
startQuiz();
