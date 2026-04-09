import debounce from "../utils/debounce.js";
import { displayElixirs } from "../components/ElixirsList.js";
import { Store } from "../services/store.js";

export default function initSearchBar() {
    const searchInput = document.getElementById("searchInput");

    const debouncedDisplayElixirs = debounce((elixirName) => {
        const filteredElixirs = Store.filterElixirs(elixirName);
        displayElixirs(filteredElixirs);
    });

    searchInput.addEventListener("input", (event) => {
        debouncedDisplayElixirs(event.target.value);
    });
}
