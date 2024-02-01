const Timer_id = document.querySelector("#time");
const Start_bt = document.querySelector("#start");
const Start_screen = document.querySelector("#start-screen");
const Question_area = document.querySelector("#questions");
const Question_title = document.querySelector("#question-title");
const Question_choices = document.querySelector("#choices");
const Feedback = document.querySelector("#feedback");
const EndScreen = document.querySelector("#end-screen");
const FinalScore = document.querySelector("#final-score");
const SubmitBt = document.querySelector("#submit");
const InitialInp = document.querySelector("#initials");

console.log(process.env.APIKey);

var TimeLeft = 75;
var Finished = false;
var QuestionNumber = 1;

function countDown() {
  const timer = setInterval(function () {
    Timer_id.textContent = TimeLeft;
    TimeLeft--;
    if (TimeLeft === 0 || Finished) {
      clearInterval(timer);
      Timer_id.textContent = TimeLeft;
      Question_area.setAttribute("class", "hide");
      EndScreen.setAttribute("class", "wrapper");
      FinalScore.textContent = TimeLeft;
    }
  }, 1000);
}

Start_bt.addEventListener("click", function (e) {
  Start_screen.innerHTML = "";
  countDown();
  Question_area.setAttribute("class", "wrapper");
  QandA();
})

function QandA() {
  if (QuestionNumber > Object.keys(questions).length) {
    Finished = true;
  }
  else {
    Question_title.textContent = questions[QuestionNumber]["question-title"];
    Question_choices.innerHTML = "";
    for (j in questions[QuestionNumber].choices) {
      const bt = document.createElement("button");
      bt.setAttribute("data-index", parseInt(j) + 1);
      bt.textContent = `${parseInt(j) + 1}. ${questions[QuestionNumber].choices[j]}`;
      Question_choices.appendChild(bt);
    }
  }
}

function FeedBack(display) {
  Feedback.setAttribute("class", "feedback");
  Feedback.textContent = display;
  let WaitTime = 1
  const wait = setInterval(function () {
    WaitTime--;
    if (WaitTime === 0) {
      Feedback.setAttribute("class", "feedback hide");
      Feedback.textContent = "";
      clearInterval(wait);
    }
  }, 1000)
}

Question_choices.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    if (questions[QuestionNumber].answer == e.target.getAttribute("data-index")) {
      FeedBack("Correct!");
      QuestionNumber++;
      QandA();
    }
    else {
      FeedBack("Wrong!");
      if (TimeLeft - 15 < 0) {
        TimeLeft = 1;
      }
      else {
        TimeLeft = TimeLeft - 15;
      }
      QuestionNumber++;
      QandA();
    }
  }
})

SubmitBt.addEventListener("click", function (e) {
  let name = InitialInp.value;
  let score = TimeLeft;
  let scoreTable = JSON.parse(localStorage.getItem("score"));
  if (scoreTable !== null) {
    scoreTable.push({ "name": name, "score": score });
    localStorage.setItem("score", JSON.stringify(scoreTable));
  }
  else {
    let scoreArray = [];
    scoreArray.push({ "name": name, "score": score });
    localStorage.setItem("score", JSON.stringify(scoreArray));
  }
  InitialInp.value = "";
  window.location.href = "highscores.html";
}
)
