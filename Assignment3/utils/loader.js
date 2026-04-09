import { disableScroll, enableScroll } from "../utils/preventScroll.js";

export function showLoader() {
    disableScroll();
    const loader = document.getElementById("loader");
    const loader_backgound = document.getElementById("loader_backgound");
    loader.style.display = "block";
    loader_backgound.style.display = "block";
}

export function hideLoader() {
    enableScroll();
    const loader = document.getElementById("loader");
    const loader_backgound = document.getElementById("loader_backgound");
    loader.style.display = "none";
    loader_backgound.style.display = "none";
}
