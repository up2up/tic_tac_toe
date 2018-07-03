var gameTable = document.querySelector(".table");
// var cellNodeList = document.querySelectorAll(".cell");
var move = "O";
var winConditions = [["one", "two", "three"], ["four", "five", "six"], ["seven", "eight", "nine"], ["one", "four", "seven"], ["two", "five", "eight"], ["three", "six", "nine"], ["one", "five", "nine"], ["three", "five", "seven"]];



const tickCell = (event, nextMove) => {
    if (nextMove == "O") {
        event.target.textContent = "O";
        event.target.classList.add("cellO");
        nextMove = "X";
    }
    else {
        event.target.textContent = "X";
        event.target.classList.add("cellX");
        nextMove = "O";
    }

    var numberOfO = document.querySelectorAll(".cellO");
    var numberOfX = document.querySelectorAll(".cellX");

    if (numberOfO.length >= 3) {
        isWin(numberOfO);
    }
    else if (numberOfX.length >= 3) {
        isWin(numberOfX);
    }

    return nextMove;
}

const isWin = (markNodeList) => {
    var markPosArr = Array.prototype.slice.call(markNodeList).map(x => x.id);
    console.log(markPosArr);
    var player = markNodeList[0].textContent;

    winConditions.forEach((condition) => {
        if (condition.every(x => (markPosArr.indexOf(x) !== -1))) { console.log("winner " + player); }

    });
}

gameTable.addEventListener("click", () => {
            move = tickCell(event, move)
        });

