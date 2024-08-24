import { act, renderHook } from '@testing-library/react'
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

beforeAll(() => {
    expect(numberOfCardsToGuess >= 2 && numberOfCardsToGuess <= 3).toBe(true)
})

describe('useGame', () => {
    it('should start with the initial status', () => {
        const { result } = renderHook(() => useGame(() => {}))
        const { status, cardValue, win } = result.current

        expect(status).toBe('initial')
        expect(cardValue).toBe(null)
        expect(win).toBe(null)
    })
    it('should change status when time passes', () => {
        const { result } = renderHook(() => useGame(() => {}))
        act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))

        let { status, cardValue, win } = result.current

        expect(status).toBe('showing-cards')
        expect(cardValue).toBeTruthy()
        expect(win).toBe(null)

        act(() =>
            jest.advanceTimersByTime(pauseBetweenCards * numberOfCardsToGuess)
        )
        ;({ status, cardValue, win } = result.current)
        expect(status).toBe('pause-before-answering')
        expect(cardValue).toBe(null)
        expect(win).toBe(null)

        act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
        ;({ status, cardValue, win } = result.current)
        expect(status).toBe('answering')
        expect(cardValue).toBe(null)
        expect(win).toBe(null)
    })
    describe('should get right result', () => {
        let result: { current: ReturnType<typeof useGame> }
        let sequence: CardData[]
        beforeEach(() => {
            // create the sequence
            sequence = sequenceData
                .slice(0, numberOfCardsToGuess)
                .map(([shape, color]) => createCard(shape, color))
            // render the hook
            ;({ result } = renderHook(() => useGame(() => {}, sequence)))

            // forward time
            act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))
            act(() =>
                jest.advanceTimersByTime(
                    pauseBetweenCards * numberOfCardsToGuess
                )
            )
            act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
        })

        it('wins', () => {
            const { addCard } = result.current
            act(() => {
                for (const card of sequence) {
                    addCard(card)
                }
            })
            const { status, win } = result.current
            expect(status).toBe('showing-results')
            expect(win).toBe(true)
        })
        it('losses', () => {
            const { addCard } = result.current
            const anotherSequence = [...sequence]
            const [a, b] = anotherSequence.slice(-2)
            anotherSequence.splice(-2, 2, b, a)
            act(() => {
                for (const card of anotherSequence) {
                    addCard(card)
                }
            })
            const { status, win } = result.current
            expect(status).toBe('showing-results')
            expect(win).toBe(false)
        })
    })
})
