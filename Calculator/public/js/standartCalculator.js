document.getElementById("calc").onclick = function calculation() {
    let a = Number(document.getElementById("a").value);
    let b = Number(document.getElementById("b").value);
    let operator = document.getElementById("operator").value;
    if (operator == "+" || operator == "плюс" || operator == "plus") {
        document.getElementById("result1").value = a + b;
    } else if (operator == "-" || operator == "минус" || operator == "minus") {
        document.getElementById("result1").value = a - b;
    } else if (operator == "*" || operator == "умножение" || operator == "multiplication") {
        document.getElementById("result1").value = a * b;
    } else if (operator == "/" || operator == "деление" || operator == "division") {
        document.getElementById("result1").value = a / b;
    } else if (operator == "^" || operator == "степен" || operator == "pow") {
        document.getElementById("result1").value = Math.pow(a, b);
    } else {
        document.getElementById("result1").value = "Невалиден оператор!";
    }
}