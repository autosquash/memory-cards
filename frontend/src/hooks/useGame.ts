import { useEffect, useRef, useState } from 'react'
import { createValidSequence, getResult, numberOfCardsToGuess } from '../model'
import { CardData } from '../types'
import useTimer, { Timer } from './useTimer'

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
    timerRef.current = useTimer()
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
        timer.activateOneTime(() => {
            setStatus('showing-cards')
            setCurrentStep(0)
        }, pauseBeforeFirstCard)
        return timer.clear
    }, [])

    useEffect(() => {
        if (currentStep !== null && currentStep >= numberOfCardsToGuess) {
            getTimer().clear()
            setCurrentStep(null)
            setStatus('pause-before-answering')
        }
    }, [currentStep])

    useEffect(() => {
        if (currentStep === null) {
            return
        }
        const goToNextStep = () => {
            // Display the cards sequentially
            setCurrentStep((step) => {
                if (step === null) {
                    throw new Error('invalid value')
                }
                return step + 1
            })
        }
        const timer = getTimer()
        if (!timer.isActive()) {
            timer.activate(goToNextStep, pauseBetweenCards)
        }
        return timer.clear
    }, [currentStep])

    useEffect(() => {
        if (status !== 'pause-before-answering') return
        const timer = getTimer()
        timer.activateOneTime(() => {
            setStatus('answering')
        }, pauseBeforeAnswering)
        return timer.clear
    }, [status])

    useEffect(() => {
        if (status === 'showing-results') {
            getTimer().checkIsNotSet()
        }
    }, [status])

    useEffect(() => {
        if (
            status === 'answering' &&
            userSequence.length === numberOfCardsToGuess
        ) {
            getTimer().checkIsNotSet()
            setStatus('showing-results')
            onGameFinished()
        }
    }, [status, userSequence, onGameFinished])

    const win =
        status === 'showing-results'
            ? getResult(sequenceRef.current!, userSequence)
            : null

    const getCurrentCardValue = () => {
        let cardValue = null
        if (status === 'showing-cards') {
            if (currentStep === null) {
                throw new Error('invalid value')
            }
            cardValue = sequenceRef.current![currentStep]
        }
        return cardValue
    }
    const cardValue = getCurrentCardValue()

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
