import { html } from "./middlewear.js";

export function showHome(ctx) {
    let load = () => html `
      <div class="container">
        <h1>Добре дошли в нашия магазин за компютърни части!</h1>
        <p>Тук може да намерите всякаква периферия, устройства и части за вашия компютър! Повече може да видите в нашия каталог.</p>
        <img src="public/images/MagazinAprilskoVustanie1-scaled.jpg">
    </div>`;
    ctx.render(load());
}