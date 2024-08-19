import { useState } from 'react'

interface Props {
    userName: string
    setActiveUser: (user: string | null) => void
}

const StartScreen = ({ userName, setActiveUser }: Props) => {
    const [playing, setPlaying] = useState(false)
    return (
        <div className="start-screen">
            <p>User: {userName}</p>
            <p>Game status: {playing ? 'playing' : 'not playing'} </p>
            <button
                className="start-button"
                onClick={() => {
                    setPlaying(true)
                }}
            >
                Start Game
            </button>
            <button
                className="exit-button"
                onClick={() => {
                    setActiveUser(null)
                }}
            >
                Exit
            </button>
        </div>
    )
}

export default StartScreen
