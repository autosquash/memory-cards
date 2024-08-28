import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useStorage from '../hooks/useStorage'
import i18n from '../i18n'
import { SetNavState } from '../types'
import styles from './Settings.module.css'

interface Props {
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
    setNavState: SetNavState
}

type SelectOption = '2' | '3'

const Settings = ({
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
    setNavState,
}: Props) => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>{t('Settings')}</h2>
            <div>
                <h3>{t('Language')}</h3>
                <div>
                    <ChangeLanguageButton
                        text={t('spanish')}
                        lang_code={'es'}
                    />
                    <ChangeLanguageButton
                        text={t('english')}
                        lang_code={'en'}
                    />
                </div>
            </div>
            <div>
                <h3>{t('NumberOfCards')}</h3>
                <select
                    value={numberOfCardsToRemember}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setNumberOfCardsToRemember(
                            parseInt(e.target.value as SelectOption)
                        )
                    }
                >
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <footer className={styles.footer}>
                <button onClick={() => setNavState('home')}>{t('Back')}</button>
            </footer>
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

export default Settings
