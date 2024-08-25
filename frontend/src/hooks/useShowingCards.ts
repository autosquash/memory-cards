import { useEffect, useRef, useState } from 'react'
import { numberOfCardsToGuess } from '../model'
import { pauseBetweenCards } from '../settings'
import { CardData } from '../types'
import { check, repr } from '../utils'
import useTimer from './useTimer'

const useShowingCards = (
    showingCards: boolean,
    sequence: ReadonlyArray<CardData>
) => {
    const timerRef = useRef(useTimer())
    const [currentStep, setCurrentStep] = useState<number>(0)
    const allCardsShowed = currentStep >= numberOfCardsToGuess
    const getTimer = () => timerRef.current

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
        if (!showingCards || allCardsShowed) {
            return null
        }
        const cardValue = sequence.at(currentStep)
        check(cardValue, () => getBadCardValueMsg(sequence, currentStep))
        return cardValue
    }
    const cardValue = getCurrentCardValue()

    return { allCardsShowed, cardValue }
}

const getBadCardValueMsg = (
    sequence: readonly CardData[],
    currentStep: number
) =>
    `Card value should be a CardData instance (sequence: ${repr(
        sequence
    )}, currentStep: ${currentStep})`

export default useShowingCards
