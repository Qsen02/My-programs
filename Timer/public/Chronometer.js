document.getElementById("start").onclick = function() {
    let breakPoint = Number(document.getElementById("breakPoint").value)
    let hundreds = 0;
    let flag = false;
    if (breakPoint == 0) {
        breakPoint = 60;
    }
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
document.getElementById("reset").onclick = function() {
    document.getElementById("output").value = `00 : 00`;
}