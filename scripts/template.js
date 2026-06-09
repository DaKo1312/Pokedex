function getPokemonCardTemplate(pokemon) {
    return `
        <button class="pokemon_card" data-id="card">
            <span class="pokemon_id">
                – ${pokemon.id} −
            </span>
            <img
                class="pokemon_image"
                data-id="card_image"
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >
            <h2>
                ${pokemon.name}
            </h2>
            <div class="pokemon_types">
                <span class="type_badge ${pokemon.types[0].type.name}">
                    ${pokemon.types[0].type.name.toUpperCase()}
                </span>
                ${
                    pokemon.types[1]
                        ? `
                            <span class="type_badge ${pokemon.types[1].type.name}">
                                ${pokemon.types[1].type.name.toUpperCase()}
                            </span>
                        `
                        : ""
                }
            </div>
        </button>
    `;
}