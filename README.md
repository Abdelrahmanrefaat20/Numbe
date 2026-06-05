# Number Guessing Game

A simple Java console game where you guess a randomly generated number between 1 and 100.

---

## How to Play

1. Open the project in IntelliJ IDEA
2. Run the `Main` class
3. Enter your guess when prompted
4. You have **10 attempts** to find the number

---

## Example

```
Welcome! Guess a number between 1 and 100. You have 10 attempts.
Attempt 1/10 — Enter your guess: 50
Too High! 9 attempts remaining.
Attempt 2/10 — Enter your guess: 25
Too Low! 8 attempts remaining.
Attempt 3/10 — Enter your guess: 37
Correct! You guessed it in 3 attempts.
Play again? (yes/no):
```

---

## Project Structure

```
App/
  Main.java         — game loop and I/O
Game/
  Game.java         — game logic
  Checker.java      — validator interface
  Validator.java    — input validation
```

---

## Technologies

- Java
- OOP and SOLID principles
- Exception handling

---

## Author

Abdelrahman Refaat
