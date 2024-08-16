import axios from 'axios'
import { useEffect, useState } from 'react'

import './WelcomeScreen.css'

const url = 'http://127.0.0.1:5000'
const WelcomeScreen = () => {
    const [names, setNames] = useState<null | string[]>(null)
    useEffect(() => {
        axios
            .get(url + '/names')
            .then((response) => setNames(response.data))
            .catch((error) => console.error('Error fetching names:', error))
    }, [])
    return (
        <div>
            <h3>Names:</h3>
            {names !== null ? (
                <ul>
                    {names.map((name, index) => (
                        <li key={index}>
                            <span className="name">{name}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Waiting...</p>
            )}{' '}
        </div>
    )
}

export default WelcomeScreen
