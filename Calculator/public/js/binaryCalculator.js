document.getElementById("convert").onclick = function() {
    let bitwiseNum = document.getElementById("binaryNum").value;
    if (/[2-9]+/.test(bitwiseNum)) {
        document.getElementById("result2").value = "Въведенето число не е двоично";
    } else {
        let pow = 0;
        let decimalNum = 0;
        for (let i = bitwiseNum.length - 1; i >= 0; i--) {
            let curElement = bitwiseNum[i];
            decimalNum += curElement * Math.pow(2, pow);
            pow++;
        }
        document.getElementById("result2").value = decimalNum;
    }

}