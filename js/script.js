var $start = document.querySelector("#start");
var $game = document.querySelector("#game");

var score = 0; //to track score of the game

$start.addEventListener("click", startGame); //anonymous function can be executed within this line, otherwise it has to be a separate line.
$game.addEventListener("click", handleBoxClick); //box clicking part

function startGame(){
    //removes button and changes background to white:
    $start.classList.add("hide");
    $game.style.backgroundColor = "#fff";

    //initializes game with renderBox()
    renderBox()
}

function handleBoxClick(event){
    if (event.target.dataset.box) {
        score++; //upon each click will increment total score
        renderBox() //resets position of the box
    }
}



function renderBox(){
    $game.innerHTML = ""; //clears out previous divs/duplicates created with #game attribute, to keep only 1 square in the game.
    var box = document.createElement("div");
    var boxSize = getRandom(30,100);
    var gameSize = $game.getBoundingClientRect(); //to get dimensions of the game field
    var maxTop = gameSize.height - boxSize; //calculating offset from the top wall, so the randomly generated cube won't go beyond borders
    var maxLeft = gameSize.width - boxSize; //calculating offset from the side wall, so the randomly generated cube won't go beyond borders



    box.style.height = box.style.width = boxSize + "px";
    box.style.position = "absolute" //to position absolutely within borders of <div .game>
    box.style.backgroundColor = "#000";
    box.style.top = getRandom(0, maxTop) + "px";
    box.style.left = getRandom(0, maxLeft) + "px";
    box.style.cursor = "pointer";
    box.setAttribute("data-box", "true"); //data-box attribute needs a value, otherwise it won't work and element will disappear

    //place div above into div .game itself:
    $game.insertAdjacentElement("afterbegin", box); //lookup MDN for syntax
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min) + min); //to get random number with each click. Simply creating variable and multiplying it by number - doesn't work. Box stays in the same spot, only initial start would affect it. It needs to be a function.
}