document.getElementById("start").onclick = function() {
    let breakPoint = Number(document.getElementById("breakPoint").value)
    let hundreds = 0;
    for (let i = breakPoint - 1; i >= 0; i--) {
        for (let j = 99; j >= 0; j--) {
            setTimeout(() => document.getElementById("output").value = `${i} : ${j}`, hundreds);
            hundreds += 10;
        }
    }
    setTimeout(() => document.getElementById("output").value = `00 : 00`, hundreds + 1);
}