const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const userScoreNumber = document.querySelector(".user__score__number");
const compScoreNumber = document.querySelector(".comp__score__number");

//local storage created for storing the score. No reset even after reloading page
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let compScore = parseInt(localStorage.getItem("compScore")) || 0;

// Update scores on the page load
userScoreNumber.innerText = userScore;
compScoreNumber.innerText = compScore;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const compchoice = compChoose();
  displayResults([choice, compchoice]);
  displayWinner([choice, compchoice]);
}

function compChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const compWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerHTML =
        "you win <br /> <span class='small-text'> against pc</span>";
      resultDivs[0].classList.toggle("winner");
      keepUserScore(1);
      console.log("userwins");
    } else if (compWins) {
      resultText.innerHTML =
        "you lose <br /> <span class='small-text'> against pc</span>";
      resultDivs[1].classList.toggle("winner");
      keepCompScore(1);
      console.log("compWins");
    } else {
      resultText.innerHTML = "tie up";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepUserScore(point) {
  userScore += point;
  userScoreNumber.innerText = userScore;
  localStorage.setItem("userScore", userScore);
}

function keepCompScore(point) {
  compScore += point;
  compScoreNumber.innerText = compScore;
  localStorage.setItem("compScore", compScore);
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});
