import { html } from "./middlewear.js";
import { updateNav } from "../data/utils.js";

export function showHome(ctx) {
    let load = () => html `
    <div class="container">
        <h1>Welcome to our reservation system!</h1>
        <p>Here you can make reservations for our hotel! More offers you can find in our catalog.</p>
    </div>
    <div class="carosel">
        <button type="button" id="backward">&lt;</button>
        <img src="/images/598336c3b9cd6c1e008b45aa.webp">
        <img src="/images/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg">
        <img src="/images/220803-compasshotel-medford-pool-73868-1677873697-78625-1694019828.jpg">
        <button type="button" id="forward">&gt;</button>
    </div>`;
    ctx.render(load());
    moveCarosel();
}

function moveCarosel() {
    const images = document.querySelectorAll(".carosel img");
    let imgArray = Array.from(images);
    const forwardBtn = document.getElementById("forward");
    const backwardBtn = document.getElementById("backward");
    forwardBtn.addEventListener("click", next);
    backwardBtn.addEventListener("click", previous);
    let count = 0;
    imgArray[count].style.display = "inline-block";

    function next() {
        count++;
        if (count >= imgArray.length) {
            count = 0;
            imgArray[count].style.display = "inline-block";
            imgArray[count + 2].style.display = "none";
        }
        imgArray[count].style.display = "inline-block";
        imgArray[count - 1].style.display = "none";
    }

    function previous() {
        count--;
        if (count < 0) {
            count = 2;
            imgArray[count - 2].style.display = "none";
            imgArray[count].style.display = "inline-block";
        }
        imgArray[count + 1].style.display = "none";
        imgArray[count].style.display = "inline-block";
    }
}