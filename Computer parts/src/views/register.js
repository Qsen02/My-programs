import { setUserData } from "../data/utils.js";
import { register } from "../data/userService.js";
import { html, page } from "./middlewear.js";

export function showRegisterForm(ctx) {
    let load = () => html `
    <form @submit=${onRegister} class="container">
        <h1>Направете си регистрация тук!</h1>
        <label>Въведете своето име</label>
        <input name="username" type="text" placeholder="Въведи име">
        <label>Въведете своя имейл адрес</label>
        <input name="email" type="text" placeholder="Въведи имейл">
        <label>Въведете своята парола</label>
        <input name="password" type="password" placeholder="Въведи парола">
        <label>Повторете паролата отново</label>
        <input name="repass" type="password" placeholder="Въведи парола">
        <button type="submit">Готово</button>
    </form>`;
    ctx.render(load());

    async function onRegister(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let username = formData.get("username");
        let email = formData.get("email");
        let password = formData.get("password");
        let repass = formData.get("repass");
        if (!username || !email || !password || !repass) {
            return alert("Всички полета трябва да са попълнени!");
        }
        if (password.length < 6) {
            return alert("Паролата трябва да съдържа поне 6 символа!");
        }
        if (password != repass) {
            return alert("Паролите трябва да съвпадат!");
        }
        let data = await register({ username, email, password });
        setUserData(data);
        event.target.reset();
        page.redirect("/");
    }
}