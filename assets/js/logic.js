document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const startBtn = document.getElementById("start");
    const questionTitle = document.getElementById("question-title");
    const choicesContainer = document.getElementById("choices");
    const timerSpan = document.getElementById("time");
    const finalScoreSpan = document.getElementById("final-score");
    const initialsInput = document.getElementById("initials");
    const submitBtn = document.getElementById("submit");
    const startScreen = document.getElementById("start-screen");
    const questionsScreen = document.getElementById("questions");
    const endScreen = document.getElementById("end-screen");
    const feedbackDiv = document.getElementById("feedback");
  
    // Other Variables
    var currentQuestionIndex = 0;
    let timerSeconds = 20; // Initial timer value in seconds
    let timerInterval;
    const penaltyTime = 10
  
    // Event Listeners
    startBtn.addEventListener("click", startQuiz);
    choicesContainer.addEventListener("click", checkAnswer);
    submitBtn.addEventListener("click", saveScore);
  
    // Function to start the quiz
    function startQuiz() {
      startScreen.classList.add("hide");
      questionsScreen.classList.remove("hide");
      startTimer();
      displayQuestion();
    }
  
    // Function to display a question
    function displayQuestion() {
      var currentQuestion = questions[currentQuestionIndex];
      questionTitle.textContent = currentQuestion.question;
      choicesContainer.innerHTML = "";
  
      for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("button");
        choice.textContent = currentQuestion.choices[i];
        choice.setAttribute("data-index", i);
        choicesContainer.appendChild(choice);
      }
    }
  
    // Function to check the selected answer
    function checkAnswer(event) {
        event.stopPropagation();
      if (event.target.matches("button")) {
        var selectedAnswer = event.target.textContent;
        var correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
        if (selectedAnswer === correctAnswer) {
          feedbackDiv.textContent = "Correct!";
        } else {
          feedbackDiv.textContent = "Incorrect!";
          timerSeconds -= penaltyTime; // Penalty for incorrect answer
        }
  
        feedbackDiv.classList.remove("hide");
        setTimeout(function () {
          feedbackDiv.classList.add("hide");
        }, 1000);
  
        currentQuestionIndex++;
  
        if (currentQuestionIndex < questions.length) {
          displayQuestion();
        } else {
          endQuiz();
        }
      }
    }
  
    // Function to start the timer
    function startTimer() {
      timerInterval = setInterval(function () {
        timerSeconds--;
  
        if (timerSeconds <= 0) {
          endQuiz();
        }
  
        timerSpan.textContent = timerSeconds;
      }, 1000);
    }
  
    // Function to end the quiz
    function endQuiz() {
      clearInterval(timerInterval);
      questionsScreen.classList.add("hide");
      endScreen.classList.remove("hide");
      finalScoreSpan.textContent = timerSeconds;
    }
  
    function saveScore(event) {
        event.preventDefault();
        var initials = initialsInput.value.toUpperCase();
        var finalScore = parseInt(finalScoreSpan.textContent);
    
        // Add your logic to save the initials and score in local storage
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        highscores.push({ initials: initials, score: finalScore });
        localStorage.setItem("highscores", JSON.stringify(highscores));
    
        // Redirect to highscores page
        window.location.href = "highscores.html";
      }
  });
  