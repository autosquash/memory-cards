import useGame from '../hooks/useGame'
import Card from './Card'
import CardsToClick from './CardsToClick'
import './GameWidget.css'

interface Props {
    enableStartGameButton: () => void
}

const GameWidget = ({ enableStartGameButton }: Props) => {
    const handleGameFinished = enableStartGameButton
    const { status, win, cardValue, addCard } = useGame(handleGameFinished)

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
                    <CardsToClick addCard={addCard} />
                ) : (
                    status === 'showing-results' &&
                    (win === true ? 'You win!' : "You've lost")
                )}
            </>
        </div>
    )
}

export default GameWidget
