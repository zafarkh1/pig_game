"use strict";

// Selecting elements
let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

let score0Pl = document.getElementById("score--0");
let score1Pl = document.getElementById("score--1");

let current0Pl = document.getElementById("current--0");
let current1Pl = document.getElementById("current--1");

let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");

let dice = document.querySelector(".dice");

// Starting consitions
let score, current, active, playing;

const initialisation = () => {
  score0Pl.textContent = 0;
  score1Pl.textContent = 0;
  current0Pl.textContent = 0;
  current1Pl.textContent = 0;

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  score = [0, 0];
  current = 0;
  active = 0;
  playing = true;

  dice.classList.add("hidden");
};

initialisation();

// Switch player functionality
const switchPlayer = () => {
  document.getElementById(`current--${active}`).textContent = 0;
  current = 0;
  active = active === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Roll dice functionality
btnRoll.addEventListener("click", () => {
  if (playing) {
    // Generate random dice roll
    let randomDice = Math.floor(Math.random() * 6) + 1;
    // Display dice
    dice.src = `./images/dice-${randomDice}.png`;
    dice.classList.remove("hidden");
    // Check for rolled 1
    if (randomDice !== 1) {
      // Add dice to current score
      current += randomDice;
      document.getElementById(`current--${active}`).textContent = current;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to active player's score
    score[active] += current;
    document.getElementById(`score--${active}`).textContent = score[active];
    // 2. Check if player's score is >=100
    if (score[active] >= 100) {
      // Finish the game
      document
        .querySelector(`.player--${active}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${active}`)
        .classList.remove("player--active");
      dice.classList.add("hidden");
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", initialisation);