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
            'Waiting...': 'Waiting...',
            'Click Start Game': "Click 'Start Game' when you are ready",
            'Start Game': 'Start Game',
            Exit: 'Exit',
            User: 'User:',
            Score: 'Score:',
            'Game starting':
                'The Game is starting! Remember the sequence of {{n}} cards.',
            'Cards displayed': 'Cards displayed! Do you remember them?',
            win: 'You win!',
            lost: `You've lost`,
            'Your sequence': 'Your sequence:',
            'Actual sequence': 'Actual sequence:',
            'Display demos': 'Display demos and settings',
            Language: 'Language:',
            'No users yet': 'There is no registered users yet',
            'call to register':
                'Or, if you are not registered yet, use this form:',
            'There was an error': 'There was an error:',
            'user already exists': 'user {{user}} already exists',
            'user name not valid': 'user name "{{name}}" is not valid',
            NumberOfCards: 'Number of cards to remember:',
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
            'Add me': 'Añádeme',
            'Waiting...': 'Esperando...',
            'Your name': 'Tu nombre',
            'Click Start Game': "Pulsa 'Iniciar Juego' cuando estés lista/o",
            'Start Game': 'Iniciar Juego',
            Exit: 'Salir',
            User: 'Usuaria/o:',
            Score: 'Puntuación:',
            'Game starting':
                '¡Empieza el juego! Recuerda la secuencia de {{n}} tarjetas.',
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
            'No users yet': 'Aún no hay usuarios registrados',
            'call to register':
                'O, si todavía no te has registrado, usa este formulario:',
            'There was an error': 'Hubo un error:',
            'user already exists': 'el usuario {{user}} ya existe',
            'user name not valid':
                'el nombre de usuario "{{name}}" no es válido',
            'unknown error': 'error desconocido',
            NumberOfCards: 'Número de tarjetas a recordar',
            Back: 'Volver',
            Automatic: 'Automático',
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
