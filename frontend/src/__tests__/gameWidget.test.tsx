import { act, render, screen } from '@testing-library/react'
import GameWidget from '../components/GameWidget'
import { createCard, reprCardData } from '../model'
import {
    pauseBeforeAnswering,
    pauseBeforeFirstCard,
    pauseBetweenCards,
    timeToShowEachCard,
} from '../settings'
import { CardData } from '../types'
import { sequenceData } from './examples'

jest.useFakeTimers()

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => {
            return key
        },
        i18n: { language: 'en' },
    }),
}))

HTMLCanvasElement.prototype.getContext = () => {
    return null
}

const mockOnGameFinished = () => {}

const getTimes = (numberOfCardsToRemember: number): number[] => {
    if (![2, 3].includes(numberOfCardsToRemember)) {
        throw new Error('Wrong number of cards to remember')
    }
    const times: number[] = []
    for (let i = 0; i < numberOfCardsToRemember; i++) {
        times.push(timeToShowEachCard)
        if (i !== numberOfCardsToRemember - 1) {
            times.push(pauseBetweenCards)
        }
    }
    return times
}

const getData = () => {
    const element = screen.getByTestId('game-widget-container')
    expect(element).toBeTruthy()
    const status = element.getAttribute('data-status')
    const cardValue = element.getAttribute('data-card-value')
    const win = element.getAttribute('data-win')
    return { status, cardValue, win }
}

describe('GameWidget', () => {
    const numberOfCardsToRemember = 3
    const times = getTimes(numberOfCardsToRemember)
    let mockAddGame: jest.Mock<void, [], undefined>
    beforeEach(() => {
        mockAddGame = jest.fn(() => {})
    })
    it('should start with the initial status', () => {
        render(
            <GameWidget
                onGameFinished={mockOnGameFinished}
                numberOfCardsToRemember={numberOfCardsToRemember}
                gameIndex={0}
                addGame={mockAddGame}
            />
        )
        const { status, cardValue, win } = getData()
        expect(status).toBe('initial')
        expect(cardValue).toBe(null)
        expect(win).toBe('null')
        expect(mockAddGame.mock.calls).toHaveLength(0)
    })
    it('should change status when time passes', () => {
        render(
            <GameWidget
                onGameFinished={mockOnGameFinished}
                numberOfCardsToRemember={numberOfCardsToRemember}
                gameIndex={0}
                addGame={mockAddGame}
            />
        )
        act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))

        let { status, cardValue, win } = getData()

        expect(status).toBe('showing-cards')
        expect(cardValue).toBeTruthy()
        expect(win).toBe('null')

        times.forEach((time) => act(() => jest.advanceTimersByTime(time)))
        ;({ status, cardValue, win } = getData())
        expect(status).toBe('pause-before-answering')
        expect(cardValue).toBe(null)
        expect(win).toBe('null')

        act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
        ;({ status, cardValue, win } = getData())
        expect(status).toBe('answering')
        expect(cardValue).toBe(null)
        expect(win).toBe('null')
        expect(mockAddGame.mock.calls).toHaveLength(0)
    })

    describe('should get right result', () => {
        let clickCard: (cardData: CardData) => void
        let sequence: CardData[]
        let rerender: (ui: React.ReactNode) => void
        let createGameWidget: () => JSX.Element
        beforeEach(() => {
            // create the sequence
            sequence = sequenceData
                .slice(0, numberOfCardsToRemember)
                .map(([shape, color]) => createCard(shape, color))
            createGameWidget = () => (
                <GameWidget
                    onGameFinished={mockOnGameFinished}
                    numberOfCardsToRemember={numberOfCardsToRemember}
                    gameIndex={0}
                    addGame={mockAddGame}
                    providedSequence={sequence}
                />
            )
            ;({ rerender } = render(createGameWidget()))

            // forward time
            act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))
            times.forEach((time) => act(() => jest.advanceTimersByTime(time)))
            act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
        })
        beforeEach(() => {
            clickCard = (cardData: CardData) => {
                const element = screen.queryByTestId(reprCardData(cardData))
                expect(element).toBeTruthy()
                element!.click()
            }
        })

        it('wins', () => {
            act(() => {
                for (const card of sequence) {
                    clickCard(card)
                }
            })
            const { status, win } = getData()
            expect(status).toBe('showing-results')
            expect(win).toBe('true')
            expect(mockAddGame.mock.calls).toHaveLength(1)
        })
        it('losses', () => {
            const anotherSequence = [...sequence]
            const [a, b] = anotherSequence.slice(-2)
            anotherSequence.splice(-2, 2, b, a)
            act(() => {
                for (const card of anotherSequence) {
                    clickCard(card)
                }
            })
            const { status, win } = getData()
            expect(status).toBe('showing-results')
            expect(win).toBe('false')
            expect(mockAddGame.mock.calls).toHaveLength(1)
            rerender(createGameWidget())
            expect(mockAddGame.mock.calls).toHaveLength(1)
        })
    })
})
