// Find elementerne i DOM'en
const startButton = document.querySelector(".new_game");
const guessButtons = document.querySelectorAll(".guessBtn");
const resultText = document.querySelector("#result");

let min = 0;
let max = 100;
let computerGuess;

// Tilføj eventlistener til at starte spillet
startButton.addEventListener("click", startGame);

// Spillet er startet
function startGame() {
  // Nulstiller gæt-intervallet sådan at spillet kan genstartes
  min = 0;
  max = 100;

  // Fjern .inactive class fra gætteknapperne
  guessButtons.forEach((button) => {
    button.classList.remove("inactive");
  });

  // Generér det første gæt fra computeren
  computerGuess = generateGuess(min, max);
  resultText.textContent = `Is it ${computerGuess}?`;

  // Deaktiver startknappen
  startButton.classList.add("inactive");
}

// Det første gæt fra computeren vil altid være 50 af logiske årsager.
function generateGuess(min, max) {
  return Math.floor((min + max) / 2);
}

// Alt efter hvordan brugeren klikker, vil computerGuess reguleres og lave et nyt max og min ud fra det første gæt.
guessButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const feedback = button.id;

    if (feedback === "high") {
      max = computerGuess - 1;
    } else if (feedback === "low") {
      min = computerGuess + 1;
    }

    computerGuess = generateGuess(min, max);
    resultText.textContent = `Is it ${computerGuess}?`;

    // Hvis computerens gæt er korrekt
    if (feedback === "correct") {
      resultText.textContent = `Jeg gættede det! Det er ${computerGuess}.`;

      // Deaktiver gætteknapperne
      guessButtons.forEach((button) => {
        button.classList.add("inactive");
      });

      // Aktivér startknappen
      startButton.classList.remove("inactive");

      //Tilføj success animation
      resultText.classList.add("bounce");
    }
  });
});
