import { logout } from "../data/userService.js";
import { page } from "./middlewear.js";
import { clearUserData } from "../data/utils.js";

export async function onLogout() {
    await logout();
    clearUserData();
    page.redirect("/login");
}