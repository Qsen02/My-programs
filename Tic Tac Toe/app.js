window.addEventListener("load", start);

function start() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let squares = document.querySelectorAll(".content");
    let orinalgBoard = Array.from(Array(9).keys());
    let squareArray = Array.from(squares);
    squareArray.forEach(el => el.addEventListener("click", fill));
    let buttonX = document.getElementById("X");
    let buttonO = document.getElementById("O");
    buttonX.classList.add("active");
    buttonX.addEventListener("click", changeX);
    buttonO.addEventListener("click", changeO);
    let player = "X";
    let bot = "O";

    function changeX() {
        buttonX.classList.add("active");
        buttonO.classList.remove("active");
        player = "X";
        bot = "O";
    }

    function changeO() {
        buttonX.classList.remove("active");
        buttonO.classList.add("active");
        player = "O";
        bot = "X";
    }


    function fill(event) {
        const divId = event.target.dataset.id;
        orinalgBoard[divId] = player;
        event.target.textContent = player;
        checkForWin(player);
        buttonX.disabled = true;
        buttonO.disabled = true;
        let botMove = minimax(orinalgBoard, bot).index
        orinalgBoard[botMove] = bot;
        setInterval(() => squareArray[botMove].textContent = bot, 500);
        setInterval(() => checkForWin(bot), 1000);
    }

    function checkForWin(player) {
        for (let combo of winCombos) {
            let isWin = combo.filter(el => squareArray[el].textContent == player);
            if (isWin.length == 3) {
                win(player);
            }
        }
        let count = 0;
        for (let square of squareArray) {
            if (square.textContent == "") {
                count++;
            }
        }
        if (count == 0) {
            win("Draw");
        }
    }

    function win(filler) {
        let bodyRef = document.querySelector("body");
        let mainRef = document.querySelector(".main");
        mainRef.remove();
        let divEl = document.createElement("div");
        divEl.classList.add("new-main");
        let h3El = document.createElement("h3");
        if (filler == "Draw") {
            h3El.textContent = `${filler}!`;
        } else if (filler == bot) {
            h3El.textContent = `You lost :(`;
        } else if (filler == player) {
            h3El.textContent = `Congratulations! You win!`;
        }
        h3El.display = "block";
        h3El.style.fontFamily = "Arial, Helvetica, sans-serif";
        h3El.style.color = "white";
        h3El.style.textAlign = "center";
        divEl.appendChild(h3El);
        let newGameBtn = document.createElement("button");
        newGameBtn.textContent = "New Game";
        newGameBtn.classList.add("new-game-button");
        divEl.appendChild(newGameBtn);
        bodyRef.appendChild(divEl);
        newGameBtn.addEventListener("click", () => {
            buttonX.disabled = false;
            buttonO.disabled = false;
            location.reload();
        })
    }

    function emptySquares() {
        return orinalgBoard.filter(el => typeof(el) === "number");
    }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        return gameWon;
    }

    function minimax(newBoard, curPlayer) {
        var availSpots = emptySquares();
        if (checkWin(newBoard, player)) {
            return { score: -10 };
        } else if (checkWin(newBoard, bot)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }
        var moves = [];
        for (let i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = curPlayer;

            if (curPlayer == bot) {
                var result = minimax(newBoard, player);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, bot);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }
        var bestMove;
        if (curPlayer === bot) {
            var bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
}