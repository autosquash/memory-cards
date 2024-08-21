import { useEffect, useRef, useState } from 'react'
import { createValidSequence, getResult, numberOfCardsToGuess } from '../model'
import { CardData } from '../types'
import Card from './Card'
import CardsToClick from './CardsToClick'
import './GameWidget.css'

type Status =
    | 'initial'
    | 'showing-cards'
    | 'pause-before-answering'
    | 'answering'
    | 'showing-results'

type TimerType = 'interval' | 'timeout'

interface Props {
    enableStartGameButton: () => void
}

const GameWidget = ({
    enableStartGameButton: enableStartGameButton,
}: Props) => {
    const intervalIdRef = useRef<[number, TimerType] | null>(null) // TODO: check if nulls are checked
    const [status, setStatus] = useState<Status>('initial')
    const [sequence, setSequence] = useState<ReadonlyArray<CardData>>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null)
    const [userSequence, setUserSequence] = useState<CardData[]>([])
    const [win, setWin] = useState<boolean | null>(null)

    const addInterval = (callback: () => void, delay: number) => {
        intervalIdRef.current = [setInterval(callback, delay), 'interval']
    }

    useEffect(() => {
        setSequence(createValidSequence(numberOfCardsToGuess))
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
                    setCurrentStep((step) => (step === null ? 0 : step + 1))
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
            enableStartGameButton()
            const result = getResult(sequence, userSequence)
            setWin(result)
        }
    }, [currentStep, status, sequence, userSequence, enableStartGameButton])

    const clearTimers = () => {
        if (intervalIdRef.current) {
            const [id, type] = intervalIdRef.current
            if (type === 'interval') {
                clearInterval(id)
                intervalIdRef.current = null
            }
        }
    }

    const cardValue =
        status === 'showing-cards' && currentStep !== null
            ? sequence[currentStep]
            : null

    return (
        <div className="game-screen">
            <>
                {status === 'initial' ? (
                    <p>The Game is starting!</p>
                ) : status === 'showing-cards' && cardValue ? (
                    <div className="card-display">
                        <Card shape={cardValue.shape} color={cardValue.color} />
                    </div>
                ) : status === 'pause-before-answering' ? (
                    <p>Cards displayed! Do you remember them?</p>
                ) : status === 'answering' ? (
                    <CardsToClick
                        addCard={(cardData) => {
                            setUserSequence([...userSequence, cardData])
                        }}
                    />
                ) : (
                    status === 'showing-results' &&
                    (win === true ? 'You win!' : "You've lost")
                )}
            </>
        </div>
    )
}

const checkRefIsEmpty = (
    ref: React.MutableRefObject<[number, TimerType] | null>
) => {
    if (ref.current) {
        const [id, type] = ref.current
        console.error(`there is still a previous ${type}: ${id}`)
    }
}

export default GameWidget
