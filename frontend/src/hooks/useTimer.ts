import { useRef } from 'react'

type TimerType = 'interval' | 'timeout'

interface Timer {
    activate: (callback: () => void, delay: number) => void
    checkIsNotSet: () => void
    clear: (reason?: string) => void
    isActive: () => boolean
}

/// Manage a timer for callbacks
const useTimer = (): Timer => {
    const intervalIdRef = useRef<[number, TimerType] | null>(null) // TODO: check if nulls are really checked

    const activate = (callback: () => void, delay: number) => {
        checkIsNotSet()
        intervalIdRef.current = [
            window.setInterval(callback, delay),
            'interval',
        ]
    }
    const isActive = () => intervalIdRef.current !== null
    const checkIsNotSet = () => checkRefIsEmpty(intervalIdRef)
    const clear = () => {
        if (isActive()) {
            const [id, type] = intervalIdRef.current!
            if (type === 'interval') {
                clearInterval(id)
                intervalIdRef.current = null
            }
        }
    }
    return {
        activate,
        checkIsNotSet,
        isActive,
        clear,
    }
}

const checkRefIsEmpty = (
    ref: React.MutableRefObject<[number, TimerType] | null>
) => {
    if (ref.current !== null) {
        const [id, type] = ref.current
        console.error(`there is still a previous ${type}: ${id}`)
    }
}

export default useTimer
export { checkRefIsEmpty }
export type { Timer }
