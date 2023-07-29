var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
var buttonColors = ["red","blue","green","yellow"];


$("body").keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
    
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    
    checkAnswer(userClickedPattern.length-1);
});



function nextSequence(){
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random() * 4);
    var randomColorChosen=buttonColors[randomNumber];
    gamePattern.push(randomColorChosen);
    var a="#"+randomColorChosen;
    $(a).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level " + level);
    playSound(randomColorChosen)
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    
    setTimeout(function () {
      $("#" + currentcolor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      
      if (userClickedPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over").dequeue().delay(100).queue(function () {
        $(this).removeClass("game-over")});
      $("#level-title").text("Game Over, Press Any Key to Restart")
      startOver();  
      console.log("wrong");

    }

}
function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}


