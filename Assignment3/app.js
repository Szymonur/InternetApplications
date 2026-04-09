import initialShowElixirs from "./components/ElixirsList.js";
import initSearchBar from "./components/SearchBar.js";
import initDifficultiesCheckboxes from "./components/DifficultiesCheckboxes.js";

window.onload = async () => {
    await initialShowElixirs();
    initSearchBar();
    initDifficultiesCheckboxes();
};
