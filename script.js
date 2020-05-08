var stages = [
    "",
    "England",
    "France",
    "Egypt",
    "India",
    "China",
    "Japan",
    "USA"
]

document.querySelector("#fileinput").addEventListener("change", function () {
    console.log(this.files);

    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(this.files[0])
});

function handleFileLoad(event) {
    document.querySelector("#editor").style = "display: block";

    console.log(event);

    var parser = new DOMParser();
    window.xml = parser.parseFromString((event.originalTarget || event.target).result, "text/xml").documentElement;

    console.log(xml);
    var lastStage = 0;
    var i = 1;
    Array.from(xml.children).forEach((level) => {
        var id = level.attributes["name"].value.replace("level_", "");
        if (lastStage < parseInt(id.split(".")[0])) {
            document.querySelector("#level")
                .innerHTML += `${lastStage == 0 ? "" : "</optgroup>"}<optgroup label="${__(stages[parseInt(id.split(".")[0])])}">`;
            lastStage = id.split(".")[0];
        }
        document.querySelector("#level")
            .innerHTML += `<option value="${id}">${__("Day")} ${i}</option>`;
        i++;
        if (i == 82) {
            document.querySelector("#level")
                .innerHTML += "</optgroup>";
        }
    })

    selectLevel();

}

function selectLevel() {
    $("#fileselection").hide();

    window.id = document.querySelector("#level").value;
    window.level = xml.querySelector(`Level[name="level_${id}"]`);

    window.tiles = []; // tiles[y][x] = "01AVSZ-+"

    window.tileColors = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];

    console.log(level);

    document.querySelector("#layout").style = "display:block;";
    Array.from(level.children).forEach((Row) => {
        console.log(Row)
        tiles.push(Row.innerHTML.split(""));
    });

    level.artifacts = tiles.slice().reduce((acc, val) => acc.concat(val), []).filter(tile => tile == "A").length;

    window.reloadLevel = () => {
        var chk = "";
        for (var i = 0; i < 12; i++)
            chk += `<div class="custom-control custom-checkbox custom-control-inline"><input class="custom-control-input" id="switchChip${i}" onchange="changeChips()" type="checkbox" name="chips[]" value="${i}" ${$(level).attr("chips").includes(i.toString(16).toUpperCase()) ? "checked" : ""}/><label class="custom-control-label" for="switchChip${i}"><img src="assets/chips/${i+1}.png" width="20px" height="20px" /></label></div>`;
        $("#checkboxes").html(chk);

        document.querySelector("#layout").innerHTML = tiles.map((row, y) => {
            return `<button onclick="for(var j=0;j<${row.length};j++) {setNewLetter(j, ${y}, getNewLetter(tiles[${y}][j]));}reloadLevel();">→</button>&nbsp;&nbsp;` + row.map((tile, x) => {
                var bg = `url(assets/chip_${tile.replace("*", "W")}.png)`;
                var sel = Array.from(document.forms['demoForm'].elements['chips[]']).filter(el => !!$(el).is(":checked")).map(el => parseInt(el.value)+1);
                tileColors[y][x] = 2;// tileColors[y][x] || sel[Math.floor(Math.random() * sel.length)];
                return `<button style="border: 1px var(--gray) solid;color: rgba(0,0,0,0);background: ${tile == "1" ? "url(assets/chips/" + tileColors[y][x] + ".png);" : bg}${["Z", "X", "-", "+"].includes(tile) ? ", url(assets/chips/" + tileColors[y][x] + ".png);" : ";"} background-size: cover;" onclick="setNewLetter(${x}, ${y}, getNewLetter(this.innerHTML));reloadLevel();" oncontextmenu="setNewLetter(${x}, ${y}, getNewLetter(this.innerHTML, true));reloadLevel();" class="button" x="${x}" y="${y}">${tile}</button>`
            }).join("");
        }).join("<br/>") + "<br/>" + `<button style="opacity:0">↗</button>` + bottomButtonRow();

        var currentArts = tiles.slice().reduce((acc, val) => acc.concat(val), []).filter(tile => tile == "A").length;

        $("#grid").show()// 
        $("#rows")[0].value = tiles[0].length;
        $("#cols")[0].value = tiles.length;
        $("#artifacts").html(__("<b>Artifacts</b>: {0}/{0}").replace("{0}/{0}", `<span style="${currentArts == level.artifacts ? "" : "color: red"}">${currentArts}/${level.artifacts}</span>`));

        document.querySelector("#timeInput").value = $(xml.querySelector(`Level[name="level_${id}"]`)).attr("time");

        $("#save").prop("disabled", currentArts != level.artifacts && Array.from(document.forms['demoForm'].elements['chips[]']).filter(el => !!$(el).is(":checked")).length >= 3);
    }

    window.setNewLetter = (x, y, letter) => {
        tiles[y][x] = letter;
        commit();
        reloadLevel();
    }

    window.commit = () => {
        tiles.forEach((row, y) => {
            console.log(y);
            if (!xml.querySelector(`Level[name="level_${id}"]`).children[y]) {
                var l = document.createElement("Line");
                l.outerHTML = "<Line>" + "0".repeat(xml.querySelector(`Level[name="level_${id}"]`).children[0].innerHTML.length) + "</Line>";
                xml.querySelector(`Level[name="level_${id}"]`).appendChild(l);
            }
            return xml.querySelector(`Level[name="level_${id}"]`).children[y].innerHTML = tiles[y].join("")
        });
    }

    reloadLevel();
}

