'use strict'
const WALL = '🏠'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🎁';
const CHERRY = '🍒';
var gIntervalId = null;
var gFoodCounter = -1;
var isVictory = false;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gFoodCounter = -1;
    isVictory = false;
    var elDiv = document.querySelector('.modal');
    elDiv.style.display = 'none';
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    
    gIntervalId = setInterval(addCherry, 15000, gBoard);
    gGame.isOn = true; 
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            else if ((j === 1 && i === 1) || (j === 8 && i === 1) || (j === 1 && i === 8) || (j === 8 && i === 8)) {
                board[i][j] = SUPERFOOD;
            } else {
                board[i][j] = FOOD;
                gFoodCounter++;
                console.log(gFoodCounter);
            }
        }
    }

    return board;
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(isVictory) {
    var elModal =document.querySelector('.modal');
    var elSpan = document.querySelector('.game-over');
    elModal.style.display = 'block';
    if (isVictory){
        elSpan.innerText = 'victorious! would you like to play again?';
    } else {
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
        renderCell(gPacman.location, EMPTY);
        elSpan.innerText = 'Game over! would you like to play again?';
    }
    
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalId);
}


function emptyCellsArray() {
    var array = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (cell !== PACMAN && cell !== GHOST && cell !== SUPERFOOD && cell !== FOOD && cell !== WALL) {
                array.push({ i: i, j: j });
            }
        }
    }

     return array;
}

function addCherry(board) {
    var array = emptyCellsArray();
    if (!array.length) return;
    var idx =  getRandomIntInclusive(0, array.length-1)
    var pos = array[idx]
    board[pos.i][pos.j] = CHERRY;
    renderCell(pos, CHERRY);
}

