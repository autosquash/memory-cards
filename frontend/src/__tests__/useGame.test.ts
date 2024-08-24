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

        for (let i = 0; i < numberOfCardsToGuess; i++) {
            act(() => jest.advanceTimersByTime(pauseBetweenCards))
        }
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
            sequence = sequenceData.map(([shape, color]) =>
                createCard(shape, color)
            )
            // render the hook
            ;({ result } = renderHook(() => useGame(() => {}, sequence)))

            // forward time
            act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))
            for (let i = 0; i < numberOfCardsToGuess; i++) {
                act(() => jest.advanceTimersByTime(pauseBetweenCards))
            }
            act(() => jest.advanceTimersByTime(pauseBeforeAnswering))
        })

        it('wins', () => {
            const { addCard } = result.current
            act(() => {
                addCard(sequence[0])
                addCard(sequence[1])
                addCard(sequence[2])
            })
            const { status, win } = result.current
            expect(status).toBe('showing-results')
            expect(win).toBe(true)
        })
        it('losses', () => {
            const { addCard } = result.current

            act(() => {
                addCard(sequence[0])
                addCard(sequence[2]) // bad order
                addCard(sequence[1])
            })
            const { status, win } = result.current
            expect(status).toBe('showing-results')
            expect(win).toBe(false)
        })
    })
})
