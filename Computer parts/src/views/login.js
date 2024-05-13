import { login } from "../data/userService.js";
import { page, html } from "./middlewear.js";
import { setUserData } from "../data/utils.js";

export function showLoginForm(ctx) {
    let load = () => html `
     <form @submit=${onLogin} class="container">
        <h1>Тук може да се логнете!</h1>
        <label>Въведете своето име</label>
        <input name="username" type="text" placeholder="Въведи име">
        <label>Въведете своята парола</label>
        <input name="password" type="password" placeholder="Въведи парола">
        <button type="submit">Готово</button>
     </form>`;
    ctx.render(load());

    async function onLogin(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let username = formData.get("username");
        let password = formData.get("password");
        if (!username || !password) {
            return alert("Всички полета трябва да са попълнени!");
        }
        let data = await login({ username, password });
        setUserData(data);
        event.target.reset();
        page.redirect("/");
    }
}