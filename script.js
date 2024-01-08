// game constants and variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameOver.mp3');
const moveSound = new Audio('move.mp3');
const bgMusicSound = new Audio('bgMusic.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
let score = 0;

// game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //collide itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //collide to wall
    if (snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) {
        return true;
    }
    return false;
}

function gameEngine() {
    //part1 : update snake variable(array)
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgMusicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        bgMusicSound.play();
        score = 0; 
    }

    //increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score+=1;
        if(score>hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal));
            hiscoreBox.innerHTML ="Highest-Score : "+hiscoreVal;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part2: display the snake 
    // display the snake 

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// main logic starts here
bgMusicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
}
else{
    hiscoreVal = JSON.parse(hiscore);
    hiscoreBox.innerHTML ="Hi-Score : "+hiscore;
}

// Function to handle mobile clicks
function handleButtonClick(direction) {
    inputDir = { x: 0, y: 1 }; // Start the game
    moveSound.play();
    switch (direction) {
        case "up":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "down":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "right":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "left":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
document.getElementById('up').addEventListener('click', () => handleButtonClick('up'));
document.getElementById('down').addEventListener('click', () => handleButtonClick('down'));
document.getElementById('left').addEventListener('click', () => handleButtonClick('left'));
document.getElementById('right').addEventListener('click', () => handleButtonClick('right'));