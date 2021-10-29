let currentQuestion = 0;
let correctAnswers = 0;

document.querySelector(".progress--bar").style.width = 0;
document.querySelector(".home_screen button").addEventListener("click", showQuestion);
document.querySelector(".scoreArea button").addEventListener("click", resetQuiz);

function showQuestion() {
    if(questions[currentQuestion]) {
        let question = questions[currentQuestion];

        let progressBarPercentage = (currentQuestion * 100) / questions.length;
        document.querySelector(".progress--bar").style.width = `${progressBarPercentage}%`;

        document.querySelector(".question").innerHTML = question.question;
        let optionsHTML = "";
        question.options.map((item, index) => {
            optionsHTML += `<div data-op="${index}" class="option"><span>${index + 1}</span>${item}</div>`;
        });
        document.querySelector(".options").innerHTML = optionsHTML;

        document.querySelector(".home_screen").style.display = "none";
        document.querySelector(".scoreArea").style.display = "none";
        document.querySelector(".questionArea").style.display = "block";

        document.querySelectorAll(".option").forEach(item => {
            item.addEventListener("click", optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(event) {
    let answer = parseInt(event.target.getAttribute("data-op"));
    if(questions[currentQuestion].answer === answer) {
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let correctAnswersPercentage = Math.round((correctAnswers * 100) / questions.length);
    let scoreText1 = document.querySelector(".scoreText1");
    let scorePct = document.querySelector(".scorePct");

    if(correctAnswersPercentage < 30) {
        scoreText1.innerHTML = "Ta mau em?!";
        scorePct.style.color = "#f00";
    } else if(correctAnswersPercentage >= 30 && correctAnswersPercentage < 50) {
        scoreText1.innerHTML = "Precisa melhorar";
        scorePct.style.color = "#ff0";
    } else if(correctAnswersPercentage >= 50 && correctAnswersPercentage < 60) {
        scoreText1.innerHTML = "Mais ou menos";
        scorePct.style.color = "#86ec00";
    } else if(correctAnswersPercentage >= 60) {
        scoreText1.innerHTML = "Parabéns, você foi bem!";
        scorePct.style.color = "#0d630d";
    }

    scorePct.innerHTML = `Acertou ${correctAnswersPercentage}%`;
    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

    document.querySelector(".questionArea").style.display = "none";
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".progress--bar").style.width = "100%";
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
}