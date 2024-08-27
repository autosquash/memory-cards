import useNav from '../hooks/useNav'
import Settings from './Settings'
import StartScreen from './StartScreen'
import WelcomeScreen from './WelcomeScreen'

function validateUserNameNotMissing(
    userName: string | null,
    page: string
): asserts userName is string {
    if (userName === null) {
        throw new Error(`Can't go to ${page} without a userName`)
    }
}

interface Props {
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
}

const NavPage = ({
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
}: Props) => {
    const { navData, setNavState } = useNav()

    switch (navData.page) {
        case 'home':
            return <WelcomeScreen setNavState={setNavState} />
        case 'start-page':
            validateUserNameNotMissing(navData.userName, 'the start page')
            return (
                <StartScreen
                    userName={navData.userName}
                    setNavState={setNavState}
                    numberOfCardsToRemember={numberOfCardsToRemember}
                />
            )
        case 'settings-page':
            return (
                <Settings
                    numberOfCardsToRemember={numberOfCardsToRemember}
                    setNumberOfCardsToRemember={setNumberOfCardsToRemember}
                    setNavState={setNavState}
                />
            )
        default:
            break
    }
}
export default NavPage
