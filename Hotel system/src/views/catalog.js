import { getRooms } from "../data/dataService.js";
import { html } from "./middlewear.js";

export async function showCatalog(ctx) {
    let data = await getRooms();
    let load = (data) => html `
   <div class="room-container">
        <h1>Search room:</h1>
        <form @submit=${onSearch} class="search">
            <input name="search" placeholder="enter room name" type="text">
            <button type="submit">SEARCH</button>
        </form>
        <h1>Available rooms</h1>
        <div class="room-content-conatiner">
            ${data.length==0?html`<p class="noresult">No rooms available yet :(</p>`
            :html`${data?.map(el=>html`
            <div class="room-content">
                <h1>${el.Name}</h1>
                <img src=${el.imgUrl}>
                <p>Price: ${(el.price).toFixed(2)}$</p>
                <button><a href="/catalog/${el.objectId}">DETAILS</a></button>
            </div>`)}`}
        </div>
    </div>`
    ctx.render(load(data.results));

    async function onSearch(event){
       event.preventDefault();
       let formData=new FormData(event.target);
       let value=formData.get("search").toLocaleLowerCase();
       let occurances=data.results.filter(el=>el.Name.toLocaleLowerCase().includes(value));
       let load = (data) => html `
    <div class="room-container">
        <h1>Search room:</h1>
        <form @submit=${onSearch} class="search">
            <input name="search" placeholder="enter room name" type="text">
            <button type="submit">SEARCH</button>
        </form>
        <h1>Available rooms</h1>
        <div class="room-content-conatiner">
            ${data.length==0?html`<p class="noresult">No results :(</p>`
            :html`${data?.map(el=>html`
            <div class="room-content">
                <h1>${el.Name}</h1>
                <img src=${el.imgUrl}>
                <p>Price: ${(el.price).toFixed(2)}$</p>
                <button><a href="/catalog/${el.objectId}">DETAILS</a></button>
            </div>`)}`}
        </div>
    </div>`
    ctx.render(load(occurances));
    }
}