type SetNavState = (user: string | null) => void
type Page = 'home' | 'start-page'
type Color = 'red' | 'green' | 'blue'
type Shape = 'square' | 'triangle' | 'circle'
interface CardData {
    color: Color
    shape: Shape
}

export type { CardData, Color, Page, SetNavState, Shape }
