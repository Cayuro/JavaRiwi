import { render } from "./views.js";

/*
Router simple por hash
*/

export const router = () => {
  const route = location.hash || "#login";
  render(route);
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
