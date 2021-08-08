const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

const colors = ["red","blue","yellow","green"];
let computerPlays = [];
let yourPlays = []
let turn = "computer";
let time;
let personTurnCount = 0;
let computerTurnCount = 0;
let computerTurnTime;
let resetColorTime;
red.addEventListener("click", function() {cubeClicked("red")});
blue.addEventListener("click", function() {cubeClicked("blue")});
yellow.addEventListener("click", function() {cubeClicked("yellow")});
green.addEventListener("click", function() {cubeClicked("green")});

//computer picks
// you pick
// computer pick vs your pick
// if true computer repeat pick
// after repeat computer pick new color


function startGame() {
    computerTurn();
}



function computerTurn() {
    removePlayerTurn();
    clearTimeout(computerTurnTime);
    yourPlays = [];
    personTurnCount = 0;
    rerunComputerPlays();
    let randomNumber = Math.floor(Math.random() * (4 - 1) + 1);
    let randomColor = colors[randomNumber];
 
     cubeClicked(randomColor);

}

function rerunComputerPlays() {
     for(let i = 0; i < computerPlays.length; i ++) {

       handleClickDesign(computerPlays[i], true);
     }
}

function yourTurn() {
    personTurnCount += 1;
    red.style.pointerEvents = "auto";
    blue.style.pointerEvents = "auto";
    yellow.style.pointerEvents = "auto";
    green.style.pointerEvents = "auto";
}

function removePlayerTurn() {
    red.style.pointerEvents = "none";
    blue.style.pointerEvents = "none";
    yellow.style.pointerEvents = "none";
    green.style.pointerEvents = "none";

}
   
function cubeClicked(color){
    
    handleClickMemory(color);
    handleClickDesign(color);
    removePlayerTurn();
    console.log("computer Plays " + computerPlays); 
    console.log("your Plays " + yourPlays);
    console.log("turn " + personTurnCount);
    comparePlays();
    
     time = setTimeout( function() {resetColors(); handleTurn()} ,1000) 
}


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
        clearTimeout(resetColorTime);
       resetColorTime = setTimeout(1000, resetColors());
    }


}


function comparePlays() {

    if(computerPlays[personTurnCount - 1] != yourPlays[personTurnCount - 1]){
        gameOver();
    }


    // for(let i = 0; i < computerPlays.length; i++){
    //     if(computerPlays[i] != yourPlays[i]){
    //        gameOver();
    //     }
    //     else {
    //         computerPlays();
    //     }
    // }
    
}

function gameOver() {
    console.log("you lost");
}

function resetColors(color) {
    red.style = "opacity: 100%";
    blue.style = "opacity: 100%";
    yellow.style = "opacity: 100%";
    green.style = "opacity: 100%";
   
}

function handleTurn() {
    clearTimeout(time);
    if(turn === "computer"){
        turn = "person";
        yourTurn();
    }
    else {
        if(personTurnCount === computerPlays.length){
            turn = "computer";
            computerTurnTime = setTimeout(200, computerTurn());
  
            
        }
        else {
            yourTurn();
        }
    }
}


    


startGame();
