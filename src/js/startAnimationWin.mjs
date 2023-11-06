// анимация после выигрыша
export const startAnimationWin = () => {
  for (let i = 0; i < 60; i++) {
    setTimeout(createConfetti, i * 60);
  }
};

const createConfetti = () => {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti');
  confetti.style.left = Math.random() * 100 + '%';
  confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
  confetti.style.opacity = Math.random();
  document.body.appendChild(confetti);
  setTimeout(() => {
    document.body.removeChild(confetti);
  }, 2000);
};
