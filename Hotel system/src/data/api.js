import { getUserData, removeUserData } from "./utils.js"
const host = "https://parseapi.back4app.com/";

async function request(method, url, data) {
    let options = {
        method: method,
        headers: {}
    }
    let userData = getUserData();
    if (!userData) {
        options.headers["X-Parse-Revocable-Session"] = 1;
    } else {
        options.headers["X-Parse-Session-Token"] = userData.sessionToken;
    }
    options.headers["X-Parse-Application-Id"] = "n1gWY7Tx3WhZq5HcdiqXGzU0bPIHv6lq8CB2e9qI";
    options.headers["X-Parse-REST-API-Key"] = "cu7cY76bqOnSxHxp9Zsmd2jmz7WLHzdxxbH3gz7U";
    options.headers["Content-Type"] = "application/json";
    if (data) {
        options["body"] = JSON.stringify(data);
    }
    try {
        let res = await fetch(url, options);
        if (!res.ok) {
            if (res.status == 403) {
                removeUserData();
            }
            const err = await res.json();
            throw new Error(err.message);
        }
        if (res.status == 204) {
            return res;
        }
        let data = await res.json();
        return data;
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export function get(url) {
    return request("get", host + url);
}

export function post(url, data) {
    return request("post", host + url, data);
}
export function del(url) {
    return request("delete", host + url);
}

export function put(url, data) {
    return request("put", host + url, data);
}