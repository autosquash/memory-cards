import useGame from '../hooks/useGame'
import Card from './Card'
import CardsToClick from './CardsToClick'
import './GameWidget.css'

interface Props {
    onGameFinished: () => void
}

const GameWidget = ({ onGameFinished }: Props) => {
    const { status, win, cardValue, addCard } = useGame(onGameFinished)

    return (
        <div className="game-screen">
            <>
                {status === 'initial' ? (
                    <p>The Game is starting!</p>
                ) : status === 'showing-cards' && cardValue ? (
                    <div className="card-display">
                        <Card shape={cardValue.shape} color={cardValue.color} />
                    </div>
                ) : status === 'pause-before-answering' ? (
                    <p>Cards displayed! Do you remember them?</p>
                ) : status === 'answering' ? (
                    <div className="GameWidget_container">
                        <CardsToClick addCard={addCard} />
                    </div>
                ) : (
                    status === 'showing-results' &&
                    (win === true ? 'You win!' : "You've lost")
                )}
            </>
        </div>
    )
}

export default GameWidget
