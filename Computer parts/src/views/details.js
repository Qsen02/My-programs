import { getProductById, updateProduct } from "../data/dataService.js";
import { updateUser } from "../data/userService.js";
import { getUserData, clearUserData, setUserData, notify, onConfirm } from "../data/utils.js";
import { html, page } from "./middlewear.js";

export async function showDetails(ctx) {
    const id = ctx.params.id;
    let data = await getProductById(id);
    let userData = getUserData();
    let load = (data) => html `
    <div class="details">
        <div class="description">
            <img src="/${data.imgUrl}">
            <div class="description-content">
                <h3>${data.name}</h3>
                <p>${data.price}лв</p>
                ${userData?html`${data.isOrdered?
                    html`<p>Поръчано!</p>`:
                    html`<button @click=${onBought}>Поръчай</button>`}`
                    :null}
            </div>
        </div>
        <div class="characteristiks">
            <h3>Характеристики:</h3>
            ${data.characteristics.map(el=>html`<p>${el}</p>`)}
        </div>
    </div>`;
    ctx.render(load(data));

    function onBought(){
        onConfirm("Сигурни ли сте че искате да поръчате този продукт?").then(async (confirming)=>{
            if(confirming){
                await updateProduct(id,{
                    name:data.name,
                    price:data.price,
                    objectId:id,
                    isOrdered:true,
                    imgUrl:data.imgUrl,
                    category:data.category,
                    characteristics:data.characteristics
                })
                let newData=await getProductById(id);
                userData.orders.push(newData);
                await updateUser(userData.objectId,{
                    username:userData.username,
                    email:userData.email,
                    password:userData.password,
                    objectId:userData.objectId,
                    orders:userData.orders,
                    })
                clearUserData();
                setUserData(userData);
                notify("Поръчката е направена успешно!","green");
                page.redirect(`/catalog/${id}`);
            }
        })
    }
}