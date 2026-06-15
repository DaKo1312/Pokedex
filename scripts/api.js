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
    const load_more_button =
    document.querySelector(".load_more_btn");
    load_more_button.disabled = true;
    load_more_button.textContent = "LOADING...";
    await delay(2000);

    let start = current_pokemon + 1;
    let end = current_pokemon + 20;
    if (end > 151) {
        end = 151;}
    for (let i = start; i <= end; i++) {
    renderPokemon(all_pokemon[i - 1]);
}
    current_pokemon = end;
    current_visible_pokemon = all_pokemon.slice(0, current_pokemon);
    updatePokemonCounter();
        load_more_button.disabled = false;
        load_more_button.textContent = "LOAD MORE";
    if (current_pokemon < 151) {
        load_more_button.disabled = false;
        load_more_button.textContent = "LOAD MORE";
}
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
    document.body.style.overflow = "hidden";
    const pokemon = all_pokemon.find(
            (pokemon) =>
                pokemon.id === id
        );
    const species = await loadPokemonSpecies(id);
    const evolution = await loadEvolutionChain(species.evolution_chain.url);
    const evolutionPokemon = getEvolutionPokemon(evolution);
    const description = getGermanFlavorText(species);
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