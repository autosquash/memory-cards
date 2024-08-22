import { useState } from 'react'
import { cardsData } from '../model'
import { CardData } from '../types'
import './CardsToClick.css'

interface Props {
    addCard: (cardData: CardData) => void
}

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )
}

const CardsToClick = ({ addCard }: Props) => {
    const [hovered, setHovered] = useState<number | null>(null)
    return (
        <div className="cards">
            {cardsData.map((cardData, index) => (
                <div
                    style={{
                        backgroundColor: cardData.color,
                        opacity: hovered === index ? 1 : 0.85,
                    }}
                    key={cardData.shape + cardData.color}
                    onClick={() => addCard(cardData)}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <span>
                        {toTitleCase(cardData.color)}{' '}
                        {toTitleCase(cardData.shape)}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default CardsToClick
