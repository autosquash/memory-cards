import { useRef } from 'react'

interface Timer {
    activateOneTime: (callback: () => void, delay: number) => void
    checkIsNotSet: () => void
    clear: (reason?: string) => void
    isActive: () => boolean
}

/// Manage a timer for callbacks
const useTimer = (): Timer => {
    const timeoutIdRef = useRef<number | null>(null) // TODO: check if nulls are really checked

    const activate = (callback: () => void, delay: number) => {
        checkIsNotSet()
        timeoutIdRef.current = window.setTimeout(callback, delay)
    }
    const activateOneTime = (callback: () => void, delay: number) => {
        activate(() => {
            callback()
            clear()
        }, delay)
    }
    const isActive = () => timeoutIdRef.current !== null
    const checkIsNotSet = () => checkRefIsEmpty(timeoutIdRef)
    const clear = () => {
        if (isActive()) {
            const id = timeoutIdRef.current!
            clearInterval(id)
            timeoutIdRef.current = null
        }
    }
    return {
        activateOneTime,
        checkIsNotSet,
        isActive,
        clear,
    }
}

const checkRefIsEmpty = (ref: React.MutableRefObject<number | null>) => {
    if (ref.current !== null) {
        const id = ref.current
        console.error(`there is still a previous timer: ${id}`)
    }
}

export default useTimer
export { checkRefIsEmpty }
export type { Timer }
