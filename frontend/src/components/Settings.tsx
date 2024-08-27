import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import './Settings.css'

interface Props {
    numberOfCardsToRemember: number
    setNumberOfCardsToRemember: (n: number) => void
}

type SelectOption = '2' | '3'

const Settings = ({
    numberOfCardsToRemember,
    setNumberOfCardsToRemember,
}: Props) => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>{t('Settings')}</h2>
            <h3>{t('Language')}</h3>
            <div>
                <ChangeLanguageButton text={t('spanish')} lang_code={'es'} />
                <ChangeLanguageButton text={t('english')} lang_code={'en'} />
            </div>
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
    return (
        <button
            className="Settings_button"
            onClick={() => changeLanguage(lang_code)}
        >
            {text}
        </button>
    )
}

const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    let jsonData = window.localStorage.getItem('memory-cards')
    const data = jsonData ? JSON.parse(jsonData) : {}
    data['language'] = lang
    jsonData = JSON.stringify(data)
    window.localStorage.setItem('memory-cards', jsonData)
}

export default Settings
