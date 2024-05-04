import { put, post } from "./api.js";

const endpoints = {
    register: "users",
    login: "login",
    logout: "logout",
}

export async function register(data) {
    return await post(endpoints.register, data);
}

export async function userLog(data) {
    return await post(endpoints.login, data);
}

export async function logout(data) {
    return await post(endpoints.logout, data);
}

export async function deposing(id, data) {
    return await put(`${endpoints.register}/${id}`, data);
}