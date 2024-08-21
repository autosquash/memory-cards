import { useEffect, useRef, useState } from 'react'
import { createValidSequence, getResult, numberOfCardsToGuess } from '../model'
import { CardData } from '../types'

type Status =
    | 'initial'
    | 'showing-cards'
    | 'pause-before-answering'
    | 'answering'
    | 'showing-results'

type TimerType = 'interval' | 'timeout'

const useGame = (onGameFinished: () => void) => {
    const intervalIdRef = useRef<[number, TimerType] | null>(null) // TODO: check if nulls are really checked
    const sequenceRef = useRef<ReadonlyArray<CardData> | null>(null)

    const [status, setStatus] = useState<Status>('initial')
    const [currentStep, setCurrentStep] = useState<number | null>(null)
    const [userSequence, setUserSequence] = useState<CardData[]>([])
    const [win, setWin] = useState<boolean | null>(null)

    const addInterval = (callback: () => void, delay: number) => {
        intervalIdRef.current = [
            window.setInterval(callback, delay),
            'interval',
        ]
    }

    useEffect(() => {
        sequenceRef.current = createValidSequence(numberOfCardsToGuess)
        checkRefIsEmpty(intervalIdRef)
        // Display the cards sequentially
        addInterval(() => {
            setStatus('showing-cards')
            setCurrentStep(0)
            clearTimers()
        }, 2000)
        return clearTimers
    }, [])

    useEffect(() => {
        if (currentStep !== null) {
            if (currentStep >= numberOfCardsToGuess) {
                clearTimers()
                setCurrentStep(null)
                setStatus('pause-before-answering')
            } else if (!intervalIdRef.current) {
                addInterval(() => {
                    setCurrentStep((step) => {
                        if (step === null) {
                            console.error('invalid value')
                            return null
                        }
                        return step + 1
                    })
                }, 2000)
            }
        }
        return clearTimers
    }, [currentStep])

    useEffect(() => {
        if (
            status === 'pause-before-answering' &&
            intervalIdRef.current === null
        ) {
            addInterval(() => {
                setStatus('answering')
                clearTimers()
            }, 2000)
        } else if (status === 'showing-results') {
            checkRefIsEmpty(intervalIdRef)
        }
        return clearTimers
    }, [status])

    useEffect(() => {
        if (
            status === 'answering' &&
            userSequence.length === numberOfCardsToGuess
        ) {
            checkRefIsEmpty(intervalIdRef)
            setStatus('showing-results')
            onGameFinished()
            const result = getResult(sequenceRef.current!, userSequence)
            setWin(result)
        }
    }, [currentStep, status, userSequence, onGameFinished])

    const clearTimers = () => {
        if (intervalIdRef.current) {
            const [id, type] = intervalIdRef.current
            if (type === 'interval') {
                clearInterval(id)
                intervalIdRef.current = null
            }
        }
    }

    let cardValue = null
    if (status === 'showing-cards') {
        if (currentStep === null) {
            console.error('invalid value')
            throw new Error('invalid value')
        }
        cardValue = sequenceRef.current![currentStep]
    }

    const addCard = (cardData: CardData) => {
        setUserSequence([...userSequence, cardData])
    }
    return { status, win, cardValue, addCard }
}

const checkRefIsEmpty = (
    ref: React.MutableRefObject<[number, TimerType] | null>
) => {
    if (ref.current) {
        const [id, type] = ref.current
        console.error(`there is still a previous ${type}: ${id}`)
    }
}

export default useGame
