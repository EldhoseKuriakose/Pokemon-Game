//initialising necessary variables
var gameArea = document.getElementById('playing-area');
var pokemon = document.getElementById('pokemon');
var pokeball = document.getElementById('pokeball');
var ctrlBtn = document.getElementById('newGameButton');
var nam = document.getElementById('player-name');
var scoreBoard = document.getElementsByClassName('scoreboard')[0];
var msg = document.getElementsByClassName('msg')[0];
var text = "Game Over! Click on New Game to Start";
var seconds = document.getElementById("countdown").textContent;

var playingAreaWidth = gameArea.clientWidth;
var playingAreaHeight = gameArea.clientHeight;
var gameState = "";
var pokemonMovingSpeed = 20;
var score = 0;
var scoreDisplay = document.getElementById('score');

//New Game
function newGame() {
    ctrlBtn.setAttribute("disabled","disabled");
    msg.innerText = '';
    var playerName = prompt("Enter Your Name - ");
    if (playerName != "" && playerName != null) {
        nam.innerText = playerName;
    } else {
        nam.innerText = 'Guest';
    }
    seconds = 12;
    score = 0;
    scoreDisplay.innerText = 0;
    gameState = "new";
    countdown();
}

//countdown
var countdown = setInterval(function(){
    if(gameState == 'new') {
        seconds--;
        (seconds <= 1) ? document.getElementById("plural").textContent = "" : document.getElementById("plural").textContent = "s";
        document.getElementById("countdown").textContent = seconds;
        if (seconds <= 0) {
            gameOver();
        }
    }
},1000);

//Game over
function gameOver() {
    gameState = '';
    ctrlBtn.removeAttribute("disabled");
    msg.innerText = text;
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

//Getting random position of pokeball
function getRandomPosition(element) {
	var x = gameArea.offsetHeight-element.clientHeight;
	var y = gameArea.offsetWidth-element.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}

//checking if pokemon overlaps pokeball. If yes increase score by 1 and find random position for pokeball
function checkOverlap() {
    if(is_colliding(pokemon, pokeball)) {
        score += 1;
        scoreDisplay.innerText = score;
        var xy = getRandomPosition(pokeball);
        pokeball.style.top = xy[0] + 'px';
        pokeball.style.left = xy[1] + 'px';
        seconds = 12;
    }
}

//moveleft
function moveLeft() {
    checkOverlap();
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

//move right
function moveRight() {
    checkOverlap();
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

//moveup
function moveUp() {
    checkOverlap();
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

//move down
function moveDown() {
    checkOverlap();
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


//Event listener for arrow key press
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