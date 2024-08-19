import { useEffect, useRef, useState } from 'react'
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

const cardsData: ReadonlyArray<CardData> = buildCardsData()

const GameScreen = ({ userName, setNavState }: Props) => {
    const intervalIdRef = useRef(0)
    const [sequence, setSequence] = useState<CardData[]>([])
    const [currentStep, setCurrentStep] = useState(-1)

    const showingSequence =
        sequence.length && currentStep >= 0 && currentStep < sequence.length
    const cardValue = showingSequence ? sequence[currentStep] : null
    useEffect(() => {
        //  Generate a random sequence of 3 cards
        const generatedSequence = Array.from(
            { length: 3 },
            () => cardsData[Math.floor(Math.random() * cardsData.length)]
        )
        console.log(JSON.stringify(generatedSequence))
        setSequence(generatedSequence)

        // Display the cards sequentially
        console.log('definiendo el intervalo')
        console.log('current: ' + intervalIdRef.current)
        intervalIdRef.current = setInterval(() => {
            console.log(Date.now())
            console.log(
                `ejecutando el intervalo (previamente el id era ${intervalIdRef.current})`
            )

            setCurrentStep((step) => step + 1)

            console.log('finalizando ejecucion de intervalo')
        }, 2000)
        console.log('creado un intervalo con id ' + intervalIdRef.current)

        return () => clearInterval(intervalIdRef.current)
    }, [])
    if (currentStep >= sequence.length) {
        clearInterval(intervalIdRef.current)
    }

    return (
        <div>
            <p>User: {userName}</p>
            <p>The Game has started!</p>
            <div className="game-screen">
                {cardValue ? (
                    <div className="card-display">
                        <p>currentStep: {currentStep}</p>
                        {cardValue.shape} {cardValue.color}
                    </div>
                ) : currentStep > 0 ? (
                    <p>Cards displayed</p>
                ) : (
                    <p>Waiting...</p>
                )}
            </div>
            <ExitButton setNavState={setNavState} />
        </div>
    )
}

export default GameScreen
