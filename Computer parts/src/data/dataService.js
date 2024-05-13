import {get, put } from "./api.js";

const endpoint = "classes/Products";

export async function getAllProducts() {
    return await get(endpoint);
}

export async function getProductById(id) {
    return await get(`${endpoint}/${id}`);
}

export async function updateProduct(id, data) {
    await put(`${endpoint}/${id}`, data);
}