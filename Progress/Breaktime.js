
let interval = null;
let time = 0;
let display, buttonContainer, gamesContainer, ticTacToeContainer, guessingGameContainer, cookieClickerContainer;

document.addEventListener('DOMContentLoaded', function () {
    display = document.getElementById("display");
    buttonContainer = document.getElementById("buttonContainer");
    gamesContainer = document.getElementById("gamesContainer");
    ticTacToeContainer = document.getElementById("ticTacToeContainer");
    guessingGameContainer = document.getElementById("guessingGameContainer");
    cookieClickerContainer = document.getElementById("cookieClickerContainer");

    document.getElementById('startButton').addEventListener('click', startTimer);
    document.getElementById('startTicTacToe').addEventListener('click', startTicTacToe);
    document.getElementById('checkGuess').addEventListener('click', checkGuess);
    document.getElementById('startCookieClicker').addEventListener('click', startCookieClicker);
    document.getElementById('cookieButton').addEventListener('click', clickCookie);
    document.getElementById('buyUpgrade').addEventListener('click', buyUpgrade);
});

function startTimer() {
    const userInput = document.getElementById("timeInput").value;
    time = userInput * 60;
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        time -= 1;
        if (time <= 0) {
            clearInterval(interval);
            if (buttonContainer) buttonContainer.style.display = "block";
            if (gamesContainer) gamesContainer.style.display = "none";
        } else {
            if (gamesContainer) gamesContainer.style.display = "block";
        }
        if (display) {
            display.innerHTML =
                Math.floor(time / 3600).toString().padStart(2, "0") + ":" +
                Math.floor((time % 3600) / 60).toString().padStart(2, "0") + ":" +
                Math.floor((time % 60)).toString().padStart(2, "0");
        }
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', startTimer);
function startTicTacToe() {
    ticTacToeContainer.style.display = "block";
    guessingGameContainer.style.display = "none";
    cookieClickerContainer.style.display = "none";
    const board = document.getElementById("ticTacToeBoard");
    const cells = [];
    let currentPlayer = "X";
    let moves = 0;

    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        cells[i] = [];
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td");
            cell.textContent = "";
            cell.onclick = () => {
                if (!cell.textContent) {
                    cell.textContent = currentPlayer;
                    moves++;
                    if (checkWinner(cells, currentPlayer)) {
                        document.getElementById("ticTacToeResult").textContent = `${currentPlayer} wins!`;
                        resetTicTacToe(cells);
                    } else if (moves === 9) {
                        document.getElementById("ticTacToeResult").textContent = "It's a draw!";
                        resetTicTacToe(cells);
                    } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X";
                    }
                }
            };
            cells[i][j] = cell;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}
document.getElementById('startTicTacToe').addEventListener('click', startTicTacToe);
function checkWinner(cells, player) {
    for (let i = 0; i < 3; i++) {
        if (cells[i][0].textContent === player &&
            cells[i][1].textContent === player &&
            cells[i][2].textContent === player) {
            return true; 
        }
        if (cells[0][i].textContent === player &&
            cells[1][i].textContent === player &&
            cells[2][i].textContent === player) {
            return true; 
        }
    }
    if (cells[0][0].textContent === player &&
        cells[1][1].textContent === player &&
        cells[2][2].textContent === player) {
        return true; 
    }
    if (cells[0][2].textContent === player &&
        cells[1][1].textContent === player &&
        cells[2][0].textContent === player) {
        return true; 
    }
    return false;
}

function resetTicTacToe(cells) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cells[i][j].textContent = "";
        }
    }
    document.getElementById("ticTacToeResult").textContent = "";
}

let secretNumber;

function startGuessingGame() {
    ticTacToeContainer.style.display = "none";
    guessingGameContainer.style.display = "block";
    cookieClickerContainer.style.display = "none";
    secretNumber = Math.floor(Math.random() * 100) + 1;
}
document.getElementById('startGuessingGame').addEventListener('click', startGuessingGame);
function checkGuess() {
    const guess = parseInt(document.getElementById("guessInput").value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById("guessResult").textContent = "Please enter a valid number between 1 and 100.";
    } else if (guess === secretNumber) {
        document.getElementById("guessResult").textContent = "Congratulations! You guessed the correct number!";
        secretNumber = null;
    } else if (guess < secretNumber) {
        document.getElementById("guessResult").textContent = "Too low! Try again.";
    } else {
        document.getElementById("guessResult").textContent = "Too high! Try again.";
    }
}
document.getElementById('checkGuess').addEventListener('click', checkGuess);
let cookiePoints = 0;
let upgradeLevel = 0;

function startCookieClicker() {
    ticTacToeContainer.style.display = "none";
    guessingGameContainer.style.display = "none";
    cookieClickerContainer.style.display = "block";
}
document.getElementById('startCookieClicker').addEventListener('click', startCookieClicker);
function clickCookie() {
    cookiePoints += 1 + upgradeLevel;
    document.getElementById("cookiePoints").textContent = cookiePoints;
    const cookieButton = document.getElementById("cookieButton");
    cookieButton.style.backgroundImage = "url('https://media4.giphy.com/media/4k5rYT3JBOxHiG6efa/giphy.gif')";
    setTimeout(() => {
        cookieButton.style.backgroundImage = "url('download.png')";
    }, 300);
}
document.getElementById('cookieButton').addEventListener('click', clickCookie);
function buyUpgrade() {
    if (cookiePoints >= 10) {
        cookiePoints -= 10;
        upgradeLevel++;
        document.getElementById("cookiePoints").textContent = cookiePoints;
        document.getElementById("upgradeLevel").textContent = upgradeLevel;
    } else {
        alert("You don't have enough points to buy this upgrade!");
    }
}
document.getElementById('buyUpgrade').addEventListener('click', buyUpgrade);
