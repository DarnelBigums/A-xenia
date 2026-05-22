// Game Variables
let savedMen = 0;
let timeElapsed = 0;
let gameInterval = null;
let timerInterval = null;
let currentCyclopsPosition = 'left'; // Can be 'left' or 'right'
let gameActive = false;

// DOM Elements
const savedCountDisplay = document.getElementById('saved-count');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const cyclops = document.getElementById('cyclops');
const leftSheep = document.getElementById('sheep-left');
const rightSheep = document.getElementById('sheep-right');

// Audio Triggers
const baaSound = document.getElementById('sound-baa');
const roarSound = document.getElementById('sound-roar');

// Start Game Function
function startGame() {
    savedMen = 0;
    timeElapsed = 0;
    gameActive = true;
    savedCountDisplay.textContent = savedMen;
    timerDisplay.textContent = "0.0";
    startBtn.textContent = "Reset Game";

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    // Start Timer
    timerInterval = setInterval(() => {
        timeElapsed += 0.1;
        timerDisplay.textContent = timeElapsed.toFixed(1);
    }, 100);

    // Cyclops changes focus periodically
    moveCyclops();
    gameInterval = setInterval(moveCyclops, 1400); // changes target every 1.4 seconds
}

// AI logic for Polyphemus moving/listening
function moveCyclops() {
    if (!gameActive) return;
    
    // Randomly pick left or right target
    currentCyclopsPosition = Math.random() < 0.5 ? 'left' : 'right';
    
    if (currentCyclopsPosition === 'left') {
        cyclops.style.left = '25%';
    } else {
        cyclops.style.left = '75%';
    }
}

// Handle Player Action
function jumpToSheep(chosenSide) {
    if (!gameActive) return;

    // Feature Menu: Play Audio Feedback
    try {
        baaSound.currentTime = 0;
        baaSound.play();
    } catch(e) { console.log("Audio waiting for user gesture"); }

    // Check if Cyclops is guarding that side
    if (chosenSide === currentCyclopsPosition) {
        // Caught! Sound triggers and penalty applied
        try {
            roarSound.currentTime = 0;
            roarSound.play();
        } catch(e) {}
        
        alert("Polyphemus felt your presence! Odysseus's man scrambled back. Time Penalty applied (+3s)!");
        timeElapsed += 3.0;
    } else {
        // Safe Jump!
        savedMen++;
        savedCountDisplay.textContent = savedMen;

        if (savedMen >= 10) {
            endGame(true);
        }
    }
}

function endGame(victory) {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    if (victory) {
        alert(`Success! You safely smuggled 10 Greek warriors out of the cave under the sheep in ${timeElapsed.toFixed(1)} seconds!`);
        startBtn.textContent = "Play Again";
    }
}

// Event Listeners
startBtn.addEventListener('click', startGame);

leftSheep.addEventListener('click', () => jumpToSheep('left'));
rightSheep.addEventListener('click', () => jumpToSheep('right'));
