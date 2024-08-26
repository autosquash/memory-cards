import { useEffect, useRef, useState } from 'react'
import { createRandomSequence, getResult } from '../model'
import { pauseBeforeAnswering, pauseBeforeFirstCard } from '../settings'
import { CardData } from '../types'
import { check, repr } from '../utils'
import useShowingCards from './useShowingCards'
import useTimer, { Timer } from './useTimer'

type Status =
    | 'initial'
    | 'showing-cards'
    | 'pause-before-answering'
    | 'answering'
    | 'showing-results'

interface GameView {
    status: Status
    win: boolean | null
    cardValue: CardData | null
    sequenceToRemember: ReadonlyArray<CardData>
    userSequence: CardData[]
    addCard: (cardData: CardData) => void
}

const useGame = (
    onGameFinished: () => void,
    numberOfCardsToRemember: number,
    providedSequence: ReadonlyArray<CardData> | null = null
): GameView => {
    const sequenceToRemember = useRef<ReadonlyArray<CardData>>(
        getSequenceToRemember(providedSequence, numberOfCardsToRemember)
    ).current

    const timerRef: React.RefObject<Timer> = useRef(useTimer())
    const getTimer = () => timerRef.current!

    const [status, setStatus] = useState<Status>('initial')
    const [userSequence, setUserSequence] = useState<CardData[]>([])

    const { allCardsShowed, cardValue } = useShowingCards(
        status === 'showing-cards',
        sequenceToRemember
    )

    const timeToShowResults =
        status === 'answering' &&
        userSequence.length === numberOfCardsToRemember

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
            ? getResult(sequenceToRemember, userSequence)
            : null

    const addCard = (cardData: CardData) => {
        setUserSequence((userSequence) => [...userSequence, cardData])
    }
    return {
        status,
        win,
        cardValue,
        sequenceToRemember,
        userSequence,
        addCard,
    }
}

const getSequenceToRemember = (
    provided: ReadonlyArray<CardData> | null,
    numberOfCardsToRemember: number
): ReadonlyArray<CardData> => {
    const sequence = provided || createRandomSequence(numberOfCardsToRemember)
    check(sequence.length === numberOfCardsToRemember, () =>
        badSequenceLengthMsg(sequence!)
    )
    return sequence
}

function badSequenceLengthMsg(sequence: ReadonlyArray<CardData>): string {
    return `Bad sequence length: ${repr(sequence)}`
}

export default useGame
export type { GameView }
