// script.js
const texts = [
    "To do",
];

class TypeRacer {
    constructor() {
        this.currentText = '';
        this.startTime = null;
        this.isStarted = false;
        this.timerInterval = null;
        this.wordIndex = 0;

        // DOM elements
        this.textDisplay = document.getElementById('text-display');
        this.typingInput = document.getElementById('typing-input');
        this.startButton = document.getElementById('start-btn');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timeDisplay = document.getElementById('time');
        this.resultsDiv = document.getElementById('results');
        this.finalWpmDisplay = document.getElementById('final-wpm');
        this.finalAccuracyDisplay = document.getElementById('final-accuracy');
        this.finalTimeDisplay = document.getElementById('final-time');

        // Bind event listeners
        this.startButton.addEventListener('click', () => this.initializeGame());
        this.typingInput.addEventListener('input', () => this.handleInput());
    }
}