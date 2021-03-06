var $start = document.querySelector("#start");
var $game = document.querySelector("#game");
var $time = document.querySelector("#time");
var $result = document.querySelector("#result");
var $timeHeader = document.querySelector("#time-header");
var $resultHeader = document.querySelector("#result-header");
var $gameTime = document.querySelector("#game-time");

var score = 0; //to track score of the game
var gameStarted = false;
var colors = ['#b69e45', '#68b6e4', '#a16967', '#28651c', '#7e51e3', '#b9357a', '#8b7115', '#3bc53a', '#9e221a'];

$start.addEventListener("click", startGame); //anonymous function can be executed within this line, otherwise it has to be a separate line.
$game.addEventListener("click", handleBoxClick); //box clicking part
$gameTime.addEventListener("input", setGameTime);

function startGame(){
    score = 0;
    setGameTime();
    $gameTime.setAttribute("disabled", "true");
    gameStarted = true;
    //removes button and changes background to white:
    $start.classList.add("hide");
    $game.style.backgroundColor = "#fff";

    var interval = setInterval(function(){
        let time = parseFloat($time.textContent); //local variable
        if (time <= 0) {
            clearInterval(interval);
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1);
        }

    }, 100)

    //initializes game with renderBox()
    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString();
}

function setGameTime() {
    var time = parseInt($gameTime.value);
    $time.textContent = time.toFixed(1);
    $timeHeader.classList.remove("hide");
    $resultHeader.classList.add("hide");
}

function endGame() {
gameStarted = false;
setGameScore();
$start.classList.remove('hide');
$gameTime.removeAttribute("disabled");
$game.style.backgroundColor = "#ccc"
$game.innerHTML = "";
$timeHeader.classList.add("hide");
$resultHeader.classList.remove("hide");
}

function handleBoxClick(event){
    if (!gameStarted) { //disables click event upon game end
        return
    }

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
    var randomColorIndex = getRandom(0,colors.length); //getRandom would always return lower number than maximum, thus no need colors.length - 1;


    box.style.height = box.style.width = boxSize + "px";
    box.style.position = "absolute" //to position absolutely within borders of <div .game>
    box.style.backgroundColor = colors[randomColorIndex];
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