# Number Guessing Game

A number guessing game built with Java OOP — and deployed as a web app via GitHub Pages.

---

## Project Structure

```
NumberGuessingGame/
├── src/
│   ├── App/
│   │   └── Main.java          ← game loop & UI (JOptionPane)
│   └── Game/
│       ├── Game.java          ← core game logic
│       ├── Checker.java       ← validator interface
│       └── Validator.java     ← input validation
├── web/
│   └── index.html             ← web version (GitHub Pages)
└── README.md
```

---

## How to Run the Java Version

1. Open the project in IntelliJ IDEA
2. Run `src/App/Main.java`
3. Guess a number between 1 and 100 — you have 10 attempts

---

## How to Deploy the Web Version (GitHub Pages)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Add Number Guessing Game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Number-Guessing-Game.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `main` branch and set folder to `/web`
4. Click **Save**

### Step 3 — Your game is live at:

```
https://YOUR_USERNAME.github.io/Number-Guessing-Game/
```

---

## Technologies

- Java (OOP, SOLID principles, interfaces, exception handling)
- HTML / CSS / JavaScript (same OOP structure as the Java code)
- GitHub Pages (free hosting)

---

## Author

Abdelrahman Refaat
