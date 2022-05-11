var welcomeDiv = document.getElementById("welcome");
var startButton = document.querySelector(".start");
var h1El = document.querySelector("h1");
var pEl = document.querySelector("p");
var highScoresEl = document.getElementById("view-high-scores");
var highScoresDiv = document.getElementById("high-scores");
var timeEl = document.getElementById("timer");
var backButton = document.querySelector(".back");
var questionAndAnswersDiv = document.querySelector(".questions-and-answers");
var questionH1 = document.querySelector(".question");
var answerButton1 = document.getElementById("answer1");
var answerButton2 = document.getElementById("answer2");
var answerButton3 = document.getElementById("answer3");
var answerButton4 = document.getElementById("answer4");
var nextButton = document.getElementById("next");
var formEl = document.querySelector("form");
var submitButton = document.querySelector("#submit");
var nameInput = document.querySelector("#name");
var ul = document.getElementById("dynamic-list");
var li = document.createElement("li");
var minutes = 9;
var seconds = 60;

var questions = [
  {
    id: 0,
    question:
      "What is the correct way to call the random method on the Math global object?",
    answers: [
      {
        answer: "math.random()",
        correct: false,
      },
      {
        answer: "Math.random()",
        correct: true,
      },
      {
        answer: "math.Random()",
        correct: false,
      },
      {
        answer: "Math.Random()",
        correct: false,
      },
    ],
  },
  {
    id: 1,
    question: "What is the correct way to call a string's built-in method?",
    answers: [
      {
        answer: "'helloWorld'.toUpperCase();",
        correct: true,
      },
      {
        answer: "toUpperCase('helloWorld');",
        correct: false,
      },
      {
        answer: ".toUpperCase('helloWorld');",
        correct: false,
      },
      {
        answer: "helloWorld'.toUpperCase;",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    question: "Arrays are _________ indexed",
    answers: [
      {
        answer: "not",
        correct: false,
      },
      {
        answer: "falsely",
        correct: false,
      },
      {
        answer: "zero",
        correct: true,
      },
      {
        answer: "even",
        correct: false,
      },
    ],
  },
  {
    id: 3,
    question: "Which of the follow is NOT a type of loop?",
    answers: [
      {
        answer: "for",
        correct: false,
      },
      {
        answer: "while",
        correct: false,
      },
      {
        answer: "do while",
        correct: false,
      },
      {
        answer: "console.log()",
        correct: true,
      },
    ],
  },
  {
    id: 4,
    question: "true and false are a ___________ data type?",
    answers: [
      {
        answer: "string",
        correct: false,
      },
      {
        answer: "boolean",
        correct: true,
      },
      {
        answer: "integer",
        correct: false,
      },
      {
        answer: "complicated",
        correct: false,
      },
    ],
  },
  {
    id: 5,
    question:
      "Which of the following statements is the correct way to declare a variable in javaScript: ",
    answers: [
      {
        answer: "var x = 5;",
        correct: false,
      },
      {
        answer: "let x = 5;",
        correct: false,
      },
      {
        answer: "const x = 5;",
        correct: false,
      },
      {
        answer: "All the statements above are correct.",
        correct: true,
      },
    ],
  },
  {
    id: 6,
    question: "Which best defines a variable with block scope?",
    answers: [
      {
        answer: "A variable that is available outside of a block.",
        correct: false,
      },
      {
        answer: "A variable that is available within a function.",
        correct: false,
      },
      {
        answer:
          "A variable that is defined within a block and only available inside a block.",
        correct: true,
      },
      {
        answer: "A variable that is available throughout a program.",
        correct: false,
      },
    ],
  },
  {
    id: 7,
    question: "JSON stands for ____________.",
    answers: [
      {
        answer: "JavaScript Operational Notation",
        correct: false,
      },
      {
        answer: "Java Situational Objects Notation",
        correct: false,
      },
      {
        answer: "JavaScript Object Notation",
        correct: true,
      },
      {
        answer: "JavaScript Order Namespace",
        correct: false,
      },
    ],
  },
  {
    id: 8,
    question:
      "If isConfused equals true, which of the following expressions evaluates to true?",
    answers: [
      {
        answer: "isConfused !== false",
        correct: true,
      },
      {
        answer: "!isConfused",
        correct: false,
      },
      {
        answer: "isConfused === false",
        correct: false,
      },
      {
        answer: "!isConfused === true",
        correct: false,
      },
    ],
  },
  {
    id: 9,
    question: "Which of the following variables contains a truthy value?",
    answers: [
      {
        answer: "let dataEntry = ''",
        correct: false,
      },
      {
        answer: "let dataEntry = 'false'",
        correct: true,
      },
      {
        answer: "let dataEntry = 0",
        correct: false,
      },
      {
        answer: "let dataEntry = false",
        correct: false,
      },
    ],
  },
];

var goBack = function () {
  window.location.reload();
};

var id = 0;
var score = 0;
var displayQuestionAndAnswer = function (id) {
  // check if time has run out and if so end game

  if (minutes <= 0 && seconds <= 0) {
    timeEl.innerHTML = "Time's up!";
    gameOver();
  }
  // stop displaying welcome text
  welcomeDiv.style.display = "none";

  // make question and answer div visible
  questionAndAnswersDiv.style.display = "block";

  // display question
  questionH1.innerText = questions[id].question;

  // display answers
  answerButton1.innerText = questions[id].answers[0].answer;
  answerButton2.innerText = questions[id].answers[1].answer;
  answerButton3.innerText = questions[id].answers[2].answer;
  answerButton4.innerText = questions[id].answers[3].answer;

  //iterating through answers to find if it is correct and adding points if it is
  var answers = document.querySelectorAll(".answer");
  answers.forEach(function (element, index) {
    element.addEventListener("click", function () {
      if (id < questions.length - 1) {
        if (questions[id].answers[index].correct) {
          // increase score by one if answer is correct
          score++;
          console.log("Correct!");
        } else {
          minutes--;
          console.log("Wrong");
        }
        id++;
        return displayQuestionAndAnswer(id);
      } else {
        gameOver();
      }
    });
  });

};

var gameOver = function () {
  // stop timer
  timeEl.innerHTML = "Game Over";
  // display score
  questionAndAnswersDiv.style.display = "none";
  highScoresEl.style.display = "none";
  highScoresDiv.style.display = "block";
  formEl.style.display = "block";
  backButton.style.display = "none";

  // add click event to submit form and display results
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("name", nameInput.value.trim());
    localStorage.setItem("score", score);
    displayHighScores();
  });
};

