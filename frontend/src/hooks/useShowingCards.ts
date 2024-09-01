import { useEffect, useMemo, useRef, useState } from 'react'

import { pauseBetweenCards, timeToShowEachCard } from '../settings'
import { CardData } from '../types'
import { check, repr } from '../utils'
import useTimer, { Timer } from './useTimer'

// even steps are showing cards
// odd steps are pauses between cards

const useShowingCards = (
    showingCards: boolean,
    sequence: ReadonlyArray<CardData>
) => {
    const timerRef: React.RefObject<Timer> = useRef(useTimer())
    const getTimer = () => timerRef.current!
    const [currentStep, setCurrentStep] = useState<number>(0)
    const numberOfCardsToRemember = sequence.length
    const totalSteps = numberOfCardsToRemember * 2 - 1
    const allCardsShowed = currentStep >= totalSteps
    const isEvenStep = currentStep % 2 === 0

    useEffect(() => {
        if (!showingCards) {
            return
        }
        const goToNextStep = () => {
            // Display the cards sequentially
            setCurrentStep((step) => step + 1)
        }
        const timer = getTimer()
        const time = isEvenStep ? timeToShowEachCard : pauseBetweenCards
        timer.activateOneTime(goToNextStep, time)
        return timer.clear
    }, [showingCards, isEvenStep])

    const getCurrentCardValue = (): CardData | null => {
        if (!showingCards || allCardsShowed) {
            return null
        }
        if (!isEvenStep) {
            // pause between cards
            return null
        }
        const cardValue = sequence.at(currentStep / 2)
        check(cardValue, () => getBadCardValueMsg(sequence, currentStep))
        return cardValue
    }

    const cardValue = useMemo(getCurrentCardValue, [
        showingCards,
        allCardsShowed,
        currentStep,
        isEvenStep,
        sequence,
    ])

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
