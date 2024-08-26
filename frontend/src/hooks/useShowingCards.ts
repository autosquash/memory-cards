import { useEffect, useMemo, useRef, useState } from 'react'
import { numberOfCardsToGuess } from '../model'
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
    const allCardsShowed = currentStep >= numberOfCardsToGuess * 2 - 1

    useEffect(() => {
        if (!showingCards) {
            return
        }
        const goToNextStep = () => {
            // Display the cards sequentially
            setCurrentStep((step) => step + 1)
        }
        const timer = getTimer()
        const time =
            currentStep % 2 === 0 ? timeToShowEachCard : pauseBetweenCards
        timer.activateOneTime(goToNextStep, time)
        return timer.clear
    }, [showingCards, currentStep])

    const getCurrentCardValue = (): CardData | null => {
        if (!showingCards || allCardsShowed) {
            return null
        }
        if (currentStep % 2 !== 0) {
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
