document.getElementById("convert").addEventListener("click", convert);

function convert() {
    let input = document.getElementById("binaryNum")
    let bitwiseNum = input.value;
    let result = document.getElementById("result2");
    if (/[2-9a-zA-Z]+/.test(bitwiseNum)) {
        result.value = "Въведенето число не е двоично";
    } else {
        let pow = 0;
        let decimalNum = 0;
        for (let i = bitwiseNum.length - 1; i >= 0; i--) {
            let curElement = bitwiseNum[i];
            decimalNum += curElement * Math.pow(2, pow);
            pow++;
        }
        result.value = decimalNum;
        input.value = "";
    }

}