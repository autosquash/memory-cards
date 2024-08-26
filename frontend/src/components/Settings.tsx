import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import './Settings.css'

const Settings = () => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>{t('Settings')}</h2>
            <h3>{t('Language')}</h3>
            <div>
                <ChangeLanguageButton text={t('spanish')} lang_code={'es'} />
                <ChangeLanguageButton text={t('english')} lang_code={'en'} />
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
    return (
        <button
            className="Settings_button"
            onClick={() => changeLanguage(lang_code)}
        >
            {text}
        </button>
    )
}

const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
}

export default Settings
