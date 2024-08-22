import { act, renderHook } from '@testing-library/react'
import useGame, {
    pauseBeforeAnswering,
    pauseBeforeFirstCard,
    pauseBetweenCards,
} from '../hooks/useGame'
import { createCard, numberOfCardsToGuess } from '../model'
import { CardData } from '../types'
import { sequenceData } from './examples'

jest.useFakeTimers()

describe('useGame initial', () => {
    it('should return the initial values', async () => {
        const { result } = renderHook(() => useGame(() => {}))
        const { status, cardValue, win } = result.current

        expect(status).toBe('initial')
        expect(cardValue).toBe(null)
        expect(win).toBe(null)
    })
    it('should return the next values', async () => {
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
    })
    it('should update win', async () => {
        const sequence = sequenceData.map(([shape, color]) =>
            createCard(shape, color)
        )
        const { result } = renderHook(() => useGame(() => {}, sequence))

        act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))
        act(() =>
            jest.advanceTimersByTime(pauseBetweenCards * numberOfCardsToGuess)
        )
        act(() => jest.advanceTimersByTime(pauseBeforeAnswering))

        let { status, cardValue, win, addCard } = result.current
        expect(status).toBe('answering')
        expect(cardValue).toBe(null)
        expect(win).toBe(null)

        act(() => {
            addCard(sequence[0])
            addCard(sequence[1])
            addCard(sequence[2])
        })
        ;({ status, cardValue, win, addCard } = result.current)
        expect(status).toBe('showing-results')
        expect(win).toBe(true)
    })
})
