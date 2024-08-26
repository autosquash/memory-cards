import { CardData, Color, Shape } from './types'
import { check } from './utils'
const colors: Color[] = ['red', 'green', 'blue']
const shapes: Shape[] = ['square', 'triangle', 'circle']

const numberOfCardsToGuess = 2

const reprCardData = (cardData: CardData) => {
    return cardData.color + ' ' + cardData.shape
}

const buildCardsData = () => {
    const cardsData: CardData[] = []
    for (const color of colors) {
        for (const shape of shapes) {
            cardsData.push({ color, shape })
        }
    }
    return cardsData
}

const cardsData: ReadonlyArray<CardData> = buildCardsData()

const createCard = (shape: Shape, color: Color): CardData => ({
    color,
    shape,
})

const equalCards = (card1: CardData, card2: CardData): boolean => {
    return card1.color === card2.color && card1.shape === card2.shape
}

const createRandomSequence = (n: number): CardData[] => {
    const generatedSequence: CardData[] = []
    while (generatedSequence.length < n) {
        const newCardData =
            cardsData[Math.floor(Math.random() * cardsData.length)]
        if (generatedSequence.length) {
            // Don't add it if it's equal to the last one
            const last = generatedSequence.at(-1)
            check(last)
            if (equalCards(newCardData, last)) {
                continue
            }
        }
        generatedSequence.push(newCardData)
    }
    return generatedSequence
}

const getResult = (
    sequence: ReadonlyArray<CardData>,
    userSequence: ReadonlyArray<CardData>
) => {
    for (let i = 0; i < numberOfCardsToGuess; i++) {
        if (!equalCards(sequence[i], userSequence[i])) {
            return false
        }
    }
    return true
}

export {
    cardsData,
    createCard,
    createRandomSequence,
    getResult,
    numberOfCardsToGuess,
    reprCardData,
}
