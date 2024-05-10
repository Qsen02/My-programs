import { html, render } from "./node_modules/lit-html/lit-html.js";

let randomNum = Math.floor(Math.random() * 100);
let attempts = 10;
const root = document.querySelector("body");
let load = (attempts) => html `
 <div class="container">
        <h1>Guess the number!</h1>
        <p>Attempts: ${attempts}</p>
        <label>Enter number between 0 and 100</label>
        <input id="number" type="number" placeholder="Enter number">
        <label>Hint:</label>
        <div class="hint">
        </div>
        <button type="button" @click=${guessing}>Try</button>
  </div>`
render(load(attempts), root);

let enteredNumber = document.getElementById("number");
let hint = document.querySelector(".hint");

function guessing() {
    attempts--;
    document.querySelector(".container p").textContent = `Attempts: ${attempts}`;
    let userInput = Number(enteredNumber.value);
    if (userInput < 0 || userInput > 100) {
        hint.textContent = "Invalid number!";
        hint.style.color = "red";
        attempts++;
        return;
    }
    if (!userInput) {
        hint.textContent = "Field must be filled!";
        hint.style.color = "red";
        attempts++;
        return;
    }
    if (userInput > randomNum) {
        hint.textContent = "Your number is bigger";
        hint.style.color = "black";
    } else if (userInput < randomNum) {
        hint.textContent = "Your number is smaller";
        hint.style.color = "black";
    } else if (userInput == randomNum) {
        win(randomNum);
    }
    if (attempts == 0) {
        lost(randomNum);
    }
    enteredNumber.value = "";
}

function win(num) {
    let load = (num) => html `
    <div class="container">
        <h1>Congratulations, you win!</h1>
        <p>Generated number is: ${num}</p>
        <button @click=${newGame} type="button">New game</button>
    </div>`;
    render(load(num), root);
}

function lost(num) {
    let load = (num) => html `
    <div class="container">
        <h1>Sorry, you lost :(</h1>
        <p>Generated number is: ${num}</p>
        <button @click=${newGame} type="button">New game</button>
    </div>`;
    render(load(num), root);
}

function newGame() {
    window.location.reload();
}