import { page, html } from "./middlewear.js";
import { updateProduct } from "../data/dataService.js";
import { updateUser } from "../data/userService.js";
import { getUserData, setUserData, clearUserData } from "../data/utils.js";

export async function showProfile(ctx) {
    let userData = getUserData();
    let load = (userData) => html `
   <div class="container">
        <div class="profile">
            <img src="/public/images/mystery.svg">
            <h3>${userData.username}</h3>
            <h3>${userData.email}</h3>
            <h3>Дата на регистрация: ${userData.createdAt}</h3>
        </div>
        <div class="deliveries">
            <h3>Поръчки:</h3>
            ${userData.orders.length>0?html`
            ${userData.orders.map(el=>html`
            <div class="cur-delivery">
                <img src="/${el.imgUrl}">
                <p>${el.name}</p>
                <p>${el.price}лв</p>
                <button @click=${onRefuse}>Откажи</button>
            </div>`
            )}`:html`<p>Няма нищо поръчано все още</p>`}
            <p>Обща цена: ${userData.orders.reduce((acc,val)=>{return acc+val.price},0)}лв</p>
        </div>
    </div>`
    ctx.render(load(userData));
    async function onRefuse(event){
        let confirming=confirm("Сигурни ли сте че искате да откажете поръчката?");
        if(confirming){
        let product=event.target.parentElement.children[1];
        let curProduct=userData.orders.find(el=>el.name==product.textContent);
        curProduct.isOrdered=false;
        await updateProduct(curProduct.objectId,{
            name:curProduct.name,
            price:curProduct.price,
            imgUrl:curProduct.imgUrl,
            isOrdered:curProduct.isOrdered,
            characteristics:curProduct.characteristics,
            category:curProduct.category
        });
        let index=userData.orders.indexOf(curProduct);
        userData.orders.splice(index,1);
        await updateUser(userData.objectId,{
            username:userData.username,
            email:userData.email,
            password:userData.password,
            objectId:userData.objectId,
            orders:userData.orders
        });
        clearUserData();
        setUserData(userData);
        alert("Поръчката е успешно отказана!");
        page.redirect("/profile");
    }
    }
}