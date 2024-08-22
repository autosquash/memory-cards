import { useState } from 'react'
import './Demo.css'
import DemoCard from './DemoCard'

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
                    Demos Home
                </option>
                <option value="demo-card">DemoCard</option>
            </select>
            <div className="demo">
                {(() => {
                    switch (demoName) {
                        case 'demo-home':
                            return (
                                <div>
                                    <h2>Demos</h2>
                                    <p>
                                        From here it's possible to explore the
                                        demos
                                        <br />
                                        (just use the dropdown at the top)
                                    </p>
                                </div>
                            )
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
