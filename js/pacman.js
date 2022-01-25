'use strict'


var PACMAN = '<img src="images/pacmanleft.jpg" />';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn ) return
    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;
    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gPacman.isSuper) { 
            ghostEater({ i: nextLocation.i, j: nextLocation.j })
        } else {
            gameOver();
            return;
        }
    }
    if (nextCell === FOOD) {
        gFoodCounter--;
        updateScore(1)
        if (gFoodCounter === 0) {
            isVictory = true;
            gameOver(isVictory) 
        }
    }
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true;
        setSuperFood();
    }
    if (nextCell === CHERRY) {
        updateScore(10);
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    renderCell(gPacman.location, PACMAN)
}


function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.key) {
        case 'ArrowUp':
            PACMAN = '<img src="images/pacmanup.jpg" />'
            nextLocation.i--
            break;
        case 'ArrowDown':
            PACMAN = '<img src="images/pacmandown.jpg" />'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            PACMAN = '<img src="images/pacmanleft.jpg" />'
            nextLocation.j--
            break;
        case 'ArrowRight':
            PACMAN = '<img src="images/pacmanright.jpg" />'
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}

function setSuperFood() {
    getGhostHTML();
    setTimeout(function () {
        gPacman.isSuper = false;
        gGhosts.push(...gGhostSaver);
        gGhostSaver = [];
    }, 5000);
}
