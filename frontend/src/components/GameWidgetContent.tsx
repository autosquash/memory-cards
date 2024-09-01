import { useTranslation } from 'react-i18next'
import { GameView } from '../hooks/useGame'
import { CardData } from '../types'
import Card from './Card'
import CardSequence from './CardSequence'
import CardsToClick from './CardsToClick'
import styles from './GameWidgetContent.module.css'

const GameWidgetContent = ({
    status,
    win,
    cardValue,
    sequenceToRemember,
    userSequence,
    addCard,
}: GameView) => {
    const { t } = useTranslation()
    const numberOfCardsToRemember = sequenceToRemember.length

    switch (status) {
        case 'initial':
            return <p>{t('Game starting', { n: numberOfCardsToRemember })}</p>
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
export default GameWidgetContent
