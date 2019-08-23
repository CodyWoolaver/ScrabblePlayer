import "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const $ = require("jquery");
const _ = require("underscore");

const organizeTileRack = function() {
    $(".rack .rackTile").each(function(){
        var $el = $(this),
            $nextTile = $el;

        if (!$el.attr("data-letter")) {
            while (($nextTile = $nextTile.next()).length !== 0) {
                var attr = $nextTile.attr("data-letter");

                if (attr) {
                    $el.attr("data-letter", attr).find("input").val(attr);
                    $nextTile.removeAttr("data-letter").find("input").val("");
                    break;
                }
            }
        }
    });
};

const removeSuggestion = function() {
    $(".board .boardTile.suggestion").removeAttr("data-letter").removeClass("suggestion");
    $(".suggestions .active").removeClass("active");
    $("#applySuggestion").addClass("disabled");
};

$(document).ready(function() {
    var LAST_DIRECTION = "selectedRight";

    $("#confirmCleanSubmit").on("click", function() {
        $(".board .boardTile")
            .removeAttr("data-letter")
            .removeClass("suggestion selected selectedRight selectedDown")
            .find("input")
            .val("");

        $(".rack .rackTile")
            .removeAttr("data-letter")
            .removeClass("inputVisible")
            .find("input")
            .val("");

        $(".suggestions ul").empty();
        $("#applySuggestion").addClass("disabled");
    });

    $(".board").on("click", ".boardTile", function(e) {
        var $el = $(e.target);
        $(".board .boardTile.selected").removeClass("selected");
        $el.addClass("selected");
        $el.find("input").focus();
    });

    $(".board").on("focus", ".boardTile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();
        $parent.addClass("selected").addClass(LAST_DIRECTION);
        e.target.setSelectionRange(0, 1);
    });

    $(".board").on("focusout", ".boardTile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();

        $parent.removeClass("selected selectedDown selectedRight");
    });

    $(".board").on("keydown", ".boardTile > input", function(e) {
        e.preventDefault();
    });

    $(".board").on("keyup", ".boardTile > input", function(e) {
        var code = e.code,
            key = e.key,
            keyCode = e.keyCode,
            $el = $(e.target),
            $parent = $el.parent(),
            x = $parent.data("x"),
            y = $parent.data("y"),
            isSpacebar = keyCode === 32,
            isLetter = (key.length === 1 && keyCode >= 65 && keyCode <= 91) || isSpacebar,
            isRemoval = keyCode === 8 || keyCode === 46,  // Backspace + Delete
            value = $el.val(),
            $nextTile;

        if (isLetter) { // A-Z
            value = key.toUpperCase();
            $el.val(value);
            removeSuggestion();
            $(".suggestions ul").empty();
        }

        if (isRemoval && $parent.attr("data-letter")) {
            if (!$parent.hasClass("suggestion")) {
                $(".suggestions ul").empty();
            }
            removeSuggestion();
        }

        if (
            !isLetter && // A-Z
            (keyCode < 37 || keyCode > 40) && // Arrow Keys
            !isRemoval // Backspace + Delete
        ) {
            if (key.length === 1) {
                $el.val("");
                $parent.removeAttr("data-letter");
            }
            return;
        }

        if (code === "ArrowDown" && $parent.hasClass("selectedRight")) {
            $parent.removeClass("selectedRight").addClass("selectedDown");
            LAST_DIRECTION = "selectedDown";
            return;
        } else if (code === "ArrowRight" && $parent.hasClass("selectedDown")) {
            $parent.removeClass("selectedDown").addClass("selectedRight");
            LAST_DIRECTION = "selectedRight";
            return;
        } else if (code === "ArrowUp" || (code === "Backspace" && $parent.hasClass("selectedDown"))) {
            $nextTile = $(`.board .boardTile[data-x=${x}][data-y=${y - 1}]`);
        } else if (code === "ArrowLeft" || (code === "Backspace" && $parent.hasClass("selectedRight"))) {
            $nextTile = $(`.board .boardTile[data-x=${x - 1}][data-y=${y}]`);
        } else if (code === "ArrowRight" || $parent.hasClass("selectedRight")) {
            $nextTile = $(`.board .boardTile[data-x=${x + 1}][data-y=${y}]`);
        } else if (code === "ArrowDown" || $parent.hasClass("selectedDown")) {
            $nextTile = $(`.board .boardTile[data-x=${x}][data-y=${y + 1}]`);
        }

        $parent.removeClass("selected selectedDown selectedRight");

        if (isLetter && !!value) {
            if (e.shiftKey) {
                $parent.attr("data-letter", value.toLowerCase());
            } else {
                $parent.attr("data-letter", value);
            }
        } else if (isRemoval) {
            $parent.removeAttr("data-letter");
            $el.val("");

            if ($parent.hasClass("suggestion")) {
                removeSuggestion();
            }
        }

        if ($nextTile) {
            $parent.removeClass("selected selectedRight selectedDown");
            $nextTile.addClass("selected").addClass(LAST_DIRECTION);
            $nextTile.find("input").focus();
        }
    });

    $(".rack").on("click", function() {
        var $nextTile = $(".rackTile:not([data-letter])").eq(0);

        if ($nextTile.length === 0) {
            $nextTile = $(".rackTile:last-child");
        }

        $(".rack .rackTile.inputVisible").removeClass("inputVisible");
        $(".board .boardTile.inputVisible").removeClass("inputVisible");

        $nextTile.addClass("inputVisible").find("input").focus();
    });

    $(".rack").on("click", ".rackTile", function(e) {
        var $el = $(e.target);

        if (!$el.attr("data-letter")) {
            $el = $(".rackTile:not([data-letter])").eq(0);
        }

        $(".rack .rackTile.inputVisible").removeClass("inputVisible");
        $(".board .boardTile.inputVisible").removeClass("inputVisible");

        $el.addClass("inputVisible").find("input").focus();
        e.stopPropagation();
    });

    $(".rack").on("focus", ".rackTile > input", function(e) {
        e.target.setSelectionRange(0, 1);
    });

    $(".rack").on("focusout", ".rackTile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();

        $parent.removeClass("inputVisible");
    });

    $(".rack").on("keydown", ".rackTile > input", function(e) {
        e.preventDefault();
    });

    $(".rack").on("keyup", ".rackTile > input", function(e) {
        var code = e.code,
            key = e.key,
            keyCode = e.keyCode,
            $el = $(e.target),
            $parent = $el.parent(),
            i = $parent.data("i"),
            isSpacebar = keyCode === 32,
            isLetter = (key.length === 1 && keyCode >= 65 && keyCode <= 91) || isSpacebar,
            isRemoval = keyCode === 8 || keyCode === 46,  // Backspace + Delete
            value = $el.val(),
            $nextTile;

        if (isLetter) { // A-Z
            value = key.toUpperCase();
            $el.val(value);
            $(".board .boardTile.suggestion").removeAttr("data-letter").removeClass("suggestion");
        }

        if (
            !isLetter && // A-Z
            (keyCode < 37 || keyCode > 40) && // Arrow Keys
            !isRemoval // Backspace + Delete
        ) {
            if (key.length === 1) {
                $el.val("");
                $parent.removeAttr("data-letter");
            }
            return;
        }

        if (code === "ArrowUp" || code === "ArrowDown") {
            return;
        } else if (code === "ArrowLeft") {
            $nextTile = $parent.prev();
        } else if (code === "ArrowRight") {
            if (!$parent.attr('data-letter')) {
                return;
            }
            $nextTile = $parent.next();
        } else if (code === "Delete") {
            $nextTile = $(`.rack .rackTile[data-i=${i}]`);
        } else if (code === "Backspace") {
            if (i === 0) {
                $nextTile = $(".rack .rackTile[data-i=0]");
            } else {
                $nextTile = $(`.rack .rackTile[data-i=${i - 1}]`);
            }
        } else {
            $nextTile = $(`.rack .rackTile[data-i=${i + 1}]`);
        }

        if (!isLetter && $nextTile.length === 0) {
            return;
        }

        $parent.removeClass("inputVisible");
        if (isLetter && !!value) {
            $parent.attr("data-letter", value);
        } else if (isRemoval) {
            $parent.removeAttr("data-letter");
            $el.val("");
        }

        if (isLetter || isRemoval) {
            $(".suggestions ul").empty();
            $("#applySuggestion").addClass("disabled");
        }

        $nextTile.addClass("inputVisible");
        $nextTile.find("input").focus();

        organizeTileRack();
    });

    $("#submit").on("click", function() {
        var rows = parseInt($("#boardRows").val(), 10),
            cols = parseInt($("#boardCols").val(), 10),
            board = new Array(rows).fill(null).map(function() {
                return new Array(cols).fill(null);
            }),
            rack = new Array();

        $(".board .boardTile").each(function() {
            var $el = $(this),
                x = $el.data("x"),
                y = $el.data("y"),
                char = $el.attr("data-letter");

            if (!char) {
                char = "";
            } else if (/^[_ ]$/.test(char)) {
                char = "_";
            }

            board[y][x] = char;
        });

        $(".rack .rackTile").each(function() {
            var $el = $(this),
                char = $el.attr("data-letter");

            if (!char) {
                return;
            } else if (char === " ") {
                char = "_";
            }

            rack.push(char);
        });

        $.ajax({
            contentType: "application/json",
            data: JSON.stringify({board, rack}),
            dataType: "json",
            timeout: 0,
            type: "POST",
            url: "/process/"
        }).done(function() {
            console.log("ajax request: success");
        })
        .fail(function() {
            console.log("ajax request: error");
        })
        .always(function() {
            console.log("ajax request: complete");
        });
        console.log(board);
        console.log(rack);
    });

    $(".suggestions").on("click", "li", function(e) {
        var $el = $(e.target).closest("li"),
            word = $el.data("word"),
            x = $el.data("x"),
            y = $el.data("y"),
            direction = $el.data("direction"),
            isActive = $el.hasClass("active");

        $(".board .boardTile.suggestion").removeAttr("data-letter").removeClass("suggestion");
        $(".suggestions li.active").removeClass("active");

        if (isActive) {
            $("#applySuggestion").addClass("disabled");
            return;
        }

        $el.addClass("active");
        $("#applySuggestion").removeClass("disabled");

        _.toArray(word).forEach(function(letter) {
            var $tile = $(`.board .boardTile[data-x=${x}][data-y=${y}]`);

            if (direction === 0) {
                x += 1;
            } else {
                y += 1;
            }

            if (!$tile.attr("data-letter")) {
                $tile.attr("data-letter", letter).addClass("suggestion");
            }
        });
    });

    $("#applySuggestion").on("click", function(e) {
        var $el = $(e.target);

        if ($el.hasClass("disabled")) {
            return;
        }

        $(".board .boardTile.suggestion").each(function() {
            var $el = $(this),
                letter = $el.data("letter"),
                $rackLetter = $(`.rack .rackTile[data-letter=${letter}]`);

            if ($rackLetter.length === 0) {
                $rackLetter = $(".rack .rackTile[data-letter=' ']");
            }

            $el.removeClass("suggestion").find("input").val(letter);
            $rackLetter.eq(0).removeAttr("data-letter").find("input").val("");
        });

        organizeTileRack();
        $(".suggestions ul").empty();
        $("#applySuggestion").addClass("disabled");
    });
});

// Used to initialize data so we don"t need to type it out every time
import "./test_data";
