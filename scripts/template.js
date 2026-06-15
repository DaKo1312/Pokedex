function getPokemonCardTemplate(pokemon) {
    return `
        <button class="pokemon_card pokemon_card_border_${pokemon.types[0].type.name}" data-id="card" onclick="openPokemonDialog(${pokemon.id})">
            <span class="pokemon_id">
                – ${pokemon.id} –
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
                ${getPokemonTypesTemplate(pokemon)}
            </div>
        </button>
    `;
}

function getPokemonDialogTemplate(pokemon, description, evolutionPokemon) {
    return `
        <button class="dialog_control_btn dialog_nav_prev" data-id="prev_button" onclick="showPokemonInDialog(${pokemon.id - 1})">
            ←
        </button>
        <button class="dialog_control_btn dialog_nav_next" data-id="next_button" onclick="showPokemonInDialog(${pokemon.id + 1})">
            →
        </button>
        <button class="dialog_control_btn dialog_close_btn" data-id="close_dialog_button" onclick="document.getElementById('pokemon_dialog').close()">
            X
        </button>
        <div class="dialog_header ${pokemon.types[0].type.name}" data-id="overlay-pokemon-name">
            <span class="pokemon_id">
                – ${pokemon.id} –
            </span>
            <img class="pokemon_image" data-id="dialog-image"
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}">
            <h2>${capitalizeFirstLetter(pokemon.name)}</h2>
            <div class="pokemon_types">
                ${getPokemonTypesTemplate(pokemon)}
            </div>
        </div>
        <div class="dialog_content">
            <p class="pokemon_description">${description}</p>
            <h3 class="dialog_section_title">
                Infos
            </h3>
            <div class="pokemon_infos">
                <div class="info_card">
                    <span>Höhe</span>
                    <strong>${pokemon.height / 10} m</strong>
                </div>
                <div class="info_card">
                    <span>Gewicht</span>
                    <strong>${pokemon.weight / 10} kg</strong>
                </div>
                <div class="info_card">
                    <span>Basis XP</span>
                    <strong>${pokemon.base_experience}</strong>
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
                ${getEvolutionTemplate(evolutionPokemon)}
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

function getEvolutionTemplate(evolutionPokemon) {
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

function getNoPokemonFoundTemplate() {
    return `
        <div class="not_found_wrapper">
            <p class="not_found" data-id="not-found">
            No Pokemon found
            </p>
            <p class="not_found_subtitle">
            Try another search term.
            </p>
        </div>
    `;
}
