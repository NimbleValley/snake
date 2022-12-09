const gameOverlay = document.getElementById("game-overlay");
const centerGame = document.getElementById("center-game");
const sizeInput = document.getElementById("size-input");
const speedInput = document.getElementById("speed-select");

var cells = [];
var gameStarted = false;

var snakeX
var snakeY;
var snakeLength = 1;
var direction = 0;
var previousDirection = 0;
var speed;

var foodX;
var foodY;

var delay = [];


function startGame() {
    speed = parseInt(speedInput.value);
    console.log(speed);
    gameContainer.innerHTML = "";
    if(sizeInput.value == "") {
        initGame(30);
    } else {
        initGame(parseInt(sizeInput.value));
    }
    centerGame.style.backgroundColor = "rgb(36, 36, 36)"
    gameContainer.style.display = "block";
    snakeLength = 1;
    direction = 0;
    cells = document.getElementsByTagName("td");
    snakeX = Math.round(Math.sqrt(cells.length) / 2);
    snakeY = Math.round(Math.sqrt(cells.length) / 2);
    for (var i = 0; i < cells.length; i++) {
        delay[i] = 0;
    }
    gameOverlay.style.display = "none";
    gameStarted = true;
    scatterFood();
    updatePos();
}

function updatePos() {
    for (var i = 0; i < cells.length; i++) {
        delay[i]--;
        delay[i] = clamp(delay[i]);
        if (delay[i] == 0) {
            cells[i].style.backgroundColor = "rgb(36, 36, 36)";
            cells[i].style.scale = 1;
        } else {
            cells[i].style.backgroundColor = "green";
            if (snakeLength > 4) {
                cells[i].style.scale = 0.9;
                if (delay[i] == 4) {
                    cells[i].style.scale = 0.8;
                }
                if (delay[i] == 3) {
                    cells[i].style.scale = 0.7;
                }
                if (delay[i] == 2) {
                    cells[i].style.scale = 0.6;
                }
                if (delay[i] == 1) {
                    cells[i].style.scale = 0.5;
                }
            } else {
                switch (snakeLength) {
                    case 2:
                        if (delay[i] == 1) {
                            cells[i].style.scale = 0.8;
                        }
                        break;
                    case 3:
                        if (delay[i] == 2) {
                            cells[i].style.scale = 0.8;
                        }
                        if (delay[i] == 1) {
                            cells[i].style.scale = 0.7;
                        }
                        break;
                    case 4:
                        if (delay[i] == 3) {
                            cells[i].style.scale = 0.8;
                        }
                        if (delay[i] == 2) {
                            cells[i].style.scale = 0.7;
                        }
                        if (delay[i] == 1) {
                            cells[i].style.scale = 0.6;
                        }
                        break;
                }
            }
        }
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeLength++;
        scatterFood();
    }

    if (delay[(snakeY * Math.sqrt(cells.length)) + snakeX] != 0 || snakeX < 0 || snakeX >= Math.sqrt(cells.length) || snakeY < 0 || snakeY > Math.sqrt(cells.length)) {
        gameStarted = false;
        gameOverlay.style.display = "block";
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "rgb(111, 117, 112)";
            cells[i].style.scale = 1;
        };
        gameContainer.style.display = "none";
        centerGame.style.backgroundColor = "rgba(65, 61, 55, 0.993)";
    } else {
        delay[(snakeY * Math.sqrt(cells.length)) + snakeX] = snakeLength;
        cells[(snakeY * Math.sqrt(cells.length)) + snakeX].style.backgroundColor = "green";
        cells[(foodY * Math.sqrt(cells.length)) + foodX].style.backgroundColor = "red";
    }
}

function scatterFood() {
    foodX = Math.round((Math.random() * Math.sqrt(cells.length)));
    foodY = Math.round((Math.random() * Math.sqrt(cells.length)));
    while (delay[(foodY * Math.sqrt(cells.length)) + foodX] != 0 || foodX == 0) {
        foodX = Math.round((Math.random() * Math.sqrt(cells.length)));
        foodY = Math.round((Math.random() * Math.sqrt(cells.length)));
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key == "w" && previousDirection != 3) {
        direction = 1;
    }
    if (e.key == "d" && previousDirection != 4) {
        direction = 2;
    }
    if (e.key == "s" && previousDirection != 1) {
        direction = 3;
    }
    if (e.key == "a" && previousDirection != 2) {
        direction = 4;
    }
});

//Main
(function () {
    (function update() {
        if (gameStarted) {
            previousDirection = direction;
            switch (direction) {
                case 1:
                    snakeY--;
                    break;
                case 2:
                    snakeX++;
                    break;
                case 3:
                    snakeY++;
                    break;
                case 4:
                    snakeX--;
                    break;
                default:
                    break;
            }
            updatePos();
        }
        setTimeout(update, speed);
    })();
})();

function clamp(num) {
    if (num < 0) {
        return 0;
    }
    return num;
}