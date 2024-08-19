import { useEffect, useRef, useState } from 'react'
import { Color, SetNavState, Shape } from '../types'
import Card from './Card'
import ExitButton from './ExitButton'
import './GameScreen.css'

interface CardData {
    color: Color
    shape: Shape
}
const colors: Color[] = ['red', 'green', 'blue']
const shapes: Shape[] = ['square', 'triangle', 'circle']

interface Props {
    userName: string
    setNavState: SetNavState
}
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

const GameScreen = ({ userName, setNavState }: Props) => {
    const intervalIdRef = useRef(0)
    const [sequence, setSequence] = useState<CardData[]>([])
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    const started = currentStep !== null
    const showingSequence =
        sequence.length && started && currentStep < sequence.length
    const cardValue = showingSequence ? sequence[currentStep] : null
    const finished = currentStep && currentStep >= sequence.length
    useEffect(() => {
        //  Generate a random sequence of 3 cards
        const generatedSequence = Array.from(
            { length: 3 },
            () => cardsData[Math.floor(Math.random() * cardsData.length)]
        )
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
        <div>
            <div className="game-screen">
                {cardValue ? (
                    <div className="card-display">
                        <p>
                            {' '}
                            {cardValue.shape} {cardValue.color}
                        </p>
                        <Card shape={cardValue.shape} color={cardValue.color} />
                    </div>
                ) : finished ? (
                    <p>Cards displayed! Do you remember them?</p>
                ) : (
                    <p>The Game is starting!</p>
                )}
            </div>
            <ExitButton setNavState={setNavState} />
        </div>
    )
}

export default GameScreen
