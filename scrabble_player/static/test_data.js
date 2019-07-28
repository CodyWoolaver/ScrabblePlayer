const $ = require("jquery");
const _ = require("underscore");

const init_board = [
    {x:10, y:11, letter: "B"},
    {x:10, y:12, letter: "A"},
    {x:10, y:13, letter: "Y"},
    {x:10, y:4,  letter: "W"},
    {x:10, y:6,  letter: "D"},
    {x:10, y:7,  letter: "E"},
    {x:10, y:8,  letter: "E"},
    {x:10, y:9,  letter: "R"},
    {x:11, y:11, letter: "A"},
    {x:11, y:3,  letter: "Z"},
    {x:11, y:4,  letter: "A"},
    {x:11, y:6,  letter: "U"},
    {x:12, y:10, letter: "U"},
    {x:12, y:11, letter: "T"},
    {x:12, y:4,  letter: "G"},
    {x:12, y:6,  letter: "K"},
    {x:12, y:12, letter: "E"},
    {x:13, y:11, letter: "O"},
    {x:13, y:4,  letter: "S"},
    {x:13, y:5,  letter: "H"},
    {x:13, y:6,  letter: "E"},
    {x:13, y:7,  letter: "D"},
    {x:14, y:10, letter: "I"},
    {x:14, y:11, letter: "N"},
    {x:14, y:12, letter: "C"},
    {x:14, y:13, letter: "E"},
    {x:14, y:8,  letter: "Q"},
    {x:14, y:9,  letter: "U"},
    {x:3,  y:10, letter: "W"},
    {x:3,  y:11, letter: "L"},
    {x:3,  y:7,  letter: "P"},
    {x:3,  y:8,  letter: "R"},
    {x:3,  y:9,  letter: "O"},
    {x:4,  y:10, letter: "H"},
    {x:4,  y:12, letter: "F"},
    {x:5,  y:10, letter: "O"},
    {x:5,  y:11, letter: "I"},
    {x:5,  y:12, letter: "L"},
    {x:5,  y:9,  letter: "T"},
    {x:6,  y:12, letter: "A"},
    {x:6,  y:9,  letter: "A"},
    {x:7,  y:10, letter: "M"},
    {x:7,  y:12, letter: "I"},
    {x:7,  y:13, letter: "N"},
    {x:7,  y:7,  letter: "G"},
    {x:7,  y:8,  letter: "R"},
    {x:7,  y:9,  letter: "I"},
    {x:8,  y:12, letter: "L"},
    {x:8,  y:13, letter: "A"},
    {x:8,  y:9,  letter: "L"},
    {x:9,  y:13, letter: "V"},
    {x:9,  y:9,  letter: "O"}
];

const init_rack = _.sample([
    "_AENSTT",
    "_DEEGST",
    "AABCDER",
    "EEINPTV",
    "EFINRRX",
    "EIJMOOY",
    "IINOOSU",
]);

