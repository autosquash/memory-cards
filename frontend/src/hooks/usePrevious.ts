import { useRef } from 'react'

const usePrevious = <T>(value: T, initial?: T) => {
    const ref = useRef(initial)
    const previous = ref.current
    ref.current = value
    return previous
}
export default usePrevious
