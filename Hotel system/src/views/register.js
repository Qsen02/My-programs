import { setUserData, notify } from "../data/utils.js";
import { register } from "../data/userService.js";
import { html, page } from "./middlewear.js";

export function showRegisterForm(ctx) {
    let load = () => html `
    <form @submit=${onRegister} class="form">
        <h1>You can register here</h1>
        <label>Email</label>
        <input name="email" type="text" placeholder="enter email">
        <label>Username</label>
        <input name="username" type="text" placeholder="enter username">
        <label>Password</label>
        <input name="password" type="password" placeholder="enter password">
        <label>Repeat password</label>
        <input name="repass" type="password" placeholder="repeat your password">
        <button type="submit">SUBMIT</button>
    </form>`;
    ctx.render(load());
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let username = formData.get("username");
    let password = formData.get("password");
    let repass = formData.get("repass");
    if (!email || !username || !password || !repass) {
        return notify("All fileds must be filled!");
    }
    if (password.length < 6) {
        return notify("Password must be at least 6 symbols!");
    }
    if (password != repass) {
        return notify("Password must match!");
    }
    let data = await register({ email, username, password });
    setUserData(data);
    event.target.reset();
    page.redirect("/catalog");
}