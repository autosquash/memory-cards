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
            'just use dropdown': 'just use the dropdown at the top',
            'Who are you?': 'Who are you?',
            'Add new user': 'Add new user',
            'Waiting...': 'Waiting...',
            'Add a new user...': 'Add a new user...',
            'Click Start Game': "Click 'Start Game' when you are ready",
            'Start Game': 'Start Game',
            Exit: 'Exit',
            User: 'User:',
            'Game starting': 'The Game is starting!',
            'Cards displayed': 'Cards displayed! Do you remember them?',
            win: 'You win!',
            lost: `You've lost`,
            'Your sequence': 'Your sequence:',
            'Actual sequence': 'Actual sequence:',
            'Display demos': 'Display demos and settings',
            Language: 'Language:',
        },
    },
    es: {
        translation: {
            'From here explore demos':
                'Desde aquí se pueden explorar las demos',
            Settings: 'Ajustes',
            spanish: 'español',
            english: 'inglés',
            'just use dropdown':
                'simplemente utiliza el menú desplegable de arriba',
            'Who are you?': '¿Quién eres?',
            'Add new user': 'Añadir un/a nueva/o usuaria/o',
            'Waiting...': 'Esperando...',
            'Add a new user...': 'Añadir a un nuevo usuario...',
            'Click Start Game': "Pulsa 'Iniciar Juego' cuando estés lista/o",
            'Start Game': 'Iniciar Juego',
            Exit: 'Salir',
            User: 'Usuaria/o:',
            'Game starting': '¡Empieza el juego!',
            red: 'rojo',
            green: 'verde',
            blue: 'azul',
            square: 'cuadrado',
            circle: 'círculo',
            triangle: 'triángulo',
            'Cards displayed': '¡Tarjetas mostradas! ¿Podrás recordarlas?',
            win: '¡Excelente!',
            lost: '¡Fallaste! La próxima vez lo harás mejor',
            'Your sequence': 'Tu secuencia:',
            'Actual sequence': 'Secuencia original:',
            'Display demos': 'Mostrar demos y ajustes',
            'Unknown option': 'Opción desconocida',
            Language: 'Idioma:',
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
