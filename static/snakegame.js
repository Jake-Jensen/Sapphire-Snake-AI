const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // Size of each square in the game grid
let snake = [{ x: 200, y: 200 }];
let food = {};
let score = 0;
let dx = gridSize; // Starting movement in the x-direction
let dy = 0;
let gameLoop;
let IntervalX = 200;

// Main game loop
function main() {
    if (gameOver()) {
        clearInterval(gameLoop);
        displayGameOverMessage();
        return;
    }

    advanceSnake();
    clearCanvas();
    drawBackground();
    drawFood();
    drawSnake();
}

gameLoop = setInterval(main, IntervalX); 

// Update game state if snake hits boundaries or itself
function gameOver() {
    let leftWall = snake[0].x < 0;
    let rightWall = snake[0].x >= canvas.width;
    let topWall = snake[0].y < 0;
    let bottomWall = snake[0].y >= canvas.height;

    return leftWall || rightWall || topWall || bottomWall || checkCollision();
}

function displayGameOverMessage() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!\nPress R to restart", canvas.width / 2, canvas.height / 2);
}

function restartGame() {
    resetGameVariables(); // Reset snake, food, score, etc.
    clearCanvas();
    generateFood();
    // gameLoop = setInterval(main, IntervalX); // Restart the game loop
}

function resetGameVariables() {
    snake = [{ x: 200, y: 200 }];
    food = {};
    score = 0;
    dx = gridSize;
    dy = 0;
}

// Generate a new food item
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
    }
}

// Check if the snake collides with itself
function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Advance the snake's position
function advanceSnake() {
    console.log("New snake head:", snake[0]);
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
    if (didEatFood) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function drawBackground() {
    ctx.fillStyle = 'black';  // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines with customization options
    const gridSize = 20;  // Size of grid squares 
    ctx.strokeStyle = 'grey'; // Grey lines
    ctx.lineWidth = 1; // Adjust line width if desired

    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Draw the snake
function drawSnake() {
    snake.forEach(snakePart => {
        ctx.fillStyle = 'green';
        ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
    })
}

// Listen for keyboard input
document.addEventListener('keydown', changeDirection);

let gameSpeed = 25; // Initialize a starting speed
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    // Prevent snake from reversing 
    const keyPressed = event.keyCode;
    const goingUp = dy === -gridSize;
    const goingDown = dy === gridSize;
    const goingRight = dx === gridSize;
    const goingLeft = dx === -gridSize;

    if (keyPressed === LEFT_KEY && !goingRight) { dx = -gridSize; dy = 0; }
    if (keyPressed === UP_KEY && !goingDown) { dx = 0; dy = -gridSize; }
    if (keyPressed === RIGHT_KEY && !goingLeft) { dx = gridSize; dy = 0; }
    if (keyPressed === DOWN_KEY && !goingUp) { dx = 0; dy = gridSize; }

    // Clear any existing game loop interval
    clearInterval(gameLoop);

    // Start a new loop based on desired speed
    gameLoop = setInterval(main, gameSpeed);
}

// Function to resize the canvas 
function resizeCanvas() {
    canvas.width = window.innerWidth - 25;
    canvas.height = window.innerHeight - 25;
}

// Call resizeCanvas initially to set the starting size
resizeCanvas();

// Add an event listener to resize when the window is resized
window.addEventListener('resize', resizeCanvas); 

document.addEventListener('keydown', function (event) {
    if (event.key === 'r' || event.key === 'R') { // Accept both lowercase and uppercase 'r'
        if (gameOver()) {
            restartGame();
        }
    }
});

// Start things off
generateFood();
gameLoop = setInterval(main, 100); 
