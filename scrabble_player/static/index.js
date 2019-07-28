import "./main.scss";

const $ = require("jquery");
const _ = require("underscore");

$(document).ready(function() {
    var LAST_DIRECTION = "selected-right";

    $(".board").on("click", ".board-tile", function(e) {
        var $el = $(e.target);
        $(".board .board-tile.selected").removeClass("selected");
        $el.addClass("selected");
        $el.find("input").focus();
    });

    $(".board").on("focus", ".board-tile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();
        $parent.addClass("selected").addClass(LAST_DIRECTION);
        e.target.setSelectionRange(0, 1);
    });

    $(".board").on("focusout", ".board-tile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();

        $parent.removeClass("selected selected-down selected-right");
    });

    $(".board").on("keyup", ".board-tile > input", function(e) {
        var code = e.code,
            keyCode = e.keyCode,
            $el = $(e.target),
            $parent = $el.parent(),
            x = $parent.data("x"),
            y = $parent.data("y"),
            isLetter = keyCode >= 65 && keyCode <= 91,
            isRemoval = keyCode === 8 || keyCode === 46,  // Backspace + Delete
            value = $el.val(),
            $nextTile;

        if (isLetter) { // A-Z
            value = e.key.toUpperCase();
            $el.val(value);
            $(".board .board-tile.suggestion").removeAttr("data-letter").removeClass("suggestion");
        }

        if (
            !isLetter && // A-Z
            (keyCode < 37 || keyCode > 40) && // Arrow Keys
            (keyCode != 32) && // SpaceBar
            !isRemoval // Backspace + Delete
        ) {
            $el.val("");
            return;
        }

        if (code === "ArrowDown" && $parent.hasClass("selected-right")) {
            $parent.removeClass("selected-right").addClass("selected-down");
            LAST_DIRECTION = "selected-down";
            return;
        } else if (code === "ArrowRight" && $parent.hasClass("selected-down")) {
            $parent.removeClass("selected-down").addClass("selected-right");
            LAST_DIRECTION = "selected-right";
            return;
        } else if (code === "ArrowUp") {
            $nextTile = $(`.board .board-tile[data-x=${x}][data-y=${y - 1}]`);
        } else if (code === "ArrowLeft" || code === "Backspace") {
            $nextTile = $(`.board .board-tile[data-x=${x - 1}][data-y=${y}]`);
        } else if (code === "ArrowRight" || $parent.hasClass("selected-right")) {
            $nextTile = $(`.board .board-tile[data-x=${x + 1}][data-y=${y}]`);
        } else if (code === "ArrowDown" || $parent.hasClass("selected-down")) {
            $nextTile = $(`.board .board-tile[data-x=${x}][data-y=${y + 1}]`);
        }

        $parent.removeClass("selected selected-down selected-right")

        if (isLetter && !!value) {
            $parent.attr("data-letter", value);
        } else if (isRemoval) {
            $parent.removeAttr("data-letter");
            if ($parent.hasClass("suggestion")) {
                $(".board .board-tile.suggestion").removeAttr("data-letter").removeClass("suggestion");
            }
        }

        if ($nextTile) {
            $parent.removeClass("selected selected-right selected-down")
            $nextTile.addClass("selected").addClass(LAST_DIRECTION);
            $nextTile.find("input").focus();
        }
    });

    $(".rack").on("click", function(e) {
        var $nextTile = $(".rack-tile:not([data-letter])").eq(0);

        $(".rack .rack-tile.input-visible").removeClass("input-visible");
        $(".board .board-tile.input-visible").removeClass("input-visible");

        $nextTile.addClass("input-visible").find("input").focus();
    });

    $(".rack").on("click", ".rack-tile", function(e) {
        var $el = $(e.target);

        $(".rack .rack-tile.input-visible").removeClass("input-visible");
        $(".board .board-tile.input-visible").removeClass("input-visible");

        $el.addClass("input-visible").find("input").focus();
        e.stopPropagation();
    });

    $(".rack").on("focus", ".rack-tile > input", function(e) {
        e.target.setSelectionRange(0, 1)
    });


    $(".rack").on("focusout", ".rack-tile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();

        $parent.removeClass("input-visible");
    });

    $(".rack").on("keyup", ".rack-tile > input", function(e) {
        var code = e.code,
            keyCode = e.keyCode,
            $el = $(e.target),
            $parent = $el.parent(),
            i = $parent.data("i"),
            isLetter = keyCode >= 65 && keyCode <= 91,
            isRemoval = keyCode === 8 || keyCode === 46,  // Backspace + Delete
            value = $el.val(),
            $nextTile;

        if (isLetter) { // A-Z
            value = e.key.toUpperCase();
            $el.val(value);
            $(".board .board-tile.suggestion").removeAttr("data-letter").removeClass("suggestion");
        }

        if (
            !isLetter && // A-Z
            (keyCode < 37 || keyCode > 40) && // Arrow Keys
            (keyCode != 32) && // SpaceBar
            !isRemoval // Backspace + Delete
        ) {
            $el.val("");
            return;
        }

        if (code === "ArrowUp" || code === "ArrowDown") {
            return;
        } else if (code === "ArrowLeft") {
            $nextTile = $parent.prev();
        } else if (code === "ArrowRight") {
            $nextTile = $parent.next();
        } else if (code === "Delete") {
            $nextTile = $(`.rack .rack-tile[data-i=${i}]`);
        } else if (code === "Backspace") {
            if (i === 0) {
                $nextTile = $(".rack .rack-tile[data-i=0]");
            } else {
                $nextTile = $(`.rack .rack-tile[data-i=${i - 1}]`);
            }
        } else {
            $nextTile = $(`.rack .rack-tile[data-i=${i + 1}]`);
        }

        $parent.removeClass("input-visible")
        if (isLetter && !!value) {
            $parent.attr("data-letter", value);
        } else if (isRemoval) {
            $parent.removeAttr("data-letter");
        }

        $nextTile.addClass("input-visible");
        $nextTile.find("input").focus();

        $(".rack .rack-tile").each(function(){
            var $el = $(this),
                $nextTile = $el;

            if (!$el.attr("data-letter")) {
                while (($nextTile = $nextTile.next()).length !== 0) {
                    var attr = $nextTile.attr('data-letter');

                    if (attr) {
                        $el.attr('data-letter', attr).find("input").val(attr);
                        $nextTile.removeAttr('data-letter').find('input').val("");
                        break;
                    }
                }
            }
        })
    });

    $("#submit").on("click", function(e) {
        var rows = parseInt($("#board-rows").val(), 10),
            cols = parseInt($("#board-cols").val(), 10),
            board = new Array(rows).fill(null).map(function () {
                return new Array(cols).fill(null);
            }),
            rack = new Array();

        $(".board .board-tile").each(function() {
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

        $(".rack .rack-tile").each(function() {
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

    $(".solutions").on("click", "li", function(e) {
        var $el = $(e.target).closest("li"),
            word = $el.data("word"),
            x = $el.data("x"),
            y = $el.data("y"),
            direction = $el.data("direction");

        $(".board .board-tile.suggestion").removeAttr("data-letter").removeClass("suggestion");

        $(".solutions li.active").removeClass("active");
        $el.addClass("active");

        _.toArray(word).forEach(function(letter) {
            var $tile = $(`.board .board-tile[data-x=${x}][data-y=${y}]`);

            if (direction === 0) {
                x += 1;
            } else {
                y += 1;
            }

            if (!$tile.attr("data-letter")) {
                $tile.attr("data-letter", letter).addClass("suggestion");
            }
        })

    });
});

// Used to initialize data so we don"t need to type it out every time
import "./test_data";