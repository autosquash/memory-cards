import { SetNavState } from '../types'
import ExitButton from './ExitButton'

interface Props {
    userName: string
    setNavState: SetNavState
}
const GameScreen = ({ userName, setNavState }: Props) => {
    return (
        <div>
            <p>User: {userName}</p>
            <p>The Game has started!</p>
            <ExitButton setNavState={setNavState} />
        </div>
    )
}

export default GameScreen
