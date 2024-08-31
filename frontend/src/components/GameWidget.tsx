import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useGame, { GameView } from '../hooks/useGame'
import { reprCardData } from '../model'
import { CardData, Game } from '../types'
import { repr } from '../utils'
import Card from './Card'
import CardSequence from './CardSequence'
import CardsToClick from './CardsToClick'
import styles from './GameWidget.module.css'

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

const GameWidgetContent = ({
    status,
    win,
    cardValue,
    sequenceToRemember,
    userSequence,
    addCard,
}: GameView) => {
    const { t } = useTranslation()

    switch (status) {
        case 'initial':
            return <p>{t('Game starting')}</p>
        case 'showing-cards':
            return (
                cardValue && (
                    <div className={styles.cardDisplay}>
                        <Card shape={cardValue.shape} color={cardValue.color} />
                    </div>
                )
            )
        case 'pause-before-answering':
            return <p>{t('Cards displayed')}</p>
        case 'answering':
            return (
                <>
                    <div className={styles.container}>
                        <CardsToClick addCard={addCard} />
                    </div>
                    <SmallCardSequenceWithTitle
                        title={t('Your sequence')}
                        sequence={userSequence}
                    />
                </>
            )
        case 'showing-results':
            return (
                <>
                    <h2>{win === true ? t('win') : t('lost')}</h2>
                    <SmallCardSequenceWithTitle
                        title={t('Your sequence')}
                        sequence={userSequence}
                    />
                    <SmallCardSequenceWithTitle
                        title={t('Actual sequence')}
                        sequence={sequenceToRemember}
                    />
                </>
            )
        default:
            console.error('Unknown status: ' + status)
            return
    }
}

const SmallCardSequenceWithTitle = ({
    title,
    sequence,
}: {
    title: string
    sequence: ReadonlyArray<CardData>
}) => {
    return (
        <>
            <p>{title}</p>
            <div className={styles.cardSequence}>
                <CardSequence sequence={sequence} scale={0.4} />
            </div>
        </>
    )
}

export default GameWidget
