function getPokemonCardTemplate(pokemon) {
    return `
        <button class="pokemon_card border-${pokemon.types[0].type.name}" data-id="card" onclick="openPokemonDialog(${pokemon.id})">
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
            <div class="pokemon_types">
                ${getPokemonTypesTemplate(pokemon)}
            </div>
            </div>
        </button>
    `;
}

function getPokemonDialogTemplate(pokemon, description, evolution) {
    const evolutionPokemon = [];
    const firstPokemon = all_pokemon.find(
    pokemon => pokemon.name === evolution.chain.species.name
    );
    if (firstPokemon) {
        evolutionPokemon.push(firstPokemon);
    }
    const secondPokemon = all_pokemon.find(
        pokemon =>
            pokemon.name ===
            evolution.chain.evolves_to[0]?.species?.name
    );
    if (secondPokemon) {
        evolutionPokemon.push(secondPokemon);
    }
    const thirdPokemon = all_pokemon.find(
        pokemon =>
            pokemon.name ===
            evolution.chain.evolves_to[0]
                ?.evolves_to[0]
                ?.species?.name
    );
    if (thirdPokemon) {
        evolutionPokemon.push(thirdPokemon);
    }
    return `
        <button
            class="dialog_control_btn dialog_nav_prev"
            onclick="showPokemonInDialog(${pokemon.id - 1})"
        >
            ←
        </button>
        <button
            class="dialog_control_btn dialog_nav_next"
            onclick="showPokemonInDialog(${pokemon.id + 1})"
        >
            →
        </button>
        <button
            class="dialog_control_btn dialog_close_btn"
            onclick="closePokemonDialog()"
        >
            ✕
        </button>
        <div
            class="dialog_header ${pokemon.types[0].type.name}"
        >
            <span class="pokemon_id">
                – ${pokemon.id} –
            </span>
            <img
                class="pokemon_image"
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >
            <h2>
                ${capitalizeFirstLetter(pokemon.name)}
            </h2>
            <div class="pokemon_types">
                ${getPokemonTypesTemplate(pokemon)}
            </div>
        </div>
        <div class="dialog_content">
            <p class="pokemon_description">
                ${description}
            </p>
            <h3 class="dialog_section_title">
                Infos
            </h3>
            <div class="pokemon_infos">
                <div class="info_card">
                    <span>Höhe</span>
                    <strong>
                        ${pokemon.height / 10} m
                    </strong>
                </div>
                <div class="info_card">
                    <span>Gewicht</span>
                    <strong>
                        ${pokemon.weight / 10} kg
                    </strong>
                </div>
                <div class="info_card">
                    <span>Basis XP</span>
                    <strong>
                        ${pokemon.base_experience}
                    </strong>
                </div>
                <div class="info_card">
                    <span>Fähigkeiten</span>
                    <strong>
                        ${pokemon.abilities
                            .map((ability) =>
                                capitalizeFirstLetter(ability.ability.name),
                            )
                            .join(", ")}
                    </strong>
                </div>
            </div>
            <h3 class="dialog_section_title">
                Kampfwerte
            </h3>
            <div class="pokemon_stats">
                ${getPokemonStatsTemplate(pokemon)}
            </div>
            <h3 class="dialog_section_title">
                Entwicklung
            </h3>
            <div class="evolution_chain">
                ${getEvolutionTemplate(firstPokemon, secondPokemon, thirdPokemon,)}
            </div>
        </div>
    `;
}

function getPokemonTypesTemplate(pokemon) {
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

function getPokemonStatsTemplate(pokemon) {
    const stat_names = ["HP", "Angriff", "Verteidigung", "Sp. Angriff", "Sp. Verteidigung", "Initiative"];
    return pokemon.stats
        .map(
            (stat, index) => `
                <div class="stat_row">
                    <span class="stat_name">
                        ${stat_names[index]}
                    </span>
                    <span class="stat_value">
                        ${stat.base_stat}
                    </span>
                    <div class="stat_bar">
                        <div
                            class="stat_fill"
                            style="
                                width:${stat.base_stat}%;
                            "
                        ></div>
                    </div>
                </div>
            `,
        )
        .join("");
}

function getEvolutionTemplate(firstPokemon, secondPokemon, thirdPokemon,) {
    return `
        <div class="evolution_pokemon" onclick="openPokemonDialog(${firstEvolutionPokemon.id})">
            <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firstEvolutionPokemon.id}.png">
            <span>${capitalizeFirstLetter(firstPokemon)}</span>
        </div>
        <span>
            →
        </span>
        <div class="evolution_pokemon" onclick="openPokemonDialog(${secondEvolutionPokemon.id})">
            <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
            <span>${capitalizeFirstLetter(secondPokemon)}</span>
        </div>
        <span>
            →
        </span>
        <div class="evolution_pokemon" onclick="openPokemonDialog(${thirdEvolutionPokemon.id})">
            <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png">
            <span>${capitalizeFirstLetter(thirdPokemon)}</span>
        </div>
    `;
}