var displayHighScores = function () {
  // hide questions container div
  questionAndAnswersDiv.style.display = "none";
  welcomeDiv.style.display = "none";
  highScoresEl.style.display = "none";
  formEl.style.display = "none";
  timeEl.style.display = "none";
  highScoresDiv.style.display = "block";
  backButton.style.display = "block";
  // get local storage item name
  var name = localStorage.getItem("name");
  // get local storage item score
  var userScore = localStorage.getItem("score");
  // set text to display
  if (!name && !userScore) {
    li.innerText = `There are currently no high scores!`;
    ul.appendChild(li);
  } else {
    li.innerText = `Name: ${name} Score: ${userScore}`;
    ul.appendChild(li);
  }
};

var startTimer = function () {
  timeEl.style.display = "block";
  var timer = setInterval(function () {
    timeEl.innerHTML = `${minutes} minutes ${seconds} seconds`;
    seconds--;
    if (minutes < 1) {
      timeEl.innerHTML = `${seconds} seconds`;
      timeEl.style.color = "#DE3163";
    }
    if (minutes <= 0 && seconds <= 0) {
      timeEl.innerHTML = "Time's up!";
      clearInterval(timer);
      displayHighScores();
    }
    if (seconds === 00) {
      minutes--;
      seconds = 60;
    }
  }, 1000);
};

var startQuiz = function () {
  pEl.remove();
  startButton.remove();
  displayQuestionAndAnswer(0);
  startTimer();
};

startButton.addEventListener("click", startQuiz);
highScoresEl.addEventListener("click", displayHighScores);
backButton.addEventListener("click", goBack);