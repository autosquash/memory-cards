import useNav from '../hooks/useNav'
import { check } from '../utils'
import Settings from './Settings'
import StartScreen from './StartScreen'
import WelcomeScreen from './WelcomeScreen'

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
            check(navData.userName)
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
