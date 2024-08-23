import { useEffect, useRef, useState } from 'react'
import { createValidSequence, getResult, numberOfCardsToGuess } from '../model'
import { CardData } from '../types'
import useInterval, { Timer } from './useInterval'

type Status =
    | 'initial'
    | 'showing-cards'
    | 'pause-before-answering'
    | 'answering'
    | 'showing-results'

const pauseBeforeFirstCard = 2500
const pauseBetweenCards = 2000
const pauseBeforeAnswering = 1600

const useGame = (
    onGameFinished: () => void,
    sequence: CardData[] | null = null
) => {
    const sequenceRef = useRef<ReadonlyArray<CardData> | null>(null)
    const timerRef = useRef<Timer | null>(null)
    timerRef.current = useInterval()
    const [status, setStatus] = useState<Status>('initial')
    const [currentStep, setCurrentStep] = useState<number | null>(null)
    const [userSequence, setUserSequence] = useState<CardData[]>([])

    const getTimer = () => timerRef.current!

    useEffect(() => {
        if (!sequenceRef.current) {
            sequenceRef.current =
                sequence === null
                    ? createValidSequence(numberOfCardsToGuess)
                    : sequence
        }
    }, [sequence])

    useEffect(() => {
        const timer = getTimer()
        // Display the cards sequentially
        timer.addInterval(() => {
            setStatus('showing-cards')
            setCurrentStep(0)
            timer.clearTimers()
        }, pauseBeforeFirstCard)
        return timer.clearTimers
    }, [])

    useEffect(() => {
        if (currentStep !== null && currentStep >= numberOfCardsToGuess) {
            getTimer().clearTimers()
            setCurrentStep(null)
            setStatus('pause-before-answering')
        }
    }, [currentStep])

    useEffect(() => {
        if (currentStep === null) {
            return
        }
        const timer = getTimer()
        if (!timer.intervalIsSet()) {
            timer.addInterval(() => {
                setCurrentStep((step) => {
                    if (step === null) {
                        throw new Error('invalid value')
                    }
                    return step + 1
                })
            }, pauseBetweenCards)
        }
        return timer.clearTimers
    }, [currentStep])

    useEffect(() => {
        if (status !== 'pause-before-answering') return
        const timer = getTimer()
        timer.addInterval(() => {
            setStatus('answering')
            getTimer().clearTimers()
        }, pauseBeforeAnswering)
        return getTimer().clearTimers
    }, [status])

    useEffect(() => {
        if (status === 'showing-results') {
            getTimer().checkIntervalIsNotSet()
        }
    }, [status])

    useEffect(() => {
        if (
            status === 'answering' &&
            userSequence.length === numberOfCardsToGuess
        ) {
            getTimer().checkIntervalIsNotSet()
            setStatus('showing-results')
            onGameFinished()
        }
    }, [status, userSequence, onGameFinished])

    const win =
        status === 'showing-results'
            ? getResult(sequenceRef.current!, userSequence)
            : null

    let cardValue = null
    if (status === 'showing-cards') {
        if (currentStep === null) {
            throw new Error('invalid value')
        }
        cardValue = sequenceRef.current![currentStep]
    }

    const addCard = (cardData: CardData) => {
        setUserSequence((userSequence) => [...userSequence, cardData])
    }
    return {
        status,
        win,
        cardValue,
        sequence: sequenceRef.current,
        userSequence,
        addCard,
    }
}

export default useGame
export { pauseBeforeAnswering, pauseBeforeFirstCard, pauseBetweenCards }
