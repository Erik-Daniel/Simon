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
let computerRerunTimes = 0;
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
    
    console.log("start game");
    computerTurn();
}

//allow pressing on squares
function yourTurn() {
    
    console.log("person turn");
    personTurnCount += 1;
    red.style.pointerEvents = "auto";
    blue.style.pointerEvents = "auto";
    yellow.style.pointerEvents = "auto";
    green.style.pointerEvents = "auto";
    
}

//remove pressing on squares
function removePlayerTurn() {
    
    console.log("removePlayerTurn");
    red.style.pointerEvents = "none";
    blue.style.pointerEvents = "none";
    yellow.style.pointerEvents = "none";
    green.style.pointerEvents = "none";
    

}


//computer plays
function computerTurn() {
    
    console.log("computerTurn");
    removePlayerTurn();
    clearTimeout(computerTurnTime);
    
    yourPlays = [];
    
    personTurnCount = 0;
    
     rerunComputerPlays();

   

}

function computerPlay() {
    
    computerRerunTimes = 0;
    console.log("computerPlay");
    let randomNumber = Math.floor(Math.random() * (4 - 1) + 1);
    let randomColor = colors[randomNumber];
    
     cubeClicked(randomColor);
     
}
//rerun plays of computer
function rerunComputerPlays() {
    
    console.log("rerunComputerPlays");
    if(computerPlays.length != 0){
        console.log("rerun 1")
        if(computerRerunTimes < computerPlays.length){
            console.log("rerun 2")
            handleClickDesign(computerPlays[computerRerunTimes], true);
           
        }
        
        else {
            console.log("rerun 3")

            computerPlay();
        }
    }
    else {
        console.log("Rerun 4");
        computerPlay();
    }
}



//press on square // picked a color
function cubeClicked(color){
    
    console.log("cubeclicked");
    handleClickMemory(color);
    handleClickDesign(color);
    removePlayerTurn();
    comparePlays();
     time = setTimeout( function() {resetColors(false); handleTurn()} ,1000) 
}

// store clicks
function handleClickMemory(color) {
    
    console.log("handleClickMemory");
    if(turn === "person"){
        yourPlays.push(color);
    }
    else {
        computerPlays.push(color); 
    }

}

function handleClickDesign(color, rerun){
    
    console.log("handleClickDesign");
    window[color].style = "opacity: 50%";


    if(rerun){ 
        computerRerunTimes += 1;
        clearTimeout(resetColorTime);
       resetColorTime = setTimeout(3000, resetColors(rerun));
    }


}

// your pick vs computer pick
function comparePlays() {
    
    console.log("comparePlays");

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
    
    console.log("gameOVer");
}
// reset colors back to original 
function resetColors(rerun) {
    
    console.log("resetColors");
    red.style = "opacity: 100%";
    blue.style = "opacity: 100%";
    yellow.style = "opacity: 100%";
    green.style = "opacity: 100%";

    console.log(rerun)
    if(rerun){
        rerunComputerPlays();
    }
   
}
// whos turn it is after square picks
function handleTurn() {
    
    console.log("handleTurn");
    console.log("computer plays " + computerPlays);
    console.log("your plays " + yourPlays);
    clearTimeout(time);
    if(turn === "computer"){
        turn = "person";
        yourTurn();
    }
    else {
        if(personTurnCount === computerPlays.length){
            turn = "computer";
            computerTurnTime = setTimeout(1000, computerTurn());
  
            
        }
        else {
            yourTurn();
        }
    }
}


    


startGame();
