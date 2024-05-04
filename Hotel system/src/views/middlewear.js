import { updateNav } from "../data/utils.js";
import { render as litRender, html } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";

const root = document.querySelector("main");

export function middlewear() {
    return function(ctx, next) {
        ctx.render = (view) => {
            litRender(view, root);
            updateNav();
        }
        next();
    }
}

export {
    html,
    page
}