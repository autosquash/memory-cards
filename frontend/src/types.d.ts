type SetNavState = (page: Page, user?: string | null) => void
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

export type { CardData, Color, Page, SetNavState, Shape, User }
