import { cardsData } from '../model'
import { CardData } from '../types'

interface Props {
    addCard: (cardData: CardData) => void
}

const CardsToClick = ({ addCard }: Props) => {
    return (
        <div>
            {cardsData.map((cardData) => (
                <div
                    key={cardData.shape + cardData.color}
                    onClick={() => addCard(cardData)}
                >
                    {cardData.color} {cardData.shape}
                </div>
            ))}
        </div>
    )
}

export default CardsToClick
