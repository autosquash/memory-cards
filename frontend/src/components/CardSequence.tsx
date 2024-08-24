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
            {sequence.length ? (
                sequence.map((cardData, index) => {
                    const { color, shape } = cardData
                    return (
                        <Card
                            key={shape + ' ' + color + ' ' + index}
                            color={color}
                            shape={shape}
                            scale={scale}
                        />
                    )
                })
            ) : (
                /* Placeholder to preserve the layout */
                <Card
                    key={0}
                    color={'blue'}
                    shape={'square'}
                    scale={scale}
                    hidden={true}
                />
            )}
        </>
    )
}

export default CardSequence
