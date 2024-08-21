import { CardData, Color, Shape } from './types'
const colors: Color[] = ['red', 'green', 'blue']
const shapes: Shape[] = ['square', 'triangle', 'circle']

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

const createValidSequence = (n: number): CardData[] => {
    const generatedSequence: CardData[] = []
    while (generatedSequence.length < n) {
        const newCardData =
            cardsData[Math.floor(Math.random() * cardsData.length)]
        if (generatedSequence.length) {
            const last = generatedSequence[generatedSequence.length - 1]
            if (
                newCardData.color === last.color &&
                newCardData.shape === last.shape
            ) {
                continue
            }
        }
        generatedSequence.push(newCardData)
    }
    return generatedSequence
}

const numberOfCardsToGuess = 3

const getResult = (
    sequence: ReadonlyArray<CardData>,
    userSequence: ReadonlyArray<CardData>
) => {
    for (let i = 0; i < numberOfCardsToGuess; i++) {
        const correct = sequence[i]
        const userChoice = userSequence[i]
        if (
            correct.shape !== userChoice.shape ||
            correct.color !== userChoice.color
        ) {
            return false
        }
    }
    return true
}

export {
    cardsData,
    createCard,
    createValidSequence,
    getResult,
    numberOfCardsToGuess,
}
