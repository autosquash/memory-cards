import { useTranslation } from 'react-i18next'
import useGame from '../hooks/useGame'
import { CardData } from '../types'
import Card from './Card'
import CardSequence from './CardSequence'
import CardsToClick from './CardsToClick'
import './GameWidget.css'

interface Props {
    onGameFinished: () => void
}

const GameWidget = ({ onGameFinished }: Props) => {
    const { t } = useTranslation()
    const { status, win, cardValue, sequence, userSequence, addCard } =
        useGame(onGameFinished)

    return (
        <div className="game-screen">
            {(() => {
                switch (status) {
                    case 'initial':
                        return <p>{t('Game starting')}</p>
                    case 'showing-cards':
                        return (
                            cardValue && (
                                <div className="card-display">
                                    <Card
                                        shape={cardValue.shape}
                                        color={cardValue.color}
                                    />
                                </div>
                            )
                        )
                    case 'pause-before-answering':
                        return <p>{t('Cards displayed')}</p>
                    case 'answering':
                        return (
                            <div className="GameWidget_container">
                                <CardsToClick addCard={addCard} />
                            </div>
                        )
                    case 'showing-results':
                        return <h2>{win === true ? t('win') : t('lost')}</h2>
                    default:
                        console.error('Unknown status: ' + status)
                        return
                }
            })()}
            <>
                {['answering', 'showing-results'].includes(status) && (
                    <SmallCardSequenceWithTitle
                        title={t('Your sequence')}
                        sequence={userSequence}
                    />
                )}
                {status === 'showing-results' && (
                    <SmallCardSequenceWithTitle
                        title={t('Actual sequence')}
                        sequence={sequence}
                    />
                )}
            </>
        </div>
    )
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
            <div className="CardSequence_sequence">
                <CardSequence sequence={sequence} scale={0.4} />
            </div>
        </>
    )
}

export default GameWidget
