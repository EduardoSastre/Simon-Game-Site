var colorSequence = [];

function addColorSequence() {

      //Select random color
      var randomNumber = Math.floor(Math.random() * 4);
      var colors = ["green", "yellow", "red", "blue"];
      var pickRandomColor = colors[randomNumber];

      //Save random color
      colorSequence.push(pickRandomColor);

      //Modify button properties
      $("#" + pickRandomColor).fadeOut(250).fadeIn(250);

      //Play music
      music(pickRandomColor);

}


function music(currentColor) {

      var audio = new Audio("sounds/" + currentColor + ".mp3");
      audio.play();

}


function animateButtonPressed(buttonPressed) {

      $("#" + buttonPressed).addClass("pressed");

      setTimeout(function() {
            $("#" + buttonPressed).removeClass("pressed");
      }, 100);

}


function newLevel() {

      if (startGame === true) {

            var wait = 0;

      } else {

            var wait = 800;

      }

      setTimeout(function() {
            addColorSequence();
            sequence = 0;
            level++;
            $("h1").text("Level " + level);
      }, wait);

}


function resetGame() {

      $("h1").text("Press A Key to Start");
      $("body").removeClass("game-over");
      level = 0;
      sequence = 0;
      colorSequence = [];
      lose = false;
      startGame = true;

}

function gameOver() {

      $("h1").text("You lose, press any button to restart");
      $("body").addClass("game-over");
      lose = true;

}

//addEventListener click to buttons
$(".btn").click(function() {

      var colorPressed = $(this).attr('id');

      if (colorSequence[sequence] === colorPressed && lose === false) {

            animateButtonPressed(colorPressed);
            music(colorPressed);

            if (colorSequence.length - 1 === sequence) {

                  newLevel();

            } else if (startGame === false) {

                  sequence++;

            }

      } else {

            gameOver();
      }

});


//Start game
var level = 0;
var sequence = 0;
var lose = false;
var startGame = true;


$(document).keypress(function(event) {

      if (event.key === "a" && startGame === true) {

            newLevel();
            startGame = false;

      }

      if (lose === true) {

            resetGame();

      }

});
