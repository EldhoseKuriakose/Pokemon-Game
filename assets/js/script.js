//initialising necessary variables
var gameArea = document.getElementById('playing-area');
var pokemon = document.getElementById('pokemon');
var pokeball = document.getElementsByClassName('pokeball')[0];
var ctrlBtns = document.getElementsByClassName('control-buttons');
var name = document.getElementsByClassName('player-name')[0];
var scoreBoard = document.getElementsByClassName('scoreboard')[0];
var msg = document.getElementsByClassName('msg')[0];
var text = "Click on New Game to Start";

var playingAreaWidth = gameArea.clientWidth;
var playingAreaHeight = gameArea.clientHeight;
var gameState = "";
var pokemonMovingSpeed = 20;

//New Game
function newGame() {
    ctrlBtns[0].disabled = true;
    msg.innerText = '';
    gameState = "new";
}

function moveLeft() {
    var leftDistance = pokemon.offsetLeft;
    if (leftDistance == 0) {
        return;
    }
    var value;
    if ((leftDistance - pokemonMovingSpeed) <= 0) {
        value = 0;
    } else {
        value = leftDistance - pokemonMovingSpeed;
    }
    pokemon.style.left = value + "px";
}

function moveRight() {
    var leftDistance = pokemon.offsetLeft;
    if (leftDistance == playingAreaWidth) {
        return;
    }
    var value;
    if ((leftDistance + pokemonMovingSpeed + 75) >= playingAreaWidth) {
        value = playingAreaWidth - 75;
    } else {
        value = leftDistance + pokemonMovingSpeed;
    }
    pokemon.style.left = value + "px";
}

function moveUp() {
    var topDistance = pokemon.offsetTop;
    if(topDistance == 0) {
        return;
    }
    var value;
    if((topDistance - pokemonMovingSpeed) <= 0){
        value = 0;
    } else {
        value = topDistance - pokemonMovingSpeed;
    }
    pokemon.style.top = value + "px";
}

function moveDown() {
    var topDistance = pokemon.offsetTop;
    if(topDistance == playingAreaHeight) {
        return;
    }
    var value;
    if((topDistance + pokemonMovingSpeed + 280) >= playingAreaHeight) {
        value = playingAreaWidth - 280;
    } else {
        value = topDistance + pokemonMovingSpeed;
    }
    pokemon.style.top = value + "px";
}

document.addEventListener('keydown', function(e) {
    if(gameState == 'new') {
        if (e.keyCode == "38") {
            moveUp();
        } else if (e.keyCode == "40") {
            moveDown();
        } else if (e.keyCode == "37"){
            moveLeft();
        } else if (e.keyCode == "39"){
            moveRight();
        }
    }
});