import { getElixirDetails } from "../services/api.js";
import { disableScroll, enableScroll } from "../utils/preventScroll.js";
import { hideLoader, showLoader } from "../utils/loader.js";

export async function displayElixirsDetailsFromApi(id) {
    try {
        showLoader();

        const details = await getElixirDetails(id);
        const elixirDetailsDiv = document.getElementById("elixir-details");
        const background = document.getElementById("backgound");
        elixirDetailsDiv.style.display = "block";
        background.style.display = "block";

        elixirDetailsDiv.innerHTML = `
			<div class="details-top-bar"> 
				<h2> ${details.name} </h2>
				<button id="close-details" class="close-details" > X </button>
			</div>
			
			</br>
			<p> difficulty:  ${details.difficulty ?? "No data"}  </p>
			<p> effect:  ${details.effect ?? "No data"}  </p>
			<p> SideEffects:  ${details.sideEffects ?? "No known side effects"}  </p>
			<p> <b>Ingrediens </b> </p>
			<ul>
				${
                    details.ingredients && details.ingredients.length > 0
                        ? details.ingredients
                              .map((ing) => `<li>${ing.name}</li>`)
                              .join("")
                        : "<li>No ingredients listed</li>"
                }
			</ul>
		

	`;
        const btn_close = document.getElementById("close-details");
        btn_close.onclick = () => hideDetails();
    } catch (error) {
        console.error("Error during fetching:", error);
        alert("Error during fetching!");
        hideDetails();
    } finally {
        hideLoader();
        disableScroll();
    }
}

function hideDetails() {
    const elixirDetailsDiv = document.getElementById("elixir-details");
    const background = document.getElementById("backgound");
    elixirDetailsDiv.style.display = "none";
    background.style.display = "none";
    enableScroll();
}
