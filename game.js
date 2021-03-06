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
var win = false;
var winConditions = [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"], ["one", "four", "seven"], ["two", "five", "eight"], ["three", "six", "nine"], ["one", "five", "nine"], ["three", "five", "seven"]];

const applyStorage = () => {
    if ("currentStatus" in sessionStorage) {
        var currStatus = JSON.parse(sessionStorage.getItem("currentStatus"));
        var oPlayerPos = currStatus.oPlayer;
        var xPlayerPos = currStatus.xPlayer;
        var nextPlayer = currStatus.whoPlayNext;
        move = nextPlayer;

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
}

const applyWinnTimes = () => {
    xWinning = sessionStorage.getItem("xPlayerWinTimes") !== null ? sessionStorage.getItem("xPlayerWinTimes") : 0;
    oWinning = sessionStorage.getItem("oPlayerWinTimes") !== null ? sessionStorage.getItem("oPlayerWinTimes") : 0;
    xWinResult.textContent = xWinning;
    oWinResult.textContent = oWinning;
}

const populateStorage = (status) => {
    sessionStorage.setItem("currentStatus", JSON.stringify(status));
}

if (sessionStorage.length > 0) {
    applyStorage();
    applyWinnTimes();
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

    if (numberOfO.length >= 3 && nextMove === "X") {
        isWin(numberOfO);
    }
    else if (numberOfX.length >= 3 && nextMove === "O") {
        isWin(numberOfX);
    }

    return nextMove;
}

const isWin = (markNodeList) => {
    var markPosArr = Array.prototype.slice.call(markNodeList).map(x => x.id);

    var player = markNodeList[0].textContent;

    winConditions.forEach((condition) => {
        if (condition.every(x => (markPosArr.indexOf(x) !== -1))) {
            win = true;
        }
    });

    if (win) {
        winnerDisplay(player);
    }
    else if (!win && markNodeList.length === 5) {
        indication.textContent = "Stalemate";
    }
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
    win = false;
    sessionStorage.removeItem("currentStatus");
}

btnX.addEventListener("click", () => { playerRun("X") });
btnO.addEventListener("click", () => { playerRun("O") });

gameTable.addEventListener("click", () => {
    move = tickCell(event, move);
});

btnRest.addEventListener("click", resetGame);