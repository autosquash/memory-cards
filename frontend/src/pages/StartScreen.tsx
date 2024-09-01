import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExitButton from '../components/ExitButton'
import GameWidget from '../components/GameWidget'
import { Game, SetNavState, User } from '../types'
import styles from './StartScreen.module.css'

interface Props {
    user: User
    setNavState: SetNavState
    numberOfCardsToRemember: number
    automaticMode: boolean
    addGame: (
        userName: string,
        game: Game,
        numberOfCardsToRemember: number
    ) => void
    updateNumberOfCardsToRemember: () => void
}

const StartScreen = ({
    user,
    setNavState,
    numberOfCardsToRemember,
    addGame,
    automaticMode,
    updateNumberOfCardsToRemember,
}: Props) => {
    const { t } = useTranslation()
    const [playing, setPlaying] = useState(false)
    const [gameIndex, setGameIndex] = useState(0)
    const [startGameButtonEnabled, setStartGameButtonEnabled] = useState(true)

    const handleGameFinished = useCallback(() => {
        setStartGameButtonEnabled(true)
    }, [])
    const addThisGame = (game: Game) => {
        addGame(user.name, game, numberOfCardsToRemember)
    }
    const recentGamesPlayedRef = useRef(user.recentGamesPlayed)
    recentGamesPlayedRef.current = user.recentGamesPlayed

    return (
        <div className={styles.startScreen}>
            <div className={styles.mainGame}>
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
            <div className={styles.bottomBar}>
                <div className={styles.userData}>
                    <p className={styles.userLabel}>
                        {t('User')} {user.name}
                    </p>
                    <p className={styles.userLabel}>
                        {t('Score')} {user.score}
                    </p>
                </div>

                <button
                    className={styles.startButton}
                    onClick={() => {
                        setGameIndex(gameIndex + 1)
                        setPlaying(true)
                        setStartGameButtonEnabled(false)
                        if (automaticMode) {
                            updateNumberOfCardsToRemember()
                        }
                    }}
                    disabled={!startGameButtonEnabled}
                >
                    {user.recentGamesPlayed.length
                        ? t('Replay')
                        : t('Start Game')}
                </button>
                <ExitButton setNavState={setNavState} />
            </div>
        </div>
    )
}

export default StartScreen
