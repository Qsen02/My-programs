import { getAllProducts } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function showCatalog(ctx) {
    let data = await getAllProducts();
    let load = (data) => html `
    ${Object.keys(data).length==0?html`
    <h1>Няма продукти все още</h1>
    <div class="wrap">
        <aside>
            <p>Категории:</p>
            <a href="#">Периферия</a>
            <a href="#">Дънни платки</a>
            <a href="#">Процесори</a>
            <a href="#">Видеокарти</a>
            <a href="#">RAM памети</a>
            <a href="#">Хард дискове и ssd</a>
            <a href="#">Захранващи блокове</a>
        </aside>`
    :html`
    <h1>Всички налични продукти</h1>
    <div class="wrap">
        <aside>
            <p>Категории:</p>
            <a href="#" @click=${showCurCategory}>Периферия</a>
            <a href="#" @click=${showCurCategory}>Дънни платки</a>
            <a href="#" @click=${showCurCategory}>Процесори</a>
            <a href="#" @click=${showCurCategory}>Видеокарти</a>
            <a href="#" @click=${showCurCategory}>RAM памети</a>
            <a href="#" @click=${showCurCategory}>Хард дискове и ssd</a>
            <a href="#" @click=${showCurCategory}>Захранващи блокове</a>
        </aside>
        <div class="catalog">
            ${Object.values(data)[0].map(el=>html`
            <div class="catalog-content">
                <img src=${el.imgUrl}>
                <p>Продукт: ${el.name}</p>
                <p>Цена: ${el.price}лв</p>
                <button><a href="/catalog/${el.objectId}">Детайли</a></button>
            </div>`)}
        </div>
    </div>`}`;
    ctx.render(load(data));
    function showCurCategory(event){
        event.preventDefault();
        let curCategory=event.target.textContent;
        let products=Object.values(data)[0].filter(el=>el.category==curCategory);
        let load=(products)=>html`
    <h1>${products[0].category}</h1>
    <div class="wrap">
        <aside>
            <p>Категории:</p>
            <a href="#" @click=${showCurCategory}>Периферия</a>
            <a href="#" @click=${showCurCategory}>Дънни платки</a>
            <a href="#" @click=${showCurCategory}>Процесори</a>
            <a href="#" @click=${showCurCategory}>Видеокарти</a>
            <a href="#" @click=${showCurCategory}>RAM памети</a>
            <a href="#" @click=${showCurCategory}>Хард дискове и ssd</a>
            <a href="#" @click=${showCurCategory}>Захранващи блокове</a>
        </aside>
        <div class="catalog">
            ${products.map(el=>html`
            <div class="catalog-content">
                <img src=${el.imgUrl}>
                <p>Продукт: ${el.name}</p>
                <p>Цена: ${el.price}лв</p>
                <button><a href="/catalog/${el.objectId}">Детайли</a></button>
            </div>`)}
        </div>
    </div>`;
    ctx.render(load(products));
    }
}