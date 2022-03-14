let playerScore = 0;
let computerScore = 0;
let turn = 0;

const x = document.querySelectorAll("button.boxes");
document.querySelector('#playerWins').innerHTML = playerScore;
document.querySelector('#computerWins').innerHTML = computerScore;
document.querySelector('#turn').innerHTML = turn;

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

function reset() {
    turn = 1;
    for (let i = 0; i < 9; i++) {
        x[i].disabled = false;
        x[i].innerHTML = null;
    }
    document.querySelector('#turn').innerHTML = turn;
    
}

function buttonClick(id) {
    if (odd(turn) == true) {
        id.innerHTML = "X";
        id.disabled = true;
        checkWin();
    } /* else {
        id.innerHTML = "O";
        id.disabled = true;
        checkWin();
    } */
}

function checkWin() {
    let a;
    let b;
    let c;
    let gameEnd = false;

    for (let i = 0; i < 8; i++) {
        a = winConditions[i][0];
        b = winConditions[i][1];
        c = winConditions[i][2];
        if (x[a].innerHTML === 'X' && x[b].innerHTML === 'X' && x[c].innerHTML === 'X' || x[a].innerHTML === 'O' && x[b].innerHTML === 'O' && x[c].innerHTML === 'O') {
            gameEnd = true;
            break;
        }
    }

    if (odd(turn) == true && gameEnd === true) {
        gameOver(0);
        return;
    } else if (odd(turn) == false && gameEnd === true) {
        gameOver(1);
        return;
    } else if (turn === 9) {
        gameOver(2);
        return;
    }

    turn++;

    if (odd(turn) == false) {
        computerTurn();
    }

    document.querySelector('#turn').innerHTML = turn;
}

function gameOver(value) {
    for (let i = 0; i < 9; i++) {
        x[i].disabled = true;
    }
    if (value === 0) {
        playerScore++;
        document.querySelector('#playerWins').innerHTML = playerScore;
        setTimeout(victoryAlert(value), 1000);
    } else if (value === 1) {
        computerScore++;
        document.querySelector('#computerWins').innerHTML = computerScore;
        setTimeout(victoryAlert(value), 1000);
    } else {
        setTimeout(victoryAlert(value), 1000);
    }
}

function computerTurn() {
    let cTurnOver = false;
    let m;
    let a;
    let b;
    let c;

    for (let i = 0; i < 8; i++) {
        a = winConditions[i][0];
        b = winConditions[i][1];
        c = winConditions[i][2];
        if (x[a].innerHTML === 'O' && x[b].innerHTML === 'O' && x[c].disabled === false) {
            x[c].innerHTML = "O";
            x[c].disabled = true;
            cTurnOver = true;
            break;
        } else if (x[c].innerHTML === 'O' && x[b].innerHTML === 'O' && x[a].disabled === false) {
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

    if (cTurnOver === false) {
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
    

    while (cTurnOver === false) {
        m = Math.floor(Math.random() * 9);
        if (x[m].disabled === false) {
            x[m].innerHTML = "O";
            x[m].disabled = true;
            cTurnOver = true;
        }
    }
    
    checkWin();
}

function odd(value) {
    if (value % 2 === 1) {
        return true;
    } else {
        return false;
    }
}

function victoryAlert (value) {
    if (value === 0) {
        alert('player X wins');
    } else if (value === 1) {
        alert('player O wins');
    } else {
        alert('draw');
    }
}