window.addEventListener("load", loading);

function loading() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    let demon = document.getElementById("demon");
    const doomSlayerCurCoord = { x: 600, y: 800 };
    const bullet = { x: 0, y: 0, alive: false };
    const curDemonBullet = { x: 0, y: 0, alive: false };
    const playerSpeed = 10;
    const demonSpeed = 5;
    const bulletSpeed = 15;
    const demonBulletSpeed = 10;
    let doomSlayerLife = [];
    let demonDir = 1;
    let controls = {};
    let demons = [];
    let img = document.getElementById("bullet");
    let demonBullet = document.getElementById("demon-attack");
    let life = document.getElementById("life");
    ctx.strokeStyle = "blue";
    document.addEventListener("keydown", (event) => {
        controls[event.code] = true;
        event.preventDefault();
    })
    document.addEventListener("keyup", (event) => {
        controls[event.code] = false;
        event.preventDefault();
    })
    const demonCoord = {
        x: 100,
        y: 180,
        w: 100,
        h: 100,
    }
    const doomSlayerCoord = {
        x: 185,
        y: 0,
        w: 90,
        h: 130
    }
    const bulletCoord = {
        x: 180,
        y: 130,
        w: 45,
        h: 45
    }
    const demonBulletCoord = {
        x: 203,
        y: 88,
        w: 30,
        h: 30
    }
    const lifeCoord = {
        x: 1170,
        y: 10,
        w: 30,
        h: 30,
    }
    let doomSlayer = document.getElementById("doom-slayer");
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            demons.push({ x: demonCoord.x + 110 * i, y: demonCoord.y + 100 * j, alive: true })
        }
    }
    for (let i = 0; i < 3; i++) {
        doomSlayerLife.push({ x: lifeCoord.x - 40 * i, y: lifeCoord.y });
    }

    setInterval(demonAttacking, 1000);
    setInterval(render, 16);

    function render() {
        if (controls["ArrowLeft"]) {
            doomSlayerCurCoord.x -= playerSpeed;
            if (doomSlayerCurCoord.x < doomSlayerCoord.w / 2) {
                doomSlayerCurCoord.x = doomSlayerCoord.w / 2;
            }
        } else if (controls["ArrowRight"]) {
            doomSlayerCurCoord.x += playerSpeed;
            if (doomSlayerCurCoord.x > 1200 - doomSlayerCoord.w / 2) {
                doomSlayerCurCoord.x = 1200 - doomSlayerCoord.w / 2;
            }
        } else if (controls["Space"] && !bullet.alive) {
            bullet.x = doomSlayerCurCoord.x;
            bullet.y = doomSlayerCurCoord.y - doomSlayerCoord.h;
            bullet.alive = true;
        }
        clearScreen();
        drawDoomSlayer(doomSlayerCurCoord.x, doomSlayerCurCoord.y);
        if (bullet.alive) {
            bullet.y -= bulletSpeed;
            if (bullet.y < 0) {
                bullet.alive = false;
            }
            drawBullet(bullet.x, bullet.y);
        }
        if (curDemonBullet.alive) {
            curDemonBullet.y += demonBulletSpeed;
            if (curDemonBullet.y > 800) {
                curDemonBullet.alive = false;
            }
            drawDemonBullet(curDemonBullet.x, curDemonBullet.y);
        }
        const demonRight = Math.max(...demons.filter(el => el.alive).map(el => el.x));
        const demonLeft = Math.min(...demons.filter(el => el.alive).map(el => el.x));
        if (demonRight >= 1200 - demonCoord.w / 2 && demonRight > 0) {
            demonDir = -1;
        } else if (demonLeft < 0 && demonLeft <= demonCoord.w / 2) {
            demonDir = 1;
        }
        for (let demon of demons) {
            if (!demon.alive) {
                continue;
            }
            if (bullet.alive) {
                let bulletLeft = bullet.x;
                let bulletRight = bulletLeft + 40;
                let bulletTop = bullet.y;
                let bulletBottom = bulletTop + 40;

                let demonLeft = demon.x - demonCoord.w / 2;
                let demonRigth = demonLeft + demonCoord.w;
                let demonBottom = demon.y;
                let demonTop = demonBottom - demonCoord.h;

                if (bulletRight > demonLeft && bulletLeft < demonRigth) {
                    if (bulletTop < demonBottom && bulletBottom > demonTop) {
                        demon.alive = false;
                        bullet.alive = false;
                    }
                }
            }
            demon.x += demonSpeed * demonDir;
            drawDemon(demon.x, demon.y);
        }
        for (let life of doomSlayerLife) {
            drawLife(life.x, life.y);
        }
        if (curDemonBullet.alive) {
            let doomSlayerLeft = doomSlayerCurCoord.x - doomSlayerCoord.w / 2;
            let doomSlayerRight = doomSlayerLeft + doomSlayerCoord.w;
            let doomSlayerBottom = doomSlayerCurCoord.y;
            let doomSlayerTop = doomSlayerBottom - doomSlayerCoord.h;

            let demonBulletLeft = curDemonBullet.x;
            let demonBulletRight = demonBulletLeft + 40;
            let demonBulletTop = curDemonBullet.y;
            let demonBulletBottom = demonBulletTop + 40;
            if (demonBulletLeft < doomSlayerRight && demonBulletRight > doomSlayerLeft) {
                if (demonBulletTop < doomSlayerBottom && demonBulletBottom > doomSlayerTop) {
                    doomSlayerLife.pop();
                    curDemonBullet.alive = false;
                }
            }
        }
        checkForWinOrLost();
    }

    function drawDoomSlayer(x, y) {
        ctx.drawImage(doomSlayer, doomSlayerCoord.x, doomSlayerCoord.y, 30, 60, x - doomSlayerCoord.w / 2, y - doomSlayerCoord.h, doomSlayerCoord.w, doomSlayerCoord.h);
    }

    function drawDemon(x, y) {
        ctx.drawImage(demon, x - demonCoord.w / 2, y - demonCoord.h, demonCoord.w, demonCoord.h);
    }

    function clearScreen() {
        ctx.clearRect(0, 0, 1200, 800);
    }

    function drawBullet(x, y) {
        ctx.drawImage(img, bulletCoord.x, bulletCoord.y, bulletCoord.w, bulletCoord.h, x, y, 40, 40);
    }

    function drawDemonBullet(x, y) {
        ctx.drawImage(demonBullet, demonBulletCoord.x, demonBulletCoord.y, demonBulletCoord.w, demonBulletCoord.h, x, y, 40, 40);
    }

    function drawLife(x, y) {
        ctx.drawImage(life, x, y, 30, 30);
    }

    function demonAttacking() {
        let index = Math.floor(Math.random() * demons.length - 1);
        while (!demons[index].alive) {
            index = Math.floor(Math.random() * demons.length - 1);
        }
        if (demons[index].alive) {
            curDemonBullet.x = demons[index].x;
            curDemonBullet.y = demons[index].y;
            curDemonBullet.alive = true;
        }
    }

    function checkForWinOrLost() {
        let isDemonAlive = demons.find(el => el.alive == true);
        if (!isDemonAlive) {
            let canvasRef = document.getElementById("myCanvas");
            canvasRef.remove();
            let bodyRef = document.querySelector("body");
            let divEl = document.createElement("div");
            divEl.classList.add("end-of-game");
            let h3El = document.createElement("h3");
            h3El.textContent = "Congatulations! You win!";
            let reloadBtn = document.createElement("button");
            reloadBtn.textContent = "new game";
            divEl.appendChild(h3El);
            divEl.appendChild(reloadBtn);
            bodyRef.appendChild(divEl);
            reloadBtn.addEventListener("click", () => {
                location.reload();
            })
        }
        if (doomSlayerLife.length == 0) {
            let canvasRef = document.getElementById("myCanvas");
            canvasRef.remove();
            let bodyRef = document.querySelector("body");
            let divEl = document.createElement("div");
            divEl.classList.add("end-of-game");
            let h3El = document.createElement("h3");
            h3El.textContent = "You die :(";
            let reloadBtn = document.createElement("button");
            reloadBtn.textContent = "new game";
            divEl.appendChild(h3El);
            divEl.appendChild(reloadBtn);
            bodyRef.appendChild(divEl);
            reloadBtn.addEventListener("click", () => {
                location.reload();
            })
        }
    }
}