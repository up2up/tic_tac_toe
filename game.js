var gameTable = document.querySelector(".table");
var gameTableCell = gameTable.querySelectorAll(".cell");
var indication = document.querySelector(".runs");
var winnerTxt = document.querySelector("footer");
var btnX = document.querySelector(".figX");
var btnO = document.querySelector(".figO");
var xWinResult = document.querySelector(".xwinning");
var oWinResult = document.querySelector(".owinning");
var btnRest = document.querySelector(".reset-button");
var xWinning = 0;
var oWinning = 0;
var move;
var winConditions = [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"], ["one", "four", "seven"], ["two", "five", "eight"], ["three", "six", "nine"], ["one", "five", "nine"], ["three", "five", "seven"]];

if (sessionStorage.getItem("currentStatus")) {
    var currStatus = JSON.parse(sessionStorage.getItem("currentStatus"));
    var oPlayerPos = currStatus.oPlayer;
    var xPlayerPos = currStatus.xPlayer;
    var nextPlayer = currStatus.whoPlayNext;
    var xResult = sessionStorage.getItem("xPlayerWinTimes");
    var oResult = sessionStorage.getItem("oPlayerWinTimes");
    xWinResult.textContent = xResult;
    oWinResult.textContent = oResult;

    oPlayerPos.forEach((pos) => {
        document.querySelector("#" + pos).textContent = "O";
        document.querySelector("#" + pos).classList.add("cellO");
    });

    xPlayerPos.forEach((pos) => {
        document.querySelector("#" + pos).textContent = "X";
        document.querySelector("#" + pos).classList.add("cellX");
    });
    indication.textContent = nextPlayer + " Turn";
}

const playerRun = (figs) => {
    figs === "X" ? move = "X" : move = "O";
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

    var oPosArr = Array.prototype.slice.call(numberOfO).map(x => x.id);
    var xPosArr = Array.prototype.slice.call(numberOfX).map(x => x.id);
    var statusPlayers = { oPlayer: oPosArr, xPlayer: xPosArr, whoPlayNext: nextMove };

    populateStorage(statusPlayers);

    if (numberOfO.length >= 3 || numberOfX.length >= 3) {
        isWin(numberOfO);
        isWin(numberOfX);
    }

    return nextMove;
}

const populateStorage = (status) => {
    sessionStorage.setItem("currentStatus", JSON.stringify(status));
    console.log(sessionStorage.getItem("currentStatus"));
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
        sessionStorage.setItem("xPlayerWinTimes", xWinning);
    }
    else {
        oWinning++;
        oWinResult.textContent = oWinning;
        sessionStorage.setItem("oPlayerWinTimes", oWinning);
    }

}

const resetGame = () => {
    gameTableCell.forEach((cell) => { cell.textContent = ""; cell.className = "cell" });
    indication.textContent = "Start game or select player";
    move = "";
}

btnX.addEventListener("click", () => { playerRun("X") });
btnO.addEventListener("click", () => { playerRun("O") });

gameTable.addEventListener("click", () => {
    move = tickCell(event, move);
});

btnRest.addEventListener("click", resetGame);