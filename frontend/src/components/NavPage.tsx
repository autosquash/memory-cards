import { useState } from 'react'
import StartScreen from './StartScreen'
import WelcomeScreen from './WelcomeScreen'

const NavPage = () => {
    const [page, setPage] = useState('home')
    const [userName, setUserName] = useState<string | null>(null)
    switch (page) {
        case 'home':
            return <WelcomeScreen setPage={setPage} setUserName={setUserName} />
        case 'start-page':
            if (userName === null) {
                throw new Error("Can't go to start page without a userName")
            }
            return (
                <StartScreen
                    userName={userName}
                    setPage={setPage}
                    setUserName={setUserName}
                />
            )

        default:
            break
    }
}
export default NavPage
