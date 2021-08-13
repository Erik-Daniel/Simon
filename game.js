const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");
const play = document.getElementById("play");
const colors = ["red","blue","yellow","green"];
const roundText = document.getElementById("round-text");
const modal = document.getElementById("modal");
const playAgain = document.getElementById("modal-play");
const menu = document.getElementById("modal-menu");
let modalHeadding = document.getElementById("modal-headding");
let computerPlays = [];
let yourPlays = []
let turn = "computer";
let time;
let personTurnCount = 0;
let computerTurnCount = 0;
let computerTurnTime;
let resetColorTime;
let computerRerunTimes = 0;
let rounds = 1;
let speed = 500;
let pause = false;
red.addEventListener("click", function() {cubeClicked("red")});
blue.addEventListener("click", function() {cubeClicked("blue")});
yellow.addEventListener("click", function() {cubeClicked("yellow")});
green.addEventListener("click", function() {cubeClicked("green")});

playAgain.addEventListener("click",function() {restart(); startGame();});
menu.addEventListener("click",function() {location.reload()});


removePlayerTurn();
function startGame() {
    
roundText.style.visibility = "visible";
roundText.textContent = "Round:" + rounds;
     hideButtons();
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
    console.log("computer turn and " + blue.style.pointerEvents)
    clearTimeout(computerTurnTime);
    yourPlays = [];
    personTurnCount = 0;
     rerunComputerPlays();
}

function computerPlay() {
    computerRerunTimes = 0;
    let randomNumber = Math.floor(Math.random() * (4));
    let randomColor = colors[randomNumber];
    cubeClicked(randomColor);
     
}
//rerun plays of computer
function rerunComputerPlays() {
    console.log("event " + red.style.pointerEvents)
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
    time = setTimeout( function() {resetColors(false); handleTurn()} ,speed) 
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
        removePlayerTurn();
        handleClickAudio(computerPlays[computerRerunTimes]);
        computerRerunTimes += 1;
        clearTimeout(resetColorTime);
       resetColorTime = setTimeout(function(){resetColors(rerun)},speed);
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
        removePlayerTurn();
        clearTimeout(resetColorTime);
        resetColorTime = setTimeout(function() {rerunComputerPlays();}, speed); 
    }
}
// whos turn it is after square picks
function handleTurn() {
    clearTimeout(time);
    if(turn === "computer"){
        if(!pause){
        turn = "person";
        yourTurn();
        
        }
        
    }
    else {
        if(personTurnCount === computerPlays.length){
            
            updateRounds();
            handleRounds();
            if(!pause){
                turn = "computer";
                removePlayerTurn();
                computerTurnTime = setTimeout(function() {computerTurn()},speed);
            }
        }
        else {
            if(!pause){
            yourTurn();
            }
            
        }
    }
    console.log("turn = " + turn);
}
function gameOver() {
    pause = true;
    updateModalHeadding("Wrong Color","You Lost");;
}

play.addEventListener("click", function() {
    startGame();

});



function hideButtons() {
    play.style.visibility = "hidden";
}


function handleRounds() {
    console.log("rounds =  " + rounds);
    
    console.log("speed =  " + speed);
    switch (rounds) {
        case 5:
        console.log("1")
        speed = 400;
        break;
        case 10:
            
        console.log("2")
        speed = 350;
        break;
        case 15:
            
        console.log("3")
        speed = 300;
        break;
        case 20:
            
        console.log("3")
        speed = 250;
        break;      
        case 30:
        
            console.log("4")
        speed = 200;

        break;
        case 40:
            
        console.log("5")
        speed = 100;
        break;  
        case 50:
        winner();
        break;
    }
}

function updateRounds() {
    rounds += 1;
    roundText.textContent = "Round:" + rounds;
}

function winner() {
    pause = true;
    updateModalHeadding("CONGRATULATIONS","YOU WON");


}

function updateModalHeadding(text1, text2 ){
    modalHeadding.textContent = "";
    let lineBreak = document.createElement("br");
    let part1 = document.createTextNode(text1);
    let part2 = document.createTextNode(text2);

    
    modalHeadding.appendChild(part1);
    modalHeadding.appendChild(lineBreak);
    modalHeadding.appendChild(part2);
    
    
    modal.style.display = "flex";
}

function restart() {
    modal.style.display = "none";
    computerPlays = [];
    yourPlays = [];    
    computerRerunTimes = 0;
    personTurnCount = 0;
    computerTurnCount = 0;
    rounds = 1;
    speed = 500;
    pause = false;
    turn = "computer";
    clearTimeout(time);
    clearTimeout(resetColorTime);

}

