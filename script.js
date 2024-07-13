const board = document.getElementById("game-board");
const instrText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const a = document.getElementById("a")
let audio = new Audio("./UMLGQBU-video-game.mp3")
let dead = new Audio("./male-death-sound-128357.mp3")
const good1 = document.getElementById("good1")
const good = document.getElementById("good")
const recordd = document.getElementById("record")
let snake = [{
    x: 10,
    y: 10,
}];
let isGameStart = false;
let gameSpeed = 200;
let gridSize = 40;
let food = generateFood();
let direction = "right";
let highScore = 0;
let gameIntervalId;
let harut
let harut1
let harut2

function draw() {
    audio.play();
    board.innerHTML = "";
    drawSnake();
    drawFood();
    updateScore()

}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createElement("div", "snake");
        snakeElement.id = "snake"
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement)

    });
}

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    // console.log(position.x);
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    let foodElement = createElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement)


}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

function move() {
    let head = { ...snake[0] }
    switch (direction) {
        case "up":
            head.y--
            break;
        case "down":
            head.y++
            break;
        case "left":
            head.x--
            break;
        case "right":
            head.x++
            break;
    }
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
    if(currentScore > highScore){
        record();



}
    snake.unshift(head);
    // snake.pop();
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameIntervalId)
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeed);
    } else {
        snake.pop();
    }
}

document.addEventListener("keydown", handKeyPress);

function handKeyPress(event) {
    // console.log(event);
    if ((!isGameStart && event.code === "Space") ||
        (!isGameStart && event.key === " ")) {
        startGame();
        audio.play()
    } else {
        switch (event.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down"
                break;
            case "ArrowLeft":
                direction = "left"
                break;
            case "ArrowRight":
                direction = "right"
                break;

        }
    }
}





function check(currentScore) {

    const b = 5

    if (currentScore == b) {
        good.style.display = "block"

        clearTimeout(harut)
        harut = setTimeout(() => {
            good.style.display = "none"

        }, 2000);
    }
}

function check1(currentScore) {

    const b = 10

    if (currentScore == b) {
        good1.style.display = "block"
        clearTimeout(harut1)

        harut1 = setTimeout(() => {
            good1.style.display = "none"

        }, 2000);
    }
}
function startGame() {
    audio.play();
    good.style.display = "none"
    isGameStart = true;

    logo.style.display = "none";
    instrText.style.display = "none"

    gameIntervalId = setInterval(() => {
        move();
        checkCollision();
        draw();
        // check();
    }, gameSpeed);

}


function checkCollision() {

    let head = { ...snake[0] };

    if (head.x > gridSize || head.x < 1 || head.y > gridSize || head.y < 1) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            break;

        }

    }


}

function resetGame() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");

    const currentScore2 = snake.length - 1;
    score.textContent = currentScore2.toString().padStart(3, "0");
    good.style.display = "none"
    updateHighScore();
    recordd.style.display = ""
    stopGame();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeed = 200;
    updateScore()



}

function stopGame() {

    let snake = document.getElementById("snake");
    snake.className = "hide-snake"
    console.log("stttt====>>>>", snake);

    // audio.pause();
    // audio = new Audio("")
    // audio.currentTime = 0;
    clearInterval(gameIntervalId);
    isGameStart = false;
    logo.style.display = "block";
    instrText.style.display = "block";
    dead.play();
}
function record(currentScore) {

    if (currentScore = highScore + 1) {
        recordd.style.display = "block"
    }
    harut2 = setTimeout(() => {
        recordd.style.display = "none"

    }, 2000);
    clearTimeout(harut2)
}


function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
    const currentScore1 = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
    const currentScore2 = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
    // if (currentScore > highScore) {
    //     record(currentScore2)

    // }
    check(currentScore);
    check1(currentScore1);

}


function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
    }

    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";


}



