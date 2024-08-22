import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            'From here explore demos':
                "From here it's possible to explore the demos",
            Settings: 'Settings',
            spanish: 'spanish',
            english: 'english',
        },
    },
    es: {
        translation: {
            'From here explore demos':
                'Desde aquí se pueden explorar las demos',
            Settings: 'Ajustes',
            spanish: 'español',
            english: 'inglés',
        },
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',

    interpolation: {
        escapeValue: false, // react already safes from xss
    },
})

export default i18n
