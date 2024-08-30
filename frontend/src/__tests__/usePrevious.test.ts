import { renderHook } from '@testing-library/react'
import usePrevious from '../hooks/usePrevious'

describe('usePrevious hook', () => {
    it('should return undefined initially if no initial value is provided', () => {
        const { result } = renderHook(() => usePrevious(0))
        // Should be undefined initially
        expect(result.current).toBeUndefined()
    })

    it('should return the initial value if provided', () => {
        const { result } = renderHook(() => usePrevious(0, 10))
        // Should return the provided initial value
        expect(result.current).toBe(10)
    })

    it('should return the previous value after update', () => {
        type Args = { value: number }
        const { result, rerender } = renderHook(
            ({ value }: Args) => usePrevious(value),
            {
                initialProps: { value: 0 },
            }
        )

        expect(result.current).toBeUndefined() // First render, initial value is undefined

        rerender({ value: 1 })
        expect(result.current).toBe(0) // Second render, should return the previous value which was 0

        rerender({ value: 2 })
        expect(result.current).toBe(1) // Third render, should return the previous value which was 1
    })
})
