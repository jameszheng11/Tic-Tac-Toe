let playerScore = 0;
let computerScore = 0;
let turn = 0;

// Displaying initial stats
document.querySelector('#playerWins').innerHTML = playerScore;
document.querySelector('#computerWins').innerHTML = computerScore;
document.querySelector('#turn').innerHTML = turn;

// Creating an array and to store the html locations of the game buttons
const x = document.querySelectorAll("button.boxes");

// Tic tac toe win conditions
const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Function to reset the game
function reset() {
    // Setting the default turn
    turn = 1;
    // Clearing all of the game buttons and enabling them
    for (let i = 0; i < 9; i++) {
        x[i].disabled = false;
        x[i].innerHTML = null;
    }
    // Displaying the default turn
    document.querySelector('#turn').innerHTML = turn;
}

// Function called when the player makes a move
function buttonClick(id) {
    // If the turn is odd, it is the player's turn
    if (odd(turn) == true) {
        // Set the selected button to X
        id.innerHTML = "X";
        // Disable the button from being pressed
        id.disabled = true;
        // Check to see if the game is over
        checkWin();
    } /* else { // The second player's turn
        id.innerHTML = "O";
        id.disabled = true;
        checkWin();
    } */
}

// Function to check if the game is over
function checkWin() {
    let a;
    let b;
    let c;
    let gameEnd = false;

    // Checking to see if any win conditions have been achieved
    for (let i = 0; i < 8; i++) {
        a = winConditions[i][0];
        b = winConditions[i][1];
        c = winConditions[i][2];
        if (x[a].innerHTML === 'X' && x[b].innerHTML === 'X' && x[c].innerHTML === 'X' || x[a].innerHTML === 'O' && x[b].innerHTML === 'O' && x[c].innerHTML === 'O') {
            // Setting the game state as ended
            gameEnd = true;
            break;
        }
    }

    // Determining the victory state
    if (odd(turn) && gameEnd) {
        // If the turn is odd and the game state is ended, the player wins
        gameOver(0);
        return;
    } else if (!odd(turn) && gameEnd) {
        // If the turn is not odd and the game state is ended, the computer wins
        gameOver(1);
        return;
    } else if (turn === 9) {
        // If it is the end of the 9th turn, the game is a draw
        gameOver(2);
        return;
    }

    // Increment the turn
    turn++;

    // If the turn is even, the computer makes a move
    if (!odd(turn)) {
        computerTurn();
    }

    // Updating the turn display
    document.querySelector('#turn').innerHTML = turn;
}

// Function that determines what to display depending on the victory state
function gameOver(value) {
    // Disable all of the buttons
    for (let i = 0; i < 9; i++) {
        x[i].disabled = true;
    }

    // Determine who is the victor based on the passed value
    if (value === 0) {
        // The player has won so increment the player's score
        playerScore++;
        document.querySelector('#playerWins').innerHTML = playerScore;
        // Display the victory message
        victoryAlert(value);
    } else if (value === 1) {
        // The computer has won so increment the computer's score
        computerScore++;
        document.querySelector('#computerWins').innerHTML = computerScore;
        // Display the victory message
        victoryAlert(value);
    } else {
        // The game is a draw
        // Display the victory message
        victoryAlert(value);
    }
}

// Function that plays as a computer player
function computerTurn() {
    let cTurnOver = false;
    let m;
    let a;
    let b;
    let c;

    // Check to see if the computer player is close to victory
    for (let i = 0; i < 8; i++) {
        a = winConditions[i][0];
        b = winConditions[i][1];
        c = winConditions[i][2];
        if (x[a].innerHTML === 'O' && x[b].innerHTML === 'O' && x[c].disabled === false) {
            x[c].innerHTML = "O";
            x[c].disabled = true;
            cTurnOver = true;
            break;
        } else if (x[b].innerHTML === 'O' && x[c].innerHTML === 'O' && x[a].disabled === false) {
            x[a].innerHTML = "O";
            x[a].disabled = true;
            cTurnOver = true;
            break;
        } else if (x[c].innerHTML === 'O' && x[a].innerHTML === 'O' && x[b].disabled === false) {
            x[b].innerHTML = "O";
            x[b].disabled = true;
            cTurnOver = true;
            break;
        }
    }

    // If the computer player is not close to victory, check to see if the player is close to victory
    if (!cTurnOver) {
        for (let i = 0; i < 8; i++) {
            a = winConditions[i][0];
            b = winConditions[i][1];
            c = winConditions[i][2];
            if (x[a].innerHTML === 'X' && x[b].innerHTML === 'X' && x[c].disabled === false) {
                x[c].innerHTML = "O";
                x[c].disabled = true;
                cTurnOver = true;
                break;
            } else if (x[c].innerHTML === 'X' && x[b].innerHTML === 'X' && x[a].disabled === false) {
                x[a].innerHTML = "O";
                x[a].disabled = true;
                cTurnOver = true;
                break;
            } else if (x[c].innerHTML === 'X' && x[a].innerHTML === 'X' && x[b].disabled === false) {
                x[b].innerHTML = "O";
                x[b].disabled = true;
                cTurnOver = true;
                break;
            }
        }
    }
    
    // If the computer player is not close to victory and the player is not close to victory, pick a random button
    while (!cTurnOver) {
        m = Math.floor(Math.random() * 9);
        if (!x[m].disabled) {
            x[m].innerHTML = "O";
            x[m].disabled = true;
            cTurnOver = true;
        }
    }
    
    // Check to see if the game is over
    checkWin();
}

// Function to determine if the turn number is odd or even
function odd(value) {
    if (value % 2 === 1) {
        return true;
    } else {
        return false;
    }
}

// Function to display the victory text depending on the victory state
function victoryAlert (value) {
    if (value === 0) {
        alert('player X wins');
    } else if (value === 1) {
        alert('player O wins');
    } else {
        alert('draw');
    }
}