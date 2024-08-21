import { useState } from 'react'
import { SetNavState } from '../types'
import ExitButton from './ExitButton'
import GameWidget from './GameWidget'
import './StartScreen.css'

interface Props {
    userName: string
    setNavState: SetNavState
}

const StartScreen = ({ userName, setNavState }: Props) => {
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
                    <p>Click 'Start Game' when you are ready</p>
                )}
            </div>
            <div className="bottom-bar">
                <p className="user-label">User: {userName}</p>
                <button
                    className="start-button"
                    onClick={() => {
                        setGameIndex(gameIndex + 1)
                        setPlaying(true)
                        setStartGameButtonEnabled(false)
                    }}
                    disabled={!startGameButtonEnabled}
                >
                    Start Game
                </button>
                <ExitButton setNavState={setNavState} />
            </div>
        </div>
    )
}

export default StartScreen
