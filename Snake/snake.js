window.addEventListener("load", start);

function start() {
    window.addEventListener("keydown", changeDirection);
    let score = 0;
    const moves = {
        ArrowDown: () => ctx.drawImage(snakeDown, snakeStats.x, snakeStats.y += 3, snakeStats.w + score * 10, snakeStats.h + score * 10),
        ArrowUp: () => ctx.drawImage(snakeUp, snakeStats.x, snakeStats.y -= 3, snakeStats.w + score * 10, snakeStats.h + score * 10),
        ArrowLeft: () => ctx.drawImage(snakeLeft, snakeStats.x -= 3, snakeStats.y, snakeStats.w + score * 10, snakeStats.h + score * 10),
        ArrowRight: () => ctx.drawImage(snakeRight, snakeStats.x += 3, snakeStats.y, snakeStats.w + score * 10, snakeStats.h + score * 10)
    }
    let lastKey = "";
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const snakeUp = document.getElementById("snake-up");
    const snakeDown = document.getElementById("snake-down");
    const snakeLeft = document.getElementById("snake-left");
    const snakeRight = document.getElementById("snake-right");
    const snakeStats = { x: 500, y: 300, w: 200, h: 200 };
    const apple = document.getElementById("apple");
    const appleCoord = { x: Math.floor(Math.random() * 1150), y: Math.floor(Math.random() * 750) };
    const modal = document.querySelector(".modal");
    const newGameBtn = document.getElementById("newGame");
    const resultScore=document.getElementById("result");

    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        ctx.fillStyle = "Black"
        ctx.fillText(score.toString(), 1140, 50);

        if (lastKey == "") {
            moves.ArrowDown();
        } else {
            moves[lastKey]();
        }

        checkAppleEat()

        ctx.drawImage(apple, appleCoord.x, appleCoord.y, 70, 70);

        checkForLost();

    }, 16)

    function changeDirection(event) {
        event.preventDefault();
        const key = event.key;
        lastKey = key;
    }

    function checkAppleEat() {
        if (!(snakeStats.x + snakeStats.w - 50 < appleCoord.x ||
            appleCoord.x + 70 < snakeStats.x ||
            snakeStats.y + snakeStats.h - 50 < appleCoord.y ||
            appleCoord.y + 70 < snakeStats.y)) {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            appleCoord.x = Math.floor(Math.random() * 1150);
            appleCoord.y = Math.floor(Math.random() * 750);
            score++;
        }
    }

    function checkForLost() {
        if (snakeStats.x < -snakeStats.w + 150 ||
            snakeStats.x + (snakeStats.w / 2) + 50 > canvas.width ||
            snakeStats.y < -snakeStats.w + 150 ||
            snakeStats.y + (snakeStats.h / 2) + 50 > canvas.height
        ) {
            modal.style.visibility = "visible";
            resultScore.textContent=`Your scores: ${score}`;
            newGameBtn.addEventListener("click", startNewGame);
        }
    }

    function startNewGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        score = 0;
        lastKey = "";
        appleCoord.x = Math.floor(Math.random() * 1150);
        appleCoord.y = Math.floor(Math.random() * 750);
        snakeStats.x = 500;
        snakeStats.y = 300;
        modal.style.visibility = "collapse";
    }
}