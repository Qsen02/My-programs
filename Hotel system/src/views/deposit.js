import { getUserData, removeUserData, setUserData, notify } from "../data/utils.js";
import { html, page } from "./middlewear.js";
import { deposing } from "../data/userService.js";

export function showDeposit(ctx) {
    let userData = getUserData();
    let load = (userData) => html `
    <form @submit=${onDeposing} class="form">
        <h1>Enter deposit here</h1>
        <input name="enterDeposit" type="number" min="0" step="0.10" placeholder="enter deposit">
        <button type="submit">ENTER</button>
        <h1>Your deposit:</h1>
        <input name="getDeposit" type="number" id="deposit" placeholder=${(userData.deposit).toFixed(2)} disabled>
    </form>`
    ctx.render(load(userData));

    async function onDeposing(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let oldDeposit = Number(userData.deposit);
        let deposit = Number(formData.get("enterDeposit"));
        let newDeposit = oldDeposit + deposit;
        await deposing(userData.objectId, {
            username: userData.username,
            password: userData.password,
            IsAdmin: userData.IsAdmin,
            email: userData.email,
            deposit: newDeposit,
            objectId: userData.objectId
        });
        removeUserData();
        setUserData({
            username: userData.username,
            password: userData.password,
            IsAdmin: userData.IsAdmin,
            email: userData.email,
            deposit: newDeposit,
            objectId: userData.objectId,
            sessionToken: userData.sessionToken
        });
        event.target.reset();
        page.redirect("/deposit");
        notify("Transaction was succesfull!");
    }

}