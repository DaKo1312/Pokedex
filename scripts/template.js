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
                ${getPokemonTypesHtml(pokemon)}
            </div>
        </button>
    `;
}

function getPokemonDialogTemplate(pokemon, description, evolutionPokemon) {
    return `
        <button class="dialog_control_btn dialog_nav_prev" data-id="prev_button" onclick="showPreviousPokemon(${pokemon.id})">
            ←
        </button>
        <button class="dialog_control_btn dialog_nav_next" data-id="next_button" onclick="showNextPokemon(${pokemon.id})">
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
                ${getPokemonTypesHtml(pokemon)}
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
                        ${getPokemonAbilities(pokemon)}
                    </strong>
                </div>
            </div>
            <h3 class="dialog_section_title">
                Kampfwerte
            </h3>
            <div class="pokemon_stats">
                ${getPokemonStatsHtml(pokemon)}
            </div>
            <h3 class="dialog_section_title">
                Entwicklung
            </h3>
            <div class="evolution_chain">
                ${getEvolutionHtml(evolutionPokemon)}
            </div>
        </div>
    `;
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
