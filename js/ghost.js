'use strict'
const GHOST = '&#9781;';
var gGhosts;
var gIntervalGhosts;
var gGhostSaver = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) gameOver(isVictory);
        else return;

    }
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location, ghost.currCellContent)
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) return `<span style="color:blue">${GHOST}</span>`
    else return `<span style="color: ${ghost.color}">${GHOST}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function ghostEater(locationObj) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.i === locationObj.i && currGhost.location.j === locationObj.j) {
            var ghostRemoved = gGhosts.splice(i, 1)[0];
            gGhostSaver.push(ghostRemoved);
            break;
        }
    }
}