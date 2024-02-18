document.getElementById("start").addEventListener("click", startCounting);

function startCounting() {
    let inputBreakpoint = document.getElementById("breakPoint");
    let breakPoint = Number(inputBreakpoint.value);
    let hundreds = 0;
    let flag = false;
    if (breakPoint == 0) {
        breakPoint = 60;
    }
    inputBreakpoint.value = "";
    for (let i = 0; i <= breakPoint; i++) {
        for (let j = 0; j < 100; j++) {
            setTimeout(() => document.getElementById("output").value = `${i} : ${j}`, hundreds);
            hundreds += 10;
            if (i == breakPoint) {
                flag = true;
                break;
            }
        }
        if (flag) {
            break;
        }
    }
}
document.getElementById("reset").addEventListener("click", zeroed);

function zeroed() {
    document.getElementById("output").value = `00 : 00`;
}