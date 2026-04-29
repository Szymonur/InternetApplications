import { displayElixirs } from "../components/ElixirsList.js";
import debounce from "../utils/debounce.js";

import { Store } from "../services/store.js";

export default function initDifficultiesCheckboxes() {
    const difficultyLevelCheckboxes = document.getElementById(
        "difficultyLevelCheckboxes",
    );
    const difficultyLevels = Store.getDifficultyLevels();

    difficultyLevels.forEach((difficultyLevel) => {
        var newCheckBox = document.createElement("input");
        newCheckBox.type = "checkbox";
        newCheckBox.id = difficultyLevel;
        newCheckBox.value = difficultyLevel;
        newCheckBox.checked = true;
        difficultyLevelCheckboxes.appendChild(newCheckBox);

        const debouncedHandleFilterChange = debounce(() => {
            handleFilterChange();
        });
        newCheckBox.addEventListener("change", () => {
            debouncedHandleFilterChange();
        });

        var newLabel = document.createElement("label");
        newLabel.setAttribute("for", difficultyLevel);
        newLabel.appendChild(document.createTextNode(difficultyLevel));
        difficultyLevelCheckboxes.appendChild(newLabel);
    });
}

function handleFilterChange() {
    const checkedBoxes = document.querySelectorAll(
        '#difficultyLevelCheckboxes input[type="checkbox"]:checked',
    );
    const selectedLevels = Array.from(checkedBoxes).map((cb) => cb.value);
    const filtered = Store.filterDifficultyLevels(selectedLevels);

    displayElixirs(filtered);
}
