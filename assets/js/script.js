//initialising necessary variables
var gameArea = document.getElementById('playing-area');
var pokemon = document.getElementById('pokemon');
var pokeball = document.getElementById('pokeball');
var ctrlBtns = document.getElementsByClassName('control-buttons');
var nam = document.getElementById('player-name');
var scoreBoard = document.getElementsByClassName('scoreboard')[0];
var msg = document.getElementsByClassName('msg')[0];
var text = "Click on New Game to Start";

var playingAreaWidth = gameArea.clientWidth;
var playingAreaHeight = gameArea.clientHeight;
var gameState = "";
var pokemonMovingSpeed = 20;
var score = 0;
var scoreDisplay = document.getElementById('score');

//New Game
function newGame() {
    ctrlBtns[0].disabled = true;
    msg.innerText = '';
    var playerName = prompt("Enter Your Name - ");
    if (playerName != "" && playerName != null) {
        nam.innerText = playerName;
    } else {
        nam.innerText = 'Guest';
    }
    gameState = "new";
}

//Checking if pokemon overlaps pokeball
function is_colliding(pokemon, pokeball) {
	// pokemon data
	var pokemon_height             = pokemon.clientHeight;
	var pokemon_width              = pokemon.clientWidth;
	var pokemon_distance_from_top  = pokemon.offsetTop + pokemon_height;
	var pokemon_distance_from_left = pokemon.offsetLeft + pokemon_width;

	// pokeball data
	var pokeball_height             = pokeball.clientHeight;
	var pokeball_width              = pokeball.clientWidth;
	var pokeball_distance_from_top  = pokeball.offsetTop + pokeball_height;
	var pokeball_distance_from_left = pokeball.offsetLeft + pokeball_width;

    var not_colliding = (pokemon_distance_from_top < pokeball.offsetTop
                        || pokemon.offsetTop > pokeball_distance_from_top
                        || pokemon_distance_from_left < pokeball.offsetLeft
                        || pokemon.offsetLeft > pokeball_distance_from_left);

    // Return whether it IS colliding
	return ! not_colliding;
};

function getRandomPosition(element) {
	var x = gameArea.offsetHeight-element.clientHeight;
	var y = gameArea.offsetWidth-element.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}

function moveLeft() {
    if(is_colliding(pokemon, pokeball)) {
        score += 1;
        scoreDisplay.innerText = score;
        var xy = getRandomPosition(pokeball);
        pokeball.style.top = xy[0] + 'px';
        pokeball.style.left = xy[1] + 'px';
    }
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
    if(is_colliding(pokemon, pokeball)) {
        score += 1;
        scoreDisplay.innerText = score;
        var xy = getRandomPosition(pokeball);
        pokeball.style.top = xy[0] + 'px';
        pokeball.style.left = xy[1] + 'px';
    }
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
    if(is_colliding(pokemon, pokeball)) {
        score += 1;
        scoreDisplay.innerText = score;
        var xy = getRandomPosition(pokeball);
        pokeball.style.top = xy[0] + 'px';
        pokeball.style.left = xy[1] + 'px';
    }
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
    if(is_colliding(pokemon, pokeball)) {
        score += 1;
        scoreDisplay.innerText = score;
        var xy = getRandomPosition(pokeball);
        pokeball.style.top = xy[0] + 'px';
        pokeball.style.left = xy[1] + 'px';
    }
    var topDistance = pokemon.offsetTop;
    if(topDistance == playingAreaHeight) {
        return;
    }
    var value;
    if((topDistance + pokemonMovingSpeed + 80) >= playingAreaHeight) {
        value = playingAreaHeight - 80;
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