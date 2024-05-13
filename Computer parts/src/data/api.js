import { getUserData, clearUserData } from "./utils.js";
const host = "https://parseapi.back4app.com/";

async function request(method, url, data) {
    let options = {
        method: method,
        headers: {}
    }
    let userData = getUserData();
    if (userData) {
        options.headers["X-Parse-Session-Token"] = userData.sessionToken;
    } else {
        options.headers["X-Parse-Revocable-Session"] = 1;
    }
    options.headers["X-Parse-Application-Id"] = "41N7oa0jlfNJy25wog0rVROxt31saojN639JWBHt";
    options.headers["X-Parse-REST-API-Key"] = "MEM6ONptETQOCveSJbADNquuUAwhQSBLa7VyN3oP";
    options.headers["Content-Type"] = "application/json";
    if (data) {
        options["body"] = JSON.stringify(data);
    }
    try {
        let res = await fetch(url, options);
        if (!res.ok) {
            if (res.status == 403) {
                clearUserData();
            }
            let err = await res.json();
            throw new Error(err.message);
        }
        if (res.status == 204) {
            return res;
        }
        let data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
        throw new Error;
    }
}

export async function get(url) {
    return request("get", host + url);
}

export async function post(url, data) {
    return request("post", host + url, data);
}

export async function del(url) {
    return request("delete", host + url);
}

export async function put(url, data) {
    return request("put", host + url, data);
}