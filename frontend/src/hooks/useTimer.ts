import { useRef } from 'react'

type TimerType = 'interval' | 'timeout'

interface Timer {
    activate: (callback: () => void, delay: number) => void
    activateOneTime: (callback: () => void, delay: number) => void
    checkIsNotSet: () => void
    clear: (reason?: string) => void
    isActive: () => boolean
}

/// Manage a unique timer for callbacks
const useTimer = (): Timer => {
    const timerIdRef = useRef<[number, TimerType] | null>(null) // TODO: check if nulls are really checked

    const activate = (callback: () => void, delay: number) => {
        checkIsNotSet()
        timerIdRef.current = [window.setInterval(callback, delay), 'interval']
    }
    const activateOneTime = (callback: () => void, delay: number) => {
        checkIsNotSet()
        timerIdRef.current = [
            window.setTimeout(() => {
                callback()
                clear()
            }, delay),
            'timeout',
        ]
    }
    const isActive = () => timerIdRef.current !== null
    const checkIsNotSet = () => checkRefIsEmpty(timerIdRef)
    const clear = () => {
        if (isActive()) {
            const [id, type] = timerIdRef.current!
            if (type === 'interval') {
                clearInterval(id)
            } else if (type === 'timeout') {
                clearTimeout(id)
            } else {
                throw new Error('Unknown timer type: ' + type)
            }
            timerIdRef.current = null
        }
    }
    return {
        activate,
        activateOneTime,
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
