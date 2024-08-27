import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExitButton from '../components/ExitButton'
import GameWidget from '../components/GameWidget'
import { SetNavState } from '../types'
import './StartScreen.css'

interface Props {
    userName: string
    setNavState: SetNavState
    numberOfCardsToRemember: number
}

const StartScreen = ({
    userName,
    setNavState,
    numberOfCardsToRemember,
}: Props) => {
    const { t } = useTranslation()
    const [playing, setPlaying] = useState(false)
    const [gameIndex, setGameIndex] = useState(0)
    const [startGameButtonEnabled, setStartGameButtonEnabled] = useState(true)
    const handleGameFinished = () => setStartGameButtonEnabled(true)
    return (
        <div className="start-screen">
            <div className="main-game">
                {playing ? (
                    <GameWidget
                        key={gameIndex}
                        onGameFinished={handleGameFinished}
                        numberOfCardsToRemember={numberOfCardsToRemember}
                    />
                ) : (
                    <p>{t('Click Start Game')}</p>
                )}
            </div>
            <div className="bottom-bar">
                <p className="user-label">
                    {t('User')} {userName}
                </p>
                <button
                    className="start-button"
                    onClick={() => {
                        setGameIndex(gameIndex + 1)
                        setPlaying(true)
                        setStartGameButtonEnabled(false)
                    }}
                    disabled={!startGameButtonEnabled}
                >
                    {t('Start Game')}
                </button>
                <ExitButton setNavState={setNavState} />
            </div>
        </div>
    )
}

export default StartScreen
