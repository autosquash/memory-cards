import { useTranslation } from 'react-i18next'
import useGame from '../hooks/useGame'
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
            <>
                {status === 'initial' ? (
                    <p>{t('Game starting')}</p>
                ) : status === 'showing-cards' && cardValue ? (
                    <div className="card-display">
                        <Card shape={cardValue.shape} color={cardValue.color} />
                    </div>
                ) : status === 'pause-before-answering' ? (
                    <p>{t('Cards displayed')}</p>
                ) : status === 'answering' ? (
                    <div className="GameWidget_container">
                        <CardsToClick addCard={addCard} />
                    </div>
                ) : (
                    status === 'showing-results' && (
                        <h2>{win === true ? t('win') : t('lost')}</h2>
                    )
                )}
                {['answering', 'showing-results'].includes(status) && (
                    <>
                        <p>{t('Your sequence')}</p>{' '}
                        <div className="CardSequence_sequence">
                            <CardSequence sequence={userSequence} scale={0.4} />
                        </div>
                    </>
                )}
                {status === 'showing-results' && (
                    <>
                        <p>{t('Actual sequence')}</p>
                        <div className="CardSequence_sequence">
                            {sequence && (
                                <CardSequence sequence={sequence} scale={0.4} />
                            )}
                        </div>
                    </>
                )}
            </>
        </div>
    )
}

export default GameWidget
