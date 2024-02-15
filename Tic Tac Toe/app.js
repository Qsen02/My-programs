window.addEventListener("load", start);

function start() {
    let squares = document.querySelectorAll(".content");
    let squareArray = Array.from(squares)
    squareArray.forEach(el => el.addEventListener("click", fill));
    let buttonX = document.getElementById("X");
    let buttonO = document.getElementById("O");
    let filler = "X";
    buttonX.classList.add("active");
    buttonX.addEventListener("click", changeX);
    buttonO.addEventListener("click", changeO);

    function changeX() {
        buttonX.classList.add("active");
        buttonO.classList.remove("active");
        filler = "X"
    }

    function changeO() {
        buttonX.classList.remove("active");
        buttonO.classList.add("active");
        filler = "O";
    }


    function fill(event) {
        event.target.textContent = filler;
        checkForWin(filler);
        enemyFill();
    }

    function enemyFill() {
        let enemyFiller = changeFiller();
        checkForWin(enemyFiller);
        let index = Math.floor(Math.random() * 8);
        while (squareArray[index].textContent != "") {
            let count = 0
            for (let square of squareArray) {
                if (square.textContent == "") {
                    count++;
                }
            }
            if (count == 0) {
                return;
            }
            index = Math.floor(Math.random() * 8);
        }
        setInterval(() => { squareArray[index].textContent = enemyFiller }, 1000);
    }

    function checkForWin(filler) {
        if ((squareArray[0].textContent == filler && squareArray[1].textContent == filler && squareArray[2].textContent == filler) ||
            (squareArray[3].textContent == filler && squareArray[4].textContent == filler && squareArray[5].textContent == filler) ||
            (squareArray[6].textContent == filler && squareArray[7].textContent == filler && squareArray[8].textContent == filler)) {
            win(filler);
        } else if ((squareArray[0].textContent == filler && squareArray[3].textContent == filler && squareArray[6].textContent == filler) ||
            (squareArray[1].textContent == filler && squareArray[4].textContent == filler && squareArray[7].textContent == filler) ||
            (squareArray[2].textContent == filler && squareArray[5].textContent == filler && squareArray[8].textContent == filler)) {
            win(filler);
        } else if (squareArray[0].textContent == filler && squareArray[4].textContent == filler && squareArray[8].textContent == filler) {
            win(filler);
        } else if (squareArray[2].textContent == filler && squareArray[4].textContent == filler && squareArray[6].textContent == filler) {
            win(filler);
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
        } else {
            h3El.textContent = `Player ${filler} wins!`;
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
            location.reload();
        })
    }

    function changeFiller() {
        return filler == "X" ? "O" : "X";
    }
}