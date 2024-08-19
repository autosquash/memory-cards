import { useState } from 'react'

interface Props {
    userName: string
    setPage: (page: string) => void
    setUserName: (userName: string | null) => void
}

const StartScreen = ({ userName, setPage, setUserName }: Props) => {
    console.log({ userName })
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
                    setPage('home')
                    setUserName(null)
                }}
            >
                Exit
            </button>
        </div>
    )
}

export default StartScreen
