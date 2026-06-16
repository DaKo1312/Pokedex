const all_pokemon = [];

let current_pokemon = 40;
let active_type_filter = "";
let current_visible_pokemon = [];
let active_dialog_tab = "infos";
let current_dialog_pokemon = null;
let current_dialog_description = "";
let current_dialog_evolution = [];

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
    .addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Enter") {
                searchPokemon();
            }
        }
    );
    document.querySelector('[data-id="search_input"]')
        .addEventListener("input",validateSearchInput);
        
    initDialogListener();
}

function validateSearchInput() {
    const search_input = getSearchInput();
    if (
        search_input.length > 0 &&
        search_input.length < 3
    ) {
        document.getElementById(
            "search_hint"
        ).style.display = "block";
        return;
    }
    document.getElementById("search_hint")
    .style.display = "none";
}

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
    const pokemonNames = [
        evolution.chain.species.name,
        evolution.chain.evolves_to[0]?.species?.name,
        evolution.chain.evolves_to[0]?.evolves_to[0]?.species?.name,
    ];
    pokemonNames.forEach((name) => {
        const pokemon = all_pokemon.find(
            (pokemon) => pokemon.name === name
        );
        if (pokemon) {
            evolutionPokemon.push(pokemon);
        }
    });

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

function getPokemonTypes(pokemon) {
    return pokemon.types.map((type) => ({
        name: type.type.name,
        label: type.type.name.toUpperCase(),
    }));
}

function getPokemonTypesHtml(pokemon) {
    const types = getPokemonTypes(pokemon);

    return types
        .map((type) =>
            getPokemonTypeTemplate(type),
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

function getEvolutionData(evolutionPokemon) {
    return evolutionPokemon.map(
        (pokemon, index) => ({
            id: pokemon.id,
            image:
                pokemon.sprites.other[
                    "official-artwork"
                ].front_default,
            name: capitalizeFirstLetter(
                pokemon.name
            ),
            show_arrow:
                index <
                evolutionPokemon.length - 1,
        }),
    );
}

function getEvolutionHtml(evolutionPokemon) {
    const evolution_data = getEvolutionData(evolutionPokemon);

    return evolution_data
        .map((pokemon) => {
            let html = getEvolutionPokemonTemplate(pokemon);
            if (pokemon.show_arrow) {
                html += getEvolutionArrowTemplate();
            }
            return html;
        })
        .join("");
}

function setDialogTab(tab) {
    active_dialog_tab = tab;

    renderPokemonDialog(
        current_dialog_pokemon,
        current_dialog_description,
        current_dialog_evolution
    );
}