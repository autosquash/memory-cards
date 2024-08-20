import { useEffect, useRef, useState } from 'react'
import { Color, Shape } from '../types'
import Card from './Card'
import './GameWidget.css'

interface CardData {
    color: Color
    shape: Shape
}
const colors: Color[] = ['red', 'green', 'blue']
const shapes: Shape[] = ['square', 'triangle', 'circle']

const buildCardsData = () => {
    const cardsData: CardData[] = []
    for (const color of colors) {
        for (const shape of shapes) {
            cardsData.push({ color, shape })
        }
    }
    return cardsData
}

const cardsData: ReadonlyArray<CardData> = buildCardsData()
const numberOfCardsToGuess = 3

const createValidSequence = (n: number): CardData[] => {
    const generatedSequence: CardData[] = []
    while (generatedSequence.length < n) {
        const newCardData =
            cardsData[Math.floor(Math.random() * cardsData.length)]
        if (generatedSequence.length) {
            const last = generatedSequence[generatedSequence.length - 1]
            if (
                newCardData.color === last.color &&
                newCardData.shape === last.shape
            ) {
                continue
            }
        }
        generatedSequence.push(newCardData)
    }
    return generatedSequence
}

const GameWidget = () => {
    const intervalIdRef = useRef(0)
    const [sequence, setSequence] = useState<ReadonlyArray<CardData>>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null)
    const [answering, setAnswering] = useState(false)
    const [userSequence, setUserSequence] = useState<CardData[]>([])
    const [win, setWin] = useState<boolean | null>(null)

    const started = currentStep !== null
    const showingSequence =
        sequence.length && started && currentStep < sequence.length
    const cardValue = showingSequence ? sequence[currentStep] : null

    useEffect(() => {
        setSequence(createValidSequence(numberOfCardsToGuess))
        // Display the cards sequentially
        intervalIdRef.current = setInterval(() => {
            setCurrentStep((step) => (step === null ? 0 : step + 1))
        }, 2000)

        return () => clearInterval(intervalIdRef.current)
    }, [])

    const finished = currentStep && currentStep >= sequence.length

    useEffect(() => {
        if (!finished || answering) {
            return
        }
        intervalIdRef.current = setInterval(() => {
            setAnswering(true)
        }, 2000)

        return () => clearInterval(intervalIdRef.current)
    }, [finished, answering])

    if (intervalIdRef.current !== null && finished) {
        clearInterval(intervalIdRef.current)
    }

    useEffect(() => {
        if (userSequence.length === numberOfCardsToGuess) {
            setAnswering(false)
            for (let i = 0; i < numberOfCardsToGuess; i++) {
                const correct = sequence[i]
                const userChoice = userSequence[i]
                if (
                    correct.shape !== userChoice.shape ||
                    correct.color !== userChoice.color
                ) {
                    setWin(false)
                    return
                }
            }
            setWin(true)
        }
    }, [sequence, userSequence])

    return (
        <div className="game-screen">
            {cardValue ? (
                <div className="card-display">
                    <Card shape={cardValue.shape} color={cardValue.color} />
                </div>
            ) : finished ? (
                answering ? (
                    cardsData.map((cardData) => (
                        <div
                            key={cardData.shape + cardData.color}
                            onClick={() => {
                                console.log(
                                    'clicked ' + JSON.stringify(cardData)
                                )
                                setUserSequence([...userSequence, cardData])
                            }}
                        >
                            {cardData.shape} {cardData.color}
                        </div>
                    ))
                ) : win === null ? (
                    <p>Cards displayed! Do you remember them?</p>
                ) : win === true ? (
                    'You win!'
                ) : (
                    "You've lost"
                )
            ) : (
                <p>The Game is starting!</p>
            )}
        </div>
    )
}

export default GameWidget
