const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of these"],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property changes text color?",
    answers: ["font-color", "text-style", "color", "text-color"],
    correct: "color"
  },
  {
    question: "What does API stand for?",
    answers: ["Advanced Programming Interface", "Application Programming Interface", "App Performance Index", "None of the above"],
    correct: "Application Programming Interface"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  answerBtns.forEach((btn, i) => {
    btn.textContent = q.answers[i];
    btn.disabled = false;
    btn.style.backgroundColor = "#007BFF";
  });
  nextBtn.style.display = "none";
  resultEl.textContent = "";
}

function checkAnswer(btn) {
  const selected = btn.textContent;
  const correct = questions[currentIndex].correct;

  if (selected === correct) {
    btn.style.backgroundColor = "green";
    score++;
  } else {
    btn.style.backgroundColor = "red";
    answerBtns.forEach(button => {
      if (button.textContent === correct) button.style.backgroundColor = "green";
    });
  }

  answerBtns.forEach(button => button.disabled = true);
  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    questionEl.style.display = "none";
    document.getElementById("answers").style.display = "none";
    nextBtn.style.display = "none";
    resultEl.innerHTML = `🎉 You scored <strong>${score}</strong> out of ${questions.length}`;
  }
}

function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke").textContent = `${data.setup} - ${data.punchline}`;
    })
    .catch(err => {
      document.getElementById("joke").textContent = "Failed to fetch joke.";
    });
}

loadQuestion();
