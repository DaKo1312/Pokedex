async function init() {
    await loadAllPokemon();
    await loadFirstPokemon();
    initEventListeners();
}
init();

async function loadPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    
    renderPokemon(pokemon);
}

async function loadFirstPokemon() {
    for (let i = 1; i <= 40; i++) {
        await loadPokemon(i);
    }
    current_visible_pokemon = all_pokemon.slice(0, 40);
    updatePokemonCounter();
    hideLoadingScreen();
}

async function loadMorePokemon() {
    const button = document.querySelector(".load_more_btn");
    const loader = document.getElementById("load_more_loader");
    button.disabled = true;
    button.textContent = "LOADING...";
    loader.style.display = "block";
    await delay(2000);
    const start = current_pokemon + 1;
    const end = Math.min(current_pokemon + 20, 151);
    for (let i = start; i <= end; i++) renderPokemon(all_pokemon[i - 1]);
    current_pokemon = end;
    current_visible_pokemon = all_pokemon.slice(0, end);
    updatePokemonCounter();
    loader.style.display = "none";
    current_pokemon < 151
        ? (button.disabled = false, button.textContent = "LOAD MORE")
        : (button.style.display = "none");
}

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
    active_dialog_tab = "infos";
    document.body.style.overflow = "hidden";
    const pokemon = all_pokemon.find((pokemon) => pokemon.id === id);
    const species = await loadPokemonSpecies(id);
    const evolution = await loadEvolutionChain(species.evolution_chain.url);
    const evolutionPokemon = getEvolutionPokemon(evolution);
    const description = getGermanFlavorText(species);
    current_dialog_pokemon = pokemon;
    current_dialog_description = description;
    current_dialog_evolution = evolutionPokemon;
    renderPokemonDialog(pokemon, description, evolutionPokemon);
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