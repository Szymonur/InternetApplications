import { getElixirList } from "../services/api.js";

export default async function initialShowElixirs() {
    try {
        const data = await getElixirList();
        displayElixirs(data);
    } catch (error) {
        console.error("Error during initialShowElixirs:", error);
    }
}

export function displayElixirs(elixirs) {
    const table = document.getElementById("elixir-list");
    table.innerHTML = `
        <tr> zbrór zadań które wykowyałem na przedmiot Zaawansowe Aplikacje Internetowe 
            <th>Name</th>
            <th>Difficulty</th>
            <th>Effect</th>
            <th>Side Effects</th>
        </tr>
    `;

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
            document.createTextNode(elixir.difficulty ?? "")
        );
        td_effect.appendChild(document.createTextNode(elixir.effect ?? ""));
        td_side_effectst.appendChild(
            document.createTextNode(elixir.sideEffects ?? "")
        );
    });
}
