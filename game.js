const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const play = document.getElementById("play");
const colors = ["red","blue","yellow","green"];
let computerPlays = [];
let yourPlays = []
let turn = "computer";
let time;
let personTurnCount = 0;
let computerTurnCount = 0;
let computerTurnTime;
let resetColorTime;
let computerRerunTimes = 0;
red.addEventListener("click", function() {cubeClicked("red")});
blue.addEventListener("click", function() {cubeClicked("blue")});
yellow.addEventListener("click", function() {cubeClicked("yellow")});
green.addEventListener("click", function() {cubeClicked("green")});


removePlayerTurn();
function startGame() {
    computerTurn();
}

//allow pressing on squares
function yourTurn() {
    personTurnCount += 1;
    red.style.pointerEvents = "auto";
    blue.style.pointerEvents = "auto";
    yellow.style.pointerEvents = "auto";
    green.style.pointerEvents = "auto";
    
}

//remove pressing on squares
function removePlayerTurn() {
    red.style.pointerEvents = "none";
    blue.style.pointerEvents = "none";
    yellow.style.pointerEvents = "none";
    green.style.pointerEvents = "none";
    

}


//computer plays
function computerTurn() {
    removePlayerTurn();
    clearTimeout(computerTurnTime);
    yourPlays = [];
    personTurnCount = 0;
     rerunComputerPlays();
}

function computerPlay() {
    computerRerunTimes = 0;
    let randomNumber = Math.floor(Math.random() * (3));
    let randomColor = colors[randomNumber];
    cubeClicked(randomColor);
     
}
//rerun plays of computer
function rerunComputerPlays() {
    if(computerPlays.length != 0){
        if(computerRerunTimes < computerPlays.length){
            handleClickDesign(computerPlays[computerRerunTimes], true);     
        }
        else {
            computerPlay();
        }
    }
    else {
        computerPlay();
    }
}



//press on square // picked a color
function cubeClicked(color){
    handleClickMemory(color);
    handleClickDesign(color);
    handleClickAudio(color);
    removePlayerTurn();
    comparePlays();
    time = setTimeout( function() {resetColors(false); handleTurn()} ,1000) 
}

// store clicks
function handleClickMemory(color) {
    if(turn === "person"){
        yourPlays.push(color);
    }
    else {
        computerPlays.push(color); 
    }

}

function handleClickDesign(color, rerun){
    window[color].style = "opacity: 50%";
    if(rerun){ 
        handleClickAudio(computerPlays[computerRerunTimes]);
        computerRerunTimes += 1;
        clearTimeout(resetColorTime);
       resetColorTime = setTimeout(function(){resetColors(rerun)},1000);
    }


}

function handleClickAudio(color){
    let audio = new Audio("assets/" + color + ".mp3");
     audio.play();
    
}

// your pick vs computer pick
function comparePlays() {
    if(computerPlays[personTurnCount - 1] != yourPlays[personTurnCount - 1]){
        gameOver();
    }
    
}

// reset colors back to original 
function resetColors(rerun) {
    red.style = "opacity: 100%";
    blue.style = "opacity: 100%";
    yellow.style = "opacity: 100%";
    green.style = "opacity: 100%";

    if(rerun){
        clearTimeout(resetColorTime);
        resetColorTime = setTimeout(function() {rerunComputerPlays();}, 500); 
    }
}
// whos turn it is after square picks
function handleTurn() {
    clearTimeout(time);
    if(turn === "computer"){
        turn = "person";
        yourTurn();
    }
    else {
        if(personTurnCount === computerPlays.length){
            turn = "computer";
            computerTurnTime = setTimeout(function() {computerTurn()},500 );
        }
        else {
            yourTurn();
        }
    }
}
function gameOver() {
    console.log("gameOver");
}

play.addEventListener("click", function() {
    startGame();
})