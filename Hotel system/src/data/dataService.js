import { del, post, get, put } from "./api.js";

const endpoints = "classes/Rooms";

export async function getRooms() {
    return await get(endpoints);
}

export async function getCurRoom(id) {
    return await get(`${endpoints}/${id}`);
}

export async function addRoom(data) {
    await post(endpoints, data);
}
export async function deleteRoom(id) {
    await del(`${endpoints}/${id}`);
}

export async function editRoom(id, data) {
    await put(`${endpoints}/${id}`, data);
}