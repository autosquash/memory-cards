import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useStorage from '../hooks/useStorage'
import i18n from '../i18n'
import { SetNavState } from '../types'
import styles from './Settings.module.css'

interface Props {
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
    automaticMode: boolean
    setNavState: SetNavState
    setAutomaticMode: (value: boolean) => void
}

type SelectOption = '2' | '3'

const initialNumberOfCardsValue = 2

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

const LanguageSettingsWidget = () => {
    return (
        <div>
            <h3>{i18n.t('Language')}</h3>
            <div>
                <ChangeLanguageButton
                    text={i18n.t('spanish')}
                    lang_code={'es'}
                />
                <ChangeLanguageButton
                    text={i18n.t('english')}
                    lang_code={'en'}
                />
            </div>
        </div>
    )
}

interface ChangeLanguageButtonProps {
    text: string
    lang_code: string
}

const ChangeLanguageButton = ({
    text,
    lang_code,
}: ChangeLanguageButtonProps) => {
    const storage = useRef(useStorage()).current
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
        storage.write('language', lang)
    }
    return (
        <button
            className={styles.button}
            onClick={() => changeLanguage(lang_code)}
        >
            {text}
        </button>
    )
}

interface ChangeNumberOfCardsWidgetProps {
    automaticMode: boolean
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
    setAutomaticMode: (value: boolean) => void
}
function ChangeNumberOfCardsWidget({
    automaticMode,
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
    setAutomaticMode,
}: ChangeNumberOfCardsWidgetProps) {
    return (
        <div>
            <h3>{i18n.t('NumberOfCards')}</h3>
            <select
                value={automaticMode ? 'automatic' : numberOfCardsToRemember}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (e.target.value === 'automatic') {
                        setNumberOfCardsToRemember(initialNumberOfCardsValue)
                        setAutomaticMode(true)
                    } else {
                        setAutomaticMode(false)
                        setNumberOfCardsToRemember(
                            parseInt(e.target.value as SelectOption)
                        )
                    }
                }}
            >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="automatic">{i18n.t('Automatic')}</option>
            </select>
        </div>
    )
}

export default Settings
