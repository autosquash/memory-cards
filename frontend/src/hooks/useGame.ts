import { useEffect, useRef, useState } from 'react'
import { createValidSequence, getResult, numberOfCardsToGuess } from '../model'
import { pauseBeforeAnswering, pauseBeforeFirstCard } from '../settings'
import { CardData } from '../types'
import useShowingCards from './useShowingCards'
import useTimer, { Timer } from './useTimer'

type Status =
    | 'initial'
    | 'showing-cards'
    | 'pause-before-answering'
    | 'answering'
    | 'showing-results'

const useGame = (
    onGameFinished: () => void,
    sequence: CardData[] | null = null
) => {
    const sequenceRef = useRef<ReadonlyArray<CardData> | null>(null)
    const timerRef = useRef<Timer | null>(null)
    timerRef.current = useTimer()
    const [status, setStatus] = useState<Status>('initial')
    const [userSequence, setUserSequence] = useState<CardData[]>([])

    const { allCardsShowed, cardValue } = useShowingCards(
        status === 'showing-cards',
        sequenceRef.current
    )

    const timeToShowResults =
        status === 'answering' && userSequence.length === numberOfCardsToGuess

    const getTimer = () => timerRef.current!

    if (!sequenceRef.current) {
        sequenceRef.current =
            sequence || createValidSequence(numberOfCardsToGuess)
    }

    useEffect(() => {
        const timer = getTimer()
        timer.activateOneTime(() => {
            setStatus('showing-cards')
        }, pauseBeforeFirstCard)
        return timer.clear
    }, [])

    useEffect(() => {
        if (allCardsShowed) {
            setStatus('pause-before-answering')
            const timer = getTimer()
            timer.activateOneTime(() => {
                setStatus('answering')
            }, pauseBeforeAnswering)
            return timer.clear
        }
    }, [allCardsShowed])

    useEffect(() => {
        if (timeToShowResults) {
            setStatus('showing-results')
            onGameFinished()
        }
    }, [timeToShowResults, onGameFinished])

    const win =
        status === 'showing-results'
            ? getResult(sequenceRef.current!, userSequence)
            : null

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
