import useNav from '../hooks/useNav'
import StartScreen from './StartScreen'
import WelcomeScreen from './WelcomeScreen'

const NavPage = () => {
    const { navData, setActiveUser } = useNav()

    switch (navData.page) {
        case 'home':
            return <WelcomeScreen setActiveUser={setActiveUser} />
        case 'start-page':
            if (navData.userName === null) {
                throw new Error("Can't go to start page without a userName")
            }
            return (
                <StartScreen
                    userName={navData.userName}
                    setActiveUser={setActiveUser}
                />
            )

        default:
            break
    }
}
export default NavPage
