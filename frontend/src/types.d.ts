type SetNavState = (page: Page, userName?: string | null) => void
type Page = 'home' | 'start-page' | 'settings-page'
type Color = 'red' | 'green' | 'blue'
type Shape = 'square' | 'triangle' | 'circle'
interface CardData {
    color: Color
    shape: Shape
}
interface User {
    readonly name: string
    readonly score: number
}
interface Game {
    gameIndex: number
    isWin: boolean
}

export type { CardData, Color, Game, Page, SetNavState, Shape, User }
