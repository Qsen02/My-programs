import { editRoom, getCurRoom } from "../data/dataService.js";
import { page, html } from "./middlewear.js";

export async function showEditForm(ctx) {
    const id = ctx.params.id;
    let roomData = await getCurRoom(id);
    let load = (roomData) => html `
    <form @submit=${onEdit} class="form">
        <h1>Edit room here</h1>
        <label>Room number</label>
        <input name="roomNumber" type="number" placeholder="enter room number" .value=${roomData.roomNumber}>
        <label>Price</label>
        <input name="price" type="number" min="0" step="0.10" placeholder="enter price" .value=${(roomData.price).toFixed(2)}>
        <label>Image</label>
        <input name="img" type="text" placeholder="enter image url" .value=${roomData.imgUrl}>
        <label>Room name</label>
        <input name="name" type="text" placeholder="enter name" .value=${roomData.Name}>
        <label>Description</label>
        <textarea name="description" type="text" placeholder="enter description" .value=${roomData.description}></textarea>
        <button type="submit">SUBMIT</button>
    </form>`
    ctx.render(load(roomData));

    async function onEdit(event) {
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
        await editRoom(id, { Name: name, imgUrl: img, price, description, roomNumber, objectId: id });
        event.target.reset();
        page.redirect(`/catalog/${id}`);
    }
}