import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import useStorage from './hooks/useStorage'
import { STORAGE_LANGUAGE_KEY } from './i18n'
import NavPage from './pages/NavPage'

const DEFAULT_LANGUAGE = 'en'
const DEFAULT_AUTOMATIC_MODE = true

function App() {
    const { i18n } = useTranslation()
    const [automaticMode, setAutomaticMode] = useState(DEFAULT_AUTOMATIC_MODE)
    const [numberOfCardsToRemember, setNumberOfCardsToRemember] = useState(2)
    const storage = useRef(useStorage()).current
    useEffect(() => {
        const lang = storage.read(STORAGE_LANGUAGE_KEY) || DEFAULT_LANGUAGE
        i18n.changeLanguage(lang as string)
        return
    }, [i18n, storage])

    return (
        <NavPage
            numberOfCardsToRemember={numberOfCardsToRemember}
            setNumberOfCardsToRemember={setNumberOfCardsToRemember}
            automaticMode={automaticMode}
            setAutomaticMode={setAutomaticMode}
        />
    )
}

export default App
