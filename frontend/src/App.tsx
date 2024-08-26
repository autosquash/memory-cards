import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import NavPage from './components/NavPage'
import Demo from './demos/Demo'

function App() {
    const { t } = useTranslation()
    const [showingDemo, setShowingDemo] = useState(false)
    const numberOfCardsToRemember = 3
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
                <Demo />
            ) : (
                <NavPage numberOfCardsToRemember={numberOfCardsToRemember} />
            )}
        </>
    )
}

export default App
