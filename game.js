var gameTable = document.querySelector(".table");
var gameTableCell = gameTable.querySelectorAll(".cell");
var indication = document.querySelector(".runs");
var winnerTxt = document.querySelector("footer");
var btnX = document.querySelector(".figX");
var btnO = document.querySelector(".figO");
var xWinResult = document.querySelector(".xwinning");
var oWinResult = document.querySelector(".owinning");
var xWinning = 0;
var oWinning = 0;

var move;
var winConditions = [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"], ["one", "four", "seven"], ["two", "five", "eight"], ["three", "six", "nine"], ["one", "five", "nine"], ["three", "five", "seven"]];
var btnRest = document.querySelector(".reset-button");

const playerRun = (figs) => {
    figs === "X" ? move = "X" : move = "O";
    console.log(move);
}

const tickCell = (event, nextMove) => {
    if (event.target.textContent === "") {
        if (nextMove == "O") {
            event.target.textContent = "O";
            event.target.classList.add("cellO");
            indication.textContent = "X Turn";
            nextMove = "X";
        }
        else {
            event.target.textContent = "X";
            event.target.classList.add("cellX");
            indication.textContent = "O Turn";
            nextMove = "O";
        }
    }

    var numberOfO = document.querySelectorAll(".cellO");
    var numberOfX = document.querySelectorAll(".cellX");

    if (numberOfO.length >= 3 || numberOfX.length >= 3) {
        isWin(numberOfO);
        isWin(numberOfX);
    }

    return nextMove;
}

const isWin = (markNodeList) => {
    var markPosArr = Array.prototype.slice.call(markNodeList).map(x => x.id);

    var player = markNodeList[0].textContent;

    winConditions.forEach((condition) => {
        if (condition.every(x => (markPosArr.indexOf(x) !== -1))) {
            winnerDisplay(player);
        }
    });
}

const winnerDisplay = (xORo) => {
    indication.textContent = "The Winner is " + xORo;
    if (xORo === "X") {
        xWinning++;
        xWinResult.textContent = xWinning;
    }
    else {
        oWinning++;
        oWinResult.textContent = oWinning;
    }

}


const resetGame = () => {
    gameTableCell.forEach((cell) => { cell.textContent = ""; cell.className = "cell" });
    indication.textContent = "Start game or select player";
    move = "";
}

gameTable.addEventListener("click", () => {
    move = tickCell(event, move)
});

btnRest.addEventListener("click", resetGame);
btnX.addEventListener("click", () => { playerRun("X") });
btnO.addEventListener("click", () => { playerRun("O") });
