const eggTimes = { 
    soft: 300, 
    medium: 420, 
    hard: 600, 
    microwave: 180  // Microwave timer in seconds (adjust as needed)
};

let timer;
let isPaused = false;
let remainingTime = 0;

function startTimer(type) {
    // Clear any existing timer.
    clearInterval(timer);
    let timeLeft = eggTimes[type];
    remainingTime = timeLeft; // Set the remaining time

    if (!timeLeft) {
        alert("Invalid egg type!");
        return;
    }

    showLoader(type);

    // Delay starting the countdown by 3 seconds (loader animation).
    setTimeout(() => {
        hideLoader();
        updateTimerStyle(type);
        displayTime(timeLeft);
        timer = setInterval(() => {
            if (!isPaused) {
                remainingTime--;
                displayTime(remainingTime);
                if (remainingTime <= 0) {
                    clearInterval(timer);
                    // Instead of showing an alert, simply play the sound.
                    playSound();
                }
            }
        }, 1000);
    }, 3000);
}

function showLoader(type) {
    const messages = {
        soft: "She’s about to take a warm bath! 🛁",
        medium: "She’s getting comfortable… 🍳",
        hard: "Going in for a long soak! 🥚🔥",
        microwave: "Quick Zap in the Microwave! ⚡"
    };

    const messageElement = document.getElementById("message");
    messageElement.style.display = "block"; 
    messageElement.textContent = messages[type] || "Boiling...";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function displayTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById("timerDisplay").textContent =
        `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerStyle(type) {
    const timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.className = type; // Set a class based on egg type for styling
}

function playSound() {
    const selectedSound = document.getElementById("soundSelect").value;
    const sound = document.getElementById("sound");
    sound.src = selectedSound;
    sound.loop = true; // Enable continuous looping
    sound.play();

    // Show the Stop Sound button.
    document.getElementById("stopSound").style.display = "inline-block";
}

function stopSound() {
    const sound = document.getElementById("sound");
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
    document.getElementById("stopSound").style.display = "none";
}

function togglePauseTimer() {
    isPaused = !isPaused;
    const pauseButton = document.getElementById("pauseTimer");
    pauseButton.textContent = isPaused ? "Resume Timer" : "Pause Timer";
}

function stopTimer() {
    clearInterval(timer);
    displayTime(0);
    stopSound();
    isPaused = false;
    document.getElementById("pauseTimer").textContent = "Pause Timer";
}
