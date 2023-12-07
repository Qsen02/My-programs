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
    } else if (operator == "*" || operator == "умножение" || operator == "multiplication") {
        document.getElementById("result1").value = num1 * num2;
    } else if (operator == "/" || operator == "деление" || operator == "division") {
        document.getElementById("result1").value = num1 / num2;
    } else if (operator == "^" || operator == "степен" || operator == "pow") {
        document.getElementById("result1").value = Math.pow(num1, num2);
    } else {
        document.getElementById("result1").value = "Невалиден оператор!";
    }
}