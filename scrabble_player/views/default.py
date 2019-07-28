from pyramid.view import view_config

from scrabble_player.utils.scrabble import Board, Rack
from scrabble_player.utils.board_configurations import DATA as board_data

BOARD_NAME = "Scrabble"
RACK_SIZE = 7

@view_config(route_name='home', renderer='../templates/home.jinja2')
def home(request):

    return {
        'rack_size': RACK_SIZE,
        'board': board_data[BOARD_NAME][2],
        'board_rows': board_data[BOARD_NAME][0],
        'board_cols': board_data[BOARD_NAME][1],
    }


@view_config(route_name='process', renderer='json')
def process(request):
    board = request.json['board']
    rack = request.json['rack']

    rack = Rack(rack)

    standard_board = Board(board)
    rotated_board = Board(zip(*[row for row in board]))

    print(standard_board)
    print(rotated_board)

    return {}
