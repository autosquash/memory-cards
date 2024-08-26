import { useState } from 'react'
import { cardsData, reprCardData } from '../model'
import { CardData } from '../types'
import Card from './Card'
import './CardsToClick.css'

interface Props {
    addCard: (cardData: CardData) => void
}

const CardsToClick = ({ addCard }: Props) => {
    const [hovered, setHovered] = useState<number | null>(null)

    return (
        <>
            <div className="cards">
                {cardsData.map((cardData, index) => (
                    <div
                        data-testid={reprCardData(cardData)}
                        style={{
                            opacity: hovered === index ? 1 : 0.85,
                        }}
                        key={cardData.shape + cardData.color}
                        onClick={() => addCard(cardData)}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <Card
                            shape={cardData.shape}
                            color={cardData.color}
                            scale={0.25}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default CardsToClick