const init_solutions = {
    "EIJMOOY": [
        {word: "JIMPY", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "JIMP", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "MYOPE", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "JOEY", position: {x: 2, y: 6}, direction: 1, others: ["OP","ER","YO"]},
        {word: "JOE", position: {x: 2, y: 6}, direction: 1, others: ["OP","ER"]},
        {word: "MOJO", position: {x: 2, y: 4}, direction: 1, others: ["OP"]},
        {word: "MOJO", position: {x: 8, y: 4}, direction: 1, others: ["GO"]},
        {word: "JEU", position: {x: 12, y: 9}, direction: 0, others: ["JUTE"]},
        {word: "MY", position: {x: 13, y: 13}, direction: 1, others: ["ME"]},
        {word: "JO", position: {x: 2, y: 6}, direction: 1, others: ["OP"]},
        {word: "YE", position: {x: 13, y: 13}, direction: 1, others: ["YE"]},
        {word: "JO", position: {x: 8, y: 6}, direction: 1, others: ["GO"]},
        {word: "YO", position: {x: 13, y: 13}, direction: 1, others: ["YE"]},
        {word: "JEE", position: {x: 9, y: 8}, direction: 0, others: ["JO"]},
        {word: "MAY", position: {x: 11, y: 10}, direction: 1, others: ["MU","AYE"]},
        {word: "KEY", position: {x: 12, y: 6}, direction: 1, others: ["ED"]},
        {word: "JOSHED", position: {x: 13, y: 2}, direction: 1, others: []},
        {word: "MOO", position: {x: 2, y: 6}, direction: 1, others: ["OP","OR"]},
        {word: "MO", position: {x: 13, y: 13}, direction: 1, others: ["ME"]},
        {word: "ME", position: {x: 13, y: 13}, direction: 1, others: ["ME"]},
        {word: "MI", position: {x: 13, y: 13}, direction: 1, others: ["ME"]},
        {word: "MOJO", position: {x: 0, y: 9}, direction: 0, others: []},
        {word: "ELM", position: {x: 8, y: 8}, direction: 1, others: ["RE","MM"]},
        {word: "JOE", position: {x: 2, y: 13}, direction: 0, others: ["FE"]},
        {word: "JOE", position: {x: 4, y: 5}, direction: 1, others: ["PE"]}
    ],
    "IINOOSU": [
        {word: "NOUS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "IONS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "ONUS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "NUS", position: {x: 12, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "UNS", position: {x: 12, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "ONS", position: {x: 12, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "INS", position: {x: 12, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "NOS", position: {x: 12, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "IS", position: {x: 13, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "OS", position: {x: 13, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "US", position: {x: 13, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "QUINCES", position: {x: 14, y: 8}, direction: 1, others: []},
        {word: "IONS", position: {x: 5, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "IONS", position: {x: 4, y: 14}, direction: 0, others: ["INS"]},
        {word: "ONUS", position: {x: 4, y: 14}, direction: 0, others: ["INS"]},
        {word: "UNS", position: {x: 6, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "ONS", position: {x: 6, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "NOUS", position: {x: 4, y: 14}, direction: 0, others: ["INS"]},
        {word: "SOON", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "INS", position: {x: 6, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "ONS", position: {x: 5, y: 14}, direction: 0, others: ["INS"]},
        {word: "SON", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "INS", position: {x: 5, y: 14}, direction: 0, others: ["INS"]},
        {word: "UNS", position: {x: 5, y: 14}, direction: 0, others: ["INS"]},
        {word: "SIN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
    ],
    "_AENSTT": [
        {word: "TANnEST", position: {x: 2, y: 14}, direction: 0, others: ["INS", "LAT"]},
        {word: "TAuTENS", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "rATTENS", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "bATTENS", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "pATTENS", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "NEATeST", position: {x: 2, y: 14}, direction: 0, others: ["INS", "LAT"]},
        {word: "TAnNEST", position: {x: 2, y: 14}, direction: 0, others: ["INS", "LAT"]},
        {word: "lATTENS", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "fATTENS", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAS"]},
        {word: "SExTANT", position: {x: 2, y: 14}, direction: 0, others: ["INN", "LAT"]},
        {word: "ATTENdS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "NoTATES", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "TENAnTS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "NuTATES", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "bATTENS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "NeATEST", position: {x: 2, y: 14}, direction: 0, others: ["INS", "LAT"]},
        {word: "NATTErS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "TETANuS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "ATTuNES", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "rATTENS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "lATTENS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "pATENTS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "lATENTS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "fATTENS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
        {word: "pATTENS", position: {x: 1, y: 14}, direction: 0, others: ["INS"]},
    ],
    "AABCDER": [
        {word: "CRAPED", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "CARPED", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "CRAPE", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "ABASHED", position: {x: 13, y: 1}, direction: 1, others: []},
        {word: "CRASHED", position: {x: 13, y: 1}, direction: 1, others: []},
        {word: "BREDE", position: {x: 6, y: 8}, direction: 0, others: ["BA", "EL", "DO"]},
        {word: "CRAG", position: {x: 12, y: 1}, direction: 1, others: ["ZA"]},
        {word: "BRAG", position: {x: 12, y: 1}, direction: 1, others: ["ZA"]},
        {word: "CRAP", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "DEASHED", position: {x: 13, y: 1}, direction: 1, others: []},
        {word: "CARP", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "BRAZA", position: {x: 8, y: 3}, direction: 0, others: ["AW", "AG"]},
        {word: "DRAPE", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "DRAG", position: {x: 12, y: 1}, direction: 1, others: ["ZA"]},
        {word: "BAG", position: {x: 12, y: 2}, direction: 1, others: ["ZA"]},
        {word: "BRACE", position: {x: 0, y: 13}, direction: 0, others: ["FE"]},
        {word: "ARCADE", position: {x: 4, y: 2}, direction: 1, others: ["PE"]},
        {word: "ABRADE", position: {x: 4, y: 2}, direction: 1, others: ["PE"]},
        {word: "BRACE", position: {x: 4, y: 3}, direction: 1, others: ["PE"]},
        {word: "BARDE", position: {x: 0, y: 13}, direction: 0, others: ["FE"]},
        {word: "DAG", position: {x: 12, y: 2}, direction: 1, others: ["ZA"]},
        {word: "CADRE", position: {x: 0, y: 13}, direction: 0, others: ["FE"]},
        {word: "BARDE", position: {x: 4, y: 3}, direction: 1, others: ["PE"]},
        {word: "CADRE", position: {x: 4, y: 3}, direction: 1, others: ["PE"]},
        {word: "BRAE", position: {x: 2, y: 13}, direction: 0, others: ["FA", "TOILE"]},
    ],
    "EEINPTV": [
        {word: "EVENT", position: {x: 4, y: 14}, direction: 0, others: ["INN", "LAT"]},
        {word: "VENT", position: {x: 5, y: 14}, direction: 0, others: ["INN", "LAT"]},
        {word: "EVEN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "PENT", position: {x: 5, y: 14}, direction: 0, others: ["INN", "LAT"]},
        {word: "VEIN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "PINT", position: {x: 5, y: 14}, direction: 0, others: ["INN", "LAT"]},
        {word: "PEIN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "PEEN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "VEEP", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "PRETEEN", position: {x: 6, y: 8}, direction: 0, others: ["PA", "EL", "TO"]},
        {word: "PEEP", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "PIN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "PEN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "TEPID", position: {x: 9, y: 7}, direction: 0, others: ["UP", "KI"]},
        {word: "TEEN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "EVITE", position: {x: 0, y: 13}, direction: 0, others: ["FE"]},
        {word: "INEPT", position: {x: 0, y: 7}, direction: 0, others: []},
        {word: "NIEVE", position: {x: 0, y: 13}, direction: 0, others: ["FE"]},
        {word: "NIEVE", position: {x: 4, y: 3}, direction: 1, others: ["PE"]},
        {word: "VEE", position: {x: 3, y: 13}, direction: 0, others: ["FE", "TOILE"]},
        {word: "EVITE", position: {x: 4, y: 3}, direction: 1, others: ["PE"]},
        {word: "PEE", position: {x: 3, y: 13}, direction: 0, others: ["FE", "TOILE"]},
        {word: "NEVE", position: {x: 1, y: 13}, direction: 0, others: ["FE"]},
        {word: "VINE", position: {x: 1, y: 13}, direction: 0, others: ["FE"]},
        {word: "NEVI", position: {x: 4, y: 4}, direction: 1, others: ["PI"]},
    ],
    "EFINRRX": [
        {word: "FERN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "FIRN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "FRESHED", position: {x: 13, y: 1}, direction: 1, others: []},
        {word: "NIXE", position: {x: 1, y: 13}, direction: 0, others: ["FE"]},
        {word: "FEN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "FIN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "NIXE", position: {x: 4, y: 4}, direction: 1, others: ["PE"]},
        {word: "KEX", position: {x: 12, y: 6}, direction: 1, others: ["ED"]},
        {word: "XU", position: {x: 13, y: 9}, direction: 0, others: []},
        {word: "MIX", position: {x: 7, y: 10}, direction: 0, others: ["LI", "OX"]},
        {word: "REIN", position: {x: 4, y: 14}, direction: 0, others: ["INN"]},
        {word: "FE", position: {x: 13, y: 13}, direction: 1, others: ["FE"]},
        {word: "EX", position: {x: 2, y: 11}, direction: 1, others: ["EL"]},
        {word: "FIRE", position: {x: 1, y: 13}, direction: 0, others: ["FE"]},
        {word: "RIFE", position: {x: 1, y: 13}, direction: 0, others: ["FE"]},
        {word: "AX", position: {x: 11, y: 11}, direction: 1, others: ["AXE"]},
        {word: "AXE", position: {x: 10, y: 12}, direction: 0, others: ["AX"]},
        {word: "FINE", position: {x: 1, y: 13}, direction: 0, others: ["FE"]},
        {word: "FOX", position: {x: 9, y: 8}, direction: 1, others: ["FE"]},
        {word: "FINE", position: {x: 4, y: 4}, direction: 1, others: ["PE"]},
        {word: "FIRE", position: {x: 4, y: 4}, direction: 1, others: ["PE"]},
        {word: "RIN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "RIFE", position: {x: 4, y: 4}, direction: 1, others: ["PE"]},
        {word: "ERN", position: {x: 5, y: 14}, direction: 0, others: ["INN"]},
        {word: "KEF", position: {x: 12, y: 6}, direction: 1, others: ["ED"]},
    ],
    "_DEEGST": [
        {word: "EDGiEST", position: {x: 2, y: 14}, direction: 0, others: ["INS", "LAT"]},
        {word: "sEEDS", position: {x: 10, y: 14}, direction: 0, others: ["BAYs", "QUINCES"]},
        {word: "SEEDs", position: {x: 10, y: 14}, direction: 0, others: ["BAYS", "QUINCEs"]},
        {word: "GEDS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DiGS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GETS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DuGS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DaGS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DEES", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GeDS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GaDS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GEES", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GiDS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GoDS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DoGS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "TEDS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GEtS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DEnS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DEyS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DeES", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "DEeS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GaES", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GoES", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
        {word: "GEDs", position: {x: 11, y: 14}, direction: 0, others: ["QUINCEs"]},
        {word: "GEdS", position: {x: 11, y: 14}, direction: 0, others: ["QUINCES"]},
    ]
}


$(document).ready(function() {
    init_board.forEach(function(item) {
        $(`.board .board-tile[data-x=${item.x}][data-y=${item.y}]`)
            .attr("data-letter", item.letter)
            .find("input")
            .val(item.letter);
    });

    var i = 0;
    _.shuffle(_.toArray(init_rack)).forEach(function(letter) {
        if (letter === "_") {
            letter = " ";
        }

        $(`.rack .rack-tile[data-i=${i}]`)
            .attr('data-letter', letter)
            .find('input')
            .val(letter);

        i += 1;
    });

    init_solutions[init_rack].forEach(function(solution) {
        $("<li>", {
            "data-x": solution.position.x,
            "data-y": solution.position.y,
            "data-direction": solution.direction,
            "data-word": solution.word
        }).html([
            $("<div>", {"class": "word"}).text(solution.word),
            $("<div>", {"class": "points"}).text("xx Points"),
            $("<div>", {"class": "others"}).text(solution.others),
        ]).appendTo(".solutions ul");
    });
});



// <li data-start-x="" data-start-y="" data-orientation="" data-word="JOE">
//     <div class="word">JOE</div>
//     <div class="points">14 Points (11.08 Value)</div>
//     <div class="others">Also makes: PE
// </li>  