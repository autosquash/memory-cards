import { useState } from 'react'
import './Demo.css'
import DemoCard from './DemoCard'
import DemoHome from './DemoHome'

type SelectOption = 'demo-home' | 'demo-card'

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
            </select>
            <div className="demo">
                {(() => {
                    switch (demoName) {
                        case 'demo-home':
                            return <DemoHome />
                        case 'demo-card':
                            return <DemoCard />
                        default:
                            return <p>Unknown option</p>
                    }
                })()}
            </div>
        </>
    )
}

export default Demo
