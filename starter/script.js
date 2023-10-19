'use strict';
const player1EL = document.querySelector('.player--1');
const player0EL = document.querySelector('.player--0');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const current0EL = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
document.querySelector('#score--1').textContent = 0;
document.querySelector('#score--0').textContent = 0;
let playing, currentScore, activePlayer, scores;

function init() {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEl.classList.add('hidden');
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  current0EL.textContent = 0;
  current1El.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
}
init();
function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');

  player1EL.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
