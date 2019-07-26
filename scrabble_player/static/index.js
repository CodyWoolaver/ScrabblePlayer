import "./main.scss";
const $ = require("jquery");

$(document).ready(function() {
    var AUTO_MOVE = false,
        AUTO_MOVE_DIRECTION = null;

    $(".board").on("click", ".board-tile", function(e) {
        var $el = $(e.target);
        $(".board .board-tile.input-open").removeClass("input-open");
        $el.addClass("input-open");
        $el.find("input").focus();
    });

    $(".board").on("focus", ".board-tile > input", function(e) {
        e.target.setSelectionRange(0, 1)
    });

    $(".board").on("keyup focusout", ".board-tile > input", function(e) {
        var keyCode = e.code,
            $el = $(e.target),
            $parent = $el.parent(),
            x = $parent.data("x"),
            y = $parent.data("y"),
            value = $el.val(),
            $nextTile;
        
        if (value && !(/^[a-z_ ]/gi.test(value))) {
            console.log("invalid entry: ", value);
            $el.val("");
            return;
        }

        if (keyCode === "ArrowDown") {
            $nextTile = $(`.board .board-tile[data-x=${x}][data-y=${y + 1}]`);
        } else if (keyCode === "ArrowUp") {
            $nextTile = $(`.board .board-tile[data-x=${x}][data-y=${y - 1}]`);
        } else if (keyCode === "ArrowRight") {
            $nextTile = $(`.board .board-tile[data-x=${x + 1}][data-y=${y}]`);
        } else if (keyCode === "ArrowLeft") {
            $nextTile = $(`.board .board-tile[data-x=${x - 1}][data-y=${y}]`);
        } else if (e.type === "keyup") {
            return;
        }

        $parent.removeClass("input-open")
        if (!!value) {
            $parent.attr("data-letter", value);
        } else {
            $parent.removeAttr("data-letter");
        }

        if ($nextTile) {
            $nextTile.addClass("input-open");
            $nextTile.find("input").focus();
        }
    });

    $("#submit").on('click', function(e) {
        var rows = parseInt($('#board-rows').val(), 10),
            cols = parseInt($('#board-cols').val(), 10),
            board = new Array(rows).fill(null).map(function () {
                return new Array(cols).fill(null);
            });

        $(".board .board-tile").each(function() {
            var $el = $(this),
                x = $el.data('x'),
                y = $el.data('y'),
                char = $el.data('letter');

            if (!char) {
                char = "";
            } else if (/^[_ ]$/.test(char)) {
                char = "_";
            }

            board[y][x] = char;
        });

        console.log(board);
    });
});
