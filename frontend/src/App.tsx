import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import NavPage from './components/NavPage'
import Demo from './demos/Demo'
import useStorage from './hooks/useStorage'

const DEFAULT_LANGUAGE = 'en'

function App() {
    const { t, i18n } = useTranslation()
    const [showingDemo, setShowingDemo] = useState(false)
    const [numberOfCardsToRemember, setNumberOfCardsToRemember] = useState(2)
    const storage = useRef(useStorage()).current
    useEffect(() => {
        const lang = storage.read('language') || DEFAULT_LANGUAGE
        i18n.changeLanguage(lang as string)
        return
    }, [i18n, storage])

    const handleOnChange = () => {
        setShowingDemo(!showingDemo)
    }
    return (
        <>
            <div id="demo-checkbox">
                <input
                    type="checkbox"
                    id="demo-checkbox-input"
                    checked={showingDemo}
                    onChange={handleOnChange}
                />
                <label htmlFor="demo-checkbox-input">
                    {t('Display demos')}
                </label>
            </div>

            {showingDemo ? (
                <Demo
                    numberOfCardsToRemember={numberOfCardsToRemember}
                    setNumberOfCardsToRemember={setNumberOfCardsToRemember}
                />
            ) : (
                <NavPage numberOfCardsToRemember={numberOfCardsToRemember} />
            )}
        </>
    )
}

export default App
