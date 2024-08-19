type SetNavState = (user: string | null, playing?: boolean) => void
type Page = 'home' | 'start-page' | 'game-page'
type Color = 'red' | 'green' | 'blue'
type Shape = 'square' | 'triangle' | 'circle'

export type { Color, Page, SetNavState, Shape }
