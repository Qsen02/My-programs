import { html, page } from "./middlewear.js";
import { addRoom } from "../data/dataService.js";

export function showAddForm(ctx) {
    let load = () => html `
    <form @submit=${onCreate} class="form">
        <h1>Create room here</h1>
        <label>Room number</label>
        <input name="roomNumber" type="number" placeholder="enter room number">
        <label>Price</label>
        <input name="price" type="number" min="0" step="0.10" placeholder="enter price">
        <label>Image</label>
        <input name="img" type="text" placeholder="enter image url">
        <label>Room name</label>
        <input name="name" type="text" placeholder="enter name">
        <label>Description</label>
        <textarea name="description" type="text" placeholder="enter description"></textarea>
        <button type="submit">SUBMIT</button>
    </form>`;
    ctx.render(load());
}

async function onCreate(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let roomNumber = Number(formData.get("roomNumber"));
    let price = Number(formData.get("price"));
    let img = formData.get("img");
    let name = formData.get("name");
    let description = formData.get("description");
    if (!roomNumber || !price || !img || !name || !description) {
        return alert("All fileds required!");
    }
    await addRoom({ Name: name, imgUrl: img, price, description, roomNumber });
    event.target.reset();
    page.redirect("/catalog");
}