// Variables
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let workTime = 25 * 60; // Default work time
let isRunning = false;
let sessionCount = 0;
let isOnBreak = false;

// Elements
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer-display");
const progressBar = document.getElementById("completed");
const sessionCountDisplay = document.getElementById("session-count");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Load session count from localStorage
if (localStorage.getItem("sessionCount")) {
    sessionCount = parseInt(localStorage.getItem("sessionCount"));
    updateSessionCount();
}

// Start/Stop Timer (Single Start/Reset button)
startButton.addEventListener("click", () => {
    if (isRunning) {
        // Reset functionality
        resetTimer();
    } else {
        // Start functionality
        isRunning = true;
        startButton.textContent = "Reset";
        startTimer();
    }
});

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Start the timer
function startTimer() {
    if (isOnBreak) {
        // If on break, set the timer to break time
        timeLeft = breakTime;
        updateDisplay("Break");
    } else {
        // If working, set the timer to work time
        timeLeft = workTime;
        updateDisplay("Work");
    }

    // Start the timer countdown
    timer = setInterval(updateTimer, 1000);
}

// Update the timer display
function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "Start";
        sessionCount++;
        localStorage.setItem("sessionCount", sessionCount);
        updateSessionCount();
        handleBreak();
        return;
    }

    timeLeft--;
    updateDisplay();
    updateProgress();
}

// Update the display (timer and session)
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

// Update the progress bar
function updateProgress() {
    const progress = (1 - timeLeft / (isOnBreak ? breakTime : workTime)) * 100;
    progressBar.style.width = progress + "%";
}

// Handle Break
function handleBreak() {
    if (isOnBreak) {
        isOnBreak = false;
        alert("Pomodoro complete! Start a new session.");
        timeLeft = workTime;  // Reset back to work time
    } else {
        isOnBreak = true;
        timeLeft = breakTime;
        alert("Take a break!");
    }
    startTimer();
}

// Update session count display
function updateSessionCount() {
    sessionCountDisplay.textContent = `Sessions Completed: ${sessionCount}`;
}

// Reset Timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "Start";
    timeLeft = workTime;
    updateDisplay();
    progressBar.style.width = "0%";
    isOnBreak = false;
}
