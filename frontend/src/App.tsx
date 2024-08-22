import { useState } from 'react'
import './App.css'
import NavPage from './components/NavPage'
import Demo from './demos/Demo'

function App() {
    const [showingDemo, setShowingDemo] = useState(false)
    const handleOnChange = () => {
        setShowingDemo(!showingDemo)
    }
    return (
        <>
            <div id="demo-checkbox">
                <input
                    type="checkbox"
                    name="demo-checkbox"
                    checked={showingDemo}
                    onChange={handleOnChange}
                />
                <label htmlFor="demo-checkbox">
                    Display demos and settings
                </label>
            </div>

            {showingDemo ? <Demo /> : <NavPage />}
        </>
    )
}

export default App
