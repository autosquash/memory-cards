import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddUserForm from '../components/AddUserForm'
import NamesListing from '../components/NamesListing'
import Demo from '../demos/Demo'
import useUsers from '../hooks/useUsers'
import { SetNavState } from '../types'
import './WelcomeScreen.css'

interface Props {
    setNavState: SetNavState
}

const WelcomeScreen = ({ setNavState }: Props) => {
    const { t } = useTranslation()
    const [showingDemo, setShowingDemo] = useState(false)
    const { users, newUserName, commitUser, setNewUserName, createUserErr } =
        useUsers()

    const handleUserSelection = (userName: string) => {
        if (!users) {
            throw new Error('No users but tring to select one of them')
        }
        if (!userName) {
            throw new Error('Trying to go to start page with no user selected')
        }
        setNavState('start-page', userName)
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
                        userNames={users?.map((user) => user.name) || null}
                        onUserSelection={handleUserSelection}
                    />

                    {createUserErr ? (
                        <div
                            className="WelcomeScreen_name-form-or-err"
                            style={{ backgroundColor: 'red' }}
                        >
                            <p>
                                {t('There was an error')} {createUserErr}
                            </p>
                        </div>
                    ) : (
                        <AddUserForm
                            newUserName={newUserName}
                            commitUser={commitUser}
                            setNewUserName={setNewUserName}
                        />
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
