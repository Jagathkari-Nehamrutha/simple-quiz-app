let questions = [];
let currentQuestion = 0;
let score = 0;

const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

fetch("/api/questions")
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

function showQuestion() {
    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    question.textContent = q.question;

    options.innerHTML = "";

    scoreDisplay.textContent = "";

    nextButton.style.display = "inline-block";
    restartButton.style.display = "none";

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.onclick = () => selectAnswer(index, button);

        options.appendChild(button);
    });
}

function selectAnswer(selected, selectedButton) {
    const correctAnswer = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(button => {
        button.disabled = true;
    });

    if (selected === correctAnswer) {
        score++;
        selectedButton.style.background = "#b7f7c1";
    } else {
        selectedButton.style.background = "#ffb7b7";
        allOptions[correctAnswer].style.background = "#b7f7c1";
    }
}

nextButton.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    questionNumber.textContent = "";

    question.textContent = "Quiz Completed!";

    options.innerHTML = "";

    nextButton.style.display = "none";

    progressBar.style.width = "100%";

    let message = "";

    if (score === questions.length) {
        message = "Excellent! 🎉";
    } else if (score >= questions.length / 2) {
        message = "Good Job! 👍";
    } else {
        message = "Keep Practicing! 💪";
    }

    scoreDisplay.textContent =
        `Your Score: ${score} / ${questions.length} - ${message}`;

    restartButton.style.display = "inline-block";
}

restartButton.onclick = () => {
    currentQuestion = 0;
    score = 0;

    showQuestion();
};