import { getElixirList } from "../services/api.js";
import { hideLoader, showLoader } from "../utils/loader.js";
import { displayElixirsDetailsFromApi } from "../components/ElixirDetails.js";

export default async function initialShowElixirs() {
    try {
        showLoader();
        const data = await getElixirList();
        displayElixirs(data);
    } catch (error) {
        alert("Error during fetching elixirs!");
        console.error("Error during initialShowElixirs:", error);
    } finally {
        hideLoader();
    }
}

export function displayElixirs(elixirs) {
    const table = document.getElementById("elixir-list");
    const messageContainer = document.getElementById("messageContainer");

    table.innerHTML = `
        <tr>                                                                                                                                       
            <th>Name</th>
            <th>Difficulty</th>
            <th>Effect</th>
            <th>Side Effects</th>
        </tr>
    `;

    if (elixirs.length == 0) {
        messageContainer.innerHTML = `No results found`;
    } else {
        messageContainer.innerHTML = ``;
    }

    elixirs.forEach((elixir) => {
        const tr = document.createElement("tr");

        const td_name = document.createElement("td");
        const td_difficulty = document.createElement("td");
        const td_effect = document.createElement("td");
        const td_side_effectst = document.createElement("td");

        table.appendChild(tr);
        tr.appendChild(td_name);
        tr.appendChild(td_difficulty);
        tr.appendChild(td_effect);
        tr.appendChild(td_side_effectst);

        td_name.appendChild(document.createTextNode(elixir.name ?? ""));
        td_difficulty.appendChild(
            document.createTextNode(elixir.difficulty ?? ""),
        );
        td_effect.appendChild(document.createTextNode(elixir.effect ?? ""));
        td_side_effectst.appendChild(
            document.createTextNode(elixir.sideEffects ?? ""),
        );

        tr.onclick = () => {
            displayElixirsDetailsFromApi(elixir.id);
        };
    });
}
