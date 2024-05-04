import { logout } from "../data/userService.js";
import { removeUserData } from "../data/utils.js";
import { page } from "./middlewear.js";

export async function onLogout() {
    await logout({});
    removeUserData();
    page.redirect("/")
}