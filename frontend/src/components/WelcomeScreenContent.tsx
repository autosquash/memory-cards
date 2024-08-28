import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddUserForm from '../components/AddUserForm'
import NamesListing from '../components/NamesListing'
import { SetNavState } from '../types'
import './WelcomeScreenContent.css'

interface Props {
    userNames: string[] | null
    commitUser: (newName: string) => void
    createUserErr: string | null
    setNavState: SetNavState
}

const WelcomeScreenContent = ({
    userNames,
    commitUser,
    createUserErr,
    setNavState,
}: Props) => {
    const { t } = useTranslation()
    const [newUserName, setNewUserName] = useState<string>('')
    const handleUserSelection = (userName: string) => {
        if (!userNames) {
            throw new Error('No users but tring to select one of them')
        }
        if (!userName) {
            throw new Error('Trying to go to start page with no user selected')
        }
        setNavState('start-page', userName)
    }
    return (
        <div className="WelcomeScreenContent_main">
            <h3>{t('Who are you?')}</h3>
            <NamesListing
                userNames={userNames}
                onUserSelection={handleUserSelection}
            />

            {createUserErr ? (
                <NameErrorBox createUserErr={createUserErr} />
            ) : (
                <AddUserForm
                    newUserName={newUserName}
                    commitUser={(newName: string) => {
                        setNewUserName('')
                        commitUser(newName)
                    }}
                    setNewUserName={setNewUserName}
                />
            )}
            {<SettingsButton setNavState={setNavState} />}
        </div>
    )
}

interface NameErrorBoxProps {
    createUserErr: string
}

function NameErrorBox({ createUserErr }: NameErrorBoxProps) {
    const { t } = useTranslation()
    return (
        <div
            className="WelcomeScreenContent_name-err"
            style={{ backgroundColor: 'red' }}
        >
            <p>
                {t('There was an error')} {createUserErr}
            </p>
        </div>
    )
}

interface SettingsButtonProps {
    setNavState: SetNavState
}

function SettingsButton({ setNavState }: SettingsButtonProps) {
    return (
        <div
            className="WelcomeScreenContent_settings_button"
            onClick={() => setNavState('settings-page')}
        >
            ⚙️
        </div>
    )
}

export default WelcomeScreenContent
