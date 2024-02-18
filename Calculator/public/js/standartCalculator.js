document.getElementById("calc").addEventListener("click", calculation);

function calculation() {
    let input1 = document.getElementById("a");
    let input2 = document.getElementById("b");
    let num1 = input1.value;
    let num2 = input2.value;
    if (num1.includes(",") || num2.includes(",")) {
        num1 = num1.replace(",", ".");
        num2 = num2.replace(",", ".");
        num1 = Number(num1);
        num2 = Number(num2);
    } else {
        num1 = Number(num1);
        num2 = Number(num2);
    }
    let operator = document.getElementById("operator").value;
    let result = document.getElementById("result1");
    if (operator == "+") {
        result.value = num1 + num2;
    } else if (operator == "-") {
        result.value = num1 - num2;
    } else if (operator == "*") {
        result.value = num1 * num2;
    } else if (operator == "/") {
        result.value = num1 / num2;
    } else if (operator == "^") {
        result.value = Math.pow(num1, num2);
    }
    input1.value = "";
    input2.value = "";
}