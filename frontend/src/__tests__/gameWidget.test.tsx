import { act, render, renderHook, screen } from '@testing-library/react'
import GameWidget from '../components/GameWidget'
import useGame from '../hooks/useGame'
import { createCard, numberOfCardsToGuess } from '../model'
import {
    pauseBeforeAnswering,
    pauseBeforeFirstCard,
    pauseBetweenCards,
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

beforeAll(() => {
    expect(numberOfCardsToGuess >= 2 && numberOfCardsToGuess <= 3).toBe(true)
})

const getData = () => {
    const element = screen.getByTestId('game-widget-container')
    expect(element).toBeTruthy()
    const status = element.getAttribute('data-status')
    const cardValue = element.getAttribute('data-card-value')
    const win = element.getAttribute('data-win')
    return { status, cardValue, win }
}
const clickCard = (cardData: CardData) => {
    const element = screen.getByTestId(cardData.color + ' ' + cardData.shape)
    element.click()
}

describe('GameWidget', () => {
    it('should start with the initial status', () => {
        render(<GameWidget onGameFinished={mockOnGameFinished} />)
        const { status, cardValue, win } = getData()
        expect(status).toBe('initial')
        expect(cardValue).toBe(null)
        expect(win).toBe('null')
    })
    it('should change status when time passes', () => {
        render(<GameWidget onGameFinished={mockOnGameFinished} />)
        act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))

        let { status, cardValue, win } = getData()

        expect(status).toBe('showing-cards')
        expect(cardValue).toBeTruthy()
        expect(win).toBe('null')

        act(() =>
            jest.advanceTimersByTime(pauseBetweenCards * numberOfCardsToGuess)
        )
        ;({ status, cardValue, win } = getData())
        expect(status).toBe('pause-before-answering')
        expect(cardValue).toBe(null)
        expect(win).toBe('null')

        act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
        ;({ status, cardValue, win } = getData())
        expect(status).toBe('answering')
        expect(cardValue).toBe(null)
        expect(win).toBe('null')
    })
})

describe('should get right result', () => {
    let sequence: CardData[]
    beforeEach(() => {
        // create the sequence
        sequence = sequenceData
            .slice(0, numberOfCardsToGuess)
            .map(([shape, color]) => createCard(shape, color))

        render(
            <GameWidget
                onGameFinished={mockOnGameFinished}
                providedSequence={sequence}
            />
        )

        // forward time
        act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))
        act(() =>
            jest.advanceTimersByTime(pauseBetweenCards * numberOfCardsToGuess)
        )
        act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
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
    })
})
