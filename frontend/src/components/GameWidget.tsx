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

const GameWidget = () => {
    const intervalIdRef = useRef(0)
    const [sequence, setSequence] = useState<CardData[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    const started = currentStep !== null
    const showingSequence =
        sequence.length && started && currentStep < sequence.length
    const cardValue = showingSequence ? sequence[currentStep] : null
    const finished = currentStep && currentStep >= sequence.length
    useEffect(() => {
        const generatedSequence: CardData[] = []
        while (generatedSequence.length < 3) {
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

        setSequence(generatedSequence)
        // Display the cards sequentially
        intervalIdRef.current = setInterval(() => {
            setCurrentStep((step) => (step === null ? 0 : step + 1))
        }, 2000)

        return () => clearInterval(intervalIdRef.current)
    }, [])
    if (finished) {
        clearInterval(intervalIdRef.current)
    }

    return (
        <div className="game-screen">
            {cardValue ? (
                <div className="card-display">
                    <Card shape={cardValue.shape} color={cardValue.color} />
                </div>
            ) : finished ? (
                <p>Cards displayed! Do you remember them?</p>
            ) : (
                <p>The Game is starting!</p>
            )}
        </div>
    )
}

export default GameWidget
