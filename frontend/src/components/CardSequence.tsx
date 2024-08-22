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
            {sequence.map((cardData) => {
                return (
                    <Card
                        color={cardData.color}
                        shape={cardData.shape}
                        scale={scale}
                    />
                )
            })}
        </>
    )
}

export default CardSequence
