import { useEffect, useRef, useState } from 'react'
import { numberOfCardsToGuess } from '../model'
import { pauseBetweenCards } from '../settings'
import { CardData } from '../types'
import useTimer, { Timer } from './useTimer'

const useShowingCards = (
    showingCards: boolean,
    sequence: ReadonlyArray<CardData> | null
) => {
    const timerRef = useRef<Timer | null>(null)
    timerRef.current = useTimer()
    const [currentStep, setCurrentStep] = useState<number>(0)
    const allCardsShowed = currentStep >= numberOfCardsToGuess
    const getTimer = () => timerRef.current!

    useEffect(() => {
        if (!showingCards) {
            return
        }
        const goToNextStep = () => {
            // Display the cards sequentially
            setCurrentStep((step) => step + 1)
        }
        const timer = getTimer()
        timer.activate(goToNextStep, pauseBetweenCards)
        return timer.clear
    }, [showingCards])

    const getCurrentCardValue = (): CardData | null => {
        if (!showingCards) {
            return null
        }
        if (!sequence) {
            throw new Error('There is not sequence')
        }
        if (allCardsShowed) {
            return null
        }
        const cardValue = sequence.at(currentStep)
        if (!cardValue) {
            throw new Error('Card value should not be undefined')
        }
        return cardValue
    }
    const cardValue = getCurrentCardValue()

    return { allCardsShowed, cardValue }
}

export default useShowingCards
