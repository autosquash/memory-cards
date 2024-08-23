import { CardData } from '../types'
import Card from './Card'
import './CardSequence.css'

interface Props {
    sequence: ReadonlyArray<CardData>
    scale?: number
}

const CardSequence = ({ sequence, scale = 0.5 }: Props) => {
    return (
        <>
            {sequence.map((cardData, index) => {
                const { color, shape } = cardData
                return (
                    <Card
                        key={shape + ' ' + color + ' ' + index}
                        color={color}
                        shape={shape}
                        scale={scale}
                    />
                )
            })}
        </>
    )
}

export default CardSequence
