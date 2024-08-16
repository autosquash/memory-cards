import axios from 'axios'
import { useEffect, useState } from 'react'

const url = 'http://127.0.0.1:5000'
const WelcomeScreen = () => {
    const [names, setNames] = useState([])
    useEffect(() => {
        axios
            .get(url + '/names')
            .then((response) => setNames(response.data))
            .catch((error) => console.error('Error fetching names:', error))
    }, [])
    return (
        <div>
            <h3>Names:</h3>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>{' '}
        </div>
    )
}

export default WelcomeScreen
