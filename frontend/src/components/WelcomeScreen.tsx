import { useTranslation } from 'react-i18next'
import useNames from '../hooks/useNames'
import { SetNavState } from '../types'
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
    const handleChooseUser = (
        _: React.MouseEvent<HTMLElement>,
        name: string
    ) => {
        setNavState(name)
    }
    return (
        <div className="welcome-screen">
            <h3>{t('Who are you?')}</h3>
            <div className="names-list-container">
                {userNames !== null ? (
                    <ul className="names-list">
                        {userNames.map((name, index) => (
                            <li key={index}>
                                <button
                                    className="user-button"
                                    onClick={(event) =>
                                        handleChooseUser(event, name)
                                    }
                                >
                                    <span className="name">{name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('Waiting...')}</p>
                )}
            </div>
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
