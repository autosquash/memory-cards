import { MutableRefObject, useRef } from 'react'

type TimerType = 'interval' | 'timeout'

interface Timer {
    intervalIdRef: MutableRefObject<[number, TimerType] | null>
    addInterval: (callback: () => void, delay: number) => void
    checkIntervalIsNotSet: () => void
    clearTimers: (reason?: string) => void
    intervalIsSet: () => boolean
}

const useInterval = (): Timer => {
    console.log('inside useInterval')
    const intervalIdRef = useRef<[number, TimerType] | null>(null) // TODO: check if nulls are really checked

    const addInterval = (callback: () => void, delay: number) => {
        checkIntervalIsNotSet()
        intervalIdRef.current = [
            window.setInterval(callback, delay),
            'interval',
        ]
    }
    const intervalIsSet = () => intervalIdRef.current !== null
    const checkIntervalIsNotSet = () => checkRefIsEmpty(intervalIdRef)
    const clearTimers = () => {
        if (intervalIsSet()) {
            const [id, type] = intervalIdRef.current!
            if (type === 'interval') {
                clearInterval(id)
                intervalIdRef.current = null
            }
        }
    }
    return {
        intervalIdRef,
        addInterval,
        checkIntervalIsNotSet,
        intervalIsSet,
        clearTimers,
    }
}

const checkRefIsEmpty = (
    ref: React.MutableRefObject<[number, TimerType] | null>
) => {
    if (ref.current) {
        const [id, type] = ref.current
        console.error(`there is still a previous ${type}: ${id}`)
    }
}

export default useInterval
export { checkRefIsEmpty }
export type { Timer }
