import { act, renderHook } from '@testing-library/react'
import useGame, {
    pauseBeforeFirstCard,
    pauseBetweenCards,
} from '../hooks/useGame'
import { numberOfCardsToGuess } from '../model'

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
        const { result, rerender } = renderHook(() => useGame(() => {}))
        act(() => jest.advanceTimersByTime(pauseBeforeFirstCard))
        rerender()

        let { status, cardValue, win } = result.current

        expect(status).toBe('showing-cards')
        expect(cardValue).toBeTruthy()
        expect(win).toBe(null)

        act(() =>
            jest.advanceTimersByTime(pauseBetweenCards * numberOfCardsToGuess)
        )
        rerender()
        ;({ status, cardValue, win } = result.current)
        expect(status).toBe('pause-before-answering')
        expect(cardValue).toBe(null)
        expect(win).toBe(null)
    })
})
