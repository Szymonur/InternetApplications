import debounce from "../utils/debounce.js";
import { displayElixirs } from "../components/ElixirsList.js";
import { Store } from "../services/store.js";

export default function initSearchBar() {
    const searchInput = document.getElementById("searchInput");

    const debouncedLog = debounce((elixirName) => {
        const filteredElixirs = Store.filterElixirs(elixirName);
        console.log(elixirName);

        displayElixirs(filteredElixirs);
    });

    searchInput.addEventListener("input", (event) => {
        debouncedLog(event.target.value);
    });
}
