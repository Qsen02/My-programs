import { deposing } from "../data/userService.js";
import { editRoom, getCurRoom } from "../data/dataService.js";
import { getUserData, notify, removeUserData, setUserData } from "../data/utils.js";
import { page, html } from "./middlewear.js";

export async function showReservationForm(ctx) {
    const roomId = ctx.params.id;
    let userData = getUserData();
    let roomData = await getCurRoom(roomId);
    let load = () => html `
   <form @submit=${onReserve} class="form">
        <h1>You can reserve this room here</h1>
        <label>People count</label>
        <input name="peopleCount" type="number" placeholder="enter people count">
        <label>Days</label>
        <input name="days" type="number" placeholder="enter days count">
        <p></p>
        <button @click=${calcPrice}>CALCULATE</button>
        <button type="submit">SUBMIT</button>
    </form>`
    ctx.render(load());

    function calcPrice(event) {
        event.preventDefault();
        let peopleCount = Number(document.querySelector(".form input[name='peopleCount']").value);
        let days = Number(document.querySelector(".form input[name='days']").value);
        let numberPrice = Number(roomData.price);
        let allPrice = peopleCount * days * numberPrice;
        const pRef = document.querySelector(".form p");
        pRef.textContent = `Total price: ${allPrice.toFixed(2)}`;
    }

    async function onReserve(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        let peopleCount = Number(formData.get("peopleCount"));
        let days = Number(formData.get("days"));
        const pRef = document.querySelector(".form p");
        if (!peopleCount || !days || !pRef.textContent) {
            return notify("All fields required!");
        }
        let totalPrice = Number(pRef.textContent.split("Total price: ")[1]);
        let userDeposit = Number(userData.deposit);
        let confirming = confirm("Are you sure?")
        if (confirming) {
            if (userDeposit >= totalPrice) {
                let newDeposit = userDeposit - totalPrice;
                let price = Number(roomData.price);
                let roomNumber = Number(roomData.roomNumber);
                await deposing(userData.objectId, {
                    username: userData.username,
                    password: userData.password,
                    IsAdmin: userData.IsAdmin,
                    email: userData.email,
                    deposit: newDeposit,
                    objectId: userData.objectId
                })
                await editRoom(roomId, {
                    Name: roomData.Name,
                    imgUrl: roomData.imgUrl,
                    price: price,
                    isReserve: true,
                    description: roomData.description,
                    roomNumber: roomNumber,
                    peopleCount,
                    days,
                    owner: userData.username,
                    objectId: roomId
                });
                removeUserData();
                setUserData({
                    username: userData.username,
                    password: userData.password,
                    IsAdmin: userData.IsAdmin,
                    email: userData.email,
                    deposit: newDeposit,
                    objectId: userData.objectId,
                    sessionToken: userData.sessionToken
                })
                event.target.reset();
                page.redirect(`/catalog/${roomId}`);
                notify("Room was reserved succesfully!");
            } else {
                return notify("You dont have enough deposit!");
            }
        } else {
            page.redirect(`/catalog/${roomId}`);
        }
    }
}