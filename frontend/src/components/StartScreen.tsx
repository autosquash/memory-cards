import { SetNavState } from '../types'

interface Props {
    userName: string
    setNavState: SetNavState
}

const StartScreen = ({ userName, setNavState }: Props) => {
    return (
        <div className="start-screen">
            <p>User: {userName}</p>
            <button
                className="start-button"
                onClick={() => {
                    setNavState(userName, true)
                }}
            >
                Start Game
            </button>
            <button
                className="exit-button"
                onClick={() => {
                    setNavState(null)
                }}
            >
                Exit
            </button>
        </div>
    )
}

export default StartScreen
