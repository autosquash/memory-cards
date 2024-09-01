type SetNavState = (page: Page, userName?: string | null) => void
type Page = 'home' | 'start-page' | 'settings-page'
type Color = 'red' | 'green' | 'blue'
type Shape = 'square' | 'triangle' | 'circle'
interface CardData {
    color: Color
    shape: Shape
}
interface BackendUser {
    readonly name: string
    readonly score: number
    readonly recentGamesPlayed: ReadonlyArray<Game>
}
interface User {
    readonly name: string
    readonly score: number
    readonly recentGamesPlayed: ReadonlyArray<Game>
}
interface Game {
    gameIndex: number
    isWin: boolean
    numberOfCards: number
}

export type {
    BackendUser,
    CardData,
    Color,
    Game,
    Page,
    SetNavState,
    Shape,
    User,
}
