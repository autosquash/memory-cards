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
    // TODO: don't show call to register until registered users are loaded
    return (
        <div className="welcome-screen">
            <h3>{t('Who are you?')}</h3>
            <NamesListing
                userNames={userNames}
                onUserSelection={handleUserSelection}
            />
            <p>{t('call to register')}</p>
            <form className="name-form" onSubmit={handleAddName}>
                <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder={t('Your name')}
                />
                <button
                    type="submit"
                    className="WelcomeScreen_add-me-button"
                    disabled={!newUserName.trim()}
                >
                    {t('Add me')}{' '}
                </button>
            </form>
        </div>
    )
}

export default WelcomeScreen
