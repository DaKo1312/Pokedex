const all_pokemon = [];

let current_pokemon = 40;
let active_type_filter = "";

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
    document
        .querySelector(".load_more_btn")
        .addEventListener(
            "click",
            loadMorePokemon
        );
    addFilterListeners();
    document
        .querySelector(
            '[data-id="search_input"]'
        )
        .addEventListener(
            "input",
            searchPokemon
        );
    initDialogListener();
}

// #region searchPokemon
function searchPokemon() {
    const search_input = getSearchInput();
    if (!isValidSearch(search_input)) {
        return;
    }
    const filtered_pokemon = filterPokemon(search_input);
    renderFilteredPokemon(
        filtered_pokemon
    );
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
    if (
        search_input.length > 0 &&
        search_input.length < 3
    ) {
        clearPokemonContainer();
        return false;
    }
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