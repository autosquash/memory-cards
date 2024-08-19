import { useEffect, useState } from 'react'
import { SetNavState } from '../types'
import ExitButton from './ExitButton'
import './GameScreen.css'

type Color = 'red' | 'green' | 'blue'
type Shape = 'square' | 'triangle' | 'circle'

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
const start = Date.now()

const cardsData: ReadonlyArray<CardData> = buildCardsData()

const displayElapsedTime = () => {
    const millis = Date.now() - start
    console.log(`\nseconds elapsed = ${Math.floor(millis / 1000)}`)
}

const GameScreen = ({ userName, setNavState }: Props) => {
    const [sequence, setSequence] = useState<CardData[]>([])
    const [currentStep, setCurrentStep] = useState(0)
    const [showingSequence, setShowingSequence] = useState(true)
    displayElapsedTime()
    console.log('Renderizando')
    console.log({ currentStep })

    useEffect(() => {
        //  Generate a random sequence of 3 cards
        const generatedSequence = Array.from(
            { length: 3 },
            () => cardsData[Math.floor(Math.random() * cardsData.length)]
        )
        setSequence(generatedSequence)

        // Display the cards sequentially
        let step = 0
        console.log('definiendo el intervalo')
        const interval = setInterval(() => {
            displayElapsedTime()
            console.log('En el intervalo')
            console.log({ step })
            setCurrentStep(step)
            if (step >= generatedSequence.length) {
                clearInterval(interval)
                setShowingSequence(false)
            }
            step++
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <p>User: {userName}</p>
            <p>The Game has started!</p>
            <div className="game-screen">
                {showingSequence && sequence.length ? (
                    <div className="card-display">
                        <p>currentStep: {currentStep}</p>
                        {sequence[currentStep].shape}{' '}
                        {sequence[currentStep].color}
                    </div>
                ) : (
                    <p>Cards displayed</p>
                )}
            </div>
            <ExitButton setNavState={setNavState} />
        </div>
    )
}

export default GameScreen
