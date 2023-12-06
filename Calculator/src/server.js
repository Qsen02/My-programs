let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let fs = require("fs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/public", express.static("public"));

function indexPageLoad(body) {
    let template = fs.readFileSync('./public/index.html').toString();
    return template.replace('%%body%%', body);
}

function binaryCalculatorLoad(body) {
    let template = fs.readFileSync('./public/binaryCalculator.html').toString();
    return template.replace('%%body%%', body);
}

function standartCalculatorLoad(body) {
    let template = fs.readFileSync('./public/standartCalculator.html').toString();
    return template.replace('%%body%%', body);
}
app.get("/", (req, res) => {
    console.log(req.params);
    let firstPage = indexPageLoad('<div class="container"><div class="content"><h1>Добре дошли!</h1></div><div class="content"><p>Изберете калкулатора, който искате да използвате:</p></div><div class="button"><button class="button" type="button"><a href="binaryCalculator.html">Двоичен калкулатор</a></button></div><div class="button"><button class="button" type="button"><a href="standartCalculator.html">Стандартен калкулатор</a></button></div></div>');
    res.send(firstPage);
});
app.get("/binaryCalculator.html", (req, res) => {
    console.log("Потребител е влязъл в: двоичен калкулатор");
    let secondPage = binaryCalculatorLoad('<div class="container"><h1>Двоичен калкулатор</h1><div class="content"><label>Въведете двоичното число:</label><input class="content-input" type="text" id="binaryNum"></div><div class="content"><label>Десетично число:</label><input class="content-input" type="text" id="result2"></div><div class="content"><button type="button" id="convert">Конвертирай</button></div><script src="/public/js/binaryCalculator.js"></script></div>');
    res.send(secondPage);
});
app.get("/standartCalculator.html", (req, res) => {
    console.log("Потребител е влязъл в: стандартен калкулатор");
    let thirdPage = standartCalculatorLoad('<div class="container"><h1>Калкулатор</h1><form><div class="content"><label class="form-label">Въведете първото число:</label><input class="form-input" type="number" id="a"></div><div class="content"><label>Въведете оператор:</label><input class="content-input" type="text" id="operator"></div><div class="content"><label>Въведете второто число:</label><input class="content-input" type="number" id="b"></div><div class="content"><label>Резултат:</label><input class="content-input" type="text" id="result1"></div><div class="content"><button type="button" id="calc">Изчисли</button></div><script src="/public/js/standartCalculator.js"></script></form></div>');
    res.send(thirdPage);
});
app.listen(3000);