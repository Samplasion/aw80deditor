var langs = {
    // en: {
    //     "Around the World in 80 Days Level Editor (AW80DLE for short)": "Around the World in 80 Days Level Editor (AW80DLE for short)",
    //     "Level": "Level",
    //     "Day": "Day",
    //     "Save": "Save",
    //     "Clear": "Clear",
    //     "Browse": "Browse",
    //     "Choose the <code>level.xml</code> file located in <code>&lt;GameDir>/Base</code>": "Choose the <code>level.xml</code> file located in <code>&lt;GameDir>/Base</code>",
    //     stages: [
    //         "",
    //         "England",
    //         "France",
    //         "Egypt",
    //         "India",
    //         "China",
    //         "Japan",
    //         "USA"
    //     ]
    // },
    it: {
        "Around the World in 80 Days Level Editor (AW80DLE for short)": "Editor di livelli per Around the World in 80 Days (abbreviato in AW80DLE)",
        "Level": "Livello",
        "Day": "Giorno",
        "Save": "Salva",
        "Clear": "Cancella",
        "Browse": "Sfoglia",
        "Choose the <code>level.xml</code> file located in <code>&lt;GameDir>/Base</code>": "Scegli il file <code>level.xml</code> che si trova in <code>&lt;GameDir>/Base</code>",
        "Level": "Livello",
        "Grid size": "Dimensioni griglia",
        "{0} grid": "Griglia {0}",
        "Level Info": "Livello",
        "<b>Artifacts</b>: {0}/{0}": "<b>Frammenti</b>: {0}/{0}",
        "Chips": "Tessere",
        "Check a minimum of 3 of these or the game will freeze.": "Selezionane almeno 3 o il gioco si bloccherà.",
        "{0} seconds": "{0} secondi",
        "The level's time (in seconds). The hour hand of the level's clock (the one on the left) will take exactly this time / 5 to go to the next \"hour\" (eg if the time is set to 60, the hour hand will switch to the next hour every 5 seconds).": "Il tempo del livello è in secondi. La lancetta delle ore\
                            dell'orologio del livello (quello a sinistra) impiegherà esattamente tempo / 5 secondi a passare all'ora\
                            successiva (per esempio se il tempo è impostato a 60 secondi, l'ora avanzerà ogni 5).",
        "Level Time": "Tempo",
        "England": "Inghilterra",
        "France": "Francia",
        "Egypt": "Egitto",
        "India": "India",
        "China": "Cina",
        "Japan": "Giappone",
        "USA": "Stati Uniti",
        "Empty slot": "Slot vuoto",
        "Chip": "Tessera",
        "Artifact piece": "Frammento",
        "New Life": "Vita extra",
        "Points": "Punti extra",
        "Single-frozen chip": "Tessera congelata x1",
        "Double-frozen chip": "Tessera congelata x2",
        "Hourglass": "Tempo extra",
        "Single-locked chip": "Tessera bloccata x1",
        "Double-locked chip": "Tessera bloccata x2",
        "Hard Wall": "Muro solido",
        "Letter": "Lettera",
        "Icon": "Icona",
        "Meaning": "Significato",
        "Warning": "Attenzione",
        "There is a chance the game won't start or it'll freeze when loading a modified level. Download the modified file?": "Il gioco potrebbe bloccarsi o non avviarsi caricando un livello modificato. Scaricare comunque il file?",
        "This will clear your current level (ie. set all the cells to 0). This action can't be undone. Are you sure you want to clear this level?": "Il livello sarà azzerato (ovvero ogni cella verrà impostata a 0). Quest'azione non può essere annullata. Vuoi cancellare il livello?",
        "Cancel": "Annulla",
        "Save file": "Salva file",
        "Clear level": "Cancella livello",
    }
}

const LANG = (navigator.language || navigator.userLanguage).split("-")[0];
document.documentElement.setAttribute("lang", LANG);//langs[LANG] || langs.en;

window.__ = text => langs[document.documentElement.lang] ? (langs[document.documentElement.lang][text] || text) : text;