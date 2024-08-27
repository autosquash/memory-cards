import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExitButton from '../components/ExitButton'
import GameWidget from '../components/GameWidget'
import { Game, SetNavState } from '../types'
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
    const [games, setGames] = useState<Game[]>([])
    const handleGameFinished = () => setStartGameButtonEnabled(true)
    const addGame = (game: Game) => {
        setGames([...games, game])
    }
    return (
        <div className="start-screen">
            <div className="main-game">
                {playing ? (
                    <GameWidget
                        key={gameIndex}
                        gameIndex={gameIndex}
                        onGameFinished={handleGameFinished}
                        numberOfCardsToRemember={numberOfCardsToRemember}
                        addGame={addGame}
                    />
                ) : (
                    <p>{t('Click Start Game')}</p>
                )}
            </div>
            <div className="bottom-bar">
                <div className="StartScreen_user-data">
                    <p className="user-label">
                        {t('User')} {userName}
                    </p>
                    <p className="user-label">
                        {t('Score')}{' '}
                        {games.reduce(
                            (partialSum, game) =>
                                partialSum +
                                (game.isWin ? numberOfCardsToRemember : 0),
                            0
                        )}
                    </p>
                </div>

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
