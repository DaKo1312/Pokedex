const all_pokemon = [];

let current_pokemon = 40;
let active_type_filter = "";
let current_visible_pokemon = [];

function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase()
        + text.slice(1);
}

function renderPokemon(pokemon) {
    const pokemon_container = document.getElementById(
        "pokemon_container"
    );
    pokemon_container.innerHTML +=
        getPokemonCardTemplate(pokemon);
}

function hideLoadingScreen() {
    document.getElementById(
        "loading_screen"
    ).style.display = "none";
}

function initEventListeners() {
    document.querySelector(".load_more_btn")
        .addEventListener("click", loadMorePokemon);
    addFilterListeners();
    document.querySelector('[data-id="search_input"]')
        .addEventListener("input", searchPokemon);
    initDialogListener();
}

// #region searchPokemon
function searchPokemon() {
    const search_input = getSearchInput();
    const load_more_button = document.querySelector('[data-id="load-more-button"]');
    if (search_input === "") {
    document.getElementById("search_hint").style.display = "none";
    current_visible_pokemon = all_pokemon.slice(0, current_pokemon);
    load_more_button.style.display = "block";
    renderFilteredPokemon(
        all_pokemon.slice(0, current_pokemon)
    );
    updatePokemonCounter();
    return;
}
    if (!isValidSearch(search_input)) {
        return;
    }
    const filtered_pokemon = filterPokemon(search_input);
    load_more_button.style.display = "none";
    renderFilteredPokemon(filtered_pokemon);
}

function toggleLoadMoreButton(show) {
    document.querySelector('[data-id="load-more-button"]')
    .style.display = show ? "block" : "none";
}

function getSearchInput() {
    return document
        .querySelector(
            '[data-id="search_input"]'
        )
        .value
        .toLowerCase();
}

function isValidSearch(search_input) {
    const search_hint = document.getElementById("search_hint");
    if (
        search_input.length > 0 &&
        search_input.length < 3
    ) {
        search_hint.style.display = "block";
        clearPokemonContainer();
        return false;
    }

    search_hint.style.display = "none";
    return true;
}
// #endregion

function clearPokemonContainer() {
    document.getElementById(
        "pokemon_container"
    ).innerHTML = "";
}

function updatePokemonCounter() {
    document.getElementById(
        "pokemon_counter_text"
    ).textContent =
        `${current_pokemon} from 151 Pokemon`;
}

function hasPokemonType(pokemon, type) {
    return pokemon.types.some(
        (pokemon_type) =>
            pokemon_type.type.name === type
    );
}

function updateResultCounter(count) {
    document.getElementById("pokemon_counter_text")
    .textContent = `${count} hits`;
}

function renderCurrentPokemon() {
    clearPokemonContainer();
    for (let i = 0; i < current_pokemon; i++) {
        renderPokemon(
            all_pokemon[i]
        );
    }
}

function getPokemonListForSearch() {
    if (active_type_filter === "") {
        return all_pokemon;
    }
    return getFilteredPokemonByType(
        active_type_filter
    );
}

function getEvolutionPokemon(evolution) {
    const evolutionPokemon = [];
    const firstPokemon = all_pokemon.find(
    pokemon => pokemon.name === evolution.chain.species.name);
    if (firstPokemon) {
        evolutionPokemon.push(firstPokemon);
    }
    const secondPokemon = all_pokemon.find(
        pokemon => pokemon.name === evolution.chain.evolves_to[0]?.species?.name
    );
    if (secondPokemon) {
        evolutionPokemon.push(secondPokemon);
    }
    const thirdPokemon = all_pokemon.find(
        pokemon => pokemon.name === evolution.chain.evolves_to[0]
                ?.evolves_to[0]
                ?.species?.name
    );
    if (thirdPokemon) {
        evolutionPokemon.push(thirdPokemon);
    }

    return evolutionPokemon;
}

function getPokemonStats(pokemon) {
    return pokemon.stats;
}

function delay(milliseconds) {
    return new Promise(
        (resolve) => setTimeout(resolve, milliseconds)
    );
}

function getPokemonAbilities(pokemon) {
    return pokemon.abilities
        .map(
            (ability) =>
                capitalizeFirstLetter(
                    ability.ability.name
                )
        )
        .join(", ");
}

function getPokemonTypesHtml(pokemon) {
    return pokemon.types
        .map(
            (type) => `
                <span
                    class="type_badge ${type.type.name}"
                >
                    ${type.type.name.toUpperCase()}
                </span>
            `,
        )
        .join("");
}

function getPokemonStats(pokemon) {
    const stat_names = ["HP","Angriff","Verteidigung","Sp. Angriff","Sp. Verteidigung","Initiative",];
    return pokemon.stats.map((stat, index) => ({
        name: stat_names[index],
        value: stat.base_stat,
    }));
}

function getPokemonStatsHtml(pokemon) {
    const stats = getPokemonStats(pokemon);
    return stats
        .map((stat) => getPokemonStatTemplate(stat))
        .join("");
}

function getEvolutionHtml(evolutionPokemon) {
    return evolutionPokemon.map((pokemon, index) => `
            <div
                class="evolution_pokemon"
                onclick="openPokemonDialog(${pokemon.id})">
                <div class="evolution_sprite">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default}">
                </div>
                <span>
                    ${capitalizeFirstLetter(pokemon.name)}
                </span>
            </div>
            ${
                index < evolutionPokemon.length - 1
                    ? "<span>→</span>"
                    : ""
            }
        `)
        .join("");
}