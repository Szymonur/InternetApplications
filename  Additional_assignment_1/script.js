const axios = require("axios");
const { JSDOM } = require("jsdom");

const districtMap = new Map();

async function scrapeAllPages() {
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        try {
            // url with pagination after first page
            const baseUrl =
                "https://gratka.pl/nieruchomosci/flat/w-bloku/poznan";
            const url =
                currentPage === 1 ? baseUrl : `${baseUrl}?page=${currentPage}`;

            console.log("Scraping: ", url);

            const { data } = await axios.get(url);

            const dom = new JSDOM(data);
            const document = dom.window.document;
            const listingNodes = document.querySelectorAll(".property-card");

            if (listingNodes.length === 0) {
                console.log("All offers sraped!");
                hasNextPage = false;
                break;
            }

            listingNodes.forEach((node) => {
                const priceMainText =
                    node.querySelector(".property-card__price--main")
                        ?.textContent || "";
                const priceM2Text =
                    node.querySelector(".property-card__price--perM2")
                        ?.textContent || "";
                const localizationText =
                    node.querySelector(".property-card__location span")
                        ?.textContent || "";

                const totalPrice = parsePrice(priceMainText);
                const priceM2 = parsePrice(priceM2Text);

                const districtParts = localizationText
                    .split(",")
                    .map((p) => p.trim());
                // extract city district - second here
                const district =
                    districtParts.length >= 2 ? districtParts[1] : "Inne";

                // add to map
                if (!isNaN(priceM2)) {
                    if (!districtMap.has(district)) {
                        districtMap.set(district, []);
                    }
                    districtMap.get(district).push({
                        totalPrice,
                        priceM2,
                    });
                }
            });

            currentPage++;
            // if (currentPage > 3) {
            //     hasNextPage = false;
            // }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`Page ${currentPage} - 404`);
            } else {
                console.error("Error", error.message);
            }
            hasNextPage = false;
        }
    }

    displayRank();
}

function displayRank() {
    const districtRank = [];

    districtMap.forEach((flats, district) => {
        flats.sort((a, b) => a.priceM2 - b.priceM2);
        const average =
            flats.reduce((partialSum, flat) => partialSum + flat.priceM2, 0) /
            flats.length;
        districtRank.push({ district, avergaeM2: average, oferts: flats });
    });

    // sort disctrict - lowest average price
    districtRank.sort((a, b) => a.avergaeM2 - b.avergaeM2);

    console.log("RANKING DZIELNIC POZNANIA (zł/m2)");

    districtRank.forEach((d, i) => {
        console.log(
            `\n(${i + 1}) ${d.district} | Średnia: ${d.avergaeM2.toFixed(
                2
            )} zł/m2`
        );
        console.log(`   Najtańsze oferty w tej dzielnicy:`);
        d.oferts.slice(0, 5).forEach((m, i) => {
            console.log(
                `   [${i + 1}] ${m.priceM2} zł/m2 | Total: ${m.totalPrice} zł`
            );
        });
    });
}

function parsePrice(price) {
    return parseFloat(
        price
            .replace(/\s/g, "")
            .replace(",", ".")
            .replace(/[^\d.]/g, "")
    );
}

scrapeAllPages();
