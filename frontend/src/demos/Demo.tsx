import { useState } from 'react'
import './Demo.css'
import DemoCard from './DemoCard'
import DemoCardsToClick from './DemoCardsToClick'
import DemoHome from './DemoHome'

type SelectOption = 'demo-home' | 'demo-card' | 'demo-cards-to-click'

const Demo = () => {
    const [demoName, setDemoName] = useState<SelectOption>('demo-home')
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setDemoName(e.target.value as SelectOption)
    return (
        <>
            <select
                id="demo-select"
                value={demoName}
                onChange={handleSelectChange}
            >
                <option value="demo-home" selected>
                    Demos
                </option>
                <option value="demo-card">Demo Card</option>
                <option value="demo-cards-to-click">Demo CardsToClick</option>
            </select>
            <div className="demo">
                {(() => {
                    switch (demoName) {
                        case 'demo-home':
                            return <DemoHome />
                        case 'demo-card':
                            return <DemoCard />
                        case 'demo-cards-to-click':
                            return <DemoCardsToClick />
                        default:
                            return <p>Unknown option</p>
                    }
                })()}
            </div>
        </>
    )
}

export default Demo
