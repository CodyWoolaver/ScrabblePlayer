from pyramid.view import view_config

from scrabble_player.utils.scrabble import Board, Rack

BOARD_ROWS = 15
BOARD_COLS = 15
BOARD_CONFIGURATION = (  # Scrabble
    "1--2---1---2--1"
    "-3---4---4---3-"
    "--3---2-2---3--"
    "2--3---2---3---"
    "----3-----3----"
    "-4---4---4---4-"
    "--2---2-2---2--"
    "1--2---5---2--1"
    "--2---2-2---2--"
    "-4---4---4---4-"
    "----3-----3----"
    "2--3---2---3---"
    "--3---2-2---3--"
    "-3---4---4---3-"
    "1--2---1---2--1"
)
# BOARD_CONFIGURATION = (  # Words With Friends
#     "---1--4-4--1---"
#     "--2--3---3--2--"
#     "-2--2-----2--2-"
#     "1--4---3---4--1"
#     "--2---2-2---2--"
#     "-3---4---4---3-"
#     "4---2-----2---4"
#     "---3---5---3---"
#     "4---2-----2---4"
#     "-3---4---4---3-"
#     "--2---2-2---2--"
#     "1--4---3---4--1"
#     "-2--2-----2--2-"
#     "--2--3---3--2--"
#     "---1--4-4--1---"
# )

# - DefaultTile
# 1 TrippleWord
# 2 DoubleLetter
# 3 DoubleWord
# 4 TrippleLetter
# 5 Center


@view_config(route_name='home', renderer='../templates/home.jinja2')
def home(request):
    return {
        'board': BOARD_CONFIGURATION,
        'board_rows': BOARD_ROWS,
        'board_cols': BOARD_COLS,
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
