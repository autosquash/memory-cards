import { useState } from 'react'

import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>Hello world</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p>This is an app built with vite, react and typescript</p>
        </>
    )
}

export default App
