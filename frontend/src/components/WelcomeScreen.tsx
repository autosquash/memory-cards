import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Demo from '../demos/Demo'
import useNames from '../hooks/useNames'
import { SetNavState } from '../types'
import NamesListing from './NamesListing'
import './WelcomeScreen.css'

interface Props {
    setNavState: SetNavState
}

const WelcomeScreen = ({ setNavState }: Props) => {
    const { t } = useTranslation()
    const [showingDemo, setShowingDemo] = useState(false)
    const {
        userNames,
        newUserName,
        commitUser,
        setNewUserName,
        createUserErr,
    } = useNames()

    const handleAddName = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        commitUser(newUserName)
    }
    const handleUserSelection = (name: string) => {
        setNavState('start-page', name)
    }
    const handleOnDemoCheckboxChange = () => {
        setShowingDemo(!showingDemo)
    }
    // TODO: don't show call to register until registered users are loaded
    return (
        <>
            <div id="demo-checkbox">
                <input
                    type="checkbox"
                    id="demo-checkbox-input"
                    checked={showingDemo}
                    onChange={handleOnDemoCheckboxChange}
                />
                <label htmlFor="demo-checkbox-input">
                    {t('Display demos')}
                </label>
            </div>

            {showingDemo ? (
                <Demo />
            ) : (
                <div className="welcome-screen">
                    <h3>{t('Who are you?')}</h3>
                    <NamesListing
                        userNames={userNames}
                        onUserSelection={handleUserSelection}
                    />

                    {createUserErr ? (
                        <div
                            className="WelcomeScreen_name-form-or-err"
                            style={{ backgroundColor: 'red' }}
                        >
                            <p>
                                {t('There was an error')} {createUserErr}{' '}
                            </p>
                        </div>
                    ) : (
                        <>
                            <p>{t('call to register')}</p>
                            <form
                                className="WelcomeScreen_name-form-or-err"
                                onSubmit={handleAddName}
                            >
                                <input
                                    type="text"
                                    name="user-name"
                                    value={newUserName}
                                    onChange={(e) =>
                                        setNewUserName(e.target.value)
                                    }
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
                        </>
                    )}
                    <div
                        className="WelcomeScreen_settings_button"
                        onClick={() => setNavState('settings-page')}
                    >
                        ⚙️
                    </div>
                </div>
            )}
        </>
    )
}

export default WelcomeScreen
