import { generateRandomNumber } from './generateRandomNumber.mjs';
import { getWordFromNumber } from './getWordFromNumber.mjs';
import { startAnimationWin } from './startAnimationWin.mjs';

document.addEventListener('DOMContentLoaded', function () {
  let minNumber = 1;
  let maxNumber = 100;
  let secretNumber = generateRandomNumber(minNumber, maxNumber);
  let attempts = 0;
  let hints = 0;

  const guessInput = document.querySelector('.guess-input');
  const guessBtn = document.querySelector('.guess-btn');
  const message = document.querySelector('.message');
  const attemptsDisplay = document.querySelector('.attempts');
  const hintsDisplay = document.querySelector('.hints');
  const restartBtn = document.querySelector('.restart-btn');
  const rangeInputMin = document.getElementById('min');
  const rangeInputMax = document.getElementById('max');
  const setUserRangeBtn = document.querySelector('.user-range-btn');

  const guessNumber = () => {
    const userGuess = parseInt(guessInput.value);
    if (!isNaN(userGuess)) {
      if (userGuess < minNumber || userGuess > maxNumber) {
        message.style.color = '#a6aef2';
        message.textContent = `Пожалуйста, введите число от ${minNumber} до ${maxNumber}.`;
      } else {
        attempts++;
        attemptsDisplay.textContent = attempts;
        const result = checkGuess(userGuess);
        if (result === 0) {
          message.style.color = 'lightgreen';
          message.textContent = `Поздравляю! Вы угадали число ${secretNumber} за ${getWordFromNumber(
            attempts,
            ['попытку', 'попытки', 'попыток']
          )}!`;
          startAnimationWin();
          guessBtn.disabled = true;
          guessInput.disabled = true;
        } else if (attempts % 3 === 0) {
          hints++;
          hintsDisplay.textContent = hints;
          message.style.color = '#a6aef2';
          message.textContent = `Загаданное число является ${
            secretNumber % 2 === 0 ? 'четным' : 'нечетным'
          }.`;
        } else if (attempts >= 15) {
          setGameOver();
        } else {
          hints++;
          hintsDisplay.textContent = hints;
          message.style.color = '#f7968b';
          message.textContent =
            userGuess > secretNumber
              ? 'Загаданное число меньше.'
              : 'Загаданное число больше.';
        }
      }
      guessInput.value = '';
    } else {
      message.style.color = '#a6aef2';
      message.textContent = 'Пожалуйста, введите число.';
    }
  };

  const restartGame = () => {
    secretNumber = generateRandomNumber(minNumber, maxNumber);
    attempts = 0;
    hints = 0;
    attemptsDisplay.textContent = attempts;
    hintsDisplay.textContent = hints;
    message.textContent = '';
    guessBtn.disabled = false;
    guessInput.disabled = false;
    guessInput.value = '';
  };

  const setNewRange = () => {
    if (rangeInputMin.value && rangeInputMax.value) {
      minNumber = parseInt(rangeInputMin.value);
      maxNumber = parseInt(rangeInputMax.value);
      restartGame();
    } else {
      message.textContent =
        'Выберите минимальное и максимальное число диапазона';
    }
  };

  const checkGuess = (guess) => {
    return guess - secretNumber;
  };

  const setGameOver = () => {
    guessInput.disabled = true;
    guessBtn.disabled = true;
    message.style.color = '#f7968b';
    message.textContent = 'Вы проиграли!';
  };

  restartBtn.addEventListener('click', restartGame);
  setUserRangeBtn.addEventListener('click', setNewRange);
  guessBtn.addEventListener('click', guessNumber);
  guessInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      guessNumber();
    }
  });
});
