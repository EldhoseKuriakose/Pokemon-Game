//initialising necessary variables
var gameArea = document.getElementById('playing-area');
var pokemon = document.getElementById('pokemon');
var pokeball = document.getElementsByClassName('pokeball')[0];
var ctrlBtns = document.getElementsByClassName('control-buttons');
var name = document.getElementsByClassName('player-name')[0];
var scoreBoard = document.getElementsByClassName('scoreboard')[0];
var msg = document.getElementsByClassName('msg')[0];
var text = "Click on New Game to Start";

var gameAreaWidth = gameArea.clientWidth;
var gameAreaHeight = gameArea.clientHeight;
var gameState = "";

//New Game
function newGame() {
    ctrlBtns[0].disabled = true;
    msg.innerText = '';
    gameState = "new";

}

document.addEventListener('keydown', function(e) {
    if (e.keyCode == "38") {
        pokemon.style.top = "100px";
    } else if (e.keyCode == "40") {
        movedown();
    } else if (e.keyCode == "37"){
        moveleft();
    } else if (e.keyCode == "39"){
        moveright();
    }
});