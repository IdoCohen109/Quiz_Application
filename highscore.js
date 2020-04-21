const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//iterate on each high score with map function and add a li tag to each high score
//map() gives you the ability to change the array value into something else you define and return the array with the modified values
highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
});