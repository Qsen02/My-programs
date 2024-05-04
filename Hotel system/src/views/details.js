import { getUserData } from "../data/utils.js";
import { html } from "./middlewear.js";
import { getCurRoom } from "../data/dataService.js";

export async function showDetails(ctx) {
    let userData = getUserData();
    const id = ctx.params.id;
    let roomData = await getCurRoom(id);
    let load = (roomData) => html `
    <div class="details">
        <h1>${roomData.Name}</h1>
        <img src=${roomData.imgUrl}>
        <p>${roomData.description}</p>
        <p>Room number: ${roomData.roomNumber}</p>
        <p>Single price for 1 day: ${(roomData.price).toFixed(2)}$</p>
        ${roomData.isReserve?
        html`<span class="reserved"><p>This room is reserved!</p></span>
            ${userData?.IsAdmin?html`<p>Reserved by: ${roomData.owner}</p>`:null}`
        :html`<span class="notreserved"><p>This room is not reserved. You can reserve it now!</p></span>`
        }
        ${!userData?null
        :html`${userData.IsAdmin?html`
        <button><a href="/edit/${roomData.objectId}">EDIT</a></button>
        <button><a href="/delete/${roomData.objectId}">DELETE</a></button>`
        :html`${roomData.isReserve?null:
         html`<button><a href="/reserve/${roomData.objectId}">RESERVE</a></button>`}`}`}
    </div>`;
    ctx.render(load(roomData));
}