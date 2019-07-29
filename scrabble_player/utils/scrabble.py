from colorama import Fore, Back, Style


class Board(object):
    def __init__(self, board):
        self.board = board

    def __str__(self):
        out = ""
        for row in self.board:
            for col in row:
                if col == "":
                    out += f"{Back.WHITE} {Style.RESET_ALL}"
                else:
                    out += f"{Back.GREEN}{Fore.BLACK}{col}{Style.RESET_ALL}"
            out += "\n"
        return out


class Rack(object):
    def __init__(self, rack):
        self.rack = rack
