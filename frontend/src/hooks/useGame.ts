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
        }, pauseBeforeFirstCard)
        return timer.clear
    }, [])

    useEffect(() => {
        if (allCardsShowed) {
            getTimer().clear()
            setStatus('pause-before-answering')
        }
    }, [allCardsShowed])

    useEffect(() => {
        if (status !== 'pause-before-answering') return
        const timer = getTimer()
        timer.activateOneTime(() => {
            setStatus('answering')
        }, pauseBeforeAnswering)
        return timer.clear
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
