import useNav from '../hooks/useNav'
import useUsers from '../hooks/useUsers'
import { check } from '../utils'
import Settings from './Settings'
import StartScreen from './StartScreen'
import WelcomeScreen from './WelcomeScreen'

interface Props {
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
    automaticMode: boolean
    setAutomaticMode: (value: boolean) => void
}

const NavPage = ({
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
    automaticMode,
    setAutomaticMode,
}: Props) => {
    const { navData, setNavState } = useNav()
    const { usersMap, commitUser, createUserErr, addGame } = useUsers()

    switch (navData.page) {
        case 'home':
            return (
                <WelcomeScreen
                    setNavState={setNavState}
                    usersMap={usersMap}
                    commitUser={commitUser}
                    createUserErr={createUserErr}
                />
            )
        case 'start-page': {
            check(navData.userName)
            check(usersMap)
            const user = usersMap.get(navData.userName)!
            check(user)
            return (
                <StartScreen
                    key={user.name}
                    user={user}
                    setNavState={setNavState}
                    defaultNumberOfCardsToRemember={numberOfCardsToRemember}
                    addGame={addGame}
                    automaticMode={automaticMode}
                />
            )
        }
        case 'settings-page':
            return (
                <Settings
                    numberOfCardsToRemember={numberOfCardsToRemember}
                    setNumberOfCardsToRemember={setNumberOfCardsToRemember}
                    setNavState={setNavState}
                    automaticMode={automaticMode}
                    setAutomaticMode={setAutomaticMode}
                />
            )
        default:
            break
    }
}
export default NavPage
