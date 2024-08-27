import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import NavPage from './components/NavPage'
import Demo from './demos/Demo'

function App() {
    const { t, i18n } = useTranslation()
    const [showingDemo, setShowingDemo] = useState(false)
    const [numberOfCardsToRemember, setNumberOfCardsToRemember] = useState(2)
    useEffect(() => {
        const jsonData = window.localStorage.getItem('memory-cards')
        const data = jsonData ? JSON.parse(jsonData) : {}
        const lang = data['language'] || 'en'
        i18n.changeLanguage(lang)
        return
    }, [i18n])

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
