async function init() {
    await loadAllPokemon();
    await loadFirstPokemon();
    initEventListeners();
}
init();

// #region loadPokemon
async function loadPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    
    renderPokemon(pokemon);
}

async function loadFirstPokemon() {
    for (let i = 1; i <= 40; i++) {
        await loadPokemon(i);
    }
    updatePokemonCounter();
    hideLoadingScreen();
}

async function loadMorePokemon() {
    let start = current_pokemon + 1;
    let end = current_pokemon + 20;
    if (end > 151) {
        end = 151;}
    for (let i = start; i <= end; i++) {
        await loadPokemon(i);}
    current_pokemon = end;
    updatePokemonCounter();
    if (current_pokemon >= 151) {
        document.querySelector(
            ".load_more_btn"
        ).style.display = "none";
    }
}
// #endregion

async function loadAllPokemon() {
    for (let i = 1; i <= 151; i++) {
        await savePokemon(i);
    }
}

async function loadEvolutionChain(url) {
    const response = await fetch(url);
    return await response.json();
}

async function savePokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    all_pokemon.push(pokemon);
}

async function openPokemonDialog(id) {
    document.body.style.overflow = "hidden";
    const pokemon = all_pokemon.find(
            (pokemon) =>
                pokemon.id === id
        );
    const species = await loadPokemonSpecies(id);
    const evolution = await loadEvolutionChain(species.evolution_chain.url);
    const description = getGermanFlavorText(species);
    renderPokemonDialog(pokemon, description, evolution);
    document.getElementById("pokemon_dialog")
        .showModal();
}

async function loadPokemonSpecies(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return await response.json();
}

async function getSpeciesData(species_id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${species_id}/`);
    return await response.json();
}

async function getEvolutionChain(url) {
    const response = await fetch(url);
    return await response.json();
}