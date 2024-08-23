import { useTranslation } from 'react-i18next'
import useNames from '../hooks/useNames'
import { SetNavState } from '../types'
import NamesListing from './NamesListing'
import './WelcomeScreen.css'

interface Props {
    setNavState: SetNavState
}

const WelcomeScreen = ({ setNavState }: Props) => {
    const { t } = useTranslation()
    const { userNames, newUserName, commitUser, setNewUserName } = useNames()

    const handleAddName = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        commitUser(newUserName)
    }
    const handleUserSelection = (name: string) => {
        setNavState(name)
    }
    return (
        <div className="welcome-screen">
            <h3>{t('Who are you?')}</h3>
            <NamesListing
                userNames={userNames}
                onUserSelection={handleUserSelection}
            />
            <form className="name-form" onSubmit={handleAddName}>
                <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder={t('Add a new user...')}
                />
                <button type="submit">{t('Add new user')}</button>
            </form>
        </div>
    )
}

export default WelcomeScreen
