import { useRef } from 'react'
import useGame from '../hooks/useGame'
import { reprCardData } from '../model'
import { CardData, Game } from '../types'
import { repr } from '../utils'
import styles from './GameWidget.module.css'
import GameWidgetContent from './GameWidgetContent'

interface Props {
    gameIndex: number
    numberOfCardsToRemember: number
    onGameFinished: () => void
    addGame: (game: Game) => void
    providedSequence?: ReadonlyArray<CardData> | null
}

const GameWidget = ({
    onGameFinished,
    numberOfCardsToRemember,
    addGame,
    gameIndex,
    providedSequence = null,
}: Props) => {
    const addCurrentGame = useRef((isWin: boolean, numberOfCards: number) =>
        addGame({
            gameIndex,
            isWin,
            numberOfCards,
        })
    ).current

    const {
        status,
        win,
        cardValue,
        sequenceToRemember,
        userSequence,
        addCard,
    } = useGame(
        onGameFinished,
        numberOfCardsToRemember,
        addCurrentGame,
        providedSequence
    )

    return (
        <div
            data-testid="game-widget-container"
            className={styles.gameScreen}
            data-status={status}
            data-card-value={cardValue && reprCardData(cardValue)}
            data-win={repr(win)}
        >
            <GameWidgetContent
                status={status}
                win={win}
                cardValue={cardValue}
                sequenceToRemember={sequenceToRemember}
                userSequence={userSequence}
                addCard={addCard}
            />
        </div>
    )
}

export default GameWidget
