// Cache the key elements the game updates after each guess.
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Hides every feedback message so only the current game state is visible.
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex += 1) {
    messages[elementIndex].style.display = 'none';
  }
}

function getGuessWord(remainingAttempts) {
  return remainingAttempts === 1 ? 'guess' : 'guesses';
}

// Resets the game to the initial state with a new random target number.
function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  attempts = 0;
  guessInput.value = '';
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

// Checks the player's guess and updates the visible game messages.
function checkGuess(event) {
  event.preventDefault();

  const guess = parseInt(guessInput.value, 10);

  if (!Number.isInteger(guess) || guess < 1 || guess > 99) {
    hideAllMessages();
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = 'Enter a number from 1 to 99.';
    resetButton.style.display = attempts > 0 ? '' : 'none';
    return;
  }

  attempts += 1;

  hideAllMessages();

  const remainingAttempts = maxNumberOfAttempts - attempts;

  numberOfGuessesMessage.style.display = '';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${getGuessWord(remainingAttempts)} remaining`;

  if (guess === targetNumber) {
    correctMessage.style.display = '';
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (attempts === maxNumberOfAttempts) {
    maxGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> 0 guesses remaining`;
    submitButton.disabled = true;
    guessInput.disabled = true;
  } else if (guess < targetNumber) {
    tooLowMessage.style.display = '';
  } else {
    tooHighMessage.style.display = '';
  }

  guessInput.value = '';
  resetButton.style.display = '';
}

guessForm.addEventListener('submit', checkGuess);
resetButton.addEventListener('click', setup);

setup();
