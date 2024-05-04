import { setUserData, notify } from "../data/utils.js";
import { userLog } from "../data/userService.js";
import { html, page } from "./middlewear.js";

export function showLoginForm(ctx) {
    let load = () => html `
      <form @submit=${onLogin} class="form">
        <h1>You can login here</h1>
        <label>Username</label>
        <input name="username" type="text" placeholder="enter username">
        <label>Password</label>
        <input name="password" type="password" placeholder="enter password">
        <button type="submit">SUBMIT</button>
    </form>`;
    ctx.render(load());
}

async function onLogin(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let username = formData.get("username");
    let password = formData.get("password");
    if (!username || !password) {
        return notify("All fileds must be filled!");
    }
    let data = await userLog({ username, password });
    setUserData(data);
    event.target.reset();
    page.redirect("/catalog");
}