import { useTranslation } from 'react-i18next'
import ChangeNumberOfCardsWidget from '../components/settings/ChangeNumberOfCardsWidget'
import LanguageSettingsWidget from '../components/settings/LanguageSettingsWidget'
import { SetNavState } from '../types'
import styles from './Settings.module.css'

interface Props {
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
    automaticMode: boolean
    setNavState: SetNavState
    setAutomaticMode: (value: boolean) => void
}

const Settings = ({
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
    setNavState,
    automaticMode,
    setAutomaticMode,
}: Props) => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>{t('Settings')}</h2>
            <LanguageSettingsWidget />
            <ChangeNumberOfCardsWidget
                automaticMode={automaticMode}
                numberOfCardsToRemember={numberOfCardsToRemember}
                setNumberOfCardsToRemember={setNumberOfCardsToRemember}
                setAutomaticMode={setAutomaticMode}
            />
            <footer className={styles.footer}>
                <button onClick={() => setNavState('home')}>{t('Back')}</button>
            </footer>
        </div>
    )
}

export default Settings
