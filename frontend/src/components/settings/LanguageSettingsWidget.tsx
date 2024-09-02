import { useRef } from 'react'
import useStorage from '../../hooks/useStorage'
import i18n, { STORAGE_LANGUAGE_KEY } from '../../i18n'
import styles from './LanguageSettingsWidget.module.css'

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
        storage.write(STORAGE_LANGUAGE_KEY, lang)
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

export default LanguageSettingsWidget
