import { SetNavState } from '../types'
import ExitButton from './ExitButton'

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
            <ExitButton setNavState={setNavState} />
        </div>
    )
}

export default StartScreen