function changeChips() {
    var chipString = Array.from(document.forms['demoForm'].elements['chips[]']).filter(el => !!$(el).is(":checked")).map(el => parseInt(el.value).toString(16).toUpperCase()).join("");

    console.log(chipString);

    $(xml.querySelector(`Level[name="level_${id}"]`)).attr("chips", chipString);
}

function timeChange(newTime) {
    console.log(newTime);

    $(xml.querySelector(`Level[name="level_${id}"]`)).attr("time", newTime);
}

function bottomButtonRow() {
    var s = "&nbsp;&nbsp;&nbsp;";
    for (var i = 0; i < tiles[0].length; i++) s += `<button onclick="for(var j=0;j<${tiles.length};j++) {setNewLetter(${i}, j, getNewLetter(tiles[j][${i}]));}reloadLevel();">↑</button>`;
    return s;
}

function onRowOrColNoChange() {
    var cols = parseInt($("#cols")[0].value);
    var rows = parseInt($("#rows")[0].value);

    console.log(rows, tiles.length < rows, tiles[0].length);

    if (tiles[0].length != rows) {
        if (tiles[0].length > rows) {
            tiles.forEach(row => {
                row.length = rows;
            });
        } else {
            console.log("I got here")
            tiles.forEach(row => {
                for (var i = 0; i < rows-row.length; i++) row.push("0");
            });
        }
    }
    if (tiles.length != cols) {
        if (tiles.length > cols) {
            tiles.length = cols;
        } else {
            var a = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
            a.length = tiles[0].length;
            tiles.push(a);
        }
    }

    console.log(tiles);

    commit();
    reloadLevel();
}

Number.prototype.mod = function(b) {
    // Calculate
    return ((this % b) + b) % b;
}

function getNewLetter(l, reverse = false) {
    /* ===== Letter table =====
     * 0: Empty slot
     * 1: Chip
     * A: Artifact piece
     * V: New Life
     * S: Points
     * Z: Single-frozen chip
     * X: Double-frozen chip
     * T: Hourglass
     * -: Single-locked chip
     * +: Double-locked chip
     * *: Hard Wall
     */
    var chars = "01AVSZXT-+*";
    return chars[(chars.indexOf(l) + (reverse ? -1 : 1)).mod(chars.length)];
}

function save() {
    $("#mayCorruptWarningModal").modal('hide');
    var s = new XMLSerializer();
    var str = "<!-- Made with Samplasion's AW80DLE -->\n" + s.serializeToString(xml).split("<line xmlns=\"http://www.w3.org/1999/xhtml\">").join("<Line>").split("</line>").join("</Line>\n\t\t");
    download(str, "level.xml", "xml");
}

function clearLevel() {
    for (var y = 0; y < tiles.length; y++) {
        for (var x = 0; x < tiles[y].length; x++) {
            tiles[y][x] = "0";
        }
    }

    commit();
    reloadLevel();
    $("#clearWarningModal").modal('hide');
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}