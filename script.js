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

//game section variables
const gameDiv = document.querySelector(".game");
const headerDiv = document.querySelector(".header");
const choiceButtons = document.querySelectorAll(".choice-btn");

//score board variables
const userScoreNumber = document.querySelector(".user__score__number");
const compScoreNumber = document.querySelector(".comp__score__number");

//results section variables
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results-result");
const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".results-text");
const playAgainBtn = document.querySelector(".play-again-btn");
const replayBtn = document.querySelector(".replay-btn");

//rules section variables
const btnRules = document.querySelector(".rules-btn");
const rulesSection = document.querySelector(".rules-section");
const btnClose = document.querySelector(".close-btn");

//next button variable
const nextBtn = document.querySelector(".next-btn");

//hurray section variables
const hurraySection = document.querySelector(".hurray-section");
const backToGame = document.querySelector(".back-to-game");

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

//Hurray Page Functions
function showHurrayPage() {
  gameDiv.classList.add("hidden");
  hurraySection.classList.remove("hidden");
}

function hideHurrayPage() {
  gameDiv.classList.toggle("hidden");
  hurraySection.classList.add("hidden");
}

//game functions
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
  resultDivs.forEach((resultDiv, index) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[index].name}">
          <img src="images/${results[index].name}.png" alt="${results[index].name}" />
        </div>
      `;
    }, index * 1000);
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
      console.log("User Wins");
    } else if (compWins) {
      resultText.innerHTML =
        "you lose <br /> <span class='small-text'> against pc</span>";
      resultDivs[1].classList.toggle("winner");
      keepCompScore(1);
      console.log("PC Wins");
    } else {
      resultText.innerHTML = "tie up";
      replayBtn.style.display = "block";
      playAgainBtn.style.display = "none";
      console.log("Tie up");
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
  nextBtn.style.display = "block";
  replayBtn.style.display = "none";
  playAgainBtn.style.display = "block";
}

function keepCompScore(point) {
  compScore += point;
  compScoreNumber.innerText = compScore;
  localStorage.setItem("compScore", compScore);
  replayBtn.style.display = "none";
  playAgainBtn.style.display = "block";
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
    nextBtn.style.display = "none";
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

//replay button only appears if "Tie Up!"
replayBtn.addEventListener("click", () => {
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

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  rulesSection.classList.toggle("open");
});
btnClose.addEventListener("click", () => {
  rulesSection.classList.toggle("open");
});

//next btn take you to the hurray page when user wins
nextBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
  headerDiv.classList.add("hidden");
  nextBtn.style.display = "none";

  showHurrayPage();
});

//on hurray page backToGame btn for back to the main game screen
backToGame.addEventListener("click", () => {
  hideHurrayPage();

  gameDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");
  headerDiv.classList.remove("hidden");
  nextBtn.style.display = "none";

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});
