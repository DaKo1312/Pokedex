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

function renderPokemonDialog(pokemon, description, evolution) {
    document.getElementById("pokemon_dialog")
    .innerHTML = getPokemonDialogTemplate(pokemon, description, evolution);
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

