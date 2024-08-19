import { SetNavState } from '../types'

interface Props {
    userName: string
    setNavState: SetNavState
}
const GameScreen = ({ userName, setNavState }: Props) => {
    return (
        <div>
            <p>User: {userName}</p>
            <p>The Game has started!</p>
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

export default GameScreen
