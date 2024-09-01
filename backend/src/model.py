from typing import TypedDict


class Game(TypedDict):
    gameIndex: int
    isWin: bool
    numberOfCards: int


class User(TypedDict):
    name: str
    score: int
    recentGamesPlayed: list[Game]
