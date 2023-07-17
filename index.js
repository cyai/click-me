// Function to reset the game
function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    clickMeButton.addEventListener("click", handleClick);
    timer = null; // Reset the timer
    countdownDisplay.textContent = ""; // Reset the countdown display
    gameStarted = false; // Reset the gameStarted variable
}

// Function to generate random positions for the button inside the arena
function getRandomPosition() {
    const arena = document.querySelector(".arena");
    const button = document.getElementById("clickMeButton");

    const arenaRect = arena.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate the maximum X and Y positions to keep the button strictly within the arena
    const maxX = arenaRect.width - buttonRect.width;
    const maxY = arenaRect.height - buttonRect.height;

    // Generate random X and Y positions within the arena bounds
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    // Make sure the button stays strictly within the arena bounds
    randomX = Math.max(randomX, 0);
    randomX = Math.min(randomX, maxX);
    randomY = Math.max(randomY, 0);
    randomY = Math.min(randomY, maxY);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}

// Function to randomly change the size of the "Click-Me" box
function changeBoxSize() {
    const minWidth = 100; // Minimum width of the box (in pixels)
    const maxWidth = 250; // Maximum width of the box (in pixels)
    const minHeight = 50; // Minimum height of the box (in pixels)
    const maxHeight = 150; // Maximum height of the box (in pixels)
    const desiredRatio = minWidth / minHeight; // Desired width-to-height ratio
    const maxFontSize = 18; // Maximum font size (in pixels)

    const randomWidth =
        Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const clampedWidth = Math.min(randomWidth, maxWidth); // Clamp width to the maximum

    const calculatedHeight = clampedWidth / desiredRatio;
    const randomHeight = Math.min(calculatedHeight, maxHeight); // Clamp height to the maximum

    clickMeButton.style.width = `${clampedWidth}px`;
    clickMeButton.style.height = `${randomHeight}px`;

    // Adjust the font size based on the scaled-down width
    const fontSize = Math.min(maxFontSize, clampedWidth * 0.1); // Adjust the factor 0.1 as needed
    clickMeButton.style.fontSize = `${fontSize}px`;

    // Prevent the "Click-Me" text from wrapping to a new line
    clickMeButton.style.whiteSpace = "nowrap";

    // Calculate the new left and top positions to center the button
    const arena = document.querySelector(".arena");
    const arenaRect = arena.getBoundingClientRect();
    const buttonRect = clickMeButton.getBoundingClientRect();

    const newLeft = (arenaRect.width - buttonRect.width) / 2;
    const newTop = (arenaRect.height - buttonRect.height) / 2;

    // Make sure the button stays strictly within the arena bounds
    const maxX = arenaRect.width - clampedWidth;
    const maxY = arenaRect.height - randomHeight;
    const clampedLeft = Math.max(newLeft, 0);
    const clampedTop = Math.max(newTop, 0);
    clickMeButton.style.left = `${Math.min(clampedLeft, maxX)}px`;
    clickMeButton.style.top = `${Math.min(clampedTop, maxY)}px`;
}

// Function to update the score
function updateScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

let score = 0;
const scoreDisplay = document.getElementById("scoreDisplay"); // Target the score display element
scoreDisplay.textContent = `Score: ${score}`;

// Countdown timer function
let timer;
const countdownDisplay = document.getElementById("countdownDisplay"); // Target the countdown display element

function startGameTimer(time) {
    let timeLeft = time;
    countdownDisplay.textContent = `Time left: ${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft--;
        countdownDisplay.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null; // Reset the timer
            clickMeButton.removeEventListener("click", handleClick);
            countdownDisplay.textContent = "Time's up!";
            displayResults(); // Call the function to display the final score
            clickMeButton.textContent = "Retry"; // Change the button text to "Retry"
            clickMeButton.addEventListener("click", handleRetry); // Add the retry event listener
        }
    }, 1000);
}

// Function to display the final score
function displayResults() {
    alert(`Game Over! Your final score is: ${score}`);
}

// Event listener for the "Start" button
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    const gameTime = parseInt(document.getElementById("gameTime").value, 10);

    if (isNaN(gameTime) || gameTime < 10 || gameTime > 300) {
        alert("Please enter a valid game time between 10 and 300 seconds.");
        return;
    }

    resetGame();
    // Move the startGameTimer call to handleClick function
});

// Event listener for the "Click-Me" button
const clickMeButton = document.getElementById("clickMeButton");

let gameStarted = false; // Variable to track if the game has started

function handleClick() {
    if (!gameStarted) {
        // Start the timer only if the game has not already started
        const gameTime = parseInt(
            document.getElementById("gameTime").value,
            10
        );
        if (isNaN(gameTime) || gameTime < 10 || gameTime > 300) {
            alert("Please enter a valid game time between 10 and 300 seconds.");
            return;
        }

        startGameTimer(gameTime);
        gameStarted = true; // Set gameStarted to true when timer starts counting down
    }

    changeBoxSize(); // Change the size of the box when clicked
    getRandomPosition();
    updateScore();
}

// Event listener for the "Retry" button
function handleRetry() {
    location.reload(); // Refresh the page on retry
}

clickMeButton.addEventListener("click", handleClick);

// Start the game when the page loads
// The timer will be started on the first click
