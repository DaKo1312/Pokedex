function renderFilteredPokemon(filtered_pokemon) {
    clearPokemonContainer();
    if (filtered_pokemon.length === 0) {
        document.getElementById("pokemon_container").innerHTML = getNoPokemonFoundTemplate();
        updateResultCounter(0);
        document.querySelector('[data-id="load-more-button"]').disabled = true;
        return;
        document.querySelector('[data-id="load-more-button"]').disabled = false;
    }
    filtered_pokemon.forEach((pokemon) => {
        renderPokemon(pokemon);
    });
    updateResultCounter(
        filtered_pokemon.length
    );
}

function filterPokemonByType(type) {
    active_type_filter = type;
    if (type === "all") {
        renderCurrentPokemon();
        updatePokemonCounter();
        return;
    }
    const filtered_pokemon =
        getFilteredPokemonByType(type);
    renderFilteredPokemon(
        filtered_pokemon
    );
}

function getFilteredPokemonByType(type) {
    if (type === "all") {
        return all_pokemon;
    }
    return all_pokemon.filter(
        (pokemon) =>
            hasPokemonType(
                pokemon,
                type
            )
    );
}

function addFilterListeners() {
    const filter_buttons =
        document.querySelectorAll(
            ".filter_btn"
        );
    filter_buttons.forEach(
        (button) => {
            button.addEventListener(
                "click",
                () => {
                    filterPokemonByType(
                        button.dataset.id
                    );
                }
            );
        }
    );
}

function filterPokemon(search_input) {
    const pokemon_list =
        getPokemonListForSearch();
    return pokemon_list.filter(
        (pokemon) =>
            pokemon.name.includes(
                search_input
            )
    );
}