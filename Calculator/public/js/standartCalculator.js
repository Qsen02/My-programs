document.getElementById("calc").onclick = function calculation() {
    let num1 = document.getElementById("a").value;
    let num2 = document.getElementById("b").value;
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
    if (operator == "+" || operator == "плюс" || operator == "plus") {
        document.getElementById("result1").value = num1 + num2;
    } else if (operator == "-" || operator == "минус" || operator == "minus") {
        document.getElementById("result1").value = num1 - num2;
    } else if (operator == "*" || operator.includes("умно") || operator.includes("multi")) {
        document.getElementById("result1").value = num1 * num2;
    } else if (operator == "/" || operator.includes("дел") || operator.includes("divi")) {
        document.getElementById("result1").value = num1 / num2;
    } else if (operator == "^" || operator == "степен" || operator.includes("pow")) {
        document.getElementById("result1").value = Math.pow(num1, num2);
    } else {
        document.getElementById("result1").value = "Невалиден оператор!";
    }
}