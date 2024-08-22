import CardsToClick from '../components/CardsToClick'

const DemoCardsToClick = () => {
    return (
        <CardsToClick
            addCard={(card) =>
                alert(`Card with ${card.color} ${card.shape} was clicked!`)
            }
        />
    )
}

export default DemoCardsToClick
