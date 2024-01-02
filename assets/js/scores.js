const scores = document.querySelector("#highscores");
const clear = document.querySelector("#clear");

function showScore() {
  let scoreTable = JSON.parse(localStorage.getItem("score"));
  scoreTable.sort(function(a,b){return b.score - a.score});
  for (i in scoreTable){
    let elemLi = document.createElement("li");
    elemLi.textContent = scoreTable[i].name + " - " + scoreTable[i].score;
    scores.appendChild(elemLi);  
  }
}

clear.addEventListener("click",function(e){
  localStorage.removeItem("score");
  scores.innerHTML = "";
})

showScore();