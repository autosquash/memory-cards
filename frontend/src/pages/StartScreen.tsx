import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExitButton from '../components/ExitButton'
import GameWidget from '../components/GameWidget'
import { Game, SetNavState, User } from '../types'
import './StartScreen.css'

interface Props {
    user: User
    setNavState: SetNavState
    numberOfCardsToRemember: number
    addGame: (
        userName: string,
        game: Game,
        numberOfCardsToRemember: number
    ) => void
}

const StartScreen = ({
    user,
    setNavState,
    numberOfCardsToRemember,
    addGame,
}: Props) => {
    const { t } = useTranslation()
    const [playing, setPlaying] = useState(false)
    const [gameIndex, setGameIndex] = useState(0)
    const [startGameButtonEnabled, setStartGameButtonEnabled] = useState(true)
    const [games, setGames] = useState<Game[]>([])
    const handleGameFinished = () => setStartGameButtonEnabled(true)
    const addThisGame = (game: Game) => {
        const newGames = [...games, game]
        setGames(newGames)
        addGame(user.name, game, numberOfCardsToRemember)
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
                        addGame={addThisGame}
                    />
                ) : (
                    <p>{t('Click Start Game')}</p>
                )}
            </div>
            <div className="bottom-bar">
                <div className="StartScreen_user-data">
                    <p className="user-label">
                        {t('User')} {user.name}
                    </p>
                    <p className="user-label">
                        {t('Score')} {user.score}
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
