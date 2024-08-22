import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SetNavState } from '../types'
import ExitButton from './ExitButton'
import GameWidget from './GameWidget'
import './StartScreen.css'

interface Props {
    userName: string
    setNavState: SetNavState
}

const StartScreen = ({ userName, setNavState }: Props) => {
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
