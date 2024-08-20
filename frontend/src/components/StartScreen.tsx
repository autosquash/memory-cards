import { SetNavState } from '../types'
import ExitButton from './ExitButton'
import './StartScreen.css'

interface Props {
    userName: string
    setNavState: SetNavState
}

const StartScreen = ({ userName, setNavState }: Props) => {
    return (
        <div className="start-screen">
            <div className="main-game"></div>
            <div className="bottom-bar">
                <p>User: {userName}</p>
                <button
                    className="start-button"
                    onClick={() => {
                        setNavState(userName, true)
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
