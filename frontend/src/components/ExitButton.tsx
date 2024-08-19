import { SetNavState } from '../types'

interface Props {
    setNavState: SetNavState
}

const ExitButton = ({ setNavState }: Props) => {
    return (
        <button
            className="exit-button"
            onClick={() => {
                setNavState(null)
            }}
        >
            Exit
        </button>
    )
}

export default ExitButton
