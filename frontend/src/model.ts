import { CardData, Color, Shape, User } from './types'
import { arrayEquals, check } from './utils'
const colors: Color[] = ['red', 'green', 'blue']
const shapes: Shape[] = ['square', 'triangle', 'circle']

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
    if (sequence.length !== userSequence.length) {
        throw new Error('Both sequences should have the same length')
    }
    for (let i = 0; i < sequence.length; i++) {
        if (!equalCards(sequence[i], userSequence[i])) {
            return false
        }
    }
    return true
}

const adjustDifficulty = (user: User, numberOfCards: number) => {
    if (user.recentGamesPlayed.at(-1)?.isWin === false) {
        return numberOfCards - 1
    }
    const lastTwoGames = user.recentGamesPlayed.slice(-2)
    if (lastTwoGames.length < 2) {
        return numberOfCards
    }
    if (lastTwoGames[0].numberOfCards !== lastTwoGames[1].numberOfCards) {
        return numberOfCards
    }
    if (
        arrayEquals(
            lastTwoGames.map((game) => game.isWin),
            [true, true]
        )
    ) {
        return numberOfCards + 1
    }
    return numberOfCards
}

export {
    adjustDifficulty,
    cardsData,
    createCard,
    createRandomSequence,
    getResult,
    reprCardData,
}
