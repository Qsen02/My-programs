import { page, middlewear } from "./middlewear.js";
import { showHome } from "./home.js";
import { showRegisterForm } from "./register.js";
import { showLoginForm } from "./login.js";
import { onLogout } from "./logout.js";
import { showCatalog } from "./catalog.js";
import { showDetails } from "./details.js";
import { showProfile } from "./profile.js";

page(middlewear());
page("/", showHome);
page("/home", showHome);
page("/register", showRegisterForm);
page("/login", showLoginForm);
page("/catalog", showCatalog);
page("/profile", showProfile);
page("/logout", onLogout);
page("/catalog/:id", showDetails)
page.start();