import "./main.scss";
const $ = require("jquery");



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

    $(".rack").on("focus", ".rack-tile > input", function(e) {
        e.target.setSelectionRange(0, 1)
    });

    $(".board").on("focusout", ".board-tile > input", function(e) {
        var $el = $(e.target),
            $parent = $el.parent();

        $parent.removeClass("selected selected-down selected-right");
    });

    $(".board").on("keyup", ".board-tile > input", function(e) {
        var keyCode = e.code,
            $el = $(e.target),
            $parent = $el.parent(),
            x = $parent.data("x"),
            y = $parent.data("y"),
            value = $el.val().toUpperCase(),
            $nextTile;

        if (!(/^[a-z_ ]/gi.test(e.key))) {
            console.log("invalid entry: ", value);
            $el.val("");
            return;
        } else if (value === "_") {
            value = " ";
        }
        $el.val(value);

        if (keyCode === "ArrowDown" && $parent.hasClass("selected-right")) {
            $parent.removeClass("selected-right").addClass("selected-down");
            LAST_DIRECTION = "selected-down";
            return;
        } else if (keyCode === "ArrowRight" && $parent.hasClass("selected-down")) {
            $parent.removeClass("selected-down").addClass("selected-right");
            LAST_DIRECTION = "selected-right";
            return;
        } else if (keyCode === "ArrowUp") {
            $nextTile = $(`.board .board-tile[data-x=${x}][data-y=${y - 1}]`);
        } else if (keyCode === "ArrowLeft" || keyCode === "Backspace") {
            $nextTile = $(`.board .board-tile[data-x=${x - 1}][data-y=${y}]`);
        } else if (keyCode === "ArrowRight" || $parent.hasClass("selected-right")) {
            $nextTile = $(`.board .board-tile[data-x=${x + 1}][data-y=${y}]`);
        } else if (keyCode === "ArrowDown" || $parent.hasClass("selected-down")) {
            $nextTile = $(`.board .board-tile[data-x=${x}][data-y=${y + 1}]`);
        }

        $parent.removeClass("selected selected-down selected-right")
        if (!!value) {
            $parent.attr("data-letter", value);
        } else {
            $parent.removeAttr("data-letter");
        }

        if ($nextTile) {
            $parent.removeClass("selected selected-right selected-down")
            $nextTile.addClass("selected").addClass(LAST_DIRECTION);
            $nextTile.find("input").focus();
        }
    });


    $(".rack").on("click", function(e) {
        var $nextTile = $(".rack-tile:last-child:not([data-letter])");
        $(".board .board-tile.input-visible").removeClass("input-visible");
        if ($nextTile.length === 0 && $(".rack .rack-tile").length < 12) {
            $nextTile = $("<span>", {'class': 'rack-tile'}).html($("<input>", {"maxlength": 1, "type": "text"}));
            $nextTile.appendTo(".rack")
        }
        $nextTile.addClass('input-visible').find("input").focus();
    });

    $(".rack").on("click", ".rack-tile", function(e) {
        var $el = $(e.target);
        $(".rack .rack-tile.input-visible").removeClass("input-visible");
        $el.addClass("input-visible").find("input").focus();
        e.stopPropagation();
    });

    $(".rack").on("keyup focusout", ".rack-tile > input", function(e) {
        var keyCode = e.code,
            $el = $(e.target),
            $parent = $el.parent(),
            value = $el.val(),
            $nextTile;

        if (value && !(/^[a-z_ ]/gi.test(value))) {
            console.log("invalid entry: ", value);
            $el.val("");
            return;
        }

        if (keyCode === "ArrowLeft") {
            $nextTile = $parent.prev();
        } else if (keyCode === "ArrowRight") {
            $nextTile = $parent.next();
        } else if (keyCode === "ArrowDown" || keyCode === "ArrowUp") {
            return;
        } else if (keyCode === "Backspace") {
            if ($(".rack .rack-tile").length === 1) {
                return;
            }

            $nextTile = $parent.prev();
            if ($nextTile.length === 0) {
                $nextTile = $parent.next();
            }

            $parent.remove();
            $nextTile.addClass("input-visible");
            $nextTile.find("input").focus();
            return;
        }

        $parent.removeClass("input-visible")
        if (!!value) {
            $parent.attr("data-letter", value);
        } else {
            $parent.removeAttr("data-letter");
        }

        if (e.type === "focusout") {
            if ($(".rack .rack-tile").length === 1) {
                return;
            }

            if (!e.originalEvent.relatedTarget) {
                $parent.remove();
            }
            return;
        }

        if (!$nextTile && $(".rack .rack-tile").length < 12) {
            $nextTile = $("<span>", {'class': 'rack-tile'}).html($("<input>", {"maxlength": 1, "type": "text"}));
            $nextTile.appendTo(".rack");
        } else if ((keyCode === "ArrowLeft" || keyCode === "ArrowRight") && value === '') {
            $parent.remove();
        }

        $nextTile.addClass("input-visible");
        $nextTile.find("input").focus();
    });

    $("#submit").on('click', function(e) {
        var rows = parseInt($('#board-rows').val(), 10),
            cols = parseInt($('#board-cols').val(), 10),
            board = new Array(rows).fill(null).map(function () {
                return new Array(cols).fill(null);
            }),
            rack = new Array();

        $(".board .board-tile").each(function() {
            var $el = $(this),
                x = $el.data('x'),
                y = $el.data('y'),
                char = $el.attr('data-letter');

            if (!char) {
                char = "";
            } else if (/^[_ ]$/.test(char)) {
                char = "_";
            }

            board[y][x] = char;
        });

        $(".rack .rack-tile").each(function() {
            var $el = $(this),
                char = $el.attr('data-letter');

            if (!char) {
                return;
            } else if (/^[_ ]$/.test(char)) {
                char = "_";
            }

            rack.push(char);
        });

        $.ajax({
            contentType: 'application/json',
            data: JSON.stringify({board, rack}),
            dataType: 'json',
            timeout: 0,
            type: 'POST',
            url: '/process/'
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
});

// Used to initialize data so we don't need to type it out every time
import "./test_data";