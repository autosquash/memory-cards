import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import useStorage from './hooks/useStorage'
import NavPage from './pages/NavPage'

const DEFAULT_LANGUAGE = 'en'

function App() {
    const { i18n } = useTranslation()

    const [numberOfCardsToRemember, setNumberOfCardsToRemember] = useState(2)
    const storage = useRef(useStorage()).current
    useEffect(() => {
        const lang = storage.read('language') || DEFAULT_LANGUAGE
        i18n.changeLanguage(lang as string)
        return
    }, [i18n, storage])

    return (
        <NavPage
            numberOfCardsToRemember={numberOfCardsToRemember}
            setNumberOfCardsToRemember={setNumberOfCardsToRemember}
        />
    )
}

export default App
