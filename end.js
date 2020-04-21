//VARIABLES
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("final-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const MAX_HIGH_SCORES = 5;

//set an array of high score into the local storage using Jason.Stringify because when we write only [] it will save empty string
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //the "||" is to avoid null value


finalScore.innerText = mostRecentScore; // present the recent score of the game and take the value from local storage which we define in quizApp in getNewQuestion()


username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value; //this will set disable to "true" if the username.value is falsy and true if there will be text inside
})

saveHighScore = (e) => {
    console.log("")
    e.preventDefault(); //form will not take its default action while pressing the button and "POST" to new page
    const score = {
        score: mostRecentScore,
        name: username.value
    }
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score); //sort is a built-in function in Java script which allow us to sort the array. in this case we are sorting from top to low score

    //allow only 5 scores to be in the array
    highScores.splice(MAX_HIGH_SCORES);

    //update local storage with the high scores array after splice
    localStorage.setItem("highScores", JSON.stringify(highScores));

    //return home when done
    window.location.assign("/index.html");
};