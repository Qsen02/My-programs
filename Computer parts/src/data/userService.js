import { post, put } from "./api.js";

const endpoints = {
    register: "users",
    login: "login",
    logout: "logout"
}

export async function register(data) {
    return await post(endpoints.register, data);
}

export async function login(data) {
    return await post(endpoints.login, data);
}

export async function logout() {
    return await post(endpoints.logout, {});
}

export async function updateUser(id, data) {
    return await put(`${endpoints.register}/${id}`, data);
}