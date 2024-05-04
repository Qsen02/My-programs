import { deleteRoom } from "../data/dataService.js";
import { page } from "./middlewear.js";

export async function onDelete(ctx) {
    const id = ctx.params.id;
    let confirming = confirm("Are you sure?");
    if (confirming) {
        await deleteRoom(id);
        page.redirect("/catalog");
    }
}