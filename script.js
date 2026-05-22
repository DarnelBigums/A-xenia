// Game State Variables
let savedMen = 0;
let timeElapsed = 0;
let gameInterval = null;
let timerInterval = null;
let currentCyclopsPosition = 'left'; 
let gameActive = false;

// Function to start or reset the game
function startGame() {
    savedMen = 0;
    timeElapsed = 0;
    gameActive = true;
    
    document.getElementById('saved-count').textContent = savedMen;
    document.getElementById('timer').textContent = "0.0";
    document.getElementById('start-btn').textContent = "Reset Game";

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    // Run the timer every 100ms
    timerInterval = setInterval(() => {
        timeElapsed += 0.1;
        document.getElementById('timer').textContent = timeElapsed.toFixed(1);
    }, 100);

    // Cyclops movement setup
    moveCyclops();
    gameInterval = setInterval(moveCyclops, 1300); 
}

// Moves the cyclops visually across the screen
function moveCyclops() {
    if (!gameActive) return;
    
    const cyclopsElement = document.getElementById('cyclops');
    currentCyclopsPosition = Math.random() < 0.5 ? 'left' : 'right';
    
    if (currentCyclopsPosition === 'left') {
        cyclopsElement.style.left = '25%';
    } else {
        cyclopsElement.style.left = '75%';
    }
}

// Logic handles clicking a sheep lane
function jumpToSheep(chosenSide) {
    // If the game isn't started yet, clicking a sheep automatically acts as pressing "Begin"
    if (!gameActive) {
        startGame();
        return;
    }

    // Win/Loss Condition Check
    if (chosenSide === currentCyclopsPosition) {
        alert("Polyphemus reached down and felt your presence! The warrior scrambled back. (+3s Penalty!)");
        timeElapsed += 3.0;
    } else {
        savedMen++;
        document.getElementById('saved-count').textContent = savedMen;

        if (savedMen >= 10) {
            gameActive = false;
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            alert(`Victory! You safely guided all 10 men out of the cave in ${timeElapsed.toFixed(1)} seconds!`);
            document.getElementById('start-btn').textContent = "Play Again";
        }
    }
}
