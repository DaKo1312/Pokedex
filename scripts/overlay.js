function closePokemonDialog() {
    document.body.style.overflow = "auto";
    document
        .getElementById("pokemon_dialog")
        .close();
}

function initDialogListener() {
    const dialog = document.getElementById("pokemon_dialog");
    dialog.addEventListener(
        "click",
        (event) => {
            const rect = dialog.getBoundingClientRect();
            const isOutside =
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;
            if (isOutside) {
                closePokemonDialog();
            }
        }
    );
}

function renderPokemonDialog(pokemon, description, evolutionPokemon) {
    document.getElementById("pokemon_dialog")
    .innerHTML = getPokemonDialogTemplate(pokemon, description, evolutionPokemon);
}

function getGermanFlavorText(species) {
    const entry = species.flavor_text_entries.find(
            (entry) =>
                entry.language.name === "de"
        );
    return entry
        ? entry.flavor_text
            .replace(/\n/g, " ")
            .replace(/\f/g, " ")
        : "";
}

function showPokemonInDialog(id) {
    openPokemonDialog(id);
}

function showPreviousPokemon(id) {
    const current_index = current_visible_pokemon.findIndex(
            (pokemon) => pokemon.id === id
        );
    if (current_index > 0) {
        showPokemonInDialog(
            current_visible_pokemon[
                current_index - 1
            ].id
        );
    }
}

function showNextPokemon(id) {
    const current_index = current_visible_pokemon.findIndex(
            (pokemon) => pokemon.id === id
        );
    if (
        current_index <
        current_visible_pokemon.length - 1
    ) {
        showPokemonInDialog(
            current_visible_pokemon[
                current_index + 1
            ].id
        );
    }
}
