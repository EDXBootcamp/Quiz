document.addEventListener("DOMContentLoaded", function () {
    // Elements
    var highscoresList = document.getElementById("highscores");
    var clearButton = document.getElementById("clear");
  
    // Event Listeners
    clearButton.addEventListener("click", clearHighscores);
  
    // Load high scores when the page is loaded
    loadHighscores();
  
    // Function to load high scores from local storage
    function loadHighscores() {
      // Get high scores from local storage or initialize an empty array
      var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
      // Sort high scores in descending order
      highscores.sort(function (a, b) {
        return b.score - a.score;
      });
  
      // Display high scores in the list
      for (var i = 0; i < highscores.length; i++) {
        var li = document.createElement("li");
        li.textContent = highscores[i].initials + " - " + highscores[i].score;
        highscoresList.appendChild(li);
      }
    }
  
    // Function to clear high scores
    function clearHighscores() {
      // Clear high scores from local storage
      localStorage.removeItem("highscores");
  
      // Clear the displayed high scores on the page
      highscoresList.innerHTML = "";
    }
  });
  