import { Store } from "./store.js";

export async function getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error!
			Status: ${response.status}`);
    }

    return await response.json();
}

export async function getElixirList() {
    const response = await getData(
        "https://wizard-world-api.herokuapp.com/Elixirs",
    );
    Store.setElixirs(response);
    return response;
}

export async function getElixirDetails(id) {
    const response = await getData(
        `https://wizard-world-api.herokuapp.com/Elixirs/${id}`,
    );
    console.log("simpulate sloooow api...");
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("got response!");
            resolve(response);
        }, 700);
    });
    // only return - no store save
}
