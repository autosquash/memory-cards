import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cardsData, reprCardData } from '../model'
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
    const { i18n, t } = useTranslation()
    const [hovered, setHovered] = useState<number | null>(null)

    const getFullName = (cardData: CardData) =>
        i18n.language === 'en'
            ? toTitleCase(cardData.color) + ' ' + toTitleCase(cardData.shape)
            : toTitleCase(t(cardData.shape)) +
              ' ' +
              toTitleCase(t(cardData.color))
    return (
        <>
            <div className="cards">
                {cardsData.map((cardData, index) => (
                    <div
                        data-testid={reprCardData(cardData)}
                        style={{
                            backgroundColor: cardData.color,
                            opacity: hovered === index ? 1 : 0.85,
                        }}
                        key={cardData.shape + cardData.color}
                        onClick={() => addCard(cardData)}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <span>{getFullName(cardData)}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CardsToClick
