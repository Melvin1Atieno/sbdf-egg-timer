const eggTimes = { soft: 300, medium: 420, hard: 600 };
let timer;

function startTimer(type) {
    clearInterval(timer);
    let timeLeft = eggTimes[type];

    if (!timeLeft) {
        alert("Invalid egg type!");
        return;
    }

    showLoader(type);
    
    setTimeout(() => {
        hideLoader();
        updateTimerStyle(type);
        displayTime(timeLeft);
        timer = setInterval(() => {
            timeLeft--;
            displayTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert(`Your ${type} boiled egg is ready!`);
            }
        }, 1000);
    }, 3000); // Show animation for 3 seconds
}

function showLoader(type) {
    const messages = {
        soft: "She’s about to take a warm bath! 🛁",
        medium: "She’s getting comfortable… 🍳",
        hard: "Going in for a long soak! 🥚🔥"
    };

    const messageElement = document.getElementById("message");
    
    // Ensure message visibility
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
    timerDisplay.className = type; // Adds class based on egg type
}