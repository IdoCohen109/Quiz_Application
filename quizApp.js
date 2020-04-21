const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); // Array.from creates us an array with the HTML objects we define with class of "choice-text"

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full')

let currentQuestion = {};
let acceptingAnswers = false; // flag to indicate if we can accept more question to answer
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//Fetch question from json file (local file)
fetch("questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions)
        questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        console.error(err);
    });

// CONSTANTS 
const CORRECT_BONUS = 10; //answer correct value
const MAX_QUESTIONS = 3; //how many question user got before they finish

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // using spread operator in order to get all the questions from "questions" array and fill them inside new array of "availableQuestions"
    getNewQuestion();
}

getNewQuestion = () => {
    //check if available questions are done
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //update the progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']; // this is how we can access the custom data attribute we created
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1); //will remove (splice) the question we already answered on
    console.log(availableQuestions)

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", el => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = el.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        //check if the selected choice is the correct choice
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply)
        if (classToApply == "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};