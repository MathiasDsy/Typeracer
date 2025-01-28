import { coucou } from './ranking.js';

// script.js
const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step."
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

    initializeGame() {
        this.currentText = texts[Math.floor(Math.random() * texts.length)];
        this.wordIndex = 0;
        this.isStarted = true;
        this.startTime = new Date().getTime();
        this.typingInput.value = '';
        this.typingInput.disabled = false;
        this.resultsDiv.style.display = 'none';
        this.updateDisplay();
        this.startTimer();
        this.typingInput.focus();
    }

    updateDisplay() {
        const words = this.currentText.split(' ');
        const displayHTML = words.map((word, index) => {
            let className = '';
            if (index === this.wordIndex) {
                className = 'current-word';
            } else if (index < this.wordIndex) {
                const typedWords = this.typingInput.value.split(' ');
                className = typedWords[index] === word ? 'correct-word' : 'incorrect-word';
            }
            return `<span class="${className}">${word}</span>`;
        }).join(' ');
        this.textDisplay.innerHTML = displayHTML;
    }

    calculateStats() {
        const timeElapsed = (new Date().getTime() - this.startTime) / 1000;
        const wordsTyped = this.typingInput.value.trim().split(/\s+/).length;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        
        const correctChars = this.typingInput.value.split('').filter((char, index) => 
            char === this.currentText[index]
        ).length;
        const accuracy = Math.round((correctChars / this.currentText.length) * 100);

        return { wpm, accuracy, timeElapsed };
    }

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            const timeElapsed = Math.round((new Date().getTime() - this.startTime) / 1000);
            this.timeDisplay.textContent = `${timeElapsed}s`;

            if (this.isStarted) {
                const stats = this.calculateStats();
                this.wpmDisplay.textContent = stats.wpm;
                this.accuracyDisplay.textContent = `${stats.accuracy}%`;
            }
        }, 1000);
    }

    endGame() {
        this.isStarted = false;
        this.typingInput.disabled = true;
        clearInterval(this.timerInterval);

        const finalStats = this.calculateStats();
        this.finalWpmDisplay.textContent = finalStats.wpm;
        this.finalAccuracyDisplay.textContent = `${finalStats.accuracy}%`;
        this.finalTimeDisplay.textContent = Math.round(finalStats.timeElapsed);
        this.resultsDiv.style.display = 'block';
        coucou();
    }

    handleInput() {
        if (!this.isStarted) return;

        this.updateDisplay();
        const typedWords = this.typingInput.value.trim().split(/\s+/);
        this.wordIndex = typedWords.length - 1;

        if (this.typingInput.value.trim() === this.currentText) {
            this.endGame();
        }
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    new TypeRacer();
});