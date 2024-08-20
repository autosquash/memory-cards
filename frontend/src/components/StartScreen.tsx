import { useState } from 'react'
import { SetNavState } from '../types'
import ExitButton from './ExitButton'
import GameScreen from './GameScreen'
import './StartScreen.css'

interface Props {
    userName: string
    setNavState: SetNavState
}

const StartScreen = ({ userName, setNavState }: Props) => {
    const [playing, setPlaying] = useState(false)
    const [gameIndex, setGameIndex] = useState(0)
    return (
        <div className="start-screen">
            <div className="main-game">
                {playing && (
                    <GameScreen
                        userName={userName}
                        setNavState={setNavState}
                        key={gameIndex}
                    />
                )}
            </div>
            <div className="bottom-bar">
                <p className="user-label">User: {userName}</p>
                <button
                    className="start-button"
                    onClick={() => {
                        setGameIndex(gameIndex + 1)
                        setPlaying(true)
                    }}
                >
                    Start Game
                </button>
                <ExitButton setNavState={setNavState} />
            </div>
        </div>
    )
}

export default StartScreen
