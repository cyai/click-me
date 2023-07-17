// Function to reset the game
function resetGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    clickMeButton.addEventListener("click", handleClick);
    timer = null; // Reset the timer
    countdownDisplay.textContent = "Time left: 60 seconds"; // Reset the countdown display
}

// Function to generate random positions for the button inside the arena
function getRandomPosition() {
    const arena = document.querySelector(".arena");
    const button = document.getElementById("clickMeButton");

    const arenaRect = arena.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate the maximum X and Y positions to keep the button within the arena
    const maxX = arenaRect.width - buttonRect.width;
    const maxY = arenaRect.height - buttonRect.height;

    // Generate random X and Y positions within the arena bounds
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
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

function countdownTimer() {
    let timeLeft = 60;
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

    return timer;
}

// Function to display the final score
function displayResults() {
    alert(`Game Over! Your final score is: ${score}`);
}

// Event listener for the "Click-Me" button
const clickMeButton = document.getElementById("clickMeButton");

function handleClick() {
    if (!timer) {
        // Start the timer only if it's not already running
        timer = countdownTimer();
    } else {
        // If the game is running, continue normal gameplay
        getRandomPosition();
        updateScore();
    }
}

// Event listener for the "Retry" button
function handleRetry() {
    location.reload(); // Refresh the page on retry
}

clickMeButton.addEventListener("click", handleClick);

// Start the game when the page loads
// The timer will be started on the first click
2;
