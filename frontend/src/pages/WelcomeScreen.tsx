import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import WelcomeScreenContent from '../components/welcomeScreen/WelcomeScreenContent'
import Demo from '../demos/Demo'
import { SetNavState, User } from '../types'
import styles from './WelcomeScreen.module.css'

interface Props {
    setNavState: SetNavState
    usersMap: ReadonlyMap<string, User> | null
    commitUser: (newName: string) => void
    createUserErr: string | null
}

const WelcomeScreen = ({
    setNavState,
    usersMap,
    commitUser,
    createUserErr,
}: Props) => {
    const { t } = useTranslation()
    const [showingDemo, setShowingDemo] = useState(false)

    const handleOnDemoCheckboxChange = () => {
        setShowingDemo(!showingDemo)
    }
    // TODO: don't show call to register until registered users are loaded
    return (
        <>
            <div id="demo-checkbox" className={styles.demoCheckbox}>
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
                <WelcomeScreenContent
                    userNames={usersMap && Array.from(usersMap.keys())}
                    commitUser={commitUser}
                    createUserErr={createUserErr}
                    setNavState={setNavState}
                />
            )}
        </>
    )
}

export default WelcomeScreen
