async function loadPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();

    renderPokemon(pokemon);
}

async function loadFirstPokemon() {
    for (let i = 1; i <= 40; i++) {
        await loadPokemon(i);
    }
}

loadFirstPokemon();

function renderPokemon(pokemon) {
    const pokemon_container = document.getElementById("pokemon_container");
    pokemon_container.innerHTML += getPokemonCardTemplate(pokemon);
}