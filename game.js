/* ============================================================
   Exact translation of your Java OOP structure
   ============================================================ */

/* interface Checker */
class Checker {
  isValidNumber(input) { throw new Error("Not implemented"); }
  inRange(min, max, num) { throw new Error("Not implemented"); }
}

/* class Validator implements Checker */
class Validator extends Checker {
  isValidNumber(input) {
    if (input === null || input === "") return false;
    return !isNaN(parseInt(input, 10)) && String(parseInt(input, 10)) === String(input).trim();
  }
  inRange(min, max, num) {
    return min <= num && num <= max;
  }
}

/* class Game */
class Game {
  #number;
  #attempts;
  #maxAttempts = 10;

  constructor(min, max) {
    this.#number   = Math.floor(Math.random() * (max - min + 1)) + min;
    this.#attempts = 0;
  }

  getNumber()      { return this.#number; }
  getAttempts()    { return this.#attempts; }
  getMaxAttempts() { return this.#maxAttempts; }
  getRemaining()   { return this.#maxAttempts - this.#attempts; }
  isGameOver()     { return this.#attempts >= this.#maxAttempts; }

  checkGuess(guess) {
    this.#attempts++;
    const near = Math.abs(this.#number - guess);
    if (this.#number === guess) return "Correct";
    if (near <= 5)  return this.#number > guess ? "Too Low|near"  : "Too High|near";
    if (near <= 10) return this.#number > guess ? "Too Low|close" : "Too High|close";
    if (this.#number > guess) return "Too Low";
    return "Too High";
  }
}

/* ============================================================
   Main — UI wiring (mirrors your Main.java loop)
   ============================================================ */
const validator  = new Validator();
let   game       = new Game(1, 100);
let   gameActive = true;

const input      = document.getElementById("guess-input");
const checkBtn   = document.getElementById("check-btn");
const msgBox     = document.getElementById("msg-box");
const msgText    = document.getElementById("msg-text");
const counter    = document.getElementById("attempt-counter");
const bar        = document.getElementById("bar");
const chips      = document.getElementById("chips");
const actionRow  = document.getElementById("action-row");
const playAgain  = document.getElementById("play-again-btn");
const quitBtn    = document.getElementById("quit-btn");
const card       = document.getElementById("card");

function setMessage(text, type) {
  msgBox.className = "message-box " + (type || "");
  msgText.textContent = text;
}

function updateBar(attempts) {
  const pct = Math.max(0, ((10 - attempts) / 10) * 100);
  bar.style.width = pct + "%";
  bar.className = "bar-fill" + (attempts >= 8 ? " danger" : attempts >= 6 ? " warn" : "");
}

function addChip(guess, direction, proximity) {
  const chip = document.createElement("span");
  const base = direction === "Correct" ? "correct" : direction === "Too High" ? "high" : "low";
  chip.className = "chip " + base + (proximity ? " " + proximity : "");
  chip.textContent = proximity === "near" ? guess + " 🔥" : proximity === "close" ? guess + " 🌡️" : guess;
  chips.appendChild(chip);
}

function endGame(won) {
  gameActive = false;
  input.disabled = true;
  checkBtn.disabled = true;
  actionRow.style.display = "flex";
  if (won) {
    setMessage("Correct! You guessed it in " + game.getAttempts() + " attempt" + (game.getAttempts() === 1 ? "" : "s") + ".", "correct");
    card.classList.add("pop");
    setTimeout(() => card.classList.remove("pop"), 300);
  } else {
    setMessage("You lose. The number was: " + game.getNumber(), "lose");
  }
}

function handleGuess() {
  if (!gameActive) return;

  const raw = input.value.trim();

  if (!validator.isValidNumber(raw)) {
    setMessage("Invalid input — enter a whole number.", "invalid");
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 350);
    input.value = "";
    return;
  }

  const guess = parseInt(raw, 10);

  if (!validator.inRange(1, 100, guess)) {
    setMessage("Out of range — must be between 1 and 100.", "invalid");
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 350);
    input.value = "";
    return;
  }

  const result = game.checkGuess(guess);
  const [direction, proximity] = result.split("|");
  addChip(guess, direction, proximity);
  updateBar(game.getAttempts());
  counter.textContent = game.getAttempts() + " / " + game.getMaxAttempts();
  input.value = "";

  if (direction === "Correct") { endGame(true);  return; }
  if (game.isGameOver())       { endGame(false); return; }

  const arrow    = direction === "Too High" ? "↓" : "↑";
  const type     = direction === "Too High" ? "high" : "low";
  const nearHint = proximity === "near"  ? " 🔥 You're too near!"
                 : proximity === "close" ? " 🌡️ You're close!"
                 : "";
  setMessage(direction + " " + arrow + nearHint + " — " + game.getRemaining() + " attempt" + (game.getRemaining() === 1 ? "" : "s") + " remaining.", type + (proximity ? " " + proximity : ""));
  input.focus();
}

checkBtn.addEventListener("click", handleGuess);
input.addEventListener("keydown", e => { if (e.key === "Enter") handleGuess(); });

playAgain.addEventListener("click", () => {
  game = new Game(1, 100);
  gameActive = true;
  input.disabled = false;
  checkBtn.disabled = false;
  actionRow.style.display = "none";
  chips.innerHTML = "";
  input.value = "";
  updateBar(0);
  counter.textContent = "0 / 10";
  setMessage("New game started. Enter your guess!", "");
  input.focus();
});

quitBtn.addEventListener("click", () => {
  gameActive = false;
  input.disabled = true;
  checkBtn.disabled = true;
  actionRow.style.display = "none";
  setMessage("Thanks for playing. Refresh to start again.", "");
});

input.focus();
updateBar(0);
